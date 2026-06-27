import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import {
  blogCategories,
  getAbsoluteUrl,
  getArticlesByCategory,
  type BlogCategorySlug,
} from "@/lib/blog";

type BlogCategoryPageProps = {
  params: Promise<{ category: string }>;
};

function isBlogCategory(value: string): value is BlogCategorySlug {
  return value in blogCategories;
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isBlogCategory(category)) {
    return {};
  }

  const categoryData = blogCategories[category];

  return {
    title: `${categoryData.label} - Blog`,
    description: categoryData.description,
    alternates: {
      canonical: getAbsoluteUrl(`/blog/categorie/${categoryData.slug}`),
    },
  };
}

export function generateStaticParams() {
  return Object.values(blogCategories).map((category) => ({
    category: category.slug,
  }));
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category } = await params;

  if (!isBlogCategory(category)) {
    notFound();
  }

  const categoryData = blogCategories[category];

  return (
    <BlogListing
      title={`Articole despre ${categoryData.label.toLowerCase()}.`}
      description={categoryData.description}
      articles={getArticlesByCategory(category)}
      basePath={`/blog/categorie/${category}`}
      activeCategory={category}
    />
  );
}
