"use client";

import Reveal from "@/components/motion/Reveal";
import ArticleCard from "@/components/ArticleCard";
import { useArticles } from "@/lib/overrides";

/** The newest published articles (CMS posts + built-ins), for the home preview. */
export default function ArticleGrid({ limit = 4 }: { limit?: number }) {
  const articles = useArticles().slice(0, limit);
  return (
    <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((a, i) => (
        <Reveal key={a.slug} delay={(i % 4) * 0.08}>
          <ArticleCard article={a} />
        </Reveal>
      ))}
    </div>
  );
}
