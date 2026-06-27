import { blogArticles, blogCategories, blogTags } from "@/lib/blog";

export type AdminOrderStatus = "noua" | "confirmata" | "in-lucru" | "finalizata" | "anulata";
export type AdminPostStatus = "draft" | "published";

export interface AdminOrderItem {
  slug: string;
  name: string;
  quantityLabel: string;
  lineTotal: number;
}

export interface AdminOrder {
  id: string;
  createdAt: string;
  status: AdminOrderStatus;
  customerName: string;
  phone: string;
  desiredDate: string;
  message: string;
  items: AdminOrderItem[];
  total: number;
  source: "formular" | "manual";
}

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  tagSlugs: string[];
  status: AdminPostStatus;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  imageSrc: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  content: string;
  faq: Array<{ question: string; answer: string }>;
}

export interface AdminTaxonomy {
  id: string;
  slug: string;
  label: string;
  description: string;
}

export interface AdminStore {
  orders: AdminOrder[];
  posts: AdminBlogPost[];
  categories: AdminTaxonomy[];
  tags: AdminTaxonomy[];
}

export const adminOrderStatuses: Array<{ value: AdminOrderStatus; label: string }> = [
  { value: "noua", label: "Nouă" },
  { value: "confirmata", label: "Confirmată" },
  { value: "in-lucru", label: "În lucru" },
  { value: "finalizata", label: "Finalizată" },
  { value: "anulata", label: "Anulată" },
];

export const adminPostStatuses: Array<{ value: AdminPostStatus; label: string }> = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Publicat" },
];

export const emptyAdminPost: AdminBlogPost = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  categorySlug: "raw-vegan",
  tagSlugs: [],
  status: "draft",
  author: "Echipa RawMina",
  publishedAt: new Date().toISOString().slice(0, 10),
  updatedAt: new Date().toISOString().slice(0, 10),
  readingMinutes: 4,
  imageSrc: "/blog/ce-inseamna-raw-vegan.png",
  imageAlt: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  content: "",
  faq: [{ question: "", answer: "" }],
};

export const emptyAdminOrder: AdminOrder = {
  id: "",
  createdAt: new Date().toISOString(),
  status: "noua",
  customerName: "",
  phone: "",
  desiredDate: new Date().toISOString().slice(0, 10),
  message: "",
  items: [],
  total: 0,
  source: "manual",
};

export const emptyTaxonomy: AdminTaxonomy = {
  id: "",
  slug: "",
  label: "",
  description: "",
};

function articleContentToText(article: (typeof blogArticles)[number]) {
  return article.content
    .map((block) => {
      if (block.type === "heading") return `## ${block.text}`;
      if (block.type === "list") return block.items.map((item) => `- ${item}`).join("\n");
      return block.text;
    })
    .join("\n\n");
}

export const initialAdminStore: AdminStore = {
  orders: [
    {
      id: "order-demo-1",
      createdAt: "2026-06-25T09:30:00.000Z",
      status: "noua",
      customerName: "Client exemplu",
      phone: "+40740000000",
      desiredDate: "2026-06-28",
      message: "Aniversare copil, vă rog să confirmați ingredientele fără lactate.",
      items: [
        {
          slug: "fructe-padure-banana",
          name: "Fructe de pădure & banană",
          quantityLabel: "1.5 kg",
          lineTotal: 255,
        },
      ],
      total: 255,
      source: "formular",
    },
  ],
  posts: blogArticles.map((article) => ({
    id: `post-${article.slug}`,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    categorySlug: article.category,
    tagSlugs: article.tags,
    status: "published",
    author: article.author,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readingMinutes: article.readingMinutes,
    imageSrc: article.image.src,
    imageAlt: article.image.alt,
    seoTitle: article.seo.title,
    seoDescription: article.seo.description,
    keywords: article.seo.keywords.join(", "),
    content: articleContentToText(article),
    faq: article.faq,
  })),
  categories: Object.values(blogCategories).map((category) => ({
    id: `category-${category.slug}`,
    slug: category.slug,
    label: category.label,
    description: category.description,
  })),
  tags: Object.values(blogTags).map((tag) => ({
    id: `tag-${tag.slug}`,
    slug: tag.slug,
    label: tag.label,
    description: tag.description,
  })),
};
