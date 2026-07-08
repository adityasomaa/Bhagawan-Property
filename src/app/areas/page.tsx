import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { T } from "@/lib/i18n/provider";
import AreaCard from "@/components/AreaCard";
import { areas } from "@/data/areas";

export const metadata: Metadata = {
  title: "Bali Area Guides — Where to Buy Property in Bali",
  description:
    "Editorial guides to Bali's most rewarding addresses: Uluwatu, Canggu, Sanur, Seminyak, Ubud, and Pererenan. Lifestyle, investment insights, and curated properties for each area.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <section className="container-x pb-16 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow"><T k="s.areas.eyebrow" /></p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-ink md:text-6xl">
            <T k="pg.areasTitle" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            <T k="pg.areasDesc" />
          </p>
        </Reveal>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.1}>
              <AreaCard area={a} tall />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
