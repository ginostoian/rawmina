"use client";

import { Facebook, Instagram, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-wine-deep text-cream">
      <div className="container-content grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Image src="/brand/rawmina-logo.jpeg" alt="Logo RawMina Raw Vegan Cakes" width={150} height={109} className="rounded-xl bg-cream p-2" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-brand-pink-soft">
            Torturi și prăjituri raw vegane, făcute manual, fără zahăr și fără compromis la gust.
          </p>
          <p className="mt-5 inline-block -rotate-2 font-hand text-3xl font-semibold text-brand-pink">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.04em] text-brand-pink">Link-uri</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li><Link href="/produse" className="hover:text-brand-pink">Produse</Link></li>
            <li><Link href="/despre" className="hover:text-brand-pink">Despre</Link></li>
            <li><Link href="/comanda" className="hover:text-brand-pink">Cum comanzi</Link></li>
            <li><Link href="/contact" className="hover:text-brand-pink">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.04em] text-brand-pink">Categorii</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {Object.entries(CATEGORIES).slice(0, 6).map(([slug, category]) => (
              <li key={slug}>
                <Link href={`/produse?categorie=${slug}`} className="hover:text-brand-pink">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.04em] text-brand-pink">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-brand-pink-soft">
            <p>{siteConfig.address}</p>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 hover:text-brand-pink">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <div className="flex gap-3 pt-2">
              <a href={siteConfig.social.facebook} aria-label="RawMina pe Facebook" className="rounded-full bg-brand-wine p-2 hover:bg-brand-strawberry">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={siteConfig.social.instagram} aria-label="RawMina pe Instagram" className="rounded-full bg-brand-wine p-2 hover:bg-brand-strawberry">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-content flex flex-col gap-2 py-5 text-sm text-brand-pink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © <span suppressHydrationWarning>{currentYear}</span> RawMina. All rights reserved.
          </p>
          <a href="https://madebybloc.com" className="font-bold text-brand-pink transition hover:text-cream">
            Made by BLOC
          </a>
        </div>
      </div>
    </footer>
  );
}
