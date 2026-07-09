import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PropertyCatalogue from "@/components/PropertyCatalogue";
import PropertyMap from "@/components/PropertyMap";
import SectionHeading from "@/components/SectionHeading";
import { TransitionLink } from "@/components/motion/PageTransition";
import { T } from "@/lib/i18n/provider";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties for Sale in Bali — Freehold & Leasehold",
  description:
    "Browse our full curated collection of villas, land, and investment properties across Bali. Filter by area, price, bedrooms, and land size.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return (
    <>
      <section className="container-x pb-16 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow"><T k="pg.propEyebrow" /></p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            <T k="pg.propTitle" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            <T k="pg.propDesc" />
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <TransitionLink href="/properties/freehold" className="btn">
              <T k="pg.freeholdOnly" />
            </TransitionLink>
            <TransitionLink href="/properties/leasehold" className="btn">
              <T k="pg.leaseholdOnly" />
            </TransitionLink>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <Reveal delay={0.1}>
          <PropertyCatalogue items={[...properties]} />
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <SectionHeading eyebrow={<T k="map.eyebrow" />} title={<T k="map.title" />} description={<T k="map.desc" />} />
        <Reveal delay={0.1}>
          <PropertyMap className="mt-10" />
        </Reveal>
      </section>
    </>
  );
}
