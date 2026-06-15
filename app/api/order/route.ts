import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/config";

const orderPayloadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  quantity: z.string().min(1),
  desiredDate: z.string().min(1),
  message: z.string().optional(),
  product: z
    .object({
      slug: z.string(),
      name: z.string(),
      price: z.number(),
      priceUnit: z.string().optional(),
    })
    .nullable(),
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

  const subject = data.product ? `Comandă RawMina: ${data.product.name}` : "Comandă RawMina personalizată";
  const html = `
    <h1>${subject}</h1>
    <p><strong>Nume:</strong> ${data.name}</p>
    <p><strong>Telefon:</strong> ${data.phone}</p>
    <p><strong>Cantitate:</strong> ${data.quantity}</p>
    <p><strong>Data dorită:</strong> ${data.desiredDate}</p>
    <p><strong>Produs:</strong> ${
      data.product ? `${data.product.name} - ${data.product.price} lei${data.product.priceUnit ?? ""}` : "Comandă personalizată"
    }</p>
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
