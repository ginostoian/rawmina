import type { Metadata } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/lib/config";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "RawMina | Cofetărie raw vegană fără zahăr",
    template: "%s | RawMina",
  },
  description:
    "RawMina pregătește torturi, prăjituri și deserturi raw vegane fără zahăr, făcute manual cu fructe, nuci și îndulcitori naturali.",
  keywords: [
    "RawMina",
    "cofetărie raw vegană",
    "torturi fără zahăr",
    "prăjituri raw",
    "deserturi vegane România",
  ],
  openGraph: {
    title: "RawMina | Zâmbește, e fără zahăr",
    description: "Torturi și prăjituri raw vegane, fără zahăr, făcute manual.",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" data-scroll-behavior="smooth" className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
