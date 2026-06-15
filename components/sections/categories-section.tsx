import { CategoryCard } from "@/components/category-card";
import { CATEGORIES, type Category } from "@/lib/products";

export function CategoriesSection() {
  const categories = Object.keys(CATEGORIES) as Category[];

  return (
    <section className="py-20 md:py-28">
      <div className="container-content">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Catalog RawMina</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-brand-wine-deep">
            Alege după poftă, ocazie sau sezon.
          </h2>
          <p className="mt-4 leading-8 text-[#6f5f63]">
            Torturi raw vegane pentru aniversări, prăjituri fără zahăr pentru fiecare zi și deserturi sezoniere pregătite în serii mici.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
