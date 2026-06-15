import { HandHeart, Leaf, Sprout, WheatOff } from "lucide-react";

const items = [
  { label: "100% raw vegan", icon: Leaf },
  { label: "Fără zahăr", icon: WheatOff },
  { label: "Doar îndulcitori naturali", icon: Sprout },
  { label: "Făcute manual", icon: HandHeart },
];

export function TrustBand() {
  return (
    <section className="border-y border-border bg-brand-pink-soft/65">
      <div className="container-content grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 rounded-xl bg-surface/60 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-wine">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-bold text-brand-wine-deep">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
