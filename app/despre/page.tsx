import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Despre",
  description:
    "Povestea RawMina: cofetărie raw vegană cu deserturi fără zahăr, făcute manual din fructe, nuci și ingrediente naturale.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="container-content grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Despre RawMina</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep">
              Cofetărie raw vegană cu inimă artizanală.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6f5f63]">
              RawMina este locul în care deserturile fără zahăr nu sunt tratate ca o concesie, ci ca o invitație la ingrediente mai clare: fructe, nuci, cacao raw, caju, cocos și îndulcitori naturali.
            </p>
            <p className="mt-5 leading-8 text-[#6f5f63]">
              Fiecare tort sau prăjitură este construit manual, în serii mici, cu atenție la textură și culoare. Stilul este cald, jucăuș și feminin, dar produsul rămâne premium: curat, echilibrat și potrivit pentru ocazii în care vrei ceva memorabil.
            </p>
            <Button asChild className="mt-8">
              <Link href="/produse">Vezi catalogul</Link>
            </Button>
          </div>
          <div className="organic-mask relative aspect-[4/5] overflow-hidden bg-brand-pink-soft">
            <Image
              src="/products/mix-felii-raw.jpg"
              alt="Felii de tort raw vegan RawMina în culori naturale"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
