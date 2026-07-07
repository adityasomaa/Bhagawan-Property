import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import KnowledgeFilter from "@/components/KnowledgeFilter";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Knowledge Base — Bali Property Guides, Legal, Tax & Investment",
  description:
    "Educational guides to buying, owning, and investing in Bali property: freehold vs leasehold, legal structures, taxes, visas, area guides, and market updates.",
  alternates: { canonical: "/knowledge-base" },
};

export default function KnowledgeBasePage() {
  return (
    <>
      <section className="container-x pb-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">Knowledge Base</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            Learn Bali property the honest way
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Everything we explain across the table, written down: buying guides, legal structures,
            taxes, visas, area deep-dives, and our regular market updates.
          </p>
        </Reveal>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <Reveal delay={0.1}>
          <KnowledgeFilter articles={[...articles]} />
        </Reveal>
      </section>
    </>
  );
}
