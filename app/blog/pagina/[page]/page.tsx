import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import { getAbsoluteUrl, getPublishedArticles, paginateArticles } from "@/lib/blog";

type BlogPagedPageProps = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({ params }: BlogPagedPageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);

  return {
    title: `Blog - pagina ${pageNumber}`,
    description: "Articole RawMina despre deserturi raw vegane, alergii, ingrediente naturale și prăjituri fără zahăr rafinat.",
    alternates: {
      canonical: getAbsoluteUrl(`/blog/pagina/${pageNumber}`),
    },
  };
}

export function generateStaticParams() {
  const totalPages = paginateArticles(getPublishedArticles(), 1).totalPages;

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default async function BlogPagedPage({ params }: BlogPagedPageProps) {
  const { page } = await params;
  const pageNumber = Number(page);
  const articles = getPublishedArticles();
  const totalPages = paginateArticles(articles, 1).totalPages;

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <BlogListing
      title="Articole despre deserturi raw vegane și alegeri fără zahăr rafinat."
      description="Educație simplă pentru oameni care vor să înțeleagă ingredientele, alergenii și opțiunile potrivite înainte să aleagă un tort sau o prăjitură RawMina."
      articles={articles}
      basePath="/blog"
      currentPage={pageNumber}
    />
  );
}
