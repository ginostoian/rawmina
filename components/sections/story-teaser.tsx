import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StoryTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-content grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="organic-mask-alt relative aspect-[5/4] overflow-hidden bg-brand-pink-soft">
          <Image
            src="/products/tarte-si-cozonac-raw.jpg"
            alt="Tarte și deserturi raw vegane pregătite manual în cofetăria RawMina"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Povestea RawMina</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-brand-wine-deep">
            Desertul poate fi blând cu ingredientele și spectaculos în farfurie.
          </h2>
          <p className="mt-5 leading-8 text-[#6f5f63]">
            RawMina pornește de la ideea simplă că o cofetărie raw vegană nu trebuie să arate „sănătos” în sens rece. Aici gustul vine din fructe, nuci, cacao, caju și răbdare, iar fiecare produs păstrează aerul de desert făcut de mână.
          </p>
          <Button asChild variant="soft" className="mt-7">
            <Link href="/despre">Citește povestea</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
