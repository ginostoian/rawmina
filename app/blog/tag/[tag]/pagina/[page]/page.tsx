import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import { blogTags, getAbsoluteUrl, getArticlesByTag, paginateArticles, type BlogTagSlug } from "@/lib/blog";

type BlogTagPagedPageProps = {
  params: Promise<{ tag: string; page: string }>;
};

function isBlogTag(value: string): value is BlogTagSlug {
  return value in blogTags;
}

export async function generateMetadata({ params }: BlogTagPagedPageProps): Promise<Metadata> {
  const { tag, page } = await params;

  if (!isBlogTag(tag)) {
    return {};
  }

  const tagData = blogTags[tag];

  return {
    title: `${tagData.label} - pagina ${page}`,
    description: tagData.description,
    alternates: {
      canonical: getAbsoluteUrl(`/blog/tag/${tagData.slug}/pagina/${page}`),
    },
  };
}

export function generateStaticParams() {
  return Object.values(blogTags).flatMap((tag) => {
    const totalPages = paginateArticles(getArticlesByTag(tag.slug), 1).totalPages;

    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      tag: tag.slug,
      page: String(index + 2),
    }));
  });
}

export default async function BlogTagPagedPage({ params }: BlogTagPagedPageProps) {
  const { tag, page } = await params;

  if (!isBlogTag(tag)) {
    notFound();
  }

  const pageNumber = Number(page);
  const articles = getArticlesByTag(tag);
  const totalPages = paginateArticles(articles, 1).totalPages;

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const tagData = blogTags[tag];

  return (
    <BlogListing
      title={`Articole cu tag-ul ${tagData.label}.`}
      description={tagData.description}
      articles={articles}
      basePath={`/blog/tag/${tag}`}
      currentPage={pageNumber}
      activeTag={tag}
    />
  );
}
