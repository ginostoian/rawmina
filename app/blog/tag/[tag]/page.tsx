import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";
import { blogTags, getAbsoluteUrl, getArticlesByTag, type BlogTagSlug } from "@/lib/blog";

type BlogTagPageProps = {
  params: Promise<{ tag: string }>;
};

function isBlogTag(value: string): value is BlogTagSlug {
  return value in blogTags;
}

export async function generateMetadata({ params }: BlogTagPageProps): Promise<Metadata> {
  const { tag } = await params;

  if (!isBlogTag(tag)) {
    return {};
  }

  const tagData = blogTags[tag];

  return {
    title: `${tagData.label} - Blog`,
    description: tagData.description,
    alternates: {
      canonical: getAbsoluteUrl(`/blog/tag/${tagData.slug}`),
    },
  };
}

export function generateStaticParams() {
  return Object.values(blogTags).map((tag) => ({
    tag: tag.slug,
  }));
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;

  if (!isBlogTag(tag)) {
    notFound();
  }

  const tagData = blogTags[tag];

  return (
    <BlogListing
      title={`Articole cu tag-ul ${tagData.label}.`}
      description={tagData.description}
      articles={getArticlesByTag(tag)}
      basePath={`/blog/tag/${tag}`}
      activeTag={tag}
    />
  );
}
