"use client";

import { useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { useT } from "@/lib/i18n/provider";
import { useBlogs } from "@/lib/overrides";
import { categories, type Article } from "@/data/articles";

export default function KnowledgeFilter({ articles }: { articles: Article[] }) {
  const t = useT();
  const blogs = useBlogs();
  const [active, setActive] = useState<string>("All");

  // Admin-authored posts merge with the static articles, newest first.
  const all = useMemo(
    () => [...blogs, ...articles].sort((a, b) => b.date.localeCompare(a.date)),
    [blogs, articles]
  );

  const filtered = useMemo(
    () => (active === "All" ? all : all.filter((a) => a.category === active)),
    [all, active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-y border-line py-5">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
              active === c
                ? "bg-ink text-cream"
                : "border border-line bg-transparent text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {c === "All" ? t("kb.all") : t(`kb.cat.${c}`)}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-line bg-paper p-14 text-center">
          <p className="font-display text-2xl text-ink">{t("kb.emptyT")}</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{t("kb.emptyB")}</p>
        </div>
      )}
    </div>
  );
}
