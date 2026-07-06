import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/motion/Reveal";
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
          <p className="eyebrow">Investment Tools</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-light text-ink md:text-6xl">
            The ROI Calculator
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Run the numbers the way we run them — gross to net, taxes included, leasehold
            amortisation acknowledged. If a property still looks good after honest math, it&apos;s
            worth a conversation.
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
            <p className="font-display text-2xl font-light text-ink md:text-3xl">
              Want these numbers for a real property, with real comparable data?
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <TransitionLink href="/properties" className="btn btn-solid">
                Browse Properties
              </TransitionLink>
              <TransitionLink href="/contact" className="btn">
                Ask Us Directly
              </TransitionLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
