import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import Gallery from "@/components/Gallery";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import PropertyProse from "@/components/PropertyProse";
import { TransitionLink } from "@/components/motion/PageTransition";
import { byArea, getProperty, properties } from "@/data/properties";
import { formatNumber, formatIDR } from "@/lib/format";
import { T, Money } from "@/lib/i18n/provider";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  return {
    title: `${property.name} — ${property.areaName}, Bali (${property.tenure})`,
    description: `${property.excerpt} ${formatIDR(property.price)} · ${
      property.bedrooms > 0 ? `${property.bedrooms} bedrooms · ` : ""
    }${property.landSize} m² land in ${property.areaName}, Bali.`,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: { images: [{ url: property.images[0] }] },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const related = byArea(property.area)
    .filter((p) => p.slug !== property.slug)
    .concat(properties.filter((p) => p.area !== property.area && p.tenure === property.tenure))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.name,
    description: property.excerpt,
    image: property.images,
    category: "Real Estate",
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/properties/${property.slug}`,
      seller: { "@type": "RealEstateAgent", name: site.name, url: site.url },
    },
  };

  const specs: { k: string; v: React.ReactNode }[] = [
    {
      k: "pd.tenure",
      v:
        property.tenure === "leasehold" ? (
          <>
            <T k="card.leasehold" /> · {property.leaseholdYears} <T k="card.yrs" />
          </>
        ) : (
          <T k="card.freehold" />
        ),
    },
    { k: "pd.type", v: property.type },
    { k: "pd.locationLabel", v: `${property.areaName}, Bali` },
    { k: "pd.landSize", v: `${formatNumber(property.landSize)} m²` },
    ...(property.buildingSize ? [{ k: "pd.buildingSize", v: `${formatNumber(property.buildingSize)} m²` }] : []),
    ...(property.bedrooms > 0 ? [{ k: "pd.bedrooms", v: String(property.bedrooms) }] : []),
    ...(property.bathrooms > 0 ? [{ k: "pd.bathrooms", v: String(property.bathrooms) }] : []),
    { k: "pd.price", v: <Money idr={property.price} /> },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-x pb-24 pt-32 md:pb-32 md:pt-40">
        <Reveal>
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-muted" aria-label="Breadcrumb">
            <TransitionLink href="/properties" className="link-line"><T k="nav.properties" /></TransitionLink>
            <span>/</span>
            <TransitionLink href={`/properties/${property.tenure}`} className="link-line">
              <T k={property.tenure === "leasehold" ? "card.leasehold" : "card.freehold"} />
            </TransitionLink>
            <span>/</span>
            <span className="text-ink">{property.name}</span>
          </nav>
          <Gallery images={property.images} name={property.name} />
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="eyebrow">
                    {property.areaName}, Bali &middot; {property.tenure}
                  </p>
                  <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-ink md:text-5xl">
                    {property.name}
                  </h1>
                </div>
                <p className="font-display text-3xl font-medium text-ink md:text-4xl">
                  <Money idr={property.price} />
                </p>
              </div>
            </Reveal>

            <PropertyProse property={property} />

            <Reveal delay={0.1}>
              <h2 className="font-display mt-14 text-2xl text-ink"><T k="pd.location" /></h2>
              <p className="mt-3 text-sm text-muted">
                Exact address shared after an introductory call — a courtesy we extend to every seller.
              </p>
              <div className="img-frame mt-6 aspect-[16/9]">
                <iframe
                  title={`Map of ${property.areaName}, Bali`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&z=13&output=embed`}
                  className="h-full w-full border-0 grayscale-[0.4]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <aside>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-line bg-paper p-7 md:p-9 lg:sticky lg:top-28">
                <h2 className="font-display text-xl text-ink"><T k="pd.specifications" /></h2>
                <dl className="mt-5">
                  {specs.map(({ k, v }) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-t border-line py-3 text-sm">
                      <dt className="text-muted"><T k={k} /></dt>
                      <dd className="text-right font-medium capitalize text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                {property.nightlyRate && (
                  <TransitionLink
                    href={`/roi-calculator?price=${property.price}&nightly=${property.nightlyRate}&occupancy=${property.occupancy ?? 70}${property.leaseholdYears ? `&years=${property.leaseholdYears}` : ""}`}
                    className="mt-5 block rounded-full border border-ink/20 bg-cream p-4 text-center text-[10px] font-semibold tracking-[0.25em] uppercase text-ink transition-colors hover:border-ink"
                  >
                    Run the ROI numbers →
                  </TransitionLink>
                )}
                <div className="mt-8">
                  <h3 className="font-display text-xl text-ink">Enquire about {property.name}</h3>
                  <div className="mt-6">
                    <ContactForm subject={`${property.name}, ${property.areaName} (${formatIDR(property.price)})`} />
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-line pt-16">
            <Reveal>
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                <T k="pd.related" />
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
