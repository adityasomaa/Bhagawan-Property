"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import { useLocale } from "@/lib/i18n/provider";
import { articleTr } from "@/data/tr/articles";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  const { t, lang } = useLocale();
  const tr = articleTr[article.slug]?.[lang];
  const title = tr?.title ?? article.title;
  const excerpt = tr?.excerpt ?? article.excerpt;
  return (
    <TransitionLink href={`/knowledge-base/${article.slug}`} className="group block">
      <div className="img-frame relative aspect-[16/10] rounded-2xl">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-sand" />
        )}
        <span className="glass-dark absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 text-[9px] font-semibold tracking-[0.22em] uppercase text-white">
          {t(`kb.cat.${article.category}`)}
        </span>
      </div>
      <div className="px-1 pt-5">
        <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted">
          {article.readTime}
        </p>
        <h3 className="font-display mt-2 text-lg leading-snug font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-muted md:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{excerpt}</p>
      </div>
    </TransitionLink>
  );
}
