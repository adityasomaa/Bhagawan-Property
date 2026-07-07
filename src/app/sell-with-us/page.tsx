import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SellForm from "@/components/SellForm";
import { img } from "@/data/areas";

export const metadata: Metadata = {
  title: "Sell Your Property in Bali — List With Bhagawan Property",
  description:
    "Sell your Bali property with confidence. Professional marketing, qualified local & international buyers, high-quality photography, and a transparent process from valuation to completion.",
  alternates: { canonical: "/sell-with-us" },
};

const advantages = [
  {
    title: "Professional Marketing",
    description:
      "Editorial-grade presentation across our website, portals, and international buyer networks — your property, shown at its absolute best.",
  },
  {
    title: "Qualified Buyers",
    description:
      "A live database of vetted local and international buyers, matched to your property before it even goes public.",
  },
  {
    title: "High-Quality Photography",
    description:
      "Professional architectural photography and video included with every listing agreement. First impressions decide sales.",
  },
  {
    title: "Honest Communication",
    description:
      "A realistic valuation backed by comparable evidence — and honest feedback from every viewing, even when it's not what you hoped to hear.",
  },
  {
    title: "Transparent Process",
    description:
      "Clear agreements, agreed commissions, no double-dealing. You'll always know exactly where your sale stands.",
  },
  {
    title: "Extensive Network",
    description:
      "Notaries, lawyers, and tax advisors ready the moment an offer lands — so accepted offers actually reach completion.",
  },
];

const process = [
  {
    step: "01",
    title: "Introduction & valuation",
    description:
      "We visit your property, study comparable sales, and give you an honest valuation with the evidence behind it.",
  },
  {
    step: "02",
    title: "Agreement & preparation",
    description:
      "A clear listing agreement, then professional photography, floorplans, and the legal document check that prevents surprises later.",
  },
  {
    step: "03",
    title: "Marketing & matching",
    description:
      "Your property goes to our matched buyers first, then live across our channels with editorial-quality presentation.",
  },
  {
    step: "04",
    title: "Viewings & offers",
    description:
      "We host qualified viewings, report feedback honestly, and negotiate every offer with your interests first.",
  },
  {
    step: "05",
    title: "Due diligence & completion",
    description:
      "Our notary and legal network manages the transaction through to funds received and keys handed over.",
  },
];

export default function SellWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={img("1600585154340-be6161a56a0c", 2400)}
            alt="Selling a villa in Bali with Bhagawan Property"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/35" />
        </div>
        <div className="container-x relative pb-16 pt-48 md:pb-24">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.4em] uppercase text-cream/75">
              Sell With Us
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-cream md:text-6xl">
              Sell your property with confidence
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              The same honesty we&apos;re known for on the buy side, working for you as a seller —
              realistic pricing, serious buyers, and a process you can actually see.
            </p>
            <a href="#sell-form" className="btn btn-light mt-9">
              List My Property
            </a>
          </Reveal>
        </div>
      </section>

      {/* Why sell with us */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          eyebrow="Why Sell With Bhagawan Property"
          title="Sellers deserve honesty too"
          description="An overpriced listing helps nobody — it goes stale, and stale listings sell low. Our approach gets properties sold at their true value."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-36px_rgba(11,11,12,0.35)] md:p-10">
                <span className="font-display text-lg font-medium text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-4 text-xl text-ink">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-24 text-cream md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Selling Process"
            title="From enquiry to a successful sale"
            light
          />
          <div className="mt-14 space-y-0">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-cream/15 py-8 md:grid-cols-[100px_1fr_2fr] md:gap-10">
                  <span className="font-display text-3xl text-white/60">{p.step}</span>
                  <h3 className="font-display text-xl text-cream">{p.title}</h3>
                  <p className="text-base leading-relaxed text-cream/65">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-x py-24 md:py-32" id="sell-form">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Property Submission"
            title="Tell us about your property"
            description="Share the essentials below — we'll review and respond with our honest read within one working day."
            align="center"
          />
          <Reveal delay={0.15}>
            <div className="mt-12 rounded-3xl border border-line bg-paper p-8 md:p-12">
              <SellForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
