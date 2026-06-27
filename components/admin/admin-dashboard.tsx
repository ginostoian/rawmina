"use client";

import {
  BarChart3,
  BookOpenText,
  ClipboardList,
  FolderTree,
  LogOut,
  Pencil,
  Plus,
  Save,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  adminOrderStatuses,
  adminPostStatuses,
  emptyAdminOrder,
  emptyAdminPost,
  emptyTaxonomy,
  type AdminBlogPost,
  type AdminOrder,
  type AdminOrderItem,
  type AdminOrderStatus,
  type AdminPostStatus,
  type AdminStore,
  type AdminTaxonomy,
} from "@/lib/admin-data";
import { createId, readAdminStore, resetAdminStore, writeAdminStore } from "@/lib/admin-local";
import { cn } from "@/lib/utils";

type AdminTab = "dashboard" | "orders" | "posts" | "categories" | "tags";
type AuthState = "checking" | "guest" | "authenticated";

const tabs: Array<{ id: AdminTab; label: string; icon: typeof BarChart3 }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "orders", label: "Comenzi", icon: ClipboardList },
  { id: "posts", label: "Bloguri", icon: BookOpenText },
  { id: "categories", label: "Categorii", icon: FolderTree },
  { id: "tags", label: "Tag-uri", icon: Tag },
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ro-RO", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", maximumFractionDigits: 0 }).format(value);
}

function itemsToText(items: AdminOrderItem[]) {
  return items.map((item) => `${item.name} | ${item.quantityLabel} | ${item.lineTotal}`).join("\n");
}

function textToItems(value: string): AdminOrderItem[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [name = "", quantityLabel = "1 buc.", lineTotal = "0"] = line.split("|").map((part) => part.trim());

      return {
        slug: slugify(name) || `manual-${index + 1}`,
        name,
        quantityLabel,
        lineTotal: Number(lineTotal) || 0,
      };
    });
}

function faqToText(faq: AdminBlogPost["faq"]) {
  return faq.map((item) => `${item.question} | ${item.answer}`).join("\n");
}

function textToFaq(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question = "", answer = ""] = line.split("|").map((part) => part.trim());
      return { question, answer };
    })
    .filter((item) => item.question && item.answer);
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.04em] text-brand-wine">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-brand-wine-deep">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#6f5f63]">{detail}</p>
    </div>
  );
}

