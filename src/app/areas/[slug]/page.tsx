import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { T } from "@/lib/i18n/provider";
import PropertyCard from "@/components/PropertyCard";
import { TransitionLink } from "@/components/motion/PageTransition";
import { areas, getArea } from "@/data/areas";
import { byArea } from "@/data/properties";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: `${area.name} Area Guide — Living & Investing in ${area.name}, Bali`,
    description: `${area.tagline} Lifestyle, things to do, and property investment insights for ${area.name}, Bali — plus curated villas and land for sale.`,
    alternates: { canonical: `/areas/${slug}` },
    openGraph: { images: [{ url: area.heroImage }] },
  };
}

export default async function AreaGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const areaProperties = byArea(area.slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${area.name}, Bali`,
    description: area.tagline,
    url: `${site.url}/areas/${area.slug}`,
    containedInPlace: { "@type": "Place", name: "Bali, Indonesia" },
  };

  const investment = [
    ["ag.marketOverview", area.investment.overview],
    ["ag.typicalBuyer", area.investment.typicalBuyer],
    ["ag.rentalDemand", area.investment.rentalDemand],
    ["ag.capitalGrowth", area.investment.capitalGrowth],
    ["ag.bestOpportunities", area.investment.opportunities],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section data-tone="dark" className="relative flex min-h-[78svh] items-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={area.heroImage}
            alt={`${area.name}, Bali`}
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
              <T k="ag.guide" />
            </p>
            <h1 className="font-display mt-4 text-5xl font-medium tracking-tight text-cream md:text-7xl">
              {area.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              {area.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <div className="space-y-6 lg:sticky lg:top-28">
            {area.stats.map((s) => (
              <div key={s.label} className="border-t border-line pt-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted">{s.label}</p>
                <p className="font-display mt-1 text-2xl font-medium text-ink">{s.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div>
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:text-xl">
              {area.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "font-display font-medium tracking-tight text-ink" : "text-base md:text-lg"}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-3xl border border-line bg-paper p-6 md:p-8">
              <p className="eyebrow"><T k="ag.idealFor" /></p>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{area.idealFor}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="bg-sand/50 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={<T k="ag.lifestyle" />} title={`Living in ${area.name}`} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {area.lifestyle.map((l, i) => (
              <Reveal key={l.title} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-3xl border border-line bg-paper p-7 md:p-9">
                  <h3 className="font-display text-lg text-ink">{l.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{l.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Things to do */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow={<T k="ag.thingsToDo" />}
            title={`Days well spent in ${area.name}`}
            description="The experiences we send our own friends and clients to first."
          />
          <Reveal delay={0.1}>
            <ol className="space-y-0">
              {area.thingsToDo.map((t, i) => (
                <li key={t} className="flex gap-6 border-t border-line py-5 last:border-b">
                  <span className="font-display text-lg font-medium text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-relaxed text-ink-soft">{t}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Investment insights */}
      <section data-tone="dark" className="bg-ink py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={<T k="ag.investment" />}
            title={`The ${area.name} investment case`}
            light
          />
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {investment.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08}>
                <div className="glass h-full rounded-3xl p-7">
                  <h3 className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/60">
                    <T k={title as string} />
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-cream/70">{body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <div className="glass flex h-full flex-col justify-between rounded-3xl p-7">
                <p className="font-display text-2xl font-medium tracking-tight leading-snug text-cream">
                  <T k="ag.wantNumbers" />
                </p>
                <TransitionLink href="/roi-calculator" className="btn btn-light mt-8 self-start">
                  <T k="ag.openRoi" />
                </TransitionLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured properties in area */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={<T k="ag.featured" />}
            title={`Currently curated in ${area.name}`}
          />
          <Reveal delay={0.15}>
            <TransitionLink href="/properties" className="btn">
              <T k="ag.viewAllIn" />
            </TransitionLink>
          </Reveal>
        </div>
        {areaProperties.length > 0 ? (
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {areaProperties.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.1}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-12 rounded-3xl border border-line bg-paper p-14 text-center">
              <p className="font-display text-2xl text-ink">
                <T k="ag.offMarketT" />
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                <T k="ag.offMarketB" />
              </p>
              <TransitionLink href="/contact" className="btn mt-8">
                Contact Us
              </TransitionLink>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
