import type { Metadata } from "next";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { OrderDialog } from "@/components/order-dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RawMina pentru comenzi de torturi și prăjituri raw vegane fără zahăr. Telefon, WhatsApp, social media și adresă placeholder.",
};

export default function ContactPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container-content grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Contact</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-brand-wine-deep">
            Vorbim despre desertul potrivit pentru ocazia ta.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#6f5f63]">
            Datele de mai jos sunt placeholder până primim informațiile finale. Structura este pregătită pentru telefon, WhatsApp, email și social media.
          </p>
          <OrderDialog>
            <Button className="mt-8" size="lg">Comandă acum</Button>
          </OrderDialog>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div className="grid gap-5">
            <a href={`tel:${siteConfig.phone}`} className="flex gap-4 rounded-xl bg-cream p-4 hover:bg-brand-pink-soft">
              <Phone className="mt-1 h-5 w-5 text-brand-wine" aria-hidden="true" />
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Telefon</span>
                <span className="mt-1 block font-semibold text-brand-wine-deep">{siteConfig.phone}</span>
              </span>
            </a>
            <a href={`mailto:${siteConfig.orderEmail}`} className="flex gap-4 rounded-xl bg-cream p-4 hover:bg-brand-pink-soft">
              <Mail className="mt-1 h-5 w-5 text-brand-wine" aria-hidden="true" />
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Email comenzi</span>
                <span className="mt-1 block font-semibold text-brand-wine-deep">{siteConfig.orderEmail}</span>
              </span>
            </a>
            <div className="flex gap-4 rounded-xl bg-cream p-4">
              <MapPin className="mt-1 h-5 w-5 text-brand-wine" aria-hidden="true" />
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Adresă</span>
                <span className="mt-1 block font-semibold text-brand-wine-deep">{siteConfig.address}</span>
              </span>
            </div>
            <div className="flex gap-3 pt-2">
              <Button asChild variant="outline">
                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                  Facebook
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
