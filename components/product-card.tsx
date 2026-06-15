import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OrderDialog } from "@/components/order-dialog";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  priority?: boolean;
}

export function ProductCard({ product, compact, priority }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-3 transition duration-200 ease-out hover:-translate-y-1 hover:border-brand-pink motion-reduce:hover:translate-y-0">
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
          {!product.available ? (
            <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-brand-wine">
              Sezonier
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-2 pt-4", compact && "gap-2")}>
        <div className="space-y-1">
          <h3 className="text-[1.125rem] font-bold leading-snug text-brand-wine-deep">{product.name}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-[#6f5f63]">{product.shortDescription}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <p className="font-bold text-brand-strawberry">
            {product.price} lei<span className="text-sm font-semibold text-[#6f5f63]">{product.priceUnit}</span>
          </p>
          <OrderDialog product={product}>
            <Button size="sm" variant="outline" className="group-hover:border-brand-strawberry group-hover:bg-brand-strawberry group-hover:text-white">
              Comandă
            </Button>
          </OrderDialog>
        </div>
      </div>
    </article>
  );
}
