import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { featuredProducts, products } from "@/lib/products";

interface FeaturedProductsProps {
  extended?: boolean;
}

export function FeaturedProducts({ extended }: FeaturedProductsProps) {
  const visibleProducts = extended ? products.slice(0, 12) : featuredProducts.slice(0, 8);

  return (
    <section className="bg-brand-pink-soft/45 py-20 md:py-28">
      <div className="container-content">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Produse populare</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-brand-wine-deep">
              Deserturi raw vegane care arată festiv și rămân curate la ingrediente.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/produse">Catalog complet</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
