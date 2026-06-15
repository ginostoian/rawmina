import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";

export const metadata: Metadata = {
  title: "Produse",
  description:
    "Catalog RawMina cu torturi raw vegane, prăjituri fără zahăr, bomboane raw, creme și specialități sezoniere.",
};

export default function ProductsPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container-content">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Catalog complet</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep">
            Torturi, prăjituri și deserturi raw vegane fără zahăr.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#6f5f63]">
            Alege din produsele RawMina sau folosește-le ca inspirație pentru o comandă personalizată. Prețurile sunt orientative până confirmăm disponibilitatea.
          </p>
        </div>
        <Suspense fallback={<p className="font-bold text-brand-wine">Se încarcă produsele...</p>}>
          <CatalogFilter />
        </Suspense>
      </div>
    </main>
  );
}