function LoginPanel({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [email, setEmail] = useState("admin@rawmina.ro");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Emailul sau parola nu sunt corecte.");
      return;
    }

    onAuthenticated();
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-content items-center">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Admin RawMina</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-wine-deep">
            Autentificare
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6f5f63]">
            Acces pentru gestionarea comenzilor, articolelor de blog, categoriilor și tag-urilor.
          </p>

          <form className="mt-7 grid gap-4" onSubmit={submitLogin}>
            <div className="grid gap-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="admin-password">Parolă</Label>
              <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            {error ? <p className="rounded-xl bg-brand-pink-soft p-3 text-sm font-bold text-brand-strawberry">{error}</p> : null}
            <Button type="submit" disabled={loading}>
              {loading ? "Se verifică..." : "Intră în admin"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

function DashboardOverview({ store, setTab }: { store: AdminStore; setTab: (tab: AdminTab) => void }) {
  const pendingOrders = store.orders.filter((order) => order.status === "noua" || order.status === "confirmata");
  const publishedPosts = store.posts.filter((post) => post.status === "published");
  const revenue = store.orders.reduce((sum, order) => (order.status === "anulata" ? sum : sum + order.total), 0);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Comenzi active" value={String(pendingOrders.length)} detail="Nouă sau confirmată, necesită urmărire." />
        <StatCard label="Total estimat" value={formatCurrency(revenue)} detail="Valoare cumulată fără comenzile anulate." />
        <StatCard label="Articole publicate" value={String(publishedPosts.length)} detail="Conținut disponibil pentru migrare în CMS." />
        <StatCard label="Taxonomii" value={String(store.categories.length + store.tags.length)} detail="Categorii și tag-uri editabile." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">Comenzi recente</h2>
            <Button size="sm" variant="outline" onClick={() => setTab("orders")}>Vezi toate</Button>
          </div>
          <div className="mt-5 grid gap-3">
            {store.orders.slice(0, 4).map((order) => (
              <div key={order.id} className="rounded-xl bg-brand-pink-soft/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-brand-wine-deep">{order.customerName}</p>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-brand-wine">{order.status}</span>
                </div>
                <p className="mt-2 text-sm text-[#6f5f63]">{formatDate(order.createdAt)} · {formatCurrency(order.total)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">Bloguri</h2>
            <Button size="sm" variant="outline" onClick={() => setTab("posts")}>Gestionează</Button>
          </div>
          <div className="mt-5 grid gap-3">
            {store.posts.slice(0, 4).map((post) => (
              <div key={post.id} className="rounded-xl border border-border p-4">
                <p className="font-bold leading-snug text-brand-wine-deep">{post.title}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.04em] text-brand-wine">{post.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function OrdersPanel({ store, saveStore }: { store: AdminStore; saveStore: (store: AdminStore) => void }) {
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);
  const [itemsText, setItemsText] = useState("");

  function startOrder(order?: AdminOrder) {
    const nextOrder = order ?? { ...emptyAdminOrder, id: createId("order"), createdAt: new Date().toISOString() };
    setEditingOrder(nextOrder);
    setItemsText(itemsToText(nextOrder.items));
  }

  function saveOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingOrder) return;

    const items = textToItems(itemsText);
    const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const nextOrder = { ...editingOrder, items, total };
    const exists = store.orders.some((order) => order.id === nextOrder.id);
    const orders = exists
      ? store.orders.map((order) => (order.id === nextOrder.id ? nextOrder : order))
      : [nextOrder, ...store.orders];

    saveStore({ ...store, orders });
    setEditingOrder(null);
  }

  function deleteOrder(id: string) {
    if (!window.confirm("Ștergi această comandă?")) return;
    saveStore({ ...store, orders: store.orders.filter((order) => order.id !== id) });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">Comenzi primite</h2>
            <p className="mt-1 text-sm text-[#6f5f63]">Comenzile trimise din formular apar aici în browserul curent.</p>
          </div>
          <Button size="sm" onClick={() => startOrder()}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Comandă manuală
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          {store.orders.map((order) => (
            <article key={order.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-semibold text-brand-wine-deep">{order.customerName}</p>
                  <p className="mt-1 text-sm text-[#6f5f63]">{order.phone} · dorită pe {formatDate(order.desiredDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      saveStore({
                        ...store,
                        orders: store.orders.map((item) => (item.id === order.id ? { ...item, status: event.target.value as AdminOrderStatus } : item)),
                      })
                    }
                    className="h-10 rounded-full border border-border bg-surface px-3 text-sm font-bold text-brand-wine"
                    aria-label={`Status pentru comanda ${order.customerName}`}
                  >
                    {adminOrderStatuses.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                  <Button size="icon" variant="outline" onClick={() => startOrder(order)} aria-label="Editează comanda">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="soft" onClick={() => deleteOrder(order.id)} aria-label="Șterge comanda">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-[#5f5054]">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.slug}`} className="flex justify-between gap-4 rounded-lg bg-brand-pink-soft/55 px-3 py-2">
                    <span>{item.name} · {item.quantityLabel}</span>
                    <strong>{formatCurrency(item.lineTotal)}</strong>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-sm text-[#6f5f63]">{order.message || "Fără observații"}</p>
                <p className="font-display text-xl font-semibold text-brand-strawberry">{formatCurrency(order.total)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        {editingOrder ? (
          <form className="grid gap-4" onSubmit={saveOrder}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-semibold text-brand-wine-deep">Editare comandă</h3>
                <p className="mt-1 text-sm text-[#6f5f63]">Produse: un rând per produs, format nume | cantitate | total.</p>
              </div>
              <Button type="button" size="icon" variant="ghost" onClick={() => setEditingOrder(null)} aria-label="Închide formularul">
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-name">Nume client</Label>
              <Input id="order-name" value={editingOrder.customerName} onChange={(event) => setEditingOrder({ ...editingOrder, customerName: event.target.value })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-phone">Telefon</Label>
              <Input id="order-phone" value={editingOrder.phone} onChange={(event) => setEditingOrder({ ...editingOrder, phone: event.target.value })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-date">Data dorită</Label>
              <Input id="order-date" type="date" value={editingOrder.desiredDate} onChange={(event) => setEditingOrder({ ...editingOrder, desiredDate: event.target.value })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-status">Status</Label>
              <select id="order-status" value={editingOrder.status} onChange={(event) => setEditingOrder({ ...editingOrder, status: event.target.value as AdminOrderStatus })} className="h-11 rounded-full border border-border bg-surface px-4 text-sm font-bold text-brand-wine">
                {adminOrderStatuses.map((status) => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-items">Produse</Label>
              <Textarea id="order-items" value={itemsText} onChange={(event) => setItemsText(event.target.value)} rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-message">Observații</Label>
              <Textarea id="order-message" value={editingOrder.message} onChange={(event) => setEditingOrder({ ...editingOrder, message: event.target.value })} />
            </div>
            <Button type="submit">
              <Save className="h-4 w-4" aria-hidden="true" />
              Salvează comanda
            </Button>
          </form>
        ) : (
          <div className="rounded-xl bg-brand-pink-soft/60 p-5">
            <p className="font-display text-2xl font-semibold text-brand-wine-deep">Selectează o comandă</p>
            <p className="mt-2 text-sm leading-6 text-[#6f5f63]">Poți edita statusul rapid din listă sau toate câmpurile din formular.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function PostsPanel({ store, saveStore }: { store: AdminStore; saveStore: (store: AdminStore) => void }) {
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [faqText, setFaqText] = useState("");

  function startPost(post?: AdminBlogPost) {
    const nextPost = post ?? { ...emptyAdminPost, id: createId("post") };
    setEditingPost(nextPost);
    setFaqText(faqToText(nextPost.faq));
  }

  function savePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingPost) return;

    const normalizedPost = {
      ...editingPost,
      slug: editingPost.slug || slugify(editingPost.title),
      seoTitle: editingPost.seoTitle || editingPost.title,
      updatedAt: new Date().toISOString().slice(0, 10),
      faq: textToFaq(faqText),
    };
    const exists = store.posts.some((post) => post.id === normalizedPost.id);
    const posts = exists
      ? store.posts.map((post) => (post.id === normalizedPost.id ? normalizedPost : post))
      : [normalizedPost, ...store.posts];

    saveStore({ ...store, posts });
    setEditingPost(null);
  }

  function deletePost(id: string) {
    if (!window.confirm("Ștergi acest articol?")) return;
    saveStore({ ...store, posts: store.posts.filter((post) => post.id !== id) });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_520px]">
      <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">Bloguri</h2>
            <p className="mt-1 text-sm text-[#6f5f63]">CRUD pentru articole, SEO, FAQ, categorii și tag-uri.</p>
          </div>
          <Button size="sm" onClick={() => startPost()}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Articol nou
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          {store.posts.map((post) => (
            <article key={post.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="font-display text-xl font-semibold leading-tight text-brand-wine-deep">{post.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6f5f63]">{post.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-pink-soft px-3 py-1 text-xs font-bold text-brand-wine">{post.categorySlug}</span>
                    {post.tagSlugs.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-bold text-[#6f5f63]">#{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-3 py-1 text-xs font-bold", post.status === "published" ? "bg-fruit-matcha text-[#2F3A1C]" : "bg-brand-pink-soft text-brand-wine")}>
                    {post.status === "published" ? "Publicat" : "Draft"}
                  </span>
                  <Button size="icon" variant="outline" onClick={() => startPost(post)} aria-label="Editează articolul">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="soft" onClick={() => deletePost(post.id)} aria-label="Șterge articolul">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        {editingPost ? (
          <form className="grid gap-4" onSubmit={savePost}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-semibold text-brand-wine-deep">Editor articol</h3>
                <p className="mt-1 text-sm text-[#6f5f63]">FAQ: un rând per întrebare, format întrebare | răspuns.</p>
              </div>
              <Button type="button" size="icon" variant="ghost" onClick={() => setEditingPost(null)} aria-label="Închide editorul">
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="post-title">Titlu</Label>
              <Input id="post-title" value={editingPost.title} onChange={(event) => setEditingPost({ ...editingPost, title: event.target.value, slug: editingPost.slug || slugify(event.target.value) })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-slug">Slug</Label>
              <Input id="post-slug" value={editingPost.slug} onChange={(event) => setEditingPost({ ...editingPost, slug: slugify(event.target.value) })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-excerpt">Excerpt</Label>
              <Textarea id="post-excerpt" value={editingPost.excerpt} onChange={(event) => setEditingPost({ ...editingPost, excerpt: event.target.value })} required />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="post-category">Categorie</Label>
                <select id="post-category" value={editingPost.categorySlug} onChange={(event) => setEditingPost({ ...editingPost, categorySlug: event.target.value })} className="h-11 rounded-full border border-border bg-surface px-4 text-sm font-bold text-brand-wine">
                  {store.categories.map((category) => (
                    <option key={category.id} value={category.slug}>{category.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="post-status">Status</Label>
                <select id="post-status" value={editingPost.status} onChange={(event) => setEditingPost({ ...editingPost, status: event.target.value as AdminPostStatus })} className="h-11 rounded-full border border-border bg-surface px-4 text-sm font-bold text-brand-wine">
                  {adminPostStatuses.map((status) => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Tag-uri</Label>
              <div className="flex flex-wrap gap-2">
                {store.tags.map((tagItem) => {
                  const checked = editingPost.tagSlugs.includes(tagItem.slug);
                  return (
                    <button
                      type="button"
                      key={tagItem.id}
                      onClick={() =>
                        setEditingPost({
                          ...editingPost,
                          tagSlugs: checked
                            ? editingPost.tagSlugs.filter((tag) => tag !== tagItem.slug)
                            : [...editingPost.tagSlugs, tagItem.slug],
                        })
                      }
                      className={cn("rounded-full border px-3 py-2 text-xs font-bold transition", checked ? "border-brand-wine bg-brand-wine text-white" : "border-border text-[#6f5f63] hover:border-brand-pink")}
                    >
                      #{tagItem.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="post-published">Publicat</Label>
                <Input id="post-published" type="date" value={editingPost.publishedAt} onChange={(event) => setEditingPost({ ...editingPost, publishedAt: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="post-reading">Minute citire</Label>
                <Input id="post-reading" type="number" min={1} value={editingPost.readingMinutes} onChange={(event) => setEditingPost({ ...editingPost, readingMinutes: Number(event.target.value) || 1 })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-image">Imagine</Label>
              <Input id="post-image" value={editingPost.imageSrc} onChange={(event) => setEditingPost({ ...editingPost, imageSrc: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-image-alt">Alt imagine</Label>
              <Input id="post-image-alt" value={editingPost.imageAlt} onChange={(event) => setEditingPost({ ...editingPost, imageAlt: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-seo-title">SEO title</Label>
              <Input id="post-seo-title" value={editingPost.seoTitle} onChange={(event) => setEditingPost({ ...editingPost, seoTitle: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-seo-description">SEO description</Label>
              <Textarea id="post-seo-description" value={editingPost.seoDescription} onChange={(event) => setEditingPost({ ...editingPost, seoDescription: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-keywords">Keywords</Label>
              <Input id="post-keywords" value={editingPost.keywords} onChange={(event) => setEditingPost({ ...editingPost, keywords: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-content">Conținut</Label>
              <Textarea id="post-content" value={editingPost.content} onChange={(event) => setEditingPost({ ...editingPost, content: event.target.value })} rows={10} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-faq">FAQ</Label>
              <Textarea id="post-faq" value={faqText} onChange={(event) => setFaqText(event.target.value)} rows={5} />
            </div>
            <Button type="submit">
              <Save className="h-4 w-4" aria-hidden="true" />
              Salvează articolul
            </Button>
          </form>
        ) : (
          <div className="rounded-xl bg-brand-pink-soft/60 p-5">
            <p className="font-display text-2xl font-semibold text-brand-wine-deep">Editor blog</p>
            <p className="mt-2 text-sm leading-6 text-[#6f5f63]">Creează sau editează un articol pentru viitorul CMS RawMina.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function TaxonomyPanel({
  title,
  description,
  items,
  onSave,
}: {
  title: string;
  description: string;
  items: AdminTaxonomy[];
  onSave: (items: AdminTaxonomy[]) => void;
}) {
  const [editingItem, setEditingItem] = useState<AdminTaxonomy | null>(null);

  function startItem(item?: AdminTaxonomy) {
    setEditingItem(item ?? { ...emptyTaxonomy, id: createId("taxonomy") });
  }

  function saveItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingItem) return;

    const normalized = {
      ...editingItem,
      slug: editingItem.slug || slugify(editingItem.label),
    };
    const exists = items.some((item) => item.id === normalized.id);
    onSave(exists ? items.map((item) => (item.id === normalized.id ? normalized : item)) : [...items, normalized]);
    setEditingItem(null);
  }

  function deleteItem(id: string) {
    if (!window.confirm("Ștergi această taxonomie?")) return;
    onSave(items.filter((item) => item.id !== id));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-wine-deep">{title}</h2>
            <p className="mt-1 text-sm text-[#6f5f63]">{description}</p>
          </div>
          <Button size="sm" onClick={() => startItem()}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Adaugă
          </Button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-semibold text-brand-wine-deep">{item.label}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.04em] text-brand-wine">{item.slug}</p>
                  <p className="mt-3 text-sm leading-6 text-[#6f5f63]">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => startItem(item)} aria-label="Editează">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="soft" onClick={() => deleteItem(item.id)} aria-label="Șterge">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        {editingItem ? (
          <form className="grid gap-4" onSubmit={saveItem}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl font-semibold text-brand-wine-deep">Editare</h3>
              <Button type="button" size="icon" variant="ghost" onClick={() => setEditingItem(null)} aria-label="Închide formularul">
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxonomy-label">Nume</Label>
              <Input id="taxonomy-label" value={editingItem.label} onChange={(event) => setEditingItem({ ...editingItem, label: event.target.value, slug: editingItem.slug || slugify(event.target.value) })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxonomy-slug">Slug</Label>
              <Input id="taxonomy-slug" value={editingItem.slug} onChange={(event) => setEditingItem({ ...editingItem, slug: slugify(event.target.value) })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxonomy-description">Descriere</Label>
              <Textarea id="taxonomy-description" value={editingItem.description} onChange={(event) => setEditingItem({ ...editingItem, description: event.target.value })} required />
            </div>
            <Button type="submit">
              <Save className="h-4 w-4" aria-hidden="true" />
              Salvează
            </Button>
          </form>
        ) : (
          <div className="rounded-xl bg-brand-pink-soft/60 p-5">
            <p className="font-display text-2xl font-semibold text-brand-wine-deep">Selectează un item</p>
            <p className="mt-2 text-sm leading-6 text-[#6f5f63]">Taxonomiile sunt folosite de editorul de blog și vor putea fi mapate direct în DB.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

export function AdminDashboard() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [store, setStore] = useState<AdminStore | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const response = await fetch("/api/admin/session");
      if (cancelled) return;

      if (response.ok) {
        setStore(readAdminStore());
        setAuthState("authenticated");
      } else {
        setAuthState("guest");
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeLabel = useMemo(() => tabs.find((tab) => tab.id === activeTab)?.label ?? "Dashboard", [activeTab]);

  function saveStore(nextStore: AdminStore) {
    setStore(nextStore);
    writeAdminStore(nextStore);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("guest");
    setStore(null);
  }

  function resetStore() {
    if (!window.confirm("Resetezi datele admin la seed-ul inițial?")) return;
    resetAdminStore();
    setStore(readAdminStore());
  }

  if (authState === "checking") {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5">
        <p className="font-bold text-brand-wine">Se verifică sesiunea...</p>
      </main>
    );
  }

  if (authState === "guest") {
    return (
      <LoginPanel
        onAuthenticated={() => {
          setStore(readAdminStore());
          setAuthState("authenticated");
        }}
      />
    );
  }

  if (!store) return null;

  return (
    <main className="min-h-screen bg-cream">
      <div className="container-content py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">RawMina Admin</p>
            <h1 className="mt-1 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-tight text-brand-wine-deep">
              {activeLabel}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={resetStore}>Reset seed</Button>
            <Button variant="wine" onClick={logout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit rounded-xl border border-border bg-surface p-2 shadow-soft lg:sticky lg:top-6">
            <nav className="grid gap-1" aria-label="Admin navigation">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-lg px-3 text-left text-sm font-bold transition",
                      activeTab === tab.id ? "bg-brand-wine text-white" : "text-brand-wine-deep hover:bg-brand-pink-soft",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div>
            {activeTab === "dashboard" ? <DashboardOverview store={store} setTab={setActiveTab} /> : null}
            {activeTab === "orders" ? <OrdersPanel store={store} saveStore={saveStore} /> : null}
            {activeTab === "posts" ? <PostsPanel store={store} saveStore={saveStore} /> : null}
            {activeTab === "categories" ? (
              <TaxonomyPanel
                title="Categorii blog"
                description="Categorii indexabile pentru articole și viitorul CMS."
                items={store.categories}
                onSave={(categories) => saveStore({ ...store, categories })}
              />
            ) : null}
            {activeTab === "tags" ? (
              <TaxonomyPanel
                title="Tag-uri blog"
                description="Tag-uri afișate public și utile pentru structurarea SEO."
                items={store.tags}
                onSave={(tags) => saveStore({ ...store, tags })}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
