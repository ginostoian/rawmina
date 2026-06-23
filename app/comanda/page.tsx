import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { HowToOrder } from "@/components/sections/how-to-order";

export const metadata: Metadata = {
  title: "Cum comanzi",
  description:
    "Trimite comanda ta RawMina cu torturi și prăjituri raw vegane. Confirmarea se face direct cu cofetăria.",
};

export default function OrderPage() {
  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="container-content max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Comenzi RawMina</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep">
            Alegi desertul, noi confirmăm disponibilitatea.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#6f5f63]">
            Nu plătești aici: trimiți cererea, iar noi revenim cu detaliile despre gramaj, termen și ridicare.
          </p>
          <div className="mt-10">
            <CheckoutForm />
          </div>
        </div>
      </section>
      <HowToOrder />
    </main>
  );
}
