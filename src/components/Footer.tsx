import { TransitionLink } from "@/components/motion/PageTransition";
import LogoMark from "@/components/Logo";
import { areas } from "@/data/areas";
import { site, waLink } from "@/lib/site";

const explore = [
  { label: "Freehold Properties", href: "/properties/freehold" },
  { label: "Leasehold Properties", href: "/properties/leasehold" },
  { label: "Sell With Us", href: "/sell-with-us" },
  { label: "Knowledge Base", href: "/knowledge-base" },
  { label: "ROI Calculator", href: "/roi-calculator" },
  { label: "About Us", href: "/about" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <TransitionLink href="/" className="inline-flex items-center gap-4">
              <LogoMark className="h-10 w-10 text-cream" />
              <span>
                <span className="font-display block text-2xl font-semibold tracking-[0.16em]">
                  BHAGAWAN
                </span>
                <span className="mt-1 block text-[10px] font-medium tracking-[0.5em] uppercase text-cream/50">
                  Property &middot; Bali
                </span>
              </span>
            </TransitionLink>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              {site.tagline} A buyer-first property advisory for exceptional freehold and
              leasehold opportunities across Bali.
            </p>
            <p className="mt-6 text-[10px] tracking-[0.5em] uppercase text-cream/40">#Here4U</p>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-[10px] font-medium tracking-[0.35em] uppercase text-cream/40">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <TransitionLink
                    href={l.href}
                    className="link-line text-sm text-cream/75 hover:text-cream"
                  >
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas">
            <h3 className="text-[10px] font-medium tracking-[0.35em] uppercase text-cream/40">
              Bali Areas
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
              Contact
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
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legal.map((l) => (
              <TransitionLink key={l.href} href={l.href} className="link-line hover:text-cream/80">
                {l.label}
              </TransitionLink>
            ))}
            <a href="/sitemap.xml" className="link-line hover:text-cream/80">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
