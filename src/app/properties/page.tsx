import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PropertyCatalogue from "@/components/PropertyCatalogue";
import { TransitionLink } from "@/components/motion/PageTransition";
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
          <p className="eyebrow">The Collection</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            Every property we currently believe in
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            A deliberately short list. Each property here has been inspected, verified, and priced
            against real market evidence — because we would rather show you twelve right answers
            than four hundred maybes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <TransitionLink href="/properties/freehold" className="btn">
              Freehold Only
            </TransitionLink>
            <TransitionLink href="/properties/leasehold" className="btn">
              Leasehold Only
            </TransitionLink>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <Reveal delay={0.1}>
          <PropertyCatalogue items={[...properties]} />
        </Reveal>
      </section>
    </>
  );
}
