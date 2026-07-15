import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import PropertyProse from "@/components/PropertyProse";
import PropertyHeader from "@/components/PropertyHeader";
import PropertyAside from "@/components/PropertyAside";
import PropertyAreaMap from "@/components/PropertyAreaMap";
import { TransitionLink } from "@/components/motion/PageTransition";
import { getProperty, properties } from "@/data/properties";
import { getAllProperties, readContent } from "@/lib/cms";
import { formatIDR } from "@/lib/format";
import { T } from "@/lib/i18n/provider";
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
  const property = (await getAllProperties()).find((p) => p.slug === slug);
  if (!property) return {};
  return {
    title: `${property.name} — ${property.areaName}, Bali (${property.tenures.join(" / ")})`,
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
  // Includes admin-created listings and excludes removed ones.
  const all = await getAllProperties();
  const property = all.find((p) => p.slug === slug);
  if (!property) notFound();

  const related = all
    .filter((p) => p.slug !== property.slug && p.area === property.area)
    .concat(all.filter((p) => p.area !== property.area && p.tenures.some((x) => property.tenures.includes(x))))
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-x pb-24 pt-32 md:pb-32 md:pt-40">
        <Reveal>
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-muted" aria-label="Breadcrumb">
            <TransitionLink href="/properties" className="link-line"><T k="nav.properties" /></TransitionLink>
            <span>/</span>
            {property.tenures.map((tn) => (
              <TransitionLink key={tn} href={`/properties/${tn}`} className="link-line">
                <T k={tn === "leasehold" ? "card.leasehold" : "card.freehold"} />
              </TransitionLink>
            ))}
            <span>/</span>
            <span className="text-ink">{property.name}</span>
          </nav>
          <PropertyGallery property={property} />
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <PropertyHeader property={property} />
            </Reveal>

            <PropertyProse property={property} />

            <Reveal delay={0.1}>
              <h2 className="font-display mt-14 text-2xl text-ink"><T k="pd.location" /></h2>
              <p className="mt-3 text-sm text-muted">
                <T k="pd.addressNote" />
              </p>
              <div className="mt-6">
                <PropertyAreaMap property={property} />
              </div>
            </Reveal>
          </div>

          <aside>
            <Reveal delay={0.15}>
              <PropertyAside property={property} />
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
