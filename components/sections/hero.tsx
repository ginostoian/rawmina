import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-content grid min-h-[80vh] items-center gap-10 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div className="order-2 max-w-xl md:order-1">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-pink-soft px-4 py-2 text-xs font-bold uppercase tracking-[0.04em] text-brand-wine">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Cofetărie raw vegană
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep text-balance">
            Deserturi raw vegane făcute <span className="hand-underline">fără zahăr</span> și pline de bucurie.
          </h1>
          <p className="mt-5 inline-block -rotate-2 font-hand text-3xl font-semibold text-brand-wine">
            {siteConfig.tagline}
          </p>
          <p className="mt-6 text-lg leading-8 text-[#6f5f63]">
            Torturi și prăjituri raw, făcute manual, cu fructe, nuci și îndulcitori naturali. Pentru zile în care vrei ceva frumos, bun și atent cu tine.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/produse">
                Vezi produsele
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/comanda">Cum comanzi</Link>
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto max-w-[680px]">
            <div className="absolute -left-5 top-10 h-28 w-28 rounded-full bg-brand-pink-soft" />
            <div className="absolute -right-4 bottom-10 h-24 w-24 rounded-full bg-fruit-mango/45" />
            <div className="organic-mask relative aspect-[5/4] overflow-hidden bg-brand-pink-soft shadow-soft">
              <Image
                src="/products/mix-felii-raw.jpg"
                alt="Platou cu felii colorate de tort raw vegan RawMina"
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                priority
                loading="eager"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 hidden rounded-2xl bg-surface/92 p-4 backdrop-blur sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.04em] text-brand-wine">Fără zahăr rafinat</p>
              <p className="mt-1 text-sm font-semibold text-brand-wine-deep">doar fructe, nuci și îndulcitori naturali</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
