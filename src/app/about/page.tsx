import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { T } from "@/lib/i18n/provider";
import { TransitionLink } from "@/components/motion/PageTransition";
import { img } from "@/data/areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — A Buyer-First Property Advisory in Bali",
  description:
    "Bhagawan Property is a trusted property advisor in Bali, built on honesty, transparency, and local expertise. We don't just sell property — we help people buy the right one.",
  alternates: { canonical: "/about" },
};

const values = [1, 2, 3, 4, 5] as const;

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
              <T k="s.about.eyebrow" />
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-cream md:text-6xl">
              <T k="ab.heroTitle" />
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-2">
        <SectionHeading
          eyebrow={<T k="ab.storyEyebrow" />}
          title={<T k="ab.storyTitle" />}
        />
        <Reveal delay={0.1}>
          <div className="space-y-6 text-base leading-relaxed text-ink-soft md:text-lg">
            <p><T k="ab.story1" /></p>
            <p><T k="ab.story2" /></p>
            <p><T k="ab.story3" /></p>
            <p className="font-display text-xl font-medium text-ink">
              <T k="ab.tagline" />
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section data-tone="dark" className="bg-ink py-24 text-cream md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={<T k="ab.valEyebrow" />} title={<T k="ab.valTitle" />} light />
          <div className="mt-14">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 0.04}>
                <div className="grid gap-4 border-t border-cream/15 py-8 md:grid-cols-[100px_1fr_2fr] md:gap-10">
                  <span className="font-display text-3xl text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-cream"><T k={`ab.v${v}t`} /></h3>
                  <p className="text-base leading-relaxed text-cream/65"><T k={`ab.v${v}d`} /></p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature CTA */}
      <section className="container-x py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow"><T k="ab.sigEyebrow" /></p>
          <p className="font-display mt-6 text-5xl font-medium tracking-tight text-ink md:text-7xl">#Here4U</p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            <T k="ab.sigDesc" />
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <TransitionLink href="/properties" className="btn btn-solid">
              <T k="ab.browseProps" />
            </TransitionLink>
            <TransitionLink href="/contact" className="btn">
              <T k="ab.meetUs" />
            </TransitionLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
