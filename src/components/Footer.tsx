"use client";

import { TransitionLink } from "@/components/motion/PageTransition";
import Wordmark from "@/components/Wordmark";
import { useT } from "@/lib/i18n/provider";
import { areas } from "@/data/areas";
import { site, waLink } from "@/lib/site";

export default function Footer() {
  const t = useT();

  const explore = [
    { label: t("nav.freehold"), href: "/properties/freehold" },
    { label: t("nav.leasehold"), href: "/properties/leasehold" },
    { label: t("foot.sell"), href: "/sell-with-us" },
    { label: t("nav.kb"), href: "/knowledge-base" },
    { label: t("foot.roi"), href: "/roi-calculator" },
    { label: t("foot.about"), href: "/about" },
  ];

  const legal = [
    { label: t("foot.privacy"), href: "/privacy-policy" },
    { label: t("foot.terms"), href: "/terms-of-use" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer data-tone="dark" className="bg-ink text-cream">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <TransitionLink href="/" className="inline-flex items-center">
              <Wordmark tone="white" className="h-14 w-auto" />
            </TransitionLink>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">{t("foot.tagline")}</p>
            <p className="mt-6 text-[10px] tracking-[0.5em] uppercase text-cream/40">#Here4U</p>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-[10px] font-medium tracking-[0.35em] uppercase text-cream/40">
              {t("foot.explore")}
            </h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <TransitionLink href={l.href} className="link-line text-sm text-cream/75 hover:text-cream">
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas">
            <h3 className="text-[10px] font-medium tracking-[0.35em] uppercase text-cream/40">
              {t("foot.areas")}
            </h3>
            <ul className="mt-5 space-y-3">
              {areas.map((a) => (
                <li key={a.slug}>
                  <TransitionLink
                    href={`/areas/${a.slug}`}
                    className="link-line text-sm text-cream/75 hover:text-cream"
                  >
                    {a.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.35em] uppercase text-cream/40">
              {t("foot.contact")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              <li>
                <a href={`mailto:${site.email}`} className="link-line hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line hover:text-cream"
                >
                  {site.phone} (WhatsApp)
                </a>
              </li>
              <li className="max-w-60 leading-relaxed text-cream/55">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-[11px] tracking-[0.14em] text-cream/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. {t("foot.rights")}
          </p>
          <div className="flex gap-6">
            {legal.map((l) => (
              <TransitionLink key={l.href} href={l.href} className="link-line hover:text-cream/80">
                {l.label}
              </TransitionLink>
            ))}
            <a href="/sitemap.xml" className="link-line hover:text-cream/80">
              {t("foot.sitemap")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
