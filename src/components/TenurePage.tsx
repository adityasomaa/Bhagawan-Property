import Reveal from "@/components/motion/Reveal";
import PropertyCatalogue from "@/components/PropertyCatalogue";
import { TransitionLink } from "@/components/motion/PageTransition";
import { T } from "@/lib/i18n/provider";
import { getAllProperties } from "@/lib/cms";
import { type Tenure } from "@/data/properties";

const POINTS: Record<Tenure, [string, string][]> = {
  freehold: [
    ["tp.fp1t", "tp.fp1d"],
    ["tp.fp2t", "tp.fp2d"],
    ["tp.fp3t", "tp.fp3d"],
  ],
  leasehold: [
    ["tp.lp1t", "tp.lp1d"],
    ["tp.lp2t", "tp.lp2d"],
    ["tp.lp3t", "tp.lp3d"],
  ],
};

const ARTICLE = "/knowledge-base/freehold-vs-leasehold-bali";

export default async function TenurePage({ tenure }: { tenure: Tenure }) {
  const items = (await getAllProperties()).filter((p) => p.tenures.includes(tenure));
  const isFreehold = tenure === "freehold";

  return (
    <>
      <section className="container-x pb-16 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">
            <T k="nav.properties" /> &middot; <T k={isFreehold ? "card.freehold" : "card.leasehold"} />
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            <T k={isFreehold ? "tp.freeholdTitle" : "tp.leaseholdTitle"} />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            <T k={isFreehold ? "tp.freeholdIntro" : "tp.leaseholdIntro"} />
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {POINTS[tenure].map(([tk, dk]) => (
              <div key={tk} className="h-full rounded-3xl border border-line bg-paper p-6 md:p-8">
                <h2 className="font-display text-lg text-ink"><T k={tk} /></h2>
                <p className="mt-2 text-sm leading-relaxed text-muted"><T k={dk} /></p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            <T k="tp.newTo" />{" "}
            <TransitionLink href={ARTICLE} className="link-line text-ink">
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
