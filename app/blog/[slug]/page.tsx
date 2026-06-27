import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, UserRound } from "lucide-react";
import {
  blogArticles,
  blogCategories,
  blogTags,
  getAbsoluteUrl,
  getBlogArticle,
  type BlogBlock,
} from "@/lib/blog";
import { siteConfig } from "@/lib/config";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

function renderBlock(block: BlogBlock, index: number) {
  if (block.type === "heading") {
    return (
      <h2 key={`${block.type}-${index}`} className="mt-10 font-display text-3xl font-semibold leading-tight text-brand-wine-deep">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={`${block.type}-${index}`} className="mt-5 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="relative pl-7 leading-8 text-[#5f5054]">
            <span className="absolute left-0 top-3 h-2.5 w-2.5 rounded-full bg-brand-strawberry" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={`${block.type}-${index}`} className="mt-5 leading-8 text-[#5f5054]">
      {block.text}
    </p>
  );
}

function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {};
  }

  const canonical = getAbsoluteUrl(`/blog/${article.slug}`);
  const image = getAbsoluteUrl(article.image.src);

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    authors: [{ name: article.author }],
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      type: "article",
      locale: "ro_RO",
      url: canonical,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags.map((tag) => blogTags[tag].label),
      images: [
        {
          url: image,
          alt: article.image.alt,
          width: 1680,
          height: 960,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: [image],
    },
  };
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const category = blogCategories[article.category];
  const canonical = getAbsoluteUrl(`/blog/${article.slug}`);
  const image = getAbsoluteUrl(article.image.src);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seo.description,
    image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/brand/rawmina-logo.jpeg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    articleSection: category.label,
    keywords: article.seo.keywords.join(", "),
    inLanguage: "ro-RO",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: getAbsoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  };
  const faqSchema =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <main>
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />

      <article className="py-16 md:py-24">
        <div className="container-content">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-brand-wine" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-strawberry">Acasă</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-brand-strawberry">Blog</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/blog/categorie/${category.slug}`} className="hover:text-brand-strawberry">{category.label}</Link>
          </nav>

          <header className="grid gap-10 lg:grid-cols-[0.88fr_0.62fr] lg:items-end">
            <div>
              <Link href={`/blog/categorie/${category.slug}`} className="inline-flex rounded-full bg-brand-pink-soft px-4 py-2 text-xs font-bold uppercase tracking-[0.04em] text-brand-wine hover:bg-brand-pink">
                {category.label}
              </Link>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.04] text-brand-wine-deep text-balance">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6f5f63]">{article.excerpt}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[#6f5f63]">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-brand-wine" aria-hidden="true" />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-brand-wine" aria-hidden="true" />
                  Actualizat pe {formatDate(article.updatedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-wine" aria-hidden="true" />
                  {article.readingMinutes} min citire
                </span>
              </div>
            </div>

            <div className="organic-mask-alt relative aspect-[16/12] overflow-hidden bg-brand-pink-soft shadow-soft">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </header>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,760px)_1fr] lg:items-start">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-9">
              {article.content.map(renderBlock)}

              <div className="mt-10 border-t border-border pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Tag-uri</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tagSlug) => (
                    <Link key={tagSlug} href={`/blog/tag/${tagSlug}`} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-[#6f5f63] hover:border-brand-pink hover:bg-brand-pink-soft hover:text-brand-wine">
                      #{blogTags[tagSlug].label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="rounded-2xl bg-brand-wine-deep p-6 text-cream shadow-soft lg:sticky lg:top-28">
              <p className="font-display text-2xl font-semibold">Ai întrebări despre ingrediente?</p>
              <p className="mt-3 text-sm leading-6 text-cream/80">
                Pentru alergii, restricții sau o comandă pentru copii, cel mai sigur este să confirmăm rețeta înainte.
              </p>
              <Link href="/contact" className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-brand-pink-soft px-5 text-sm font-bold text-brand-wine transition hover:bg-brand-pink">
                Scrie-ne
              </Link>
            </aside>
          </div>

          {article.faq.length > 0 ? (
            <section className="mt-12 max-w-3xl" aria-labelledby="faq-title">
              <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">FAQ</p>
              <h2 id="faq-title" className="mt-3 font-display text-3xl font-semibold text-brand-wine-deep">
                Întrebări frecvente
              </h2>
              <div className="mt-6 space-y-3">
                {article.faq.map((item) => (
                  <details key={item.question} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                    <summary className="cursor-pointer font-bold text-brand-wine-deep">{item.question}</summary>
                    <p className="mt-3 leading-7 text-[#6f5f63]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
