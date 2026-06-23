"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import type { Product } from "@/lib/products";

const orderSchema = z.object({
  name: z.string().min(2, "Te rugăm să introduci numele tău."),
  phone: z
    .string()
    .min(8, "Te rugăm să introduci un număr de telefon valid.")
    .regex(/^[+0-9\s().-]+$/, "Te rugăm să introduci un număr de telefon valid."),
  quantity: z.string().min(1, "Alege cantitatea dorită."),
  desiredDate: z.string().min(1, "Alege data dorită."),
  message: z.string().optional(),
});

type OrderValues = z.infer<typeof orderSchema>;

interface OrderDialogProps {
  product?: Product;
  children: React.ReactNode;
}

export function OrderDialog({ product, children }: OrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: product ? "1" : "",
      message: "",
    },
  });

  const productPrice = product?.price ? `${product.price} lei${product.priceUnit ?? ""}` : "Preț la cerere";
  const productLabel = product ? `${product.name} · ${productPrice}` : "Comandă personalizată";

  const whatsappHref = useMemo(() => {
    const text = product
      ? `Bună! Aș vrea să comand ${product.name} (${productPrice}).`
      : "Bună! Aș vrea să plasez o comandă RawMina.";

    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [product]);

  async function onSubmit(values: OrderValues) {
    setStatus("idle");

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        product: product
          ? {
              slug: product.slug,
              name: product.name,
              price: product.price,
              priceUnit: product.priceUnit,
            }
          : null,
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ quantity: product ? "1" : "", message: "", desiredDate: "", name: "", phone: "" });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comandă RawMina</DialogTitle>
          <DialogDescription>
            Spune-ne ce desert îți dorești și când. Confirmarea finală o facem telefonic.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl bg-brand-pink-soft p-4">
          <p className="text-xs font-bold uppercase tracking-[0.04em] text-brand-wine">Produs selectat</p>
          <p className="mt-1 font-display text-xl font-semibold text-brand-wine-deep">{productLabel}</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nume</Label>
            <Input id="name" autoComplete="name" {...register("name")} />
            {errors.name ? <p className="text-sm font-semibold text-brand-strawberry">{errors.name.message}</p> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" autoComplete="tel" inputMode="tel" {...register("phone")} />
              {errors.phone ? <p className="text-sm font-semibold text-brand-strawberry">{errors.phone.message}</p> : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Cantitate</Label>
              <Input id="quantity" placeholder="ex. 1 tort, 6 bucăți" {...register("quantity")} />
              {errors.quantity ? (
                <p className="text-sm font-semibold text-brand-strawberry">{errors.quantity.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desiredDate">Data dorită</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-wine" />
              <Input id="desiredDate" type="date" className="pl-11" {...register("desiredDate")} />
            </div>
            {errors.desiredDate ? (
              <p className="text-sm font-semibold text-brand-strawberry">{errors.desiredDate.message}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Mesaj opțional</Label>
            <Textarea id="message" placeholder="Alergii, ocazie, interval de ridicare..." {...register("message")} />
          </div>

          {status === "success" ? (
            <p className="rounded-xl bg-brand-pink-soft p-3 text-sm font-bold text-brand-wine">
              Mulțumim! Comanda ta a ajuns la noi. Te contactăm în curând.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl bg-brand-pink-soft p-3 text-sm font-bold text-brand-strawberry">
              Nu am putut trimite comanda. Încearcă WhatsApp sau telefon.
            </p>
          ) : null}

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Se trimite..." : "Trimite comanda"}
          </Button>
        </form>

        <div className="grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
          <Button asChild variant="outline">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Comandă pe WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Sună acum
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
