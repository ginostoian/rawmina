"use client";

import type { CartItem } from "@/lib/cart";
import { formatQuantity, getCartItemTotal } from "@/lib/cart";
import { initialAdminStore, type AdminOrder, type AdminStore } from "@/lib/admin-data";

const ADMIN_STORE_KEY = "rawmina-admin-store-v1";

function cloneInitialStore(): AdminStore {
  return JSON.parse(JSON.stringify(initialAdminStore)) as AdminStore;
}

export function readAdminStore(): AdminStore {
  try {
    const stored = window.localStorage.getItem(ADMIN_STORE_KEY);
    if (!stored) return cloneInitialStore();

    const parsed = JSON.parse(stored) as Partial<AdminStore>;

    return {
      orders: Array.isArray(parsed.orders) ? parsed.orders : cloneInitialStore().orders,
      posts: Array.isArray(parsed.posts) ? parsed.posts : cloneInitialStore().posts,
      categories: Array.isArray(parsed.categories) ? parsed.categories : cloneInitialStore().categories,
      tags: Array.isArray(parsed.tags) ? parsed.tags : cloneInitialStore().tags,
    };
  } catch {
    return cloneInitialStore();
  }
}

export function writeAdminStore(store: AdminStore) {
  window.localStorage.setItem(ADMIN_STORE_KEY, JSON.stringify(store));
}

export function resetAdminStore() {
  window.localStorage.removeItem(ADMIN_STORE_KEY);
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function saveCheckoutOrder(values: { name: string; phone: string; desiredDate: string; message?: string }, items: CartItem[], total: number) {
  const store = readAdminStore();
  const order: AdminOrder = {
    id: createId("order"),
    createdAt: new Date().toISOString(),
    status: "noua",
    customerName: values.name,
    phone: values.phone,
    desiredDate: values.desiredDate,
    message: values.message ?? "",
    items: items.map((item) => ({
      slug: item.slug,
      name: item.name,
      quantityLabel: formatQuantity(item.quantity, item.salesMode),
      lineTotal: getCartItemTotal(item),
    })),
    total,
    source: "formular",
  };

  writeAdminStore({ ...store, orders: [order, ...store.orders] });
}
