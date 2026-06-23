"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Acasă" },
  { href: "/produse", label: "Produse" },
  { href: "/despre", label: "Despre" },
  { href: "/comanda", label: "Cum comanzi" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-cream/88 backdrop-blur transition",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container-content flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="RawMina acasă">
          <Image src="/brand/rawmina-logo.jpeg" alt="Logo RawMina Raw Vegan Cakes" width={100} height={73} priority className="h-auto w-[100px]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigație principală">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-bold text-brand-wine-deep transition hover:text-brand-wine",
                  active && "hand-underline text-brand-wine",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CartDrawer />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CartDrawer compact />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="soft" size="icon" aria-label="Deschide meniul">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-4 max-w-[calc(100%-2rem)] translate-y-0 rounded-2xl sm:left-auto sm:right-4 sm:translate-x-0">
              <DialogHeader>
                <DialogTitle>Meniu</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 font-bold text-brand-wine-deep hover:bg-brand-pink-soft">
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-2 w-full">
                  <Link href="/comanda">Vezi coșul</Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
