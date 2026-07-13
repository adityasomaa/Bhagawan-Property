"use client";

import Reveal from "@/components/motion/Reveal";
import ArticleCard from "@/components/ArticleCard";
import { TransitionLink } from "@/components/motion/PageTransition";
import { useT } from "@/lib/i18n/provider";
import { useOverrides } from "@/lib/overrides";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";

/**
 * Detail view for an admin-authored blog post. Mirrors the static article
 * template exactly (breadcrumb → title → meta → hero image → sections → FAQ →
 * CTA → keep reading) so posts written in /admin look identical to built-in
 * knowledge-base articles.
 */
export default function CustomArticle({ slug }: { slug: string }) {
  const t = useT();
  const { blogs, ready } = useOverrides();
  const post = blogs.find((b) => b.slug === slug);

  if (!ready) {
    return <div className="container-x min-h-screen pb-24 pt-40" aria-busy="true" />;
  }

  if (!post) {
    return (
      <section className="container-x pb-24 pt-40 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-xl rounded-3xl border border-line bg-paper p-12 text-center">
          <p className="font-display text-3xl text-ink">404</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            This article doesn&apos;t exist (or was written in another browser and hasn&apos;t been
            published yet).
          </p>
          <TransitionLink href="/knowledge-base" className="btn btn-solid mt-8">
            {t("nav.kb")}
          </TransitionLink>
        </div>
      </section>
    );
  }

  const related = articles.slice(0, 3);

  return (
    <article className="container-x pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <nav
            className="flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-muted"
            aria-label="Breadcrumb"
          >
            <TransitionLink href="/knowledge-base" className="link-line">
              {t("nav.kb")}
            </TransitionLink>
            <span>/</span>
            <span className="text-ink">{t(`kb.cat.${post.category}`)}</span>
          </nav>
          <h1 className="font-display mt-6 text-3xl leading-[1.15] font-medium tracking-tight text-ink md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-muted">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="h-px w-8 bg-line" />
            <span>{post.readTime}</span>
          </div>
        </Reveal>
      </div>

      {post.image && (
        <Reveal delay={0.1}>
          <div className="img-frame relative mx-auto mt-12 aspect-[21/9] max-w-5xl">
            {/* Arbitrary admin-supplied URL — plain img, not next/image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <div className="prose-editorial mx-auto mt-14 max-w-3xl">
          {post.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Reveal>

      {post.faq && post.faq.length > 0 && (
        <Reveal>
          <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-paper p-8 md:p-10">
            <h2 className="font-display text-2xl text-ink">{t("kb.faq")}</h2>
            <dl className="mt-6 space-y-6">
              {post.faq.map((f, i) => (
                <div key={i} className="border-t border-line pt-5">
                  <dt className="font-medium text-ink">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      )}

      <Reveal>
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-paper p-8 text-center md:p-10">
          <p className="font-display text-2xl font-medium tracking-tight text-ink">
            {t("kb.ctaTitle")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t("kb.ctaBody")} {site.signature}
          </p>
          <TransitionLink href="/contact" className="btn btn-solid mt-7">
            {t("c.talkToUs")}
          </TransitionLink>
        </div>
      </Reveal>

      <section className="mt-24 border-t border-line pt-16">
        <Reveal>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {t("kb.keepReading")}
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
  );
}
