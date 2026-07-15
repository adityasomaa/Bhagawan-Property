import Image from "next/image";
import type { Metadata } from "next";
import { TransitionLink } from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import HeroEntrance from "@/components/motion/HeroEntrance";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import PropertyGrid from "@/components/PropertyGrid";
import AreaCard from "@/components/AreaCard";
import ArticleGrid from "@/components/ArticleGrid";
import ContactForm from "@/components/ContactForm";
import { T } from "@/lib/i18n/provider";
import { areas, img } from "@/data/areas";
import { site, waLink } from "@/lib/site";

// Hero slider order + landmark labels requested for the homepage.
const heroOrder: { slug: string; caption: string }[] = [
  { slug: "canggu", caption: "Canggu Beach" },
  { slug: "uluwatu", caption: "Uluwatu Beach" },
  { slug: "sanur", caption: "Sanur Beach" },
  { slug: "ubud", caption: "Tegalalang Rice Terrace" },
  { slug: "seminyak", caption: "Seminyak Beach" },
  { slug: "pererenan", caption: "Pererenan Beach" },
];

const heroSlides: HeroSlide[] = heroOrder.map(({ slug, caption }) => {
  const a = areas.find((x) => x.slug === slug)!;
  return { name: a.name, slug: a.slug, caption, image: a.heroImage };
});

export const metadata: Metadata = {
  title: "Bhagawan Property — Find Exceptional Property in Bali",
  description:
    "Curated freehold and leasehold villas, land, and investment opportunities across Bali. A buyer-first property advisory in Uluwatu, Canggu, Sanur, Seminyak, Ubud & Pererenan. #Here4U",
  alternates: { canonical: "/" },
};

const whyUs = [
  { k: "buyer", icon: "M12 21c4.5-3.5 8-6.9 8-11a8 8 0 1 0-16 0c0 4.1 3.5 7.5 8 11Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
  { k: "honest", icon: "M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z M9 12l2 2 4-4" },
  { k: "curated", icon: "M4 6h16 M4 12h16 M4 18h10 M19 16l2 2-4 4" },
  { k: "local", icon: "M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z M12 11.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z" },
  { k: "invest", icon: "M3 17l6-6 4 4 8-8 M15 7h6v6" },
  { k: "network", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <HeroEntrance>
        <section data-tone="dark" className="relative flex min-h-[112svh] items-end overflow-hidden md:min-h-[100svh]">
          <HeroSlider slides={heroSlides} />

          <div className="container-x relative z-10 pb-48 pt-36 md:pb-32 md:pt-40">
            <div data-hero style={{ opacity: 0 }}>
              <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.32em] uppercase text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <T k="hero.eyebrow" />
              </span>
            </div>
            <h1
              data-hero
              className="font-display mt-7 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-white md:text-7xl lg:text-[5.5rem]"
              style={{ opacity: 0 }}
            >
              <T k="hero.title" />
            </h1>
            <p
              data-hero
              className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
              style={{ opacity: 0 }}
            >
              <T k="hero.subtitle" />
            </p>
            <div
              data-hero
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{ opacity: 0 }}
            >
              <TransitionLink href="/properties/freehold" className="btn btn-light">
                <T k="c.browseFreehold" />
              </TransitionLink>
              <TransitionLink href="/properties/leasehold" className="btn btn-light">
                <T k="c.browseLeasehold" />
              </TransitionLink>
              <TransitionLink
                href="/contact"
                className="link-line ml-0 text-[11px] font-medium tracking-[0.25em] uppercase text-white sm:ml-4"
              >
                <T k="c.contactUs" />
              </TransitionLink>
            </div>
            <div
              data-hero
              className="mt-12 grid max-w-2xl grid-cols-3 gap-3"
              style={{ opacity: 0 }}
            >
              {[
                ["6", "hero.stat1"],
                ["6", "hero.stat2"],
                ["100%", "hero.stat3"],
              ].map(([n, k]) => (
                <div key={k} className="glass rounded-2xl px-4 py-4 md:px-6">
                  <p className="font-display text-2xl font-medium text-white md:text-3xl">{n}</p>
                  <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/60">
                    <T k={k} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </HeroEntrance>

      {/* ── Philosophy strip ─────────────────────────────────── */}
      <section className="border-b border-line bg-paper">
        <div className="container-x py-16 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl leading-snug font-medium tracking-tight text-ink md:text-[2.1rem]">
              <T k="phil.quote" />
            </p>
            <p className="mt-5 text-[10px] font-medium tracking-[0.45em] uppercase text-muted">
              <T k="phil.label" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────────────── */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={<T k="s.featured.eyebrow" />}
            title={<T k="s.featured.title" />}
            description={<T k="s.featured.desc" />}
          />
          <Reveal delay={0.15}>
            <TransitionLink href="/properties" className="btn">
              <T k="c.viewAllProperties" />
            </TransitionLink>
          </Reveal>
        </div>
        <PropertyGrid featured limit={8} />
      </section>

      {/* ── Bali Areas ───────────────────────────────────────── */}
      <section className="bg-sand/50 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={<T k="s.areas.eyebrow" />}
            title={<T k="s.areas.title" />}
            description={<T k="s.areas.desc" />}
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
          eyebrow={<T k="s.why.eyebrow" />}
          title={<T k="s.why.title" />}
          description={<T k="s.why.desc" />}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.k} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-3xl border border-line bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-36px_rgba(11,11,12,0.35)] md:p-10">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ink"
                  aria-hidden
                >
                  {item.icon.split(" M").map((d, j) => (
                    <path key={j} d={j === 0 ? d : `M${d}`} />
                  ))}
                </svg>
                <h3 className="font-display mt-6 text-xl text-ink">
                  <T k={`why.${item.k}.t`} />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <T k={`why.${item.k}.d`} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section data-tone="dark" className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
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
              eyebrow={<T k="s.about.eyebrow" />}
              title={<T k="s.about.title" />}
              light
            />
            <Reveal delay={0.15}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-cream/70">
                <p><T k="home.aboutP1" /></p>
                <p><T k="home.aboutP2" /></p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
                {[
                  ["about.s1a", "about.s1b"],
                  ["about.s2a", "about.s2b"],
                  ["about.s3a", "about.s3b"],
                ].map(([a, b]) => (
                  <div key={b}>
                    <p className="font-display text-2xl font-medium text-white">
                      <T k={a} />
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.3em] uppercase text-cream/50">
                      <T k={b} />
                    </p>
                  </div>
                ))}
              </div>
              <TransitionLink href="/about" className="btn btn-light mt-10">
                <T k="c.ourStory" />
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Knowledge Base preview ───────────────────────────── */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={<T k="s.kb.eyebrow" />}
            title={<T k="s.kb.title" />}
            description={<T k="s.kb.desc" />}
          />
          <Reveal delay={0.15}>
            <TransitionLink href="/knowledge-base" className="btn">
              <T k="c.viewAllArticles" />
            </TransitionLink>
          </Reveal>
        </div>
        <ArticleGrid limit={4} />
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-paper py-24 md:py-32" id="contact">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={<T k="s.contact.eyebrow" />}
              title={<T k="s.contact.title" />}
              description={<T k="s.contact.desc" />}
            />
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6">
                <a
                  href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper text-ink transition-colors group-hover:border-ink">
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper text-ink transition-colors group-hover:border-ink">
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
                      <T k="contact.email" />
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
