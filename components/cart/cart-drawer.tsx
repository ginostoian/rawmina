"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCurrency, formatQuantity, getCartItemTotal } from "@/lib/cart";

interface CartDrawerProps {
  compact?: boolean;
}

export function CartDrawer({ compact }: CartDrawerProps) {
  const { items, itemCount, total, removeItem, updateQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={compact ? "soft" : "default"} size={compact ? "icon" : "default"} className="relative" aria-label="Deschide coșul">
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {compact ? null : "Coș"}
          {itemCount > 0 ? (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-wine-deep px-1 text-[10px] font-bold text-cream ring-2 ring-cream">
              {itemCount}
            </span>
          ) : null}
        </Button>
      </DialogTrigger>
      <DialogContent className="left-auto right-0 top-0 h-dvh max-h-dvh w-full max-w-md translate-x-0 translate-y-0 gap-0 rounded-none border-y-0 border-r-0 p-0 data-[state=open]:slide-in-from-right-4">
        <DialogHeader className="border-b border-border p-6 pr-14">
          <DialogTitle>Coșul tău</DialogTitle>
          <DialogDescription>
            {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "sortiment" : "sortimente"} selectate` : "Adaugă deserturile preferate pentru a începe comanda."}
          </DialogDescription>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-soft text-brand-wine">
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-5 font-display text-2xl font-semibold text-brand-wine-deep">Coșul este gol.</p>
            <p className="mt-2 text-sm leading-6 text-[#6f5f63]">Alege din catalog produsele pe care vrei să le comanzi.</p>
            <Button asChild className="mt-6">
              <Link href="/produse" onClick={() => setOpen(false)}>
                Vezi produsele
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="grid gap-5">
                {items.map((item) => {
                  const step = item.salesMode === "weight" ? 0.5 : 1;
                  return (
                    <li key={item.slug} className="flex gap-3 border-b border-border pb-5 last:border-0">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-pink-soft">
                        <Image src={item.image} alt={item.imageAlt} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold leading-snug text-brand-wine-deep">{item.name}</p>
                            <p className="mt-1 text-xs text-[#6f5f63]">
                              {item.salesMode === "weight" ? "170 lei / kg" : `aprox. ${item.unitWeightGrams ?? 150} g / bucată`}
                            </p>
                          </div>
                          <button type="button" onClick={() => removeItem(item.slug)} className="rounded-full p-1 text-[#6f5f63] hover:bg-brand-pink-soft hover:text-brand-strawberry" aria-label={`Elimină ${item.name}`}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-full border border-border bg-surface">
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
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border-t border-border bg-cream p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-xl font-semibold text-brand-wine-deep">Total estimat</p>
                <p className="font-display text-2xl font-semibold text-brand-strawberry">{formatCurrency(total)}</p>
              </div>
              <p className="mt-1 text-xs leading-5 text-[#6f5f63]">Confirmăm disponibilitatea și detaliile finale după trimiterea comenzii.</p>
              <Button asChild size="lg" className="mt-5 w-full">
                <Link href="/comanda" onClick={() => setOpen(false)}>
                  Continuă comanda
                </Link>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
