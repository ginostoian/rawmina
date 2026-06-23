import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/config";
import { getUnitPrice } from "@/lib/cart";
import { products } from "@/lib/products";

const orderPayloadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  desiredDate: z.string().min(1),
  message: z.string().optional(),
  items: z.array(z.object({ slug: z.string(), quantity: z.number().positive() })).min(1),
});

export async function POST(request: Request) {
  const payload = orderPayloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Datele trimise nu sunt valide." }, { status: 400 });
  }

  const data = payload.data;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ORDER_FROM_EMAIL ?? "RawMina <onboarding@resend.dev>";
  const toEmail = process.env.ORDER_TO_EMAIL ?? siteConfig.orderEmail;
  const orderItems = data.items.flatMap((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);
    if (!product) return [];

    const validQuantity = product.salesMode === "weight" ? item.quantity >= 1 && item.quantity * 2 === Math.round(item.quantity * 2) : Number.isInteger(item.quantity);
    if (!validQuantity) return [];

    const unitPrice = getUnitPrice(product);
    const lineTotal = item.quantity * unitPrice;
    const quantityLabel = product.salesMode === "weight" ? `${item.quantity} kg` : `${item.quantity} buc.`;
    return [{ product, quantityLabel, lineTotal }];
  });

  if (orderItems.length !== data.items.length) {
    return NextResponse.json({ error: "Unul sau mai multe produse nu mai sunt disponibile." }, { status: 400 });
  }

  const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const orderLines = orderItems
    .map((item) => `<li>${item.product.name}: ${item.quantityLabel} — ${item.lineTotal.toFixed(2)} lei</li>`)
    .join("");

  const subject = `Comandă RawMina: ${orderItems.length} ${orderItems.length === 1 ? "sortiment" : "sortimente"}`;
  const html = `
    <h1>${subject}</h1>
    <p><strong>Nume:</strong> ${data.name}</p>
    <p><strong>Telefon:</strong> ${data.phone}</p>
    <p><strong>Data dorită:</strong> ${data.desiredDate}</p>
    <p><strong>Produse:</strong></p>
    <ul>${orderLines}</ul>
    <p><strong>Total estimat:</strong> ${total.toFixed(2)} lei</p>
    <p><strong>Mesaj:</strong> ${data.message || "Fără mesaj"}</p>
  `;

  if (!apiKey) {
    console.info("RawMina order preview", { ...data, toEmail });
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject,
    html,
  });

  return NextResponse.json({ ok: true });
}
