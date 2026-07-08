import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/motion/Reveal";
import { T } from "@/lib/i18n/provider";
import RoiCalculator from "@/components/RoiCalculator";
import { TransitionLink } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Bali Property ROI Calculator — Rental Yield & Return Modelling",
  description:
    "Model the returns on a Bali villa investment: rental yield, net income, payback period, and total ROI for freehold and leasehold — with honest, conservative assumptions.",
  alternates: { canonical: "/roi-calculator" },
};

export default function RoiCalculatorPage() {
  return (
    <>
      <section className="container-x pb-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow"><T k="roi.eyebrow" /></p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            <T k="roi.pageTitle" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            <T k="roi.pageDesc" />
          </p>
        </Reveal>
      </section>
      <section className="container-x pb-16">
        <Reveal delay={0.1}>
          <Suspense fallback={<div className="h-96 animate-pulse border border-line bg-paper" />}>
            <RoiCalculator />
          </Suspense>
        </Reveal>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <Reveal>
          <div className="border border-line bg-paper p-8 text-center md:p-12">
            <p className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              <T k="roi.ctaTitle" />
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <TransitionLink href="/properties" className="btn btn-solid">
                <T k="roi.browseProps" />
              </TransitionLink>
              <TransitionLink href="/contact" className="btn">
                <T k="roi.askUs" />
              </TransitionLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
