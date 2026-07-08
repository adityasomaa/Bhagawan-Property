import Reveal from "@/components/motion/Reveal";
import PropertyCatalogue from "@/components/PropertyCatalogue";
import { TransitionLink } from "@/components/motion/PageTransition";
import { T } from "@/lib/i18n/provider";
import { byTenure, type Tenure } from "@/data/properties";

const copy: Record<
  Tenure,
  { title: string; intro: string; points: { title: string; description: string }[]; article: string }
> = {
  freehold: {
    title: "Freehold Properties",
    intro:
      "Perpetual ownership — the strongest form of title in Indonesia. Our freehold collection focuses on land and estates with clean certificates, genuine scarcity, and long-term capital growth.",
    points: [
      {
        title: "Perpetual title",
        description: "Hak Milik / HGB structures with no lease clock — the asset your children inherit.",
      },
      {
        title: "Properly structured",
        description: "We only transact freehold through fully compliant structures. No nominees, ever.",
      },
      {
        title: "Growth focused",
        description: "Freehold is Bali's scarcity play — we curate for corridors where land value compounds.",
      },
    ],
    article: "/knowledge-base/freehold-vs-leasehold-bali",
  },
  leasehold: {
    title: "Leasehold Properties",
    intro:
      "Long-term registered leases — the simplest, most capital-efficient way for foreigners to own in Bali. Our leasehold collection is curated for lease length, extension terms, and genuine rental performance.",
    points: [
      {
        title: "25–35 year terms",
        description: "We prioritise long remaining terms with extension mechanics written into the contract.",
      },
      {
        title: "Yield engines",
        description: "Leasehold pricing makes the island's strongest cash-on-cash rental returns possible.",
      },
      {
        title: "Honest lease math",
        description: "We price every lease per remaining year — and show you the calculation.",
      },
    ],
    article: "/knowledge-base/freehold-vs-leasehold-bali",
  },
};

export default function TenurePage({ tenure }: { tenure: Tenure }) {
  const c = copy[tenure];
  const items = byTenure(tenure);

  return (
    <>
      <section className="container-x pb-16 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">Properties &middot; {tenure}</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            <T k={tenure === "freehold" ? "tp.freeholdTitle" : "tp.leaseholdTitle"} />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{c.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {c.points.map((p) => (
              <div key={p.title} className="h-full rounded-3xl border border-line bg-paper p-6 md:p-8">
                <h2 className="font-display text-lg text-ink">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            <T k="tp.newTo" />{" "}
            <TransitionLink href={c.article} className="link-line text-ink">
              <T k="tp.readGuide" />
            </TransitionLink>
            .
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <Reveal delay={0.1}>
          <PropertyCatalogue items={items} />
        </Reveal>
      </section>
    </>
  );
}
