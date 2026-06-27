import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  blogCategories,
  blogTags,
  getPublishedArticles,
  paginateArticles,
  type BlogArticle,
  type BlogCategorySlug,
  type BlogTagSlug,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

interface BlogListingProps {
  title: string;
  description: string;
  articles: BlogArticle[];
  basePath: string;
  currentPage?: number;
  activeCategory?: BlogCategorySlug;
  activeTag?: BlogTagSlug;
}

function pageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}/pagina/${page}`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

function BlogCard({ article, priority }: { article: BlogArticle; priority?: boolean }) {
  const category = blogCategories[article.category];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition duration-200 ease-out hover:-translate-y-1 hover:border-brand-pink motion-reduce:hover:translate-y-0">
      <Link href={`/blog/${article.slug}`} className="block focus-visible:rounded-xl" aria-label={`Citește articolul ${article.title}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-pink-soft">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            priority={priority}
            loading={priority ? "eager" : undefined}
            className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <Link href={`/blog/categorie/${category.slug}`} className="rounded-full bg-brand-pink-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-brand-wine hover:bg-brand-pink">
            {category.label}
          </Link>
          {article.tags.slice(0, 2).map((tagSlug) => (
            <Link key={tagSlug} href={`/blog/tag/${tagSlug}`} className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-[#6f5f63] hover:border-brand-pink hover:text-brand-wine">
              {blogTags[tagSlug].label}
            </Link>
          ))}
        </div>

        <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-brand-wine-deep">
          <Link href={`/blog/${article.slug}`} className="hover:text-brand-wine">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6f5f63]">{article.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-xs font-semibold text-[#7a6a6e]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-brand-wine" aria-hidden="true" />
            {formatDate(article.updatedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-brand-wine" aria-hidden="true" />
            {article.readingMinutes} min citire
          </span>
        </div>
      </div>
    </article>
  );
}

export function BlogListing({
  title,
  description,
  articles,
  basePath,
  currentPage = 1,
  activeCategory,
  activeTag,
}: BlogListingProps) {
  const paginated = paginateArticles(articles, currentPage);
  const allArticlesCount = getPublishedArticles().length;

  return (
    <main className="py-16 md:py-24">
      <div className="container-content">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_0.42fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Blog RawMina</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.2rem)] font-semibold leading-[1.05] text-brand-wine-deep text-balance">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#6f5f63]">{description}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
            <p className="font-display text-2xl font-semibold text-brand-wine-deep">{allArticlesCount} articole</p>
            <p className="mt-2 text-sm leading-6 text-[#6f5f63]">
              Ghiduri scurte despre deserturi raw vegane, ingrediente, alergii și alegeri fără zahăr rafinat.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-6" aria-label="Filtre blog">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Categorii</p>
            <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
              <Link
                href="/blog"
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
                  !activeCategory && !activeTag ? "border-brand-wine bg-brand-wine text-white" : "border-border bg-surface text-brand-wine hover:border-brand-pink hover:bg-brand-pink-soft",
                )}
              >
                Toate
              </Link>
              {Object.values(blogCategories).map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/categorie/${category.slug}`}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
                    activeCategory === category.slug ? "border-brand-wine bg-brand-wine text-white" : "border-border bg-surface text-brand-wine hover:border-brand-pink hover:bg-brand-pink-soft",
                  )}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-brand-wine">Tag-uri</p>
            <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
              {Object.values(blogTags).map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
                    activeTag === tag.slug ? "border-brand-strawberry bg-brand-strawberry text-white" : "border-border bg-surface text-[#6f5f63] hover:border-brand-pink hover:bg-brand-pink-soft hover:text-brand-wine",
                  )}
                >
                  #{tag.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {paginated.articles.length > 0 ? (
          <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Articole blog">
            {paginated.articles.map((article, index) => (
              <BlogCard key={article.slug} article={article} priority={index === 0 && paginated.currentPage === 1} />
            ))}
          </section>
        ) : (
          <section className="mt-10 rounded-2xl border border-border bg-surface p-10 text-center">
            <p className="font-display text-2xl font-semibold text-brand-wine-deep">Momentan nu avem articole aici.</p>
            <p className="mt-2 text-[#6f5f63]">Revino curând sau alege alt filtru.</p>
          </section>
        )}

        {paginated.totalPages > 1 ? (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginare blog">
            <Link
              href={pageHref(basePath, Math.max(1, paginated.currentPage - 1))}
              aria-disabled={paginated.currentPage === 1}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-brand-wine transition hover:border-brand-pink hover:bg-brand-pink-soft",
                paginated.currentPage === 1 && "pointer-events-none opacity-45",
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Pagina anterioară</span>
            </Link>

            {Array.from({ length: paginated.totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={pageHref(basePath, page)}
                aria-current={page === paginated.currentPage ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition",
                  page === paginated.currentPage ? "border-brand-wine bg-brand-wine text-white" : "border-border bg-surface text-brand-wine hover:border-brand-pink hover:bg-brand-pink-soft",
                )}
              >
                {page}
              </Link>
            ))}

            <Link
              href={pageHref(basePath, Math.min(paginated.totalPages, paginated.currentPage + 1))}
              aria-disabled={paginated.currentPage === paginated.totalPages}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-brand-wine transition hover:border-brand-pink hover:bg-brand-pink-soft",
                paginated.currentPage === paginated.totalPages && "pointer-events-none opacity-45",
              )}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Pagina următoare</span>
            </Link>
          </nav>
        ) : null}
      </div>
    </main>
  );
}
