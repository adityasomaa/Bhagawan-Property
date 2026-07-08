import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SellForm from "@/components/SellForm";
import { T } from "@/lib/i18n/provider";
import { img } from "@/data/areas";

export const metadata: Metadata = {
  title: "Sell Your Property in Bali — List With Bhagawan Property",
  description:
    "Sell your Bali property with confidence. Professional marketing, qualified local & international buyers, high-quality photography, and a transparent process from valuation to completion.",
  alternates: { canonical: "/sell-with-us" },
};

const advantages = [1, 2, 3, 4, 5, 6] as const;

const process = [1, 2, 3, 4, 5] as const;

export default function SellWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section data-tone="dark" className="relative flex min-h-[72svh] items-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={img("1600585154340-be6161a56a0c", 2400)}
            alt="Selling a villa in Bali with Bhagawan Property"
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
              <T k="nav.sell" />
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-cream md:text-6xl">
              <T k="sl.heroTitle" />
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              <T k="sl.heroSub" />
            </p>
            <a href="#sell-form" className="btn btn-light mt-9">
              <T k="form.listProperty" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Why sell with us */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          eyebrow={<T k="sl.whyEyebrow" />}
          title={<T k="sl.whyTitle" />}
          description={<T k="sl.whyDesc" />}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-36px_rgba(11,11,12,0.35)] md:p-10">
                <span className="font-display text-lg font-medium text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-4 text-xl text-ink"><T k={`sl.a${a}t`} /></h3>
                <p className="mt-3 text-sm leading-relaxed text-muted"><T k={`sl.a${a}d`} /></p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section data-tone="dark" className="bg-ink py-24 text-cream md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={<T k="sl.procEyebrow" />}
            title={<T k="sl.procTitle" />}
            light
          />
          <div className="mt-14 space-y-0">
            {process.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-cream/15 py-8 md:grid-cols-[100px_1fr_2fr] md:gap-10">
                  <span className="font-display text-3xl text-white/60">{String(p).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl text-cream"><T k={`sl.p${p}t`} /></h3>
                  <p className="text-base leading-relaxed text-cream/65"><T k={`sl.p${p}d`} /></p>
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
            eyebrow={<T k="sl.subEyebrow" />}
            title={<T k="sl.subTitle" />}
            description={<T k="sl.subDesc" />}
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
