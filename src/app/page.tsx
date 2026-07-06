import Image from "next/image";
import type { Metadata } from "next";
import { TransitionLink } from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/PropertyCard";
import AreaCard from "@/components/AreaCard";
import ArticleCard from "@/components/ArticleCard";
import ContactForm from "@/components/ContactForm";
import { featuredProperties } from "@/data/properties";
import { areas, img } from "@/data/areas";
import { articles } from "@/data/articles";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bhagawan Property — Find Exceptional Property in Bali",
  description:
    "Curated freehold and leasehold villas, land, and investment opportunities across Bali. A buyer-first property advisory in Uluwatu, Canggu, Sanur, Seminyak, Ubud & Pererenan. #Here4U",
  alternates: { canonical: "/" },
};

const whyUs = [
  {
    title: "Buyer-First Approach",
    description:
      "We represent your interests, not a seller's target. Every recommendation starts with what is right for you.",
    icon: "M12 21c4.5-3.5 8-6.9 8-11a8 8 0 1 0-16 0c0 4.1 3.5 7.5 8 11Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    title: "Honest Advice",
    description:
      "If a deal has problems, we tell you — even when it costs us the sale. Transparency is our entire model.",
    icon: "M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z M9 12l2 2 4-4",
  },
  {
    title: "Curated Listings",
    description:
      "We list only properties we would buy ourselves — verified titles, honest pricing, genuine potential.",
    icon: "M4 6h16 M4 12h16 M4 18h10 M19 16l2 2-4 4",
  },
  {
    title: "Local Expertise",
    description:
      "Bali is our home. We know the lanes, the landlords, the zoning maps, and what streets flood in January.",
    icon: "M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z M12 11.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z",
  },
  {
    title: "Investment Focus",
    description:
      "Yield modelling, growth corridors, exit strategy — we treat your purchase like the investment it is.",
    icon: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  },
  {
    title: "Trusted Network",
    description:
      "Vetted notaries, lawyers, builders, and managers — the professional bench behind every safe purchase.",
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-anim-img absolute inset-0">
            <Image
              src={img("1537996194471-e657df975ab4", 2400)}
              alt="Luxury villa living in Bali"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/45" />
        </div>

        <div className="container-x relative pb-20 pt-40 md:pb-28">
          <p
            className="hero-anim text-[11px] font-medium tracking-[0.4em] uppercase text-cream/80"
            style={{ transitionDelay: "0.1s" }}
          >
            Bali Property Advisory &middot; #Here4U
          </p>
          <h1
            className="hero-anim font-display mt-6 max-w-4xl text-5xl leading-[1.05] font-light text-cream md:text-7xl lg:text-[5.5rem]"
            style={{ transitionDelay: "0.22s" }}
          >
            Find Exceptional
            <br />
            Property in <em className="italic text-bronze">Bali</em>
          </h1>
          <p
            className="hero-anim mt-7 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg"
            style={{ transitionDelay: "0.34s" }}
          >
            Curated freehold and leasehold villas, land, and investment opportunities across
            Bali — guided by honest, buyer-first advice.
          </p>
          <div
            className="hero-anim mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ transitionDelay: "0.46s" }}
          >
            <TransitionLink href="/properties/freehold" className="btn btn-light">
              Browse Freehold
            </TransitionLink>
            <TransitionLink href="/properties/leasehold" className="btn btn-light">
              Browse Leasehold
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className="link-line ml-0 text-[11px] font-medium tracking-[0.25em] uppercase text-cream sm:ml-4"
            >
              Contact Us
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ── Philosophy strip ─────────────────────────────────── */}
      <section className="border-b border-line bg-paper">
        <div className="container-x py-16 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl leading-snug font-light text-ink md:text-[2.1rem]">
              &ldquo;We don&apos;t just sell property — <em className="italic text-bronze-deep">we help
              people buy the right one.</em>&rdquo;
            </p>
            <p className="mt-5 text-[10px] font-medium tracking-[0.45em] uppercase text-muted">
              Our Philosophy &middot; #Here4U
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────────────── */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Properties"
            title="A curated selection, not a catalogue"
            description="Six to eight properties we currently believe in — verified, fairly priced, and personally inspected."
          />
          <Reveal delay={0.15}>
            <TransitionLink href="/properties" className="btn">
              View All Properties
            </TransitionLink>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Bali Areas ───────────────────────────────────────── */}
      <section className="bg-sand/50 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Bali Areas"
            title="Where on the island belongs to you?"
            description="Every corner of Bali has its own character. Explore our editorial guides to the island's most rewarding addresses."
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.1}>
                <AreaCard area={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ───────────────────────────────────────── */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          eyebrow="Why Bhagawan Property"
          title="A trusted advisor, not another agency"
          description="Trust is not a slogan here — it is the operating principle behind every listing, meeting, and recommendation."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08} className="bg-cream">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-paper md:p-10">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-bronze"
                  aria-hidden
                >
                  {item.icon.split(" M").map((d, j) => (
                    <path key={j} d={j === 0 ? d : `M${d}`} />
                  ))}
                </svg>
                <h3 className="font-display mt-6 text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="img-frame relative aspect-[4/5] max-w-lg">
              <Image
                src={img("1518548419970-58e3b4079ab2", 1400)}
                alt="Balinese temple gate — the heritage behind Bhagawan Property"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="About Bhagawan Property"
              title="Guided by honesty. Grounded in Bali."
              light
            />
            <Reveal delay={0.15}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-cream/70">
                <p>
                  Bhagawan Property was founded on a simple observation: Bali&apos;s property market
                  had plenty of sellers, but very few true advisors. We built the firm we wished
                  existed — one that represents buyers, tells the truth about every listing, and
                  measures success in right decisions rather than closed deals.
                </p>
                <p>
                  From verified titles and honest yield modelling to the notaries and builders we
                  trust with our own projects, everything we do is designed to let you buy with
                  confidence.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
                {[
                  ["Buyer", "Representation"],
                  ["Full", "Transparency"],
                  ["Local", "Expertise"],
                ].map(([a, b]) => (
                  <div key={b}>
                    <p className="font-display text-2xl text-bronze">{a}</p>
                    <p className="mt-1 text-[10px] tracking-[0.3em] uppercase text-cream/50">{b}</p>
                  </div>
                ))}
              </div>
              <TransitionLink href="/about" className="btn btn-light mt-10">
                Our Story
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Knowledge Base preview ───────────────────────────── */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Knowledge Base"
            title="Learn before you buy"
            description="Guides written the way we advise — clear, honest, and specific to Bali."
          />
          <Reveal delay={0.15}>
            <TransitionLink href="/knowledge-base" className="btn">
              View All Articles
            </TransitionLink>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {articles.slice(0, 4).map((a, i) => (
            <Reveal key={a.slug} delay={(i % 4) * 0.08}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-paper py-24 md:py-32" id="contact">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Start the conversation"
              description="Tell us what you're dreaming of — an area, a budget, a feeling. We'll reply personally within one working day."
            />
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6">
                <a
                  href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-line text-bronze transition-colors group-hover:border-bronze">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.3.3.1.4.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4.1 0 .1.6-.2 1.2Z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted">
                      WhatsApp
                    </span>
                    <span className="link-line text-ink">{site.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${site.email}`} className="group flex items-center gap-5">
                  <span className="flex h-12 w-12 items-center justify-center border border-line text-bronze transition-colors group-hover:border-bronze">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      aria-hidden
                    >
                      <rect x="2" y="4" width="20" height="16" rx="1" />
                      <path d="m2 7 10 6L22 7" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted">
                      Email
                    </span>
                    <span className="link-line text-ink">{site.email}</span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
