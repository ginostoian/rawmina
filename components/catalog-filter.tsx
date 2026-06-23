"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CATEGORIES, productsByCategory, type Category } from "@/lib/products";

const categoryOptions: Array<Category | "toate"> = [
  "toate",
  "torturi",
  "torturi-decor-copii",
  "prajituri",
  "bomboane-raw",
  "creme-tartinabile",
  "inghetata",
  "biscuiti-si-briose",
  "specialitati",
  "platouri-asortate",
  "de-sezon",
  "de-oferit",
];

function isCategory(value: string | null): value is Category {
  return Boolean(value && value in CATEGORIES);
}

export function CatalogFilter() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categorie");
  const initial: Category | "toate" = isCategory(categoryParam) ? categoryParam : "toate";
  const [selected, setSelected] = useState<Category | "toate">(initial);

  const visibleProducts = useMemo(() => productsByCategory(selected), [selected]);

  return (
    <div className="space-y-8">
      <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        <ToggleGroup
          type="single"
          value={selected}
          onValueChange={(value) => {
            if (value) setSelected(value as Category | "toate");
          }}
          aria-label="Filtrează catalogul după categorie"
          className="min-w-max justify-start"
        >
          {categoryOptions.map((category) => (
            <ToggleGroupItem key={category} value={category} aria-label={category === "toate" ? "Toate produsele" : CATEGORIES[category].label}>
              {category === "toate" ? "Toate" : CATEGORIES[category].label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index === 0} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="font-display text-2xl font-semibold text-brand-wine-deep">Momentan nu avem produse aici.</p>
          <p className="mt-2 text-[#6f5f63]">Revino curând sau scrie-ne pentru o comandă personalizată.</p>
        </div>
      )}
    </div>
  );
}
