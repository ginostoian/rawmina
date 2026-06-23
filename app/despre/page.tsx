import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Despre",
  description:
    "Povestea RawMina: deserturi raw-vegane fără zahăr rafinat, aditivi, lactate sau ouă, făcute cu ingrediente naturale.",
};

const principles = [
  {
    value: "0%",
    title: "Zahăr rafinat",
    description: "Îndulcim doar cu fructe sau îndulcitori naturali, cu indice glicemic scăzut.",
  },
  {
    value: "0%",
    title: "Aditivi",
    description: "Fără coloranți, conservanți sau arome artificiale.",
  },
  {
    value: "100%",
    title: "Nutriție",
    description: "Folosim nuci, semințe, fructe proaspete și superalimente de cea mai înaltă calitate.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="container-content grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Bun venit în RawMina</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep text-balance">
              Deserturi care aduc bucurie, nu regrete.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6f5f63]">
              Bună! Eu sunt Admina, fondatoarea acestui proiect de suflet și îți urez bun venit în universul RawMina.
            </p>
            <p className="mt-5 leading-8 text-[#6f5f63]">
              Cofetăria noastră nu a apărut dintr-un simplu plan de afaceri, ci dintr-o căutare personală și o promisiune făcută celor dragi. Totul a pornit de la dorința de a elimina din alimentație produsele din comerț, adesea suprasaturate cu zahăr rafinat, stabilizatori și arome artificiale.
            </p>
            <p className="mt-5 leading-8 text-[#6f5f63]">
              Mi-am dorit mai mult pentru mine și pentru familia mea: am vrut un desert care să aducă bucurie, nu regrete.
            </p>
          </div>
          <div className="organic-mask relative aspect-[4/5] overflow-hidden bg-brand-pink-soft shadow-soft">
            <Image
              src="/products/mix-felii-raw.jpg"
              alt="Felii de tort raw-vegan RawMina, cu ingrediente naturale"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-pink-soft/55 py-16 md:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink text-brand-wine">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Ingredientele, așa cum sunt</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-brand-wine-deep">
              Bucătăria, un laborator al aromelor vii.
            </h2>
          </div>
          <div className="self-center text-lg leading-8 text-[#6f5f63]">
            <p>
              Din pasiunea pentru un stil de viață curat, am transformat bucătăria într-un laborator al aromelor vii, unde ingredientele sunt folosite exact așa cum le-a lăsat natura.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-content">
          <div className="max-w-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink-soft text-brand-wine">
              <Leaf className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Filosofia noastră</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-brand-wine-deep">
              Dulcele care te hrănește.
            </h2>
            <p className="mt-5 leading-8 text-[#6f5f63]">
              La RawMina, credem cu tărie că un desert nu ar trebui doar să îți satisfacă pofta de dulce pentru moment, ci să îți hrănească corpul. Prăjiturile noastre raw-vegane sunt create fără foc, păstrând intacte toate vitaminele, mineralele și enzimele ingredientelor folosite.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <p className="font-display text-4xl font-semibold text-brand-strawberry">{principle.value}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand-wine-deep">{principle.title}</h3>
                <p className="mt-3 leading-7 text-[#6f5f63]">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-content">
          <div className="rounded-2xl bg-brand-wine-deep px-6 py-10 text-cream md:px-10 md:py-12">
            <div className="grid items-start gap-8 md:grid-cols-[1fr_0.9fr] md:gap-12">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink text-brand-wine-deep">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.04em] text-brand-pink">Un dulce pentru fiecare</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
                  RawMina este o alternativă sigură pentru tine.
                </h2>
                <p className="mt-5 leading-8 text-cream/85">
                  Știm cât de provocator poate fi să găsești un desert delicios atunci când te confrunți cu alergii sau intoleranțe alimentare. RawMina a fost gândită ca un refugiu sigur pentru toți cei care au restricții în dietă, dar nu vor să renunțe la plăcerea unui dulce rafinat.
                </p>
              </div>

              <div className="rounded-xl bg-surface/10 p-6">
                <p className="font-display text-xl font-semibold">Promisiunea mea</p>
                <p className="mt-3 leading-7 text-cream/85">
                  Toate produsele noastre sunt în mod natural fără lactate și fără ouă, la cerere și fără gluten, fiind perfecte pentru persoanele cu intoleranțe, alergii sau pentru cei care urmează un regim vegan ori de post.
                </p>
                <ul className="mt-5 space-y-3 text-sm font-bold text-cream">
                  {['Fără lactate', 'Fără ouă', 'Fără gluten, la cerere'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 shrink-0 text-brand-pink" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-10 max-w-3xl font-display text-2xl leading-snug text-brand-pink">
              Te invit să descoperi o lume a deserturilor unde gustul intens se împletește perfect cu sănătatea. Răsfață-te cu ingrediente vii și oferă-i corpului tău energia de care are nevoie!
            </p>
            <Button asChild variant="soft" className="mt-8">
              <Link href="/produse">Descoperă deserturile</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
