import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import ArticleCard from "@/components/ArticleCard";
import { TransitionLink } from "@/components/motion/PageTransition";
import { T, AL } from "@/lib/i18n/provider";
import { articleTr } from "@/data/tr/articles";
import ArticleBody from "@/components/ArticleBody";
import { articles, getArticle } from "@/data/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/knowledge-base/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const aTr = articleTr[article.slug];
  const titleTr = { id: aTr?.id?.title, zh: aTr?.zh?.title, ja: aTr?.ja?.title };

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      datePublished: article.date,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/knowledge-base/${article.slug}`,
    },
  ];
  if (article.faq) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-x pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <nav
              className="flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-muted"
              aria-label="Breadcrumb"
            >
              <TransitionLink href="/knowledge-base" className="link-line">
                <T k="nav.kb" />
              </TransitionLink>
              <span>/</span>
              <span className="text-ink"><T k={`kb.cat.${article.category}`} /></span>
            </nav>
            <h1 className="font-display mt-6 text-3xl leading-[1.15] font-medium tracking-tight text-ink md:text-5xl">
              <AL en={article.title} tr={titleTr} />
            </h1>
            <div className="mt-6 flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-muted">
              <span>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="h-px w-8 bg-line" />
              <span>{article.readTime}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="img-frame relative mx-auto mt-12 aspect-[21/9] max-w-5xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ArticleBody article={article} />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-paper p-8 text-center md:p-10">
            <p className="font-display text-2xl font-medium tracking-tight text-ink">
              <T k="kb.ctaTitle" />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <T k="kb.ctaBody" /> {site.signature}
            </p>
            <TransitionLink href="/contact" className="btn btn-solid mt-7">
              <T k="c.talkToUs" />
            </TransitionLink>
          </div>
        </Reveal>

        <section className="mt-24 border-t border-line pt-16">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
              <T k="kb.keepReading" />
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
