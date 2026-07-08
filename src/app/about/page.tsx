import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { TransitionLink } from "@/components/motion/PageTransition";
import { img } from "@/data/areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — A Buyer-First Property Advisory in Bali",
  description:
    "Bhagawan Property is a trusted property advisor in Bali, built on honesty, transparency, and local expertise. We don't just sell property — we help people buy the right one.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "We put buyers first",
    description:
      "Most agencies answer to sellers. We built our entire model around the buyer's side of the table — your goals, your risks, your outcome.",
  },
  {
    title: "We tell the truth",
    description:
      "About prices, about lease terms, about which lane floods in January. If a property has a problem, you'll hear it from us first.",
  },
  {
    title: "We curate, ruthlessly",
    description:
      "Hundreds of properties cross our desk; a handful make our list. Every listing is inspected, verified, and priced against real evidence.",
  },
  {
    title: "We know Bali inside out",
    description:
      "This island is our home. The zoning maps, the notaries, the village chiefs, the future road plans — local knowledge is our craft.",
  },
  {
    title: "We build confidence",
    description:
      "The goal of every meeting is not a signature — it's that you understand your decision completely before you make it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section data-tone="dark" className="relative flex min-h-[72svh] items-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={img("1518548419970-58e3b4079ab2", 2400)}
            alt="Balinese temple gates — the spirit behind Bhagawan Property"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/55" />
        </div>
        <div className="container-x relative pb-16 pt-48 md:pb-24">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.4em] uppercase text-cream/75">
              About Bhagawan Property
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-cream md:text-6xl">
              A trusted advisor, by design
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Our Story"
          title="Built from the buyer's side of the table"
        />
        <Reveal delay={0.1}>
          <div className="space-y-6 text-base leading-relaxed text-ink-soft md:text-lg">
            <p>
              <strong className="font-display font-medium text-ink">Bhagawan</strong> — from the Sanskrit for
              &ldquo;the fortunate one, the revered&rdquo; — is a name that carries a
              responsibility. In Bali, where the spiritual and the practical share every address,
              we believe a property advisor should be worthy of the trust placed in them.
            </p>
            <p>
              We founded Bhagawan Property after years of watching the same story repeat: buyers
              arriving with dreams, meeting an industry built to close deals rather than serve
              decisions. Overpriced leases, unverified titles, glossy renders hiding zoning
              problems — not from malice, mostly, but from a market where nobody was paid to say
              &ldquo;don&apos;t buy this one.&rdquo;
            </p>
            <p>
              So that became our job. We represent the buyer. We verify before we list. We price
              leases per remaining year and show the arithmetic. We introduce clients to the same
              notaries and lawyers we use ourselves. And when the right answer is &ldquo;wait&rdquo;
              or &ldquo;walk away,&rdquo; that is exactly what we say.
            </p>
            <p className="font-display text-xl font-medium text-ink">
              {site.tagline}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section data-tone="dark" className="bg-ink py-24 text-cream md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="What We Stand For" title="Five promises, kept daily" light />
          <div className="mt-14">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.04}>
                <div className="grid gap-4 border-t border-cream/15 py-8 md:grid-cols-[100px_1fr_2fr] md:gap-10">
                  <span className="font-display text-3xl text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-cream">{v.title}</h3>
                  <p className="text-base leading-relaxed text-cream/65">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature CTA */}
      <section className="container-x py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow">Our Signature</p>
          <p className="font-display mt-6 text-5xl font-medium tracking-tight text-ink md:text-7xl">#Here4U</p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            Before the purchase, during the process, and long after the keys — one message away,
            whenever Bali calls.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <TransitionLink href="/properties" className="btn btn-solid">
              Browse Properties
            </TransitionLink>
            <TransitionLink href="/contact" className="btn">
              Meet Us
            </TransitionLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
