import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { T } from "@/lib/i18n/provider";
import KnowledgeFilter from "@/components/KnowledgeFilter";

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
          <p className="eyebrow"><T k="s.kb.eyebrow" /></p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            <T k="pg.kbTitle" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            <T k="pg.kbDesc" />
          </p>
        </Reveal>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <Reveal delay={0.1}>
          <KnowledgeFilter />
        </Reveal>
      </section>
    </>
  );
}
