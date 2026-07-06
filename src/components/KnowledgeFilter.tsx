"use client";

import { useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { categories, type Article } from "@/data/articles";

export default function KnowledgeFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? articles : articles.filter((a) => a.category === active)),
    [articles, active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-y border-line py-5">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`px-4 py-2 text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
              active === c
                ? "bg-ink text-cream"
                : "border border-line bg-transparent text-muted hover:border-bronze hover:text-bronze-deep"
            }`}
          >
            {c}
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
        <div className="mt-10 border border-line bg-paper p-14 text-center">
          <p className="font-display text-2xl text-ink">More {active.toLowerCase()} guides are on the way.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            We publish new guides regularly. In the meantime, ask us directly — advice is free.
          </p>
        </div>
      )}
    </div>
  );
}
