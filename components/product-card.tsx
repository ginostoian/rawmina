"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDialog } from "@/components/order-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  priority?: boolean;
}

export function ProductCard({ product, compact, priority }: ProductCardProps) {
  const price = `${product.price} lei${product.priceUnit ?? ""}`;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-3 transition duration-200 ease-out hover:-translate-y-1 hover:border-brand-pink motion-reduce:hover:translate-y-0">
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="block text-left focus-visible:rounded-lg" aria-label={`Vezi detaliile pentru ${product.name}`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-pink-soft">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, 50vw"
                priority={priority}
                loading={priority ? "eager" : undefined}
                className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                {product.badges?.slice(0, 2).map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-brand-pink-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-brand-wine"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-surface/90 px-3 py-2 text-xs font-bold text-brand-wine shadow-sm backdrop-blur">
                Vezi detalii
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>

            <div className={cn("flex flex-1 flex-col gap-2 p-2 pb-3 pt-4", compact && "gap-1")}>
              <div className="space-y-1">
                <h3 className="text-[1.125rem] font-bold leading-snug text-brand-wine-deep">{product.name}</h3>
                <p className="line-clamp-2 text-sm leading-6 text-[#6f5f63]">{product.shortDescription}</p>
                <p className="line-clamp-2 text-xs leading-5 text-[#6f5f63]">
                  <span className="font-bold text-brand-wine">Conține: </span>
                  {product.ingredients}
                </p>
              </div>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl overflow-hidden p-0 data-[state=open]:slide-in-from-bottom-4">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-72 bg-brand-pink-soft">
              <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <DialogHeader>
                <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">RawMina</p>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogDescription className="text-base leading-7">{product.shortDescription}</DialogDescription>
              </DialogHeader>
              <div className="mt-6 rounded-xl bg-brand-pink-soft p-4">
                <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Conține</p>
                <p className="mt-2 leading-7 text-[#6f5f63]">{product.ingredients}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display text-2xl font-semibold text-brand-strawberry">{price}</p>
                <OrderDialog product={product}>
                  <Button>Comandă produsul</Button>
                </OrderDialog>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border px-2 pt-3">
        <p className="font-bold text-brand-strawberry">{price}</p>
        <OrderDialog product={product}>
          <Button size="sm" variant="outline" className="group-hover:border-brand-strawberry group-hover:bg-brand-strawberry group-hover:text-white">
            Comandă
          </Button>
        </OrderDialog>
      </div>
    </article>
  );
}
