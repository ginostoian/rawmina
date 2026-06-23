"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/cart";
import { getCartItemTotal } from "@/lib/cart";
import type { Product } from "@/lib/products";

const STORAGE_KEY = "rawmina-cart-v1";
const CART_LIFETIME_DAYS = 30;

interface StoredCart {
  expiresAt: number;
  items: CartItem[];
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const cart = JSON.parse(saved) as StoredCart;
        if (cart.expiresAt > Date.now() && Array.isArray(cart.items)) {
          setItems(cart.items);
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (items.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const cart: StoredCart = {
      items,
      expiresAt: Date.now() + CART_LIFETIME_DAYS * 24 * 60 * 60 * 1000,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const updateQuantity = (slug: string, quantity: number) => {
      setItems((currentItems) =>
        currentItems.flatMap((item) =>
          item.slug === slug
            ? quantity > 0
              ? [{ ...item, quantity: Math.max(1, Number(quantity.toFixed(2))) }]
              : []
            : [item],
        ),
      );
    };

    return {
      items,
      itemCount: items.length,
      total: items.reduce((sum, item) => sum + getCartItemTotal(item), 0),
      addItem: (product, quantity) => {
        const normalizedQuantity = Math.max(1, Number(quantity.toFixed(2)));
        setItems((currentItems) => {
          const existing = currentItems.find((item) => item.slug === product.slug);
          if (existing) {
            return currentItems.map((item) => (item.slug === product.slug ? { ...item, quantity: item.quantity + normalizedQuantity } : item));
          }

          return [
            ...currentItems,
            {
              slug: product.slug,
              name: product.name,
              image: product.image,
              imageAlt: product.imageAlt,
              salesMode: product.salesMode,
              quantity: normalizedQuantity,
              pricePerKg: product.price,
              unitWeightGrams: product.unitWeightGrams,
            },
          ];
        });
      },
      updateQuantity,
      removeItem: (slug) => updateQuantity(slug, 0),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
