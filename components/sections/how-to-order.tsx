import { CalendarCheck, MessageCircle, PackageCheck } from "lucide-react";
import { OrderDialog } from "@/components/order-dialog";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Alegi desertul",
    text: "Din catalog sau ne scrii pentru o combinație potrivită ocaziei.",
    icon: PackageCheck,
  },
  {
    title: "Trimiți cererea",
    text: "Formular, WhatsApp sau telefon, cu data și cantitatea dorită.",
    icon: MessageCircle,
  },
  {
    title: "Confirmăm detaliile",
    text: "Stabilim disponibilitatea, ridicarea și orice preferință specială.",
    icon: CalendarCheck,
  },
];

export function HowToOrder() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-content">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Cum comanzi</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-brand-wine-deep">
            Comandă simplu, fără coș și fără plată online.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-2xl border border-border bg-cream p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-semibold text-brand-pink">0{index + 1}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink-soft text-brand-wine">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-brand-wine-deep">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6f5f63]">{step.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-9">
          <OrderDialog>
            <Button size="lg">Începe o comandă</Button>
          </OrderDialog>
        </div>
      </div>
    </section>
  );
}
