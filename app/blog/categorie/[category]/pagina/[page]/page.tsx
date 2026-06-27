import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import {
  blogCategories,
  getAbsoluteUrl,
  getArticlesByCategory,
  paginateArticles,
  type BlogCategorySlug,
} from "@/lib/blog";

type BlogCategoryPagedPageProps = {
  params: Promise<{ category: string; page: string }>;
};

function isBlogCategory(value: string): value is BlogCategorySlug {
  return value in blogCategories;
}

export async function generateMetadata({ params }: BlogCategoryPagedPageProps): Promise<Metadata> {
  const { category, page } = await params;

  if (!isBlogCategory(category)) {
    return {};
  }

  const categoryData = blogCategories[category];

  return {
    title: `${categoryData.label} - pagina ${page}`,
    description: categoryData.description,
    alternates: {
      canonical: getAbsoluteUrl(`/blog/categorie/${categoryData.slug}/pagina/${page}`),
    },
  };
}

export function generateStaticParams() {
  return Object.values(blogCategories).flatMap((category) => {
    const totalPages = paginateArticles(getArticlesByCategory(category.slug), 1).totalPages;

    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      category: category.slug,
      page: String(index + 2),
    }));
  });
}

export default async function BlogCategoryPagedPage({ params }: BlogCategoryPagedPageProps) {
  const { category, page } = await params;

  if (!isBlogCategory(category)) {
    notFound();
  }

  const pageNumber = Number(page);
  const articles = getArticlesByCategory(category);
  const totalPages = paginateArticles(articles, 1).totalPages;

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const categoryData = blogCategories[category];

  return (
    <BlogListing
      title={`Articole despre ${categoryData.label.toLowerCase()}.`}
      description={categoryData.description}
      articles={articles}
      basePath={`/blog/categorie/${category}`}
      currentPage={pageNumber}
      activeCategory={category}
    />
  );
}
