"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveCheckoutOrder } from "@/lib/admin-local";
import { formatCurrency, formatQuantity, getCartItemTotal } from "@/lib/cart";

const checkoutSchema = z.object({
  name: z.string().min(2, "Te rugăm să introduci numele tău."),
  phone: z.string().min(8, "Te rugăm să introduci un număr de telefon valid.").regex(/^[+0-9\s().-]+$/, "Te rugăm să introduci un număr de telefon valid."),
  desiredDate: z.string().min(1, "Alege data dorită."),
  message: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  async function onSubmit(values: CheckoutValues) {
    setStatus("idle");
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    saveCheckoutOrder(values, items, total);
    clearCart();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-pink-soft p-8 text-center md:p-12">
        <p className="font-display text-3xl font-semibold text-brand-wine-deep">Mulțumim pentru comandă!</p>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-[#6f5f63]">Am primit cererea ta. Revenim telefonic pentru confirmarea disponibilității, cantităților și a detaliilor de ridicare.</p>
        <Button asChild className="mt-7">
          <Link href="/produse">Înapoi la produse</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <p className="font-display text-2xl font-semibold text-brand-wine-deep">Coșul tău este gol.</p>
        <p className="mt-2 text-[#6f5f63]">Adaugă produsele dorite înainte de a trimite comanda.</p>
        <Button asChild className="mt-6">
          <Link href="/produse">Descoperă produsele</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
      <form className="grid gap-5 rounded-2xl border border-border bg-surface p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">Datele comenzii</h2>
          <p className="mt-2 text-sm leading-6 text-[#6f5f63]">Nu plătești online. Confirmăm telefonic toate detaliile înainte de preparare.</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Nume</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name ? <p className="text-sm font-semibold text-brand-strawberry">{errors.name.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" autoComplete="tel" inputMode="tel" {...register("phone")} />
          {errors.phone ? <p className="text-sm font-semibold text-brand-strawberry">{errors.phone.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="desiredDate">Data dorită</Label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-wine" />
            <Input id="desiredDate" type="date" min={new Date().toISOString().slice(0, 10)} className="pl-11" {...register("desiredDate")} />
          </div>
          {errors.desiredDate ? <p className="text-sm font-semibold text-brand-strawberry">{errors.desiredDate.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Observații</Label>
          <Textarea id="message" placeholder="Alergii, ocazie, interval de ridicare sau alte detalii..." {...register("message")} />
        </div>
        {status === "error" ? <p className="rounded-xl bg-brand-pink-soft p-3 text-sm font-bold text-brand-strawberry">Nu am putut trimite comanda. Încearcă din nou sau contactează-ne telefonic.</p> : null}
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Se trimite..." : "Trimite comanda"}
        </Button>
      </form>

      <aside className="h-fit rounded-2xl bg-brand-pink-soft p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">Rezumat comandă</h2>
          <Link href="/produse" className="text-sm font-bold text-brand-wine hover:text-brand-strawberry">Adaugă produse</Link>
        </div>
        <ul className="mt-6 grid gap-4">
          {items.map((item) => {
            const step = item.salesMode === "weight" ? 0.5 : 1;
            return (
              <li key={item.slug} className="rounded-xl bg-surface p-3">
                <div className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-pink-soft">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-3">
                      <p className="flex-1 font-bold leading-snug text-brand-wine-deep">{item.name}</p>
                      <button type="button" onClick={() => removeItem(item.slug)} className="self-start rounded-full p-1 text-[#6f5f63] hover:bg-brand-pink-soft hover:text-brand-strawberry" aria-label={`Elimină ${item.name}`}>
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button type="button" onClick={() => updateQuantity(item.slug, Number((item.quantity - step).toFixed(2)))} className="p-2 text-brand-wine hover:bg-brand-pink-soft" aria-label={`Scade cantitatea pentru ${item.name}`}>
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-16 px-1 text-center text-xs font-bold text-brand-wine-deep">{formatQuantity(item.quantity, item.salesMode)}</span>
                        <button type="button" onClick={() => updateQuantity(item.slug, Number((item.quantity + step).toFixed(2)))} className="p-2 text-brand-wine hover:bg-brand-pink-soft" aria-label={`Crește cantitatea pentru ${item.name}`}>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="font-bold text-brand-strawberry">{formatCurrency(getCartItemTotal(item))}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-brand-pink pt-5">
          <p className="font-display text-xl font-semibold text-brand-wine-deep">Total estimat</p>
          <p className="font-display text-2xl font-semibold text-brand-strawberry">{formatCurrency(total)}</p>
        </div>
      </aside>
    </div>
  );
}
