import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, products, type Category } from "@/lib/products";

interface CategoryCardProps {
  category: Category;
}

const accentClasses: Record<string, string> = {
  matcha: "bg-fruit-matcha",
  mango: "bg-fruit-mango",
  blueberry: "bg-fruit-blueberry",
  apricot: "bg-fruit-apricot",
};

export function CategoryCard({ category }: CategoryCardProps) {
  const item = CATEGORIES[category];
  const count = products.filter((product) => product.category === category).length;

  return (
    <Link
      href={`/produse?categorie=${category}`}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition duration-200 ease-out hover:-translate-y-1 hover:border-brand-pink motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[6/5] overflow-hidden">
        <Image
          src={item.cover}
          alt={`Categorie RawMina: ${item.label}`}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-wine-deep/70 via-brand-wine-deep/10 to-transparent" />
        <div className={`absolute left-4 top-4 h-1.5 w-16 rounded-full ${accentClasses[item.accent]}`} />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl font-semibold text-white">{item.label}</h3>
          <p className="mt-1 text-sm font-bold text-brand-pink-soft">{count} produse</p>
        </div>
      </div>
    </Link>
  );
}
