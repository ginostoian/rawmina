import type { Product } from "@/lib/products";

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  salesMode: Product["salesMode"];
  quantity: number;
  pricePerKg: number;
  unitWeightGrams?: number;
}

export function getUnitPrice(product: Pick<Product, "price" | "salesMode" | "unitWeightGrams">) {
  return product.salesMode === "weight" ? product.price : product.price * ((product.unitWeightGrams ?? 150) / 1000);
}

export function getCartItemUnitPrice(item: CartItem) {
  return item.salesMode === "weight" ? item.pricePerKg : item.pricePerKg * ((item.unitWeightGrams ?? 150) / 1000);
}

export function getCartItemTotal(item: CartItem) {
  return item.quantity * getCartItemUnitPrice(item);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatProductPrice(product: Pick<Product, "price" | "salesMode" | "unitWeightGrams">) {
  if (product.salesMode === "weight") {
    return `${formatCurrency(product.price)} / kg`;
  }

  return `${formatCurrency(getUnitPrice(product))} / bucată`;
}

export function formatQuantity(quantity: number, salesMode: Product["salesMode"]) {
  return salesMode === "weight" ? `${quantity.toLocaleString("ro-RO")} kg` : `${quantity} buc.`;
}
