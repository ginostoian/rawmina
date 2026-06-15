import type { Metadata } from "next";
import { HowToOrder } from "@/components/sections/how-to-order";
import { OrderDialog } from "@/components/order-dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cum comanzi",
  description:
    "Comandă torturi și prăjituri raw vegane RawMina prin formular, WhatsApp sau telefon. Confirmarea se face direct cu cofetăria.",
};

export default function OrderPage() {
  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="container-content max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Comenzi RawMina</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep">
            Alegi desertul, noi confirmăm disponibilitatea.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#6f5f63]">
            Site-ul RawMina este o vitrină, nu un magazin online. Nu plătești aici: trimiți cererea, iar noi revenim cu detaliile despre gramaj, termen și ridicare.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OrderDialog>
              <Button size="lg">Trimite o comandă</Button>
            </OrderDialog>
            <Button asChild variant="outline" size="lg">
              <a href={`https://wa.me/${siteConfig.whatsapp}`}>Scrie pe WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>
      <HowToOrder />
    </main>
  );
}
