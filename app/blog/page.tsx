import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { getAbsoluteUrl, getPublishedArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articole RawMina despre deserturi raw vegane, torturi fără zahăr rafinat, ingrediente naturale, alergii și torturi baby friendly.",
  alternates: {
    canonical: getAbsoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  return (
    <BlogListing
      title="Articole despre deserturi raw vegane și alegeri fără zahăr rafinat."
      description="Educație simplă pentru oameni care vor să înțeleagă ingredientele, alergenii și opțiunile potrivite înainte să aleagă un tort sau o prăjitură RawMina."
      articles={getPublishedArticles()}
      basePath="/blog"
    />
  );
}
