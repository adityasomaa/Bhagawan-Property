"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/motion/PageTransition";
import LogoMark from "@/components/Logo";
import LocaleControls from "@/components/LocaleControls";
import { useT } from "@/lib/i18n/provider";
import { nav, waLink } from "@/lib/site";
import { gsap } from "@/lib/gsapClient";

// Map nav routes to translation keys.
const NAV_KEY: Record<string, string> = {
  "/": "nav.home",
  "/properties": "nav.properties",
  "/properties/freehold": "nav.freehold",
  "/properties/leasehold": "nav.leasehold",
  "/areas": "nav.areas",
  "/sell-with-us": "nav.sell",
  "/knowledge-base": "nav.kb",
  "/about": "nav.about",
  "/contact": "nav.contact",
};

// Pages with a full-bleed dark hero behind the header — the nav uses its
// light (white) treatment on these until the user scrolls. Every other page
// (property detail, catalogues, knowledge base, legal, etc.) has a light
// background at the top, so it keeps the dark, always-visible nav.
const IMMERSIVE = [
  /^\/$/,
  /^\/areas\/[^/]+$/,
  /^\/about$/,
  /^\/sell-with-us$/,
];

export default function Header() {
  const pathname = usePathname();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const label = (href: string, fallback: string) =>
    NAV_KEY[href] ? t(NAV_KEY[href]) : fallback;

  const immersive = IMMERSIVE.some((re) => re.test(pathname));
  const light = immersive && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever a page transition starts.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("pt:close-menu", close);
    return () => window.removeEventListener("pt:close-menu", close);
  }, []);

  // Close the mobile menu on Escape, or when the viewport grows to desktop
  // (the menu and hamburger are lg:hidden, so a lingering open state would
  // otherwise keep the desktop header hidden).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  // Animate mobile menu + lock scrolling behind it.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menuOpen) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      gsap.set(el, { display: "flex" });
      gsap
        .timeline()
        .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
        .fromTo(
          el.querySelectorAll(".m-link"),
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" },
          "-=0.1"
        );
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-300 ${
          menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="container-x pt-3 md:pt-5">
          <div
            className={`flex h-14 items-center justify-between rounded-full pl-5 pr-2.5 transition-all duration-500 md:h-16 md:pl-7 md:pr-3 ${
              menuOpen
                ? "bg-transparent border border-transparent text-cream"
                : light
                  ? "glass text-white"
                  : "glass-light text-ink"
            }`}
          >
            <TransitionLink
              href="/"
              aria-label="Bhagawan Property — home"
              className="flex items-center gap-3"
            >
              <LogoMark className="h-7 w-7 md:h-8 md:w-8" />
              <span>
                <span className="font-display block text-base leading-none font-semibold tracking-[0.18em] md:text-lg">
                  BHAGAWAN
                </span>
                <span
                  className={`mt-0.5 block text-[8px] font-medium tracking-[0.42em] uppercase ${
                    light || menuOpen ? "opacity-60" : "text-muted"
                  }`}
                >
                  Property &middot; Bali
                </span>
              </span>
            </TransitionLink>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {nav.map((item) =>
                "children" in item && item.children ? (
                  <div key={item.href} className="group relative">
                    <TransitionLink
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] uppercase"
                      style={{ display: "inline-flex" }}
                    >
                      <span className="link-line">{label(item.href, item.label)}</span>
                      <svg
                        width="9"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden
                        className="shrink-0 transition-transform duration-300 group-hover:rotate-180"
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </TransitionLink>
                    <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                      <div className="flex min-w-48 flex-col rounded-2xl border border-line bg-paper p-2 text-ink shadow-[0_24px_60px_-24px_rgba(11,11,12,0.4)]">
                        {item.children.map((child) => (
                          <TransitionLink
                            key={child.href}
                            href={child.href}
                            className="rounded-xl px-5 py-3 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors hover:bg-ink/5"
                          >
                            {label(child.href, child.label)}
                          </TransitionLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    className={`link-line text-[11px] font-medium tracking-[0.2em] uppercase ${
                      pathname === item.href ? "active" : ""
                    }`}
                  >
                    {label(item.href, item.label)}
                  </TransitionLink>
                )
              )}
              <a
                href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn !px-5 !py-2.5 !text-[10px] ${light ? "btn-light" : "btn-solid"}`}
              >
                {t("nav.whatsapp")}
              </a>
              <span className="h-4 w-px bg-current opacity-20" aria-hidden />
              <LocaleControls />
            </nav>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-[7px] text-current lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-current transition-transform duration-400 ${
                  menuOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-current transition-transform duration-400 ${
                  menuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] hidden flex-col bg-ink/95 text-cream backdrop-blur-2xl lg:hidden"
        style={{ display: "none", opacity: 0 }}
        aria-hidden={!menuOpen}
      >
        <div
          className="flex h-full flex-col justify-between overflow-y-auto px-8 pb-10 pt-8"
          data-lenis-prevent
        >
          <div className="m-link mb-8 flex items-center justify-between">
            <TransitionLink href="/" className="flex items-center gap-3 text-cream">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-base font-semibold tracking-[0.18em]">
                BHAGAWAN
              </span>
            </TransitionLink>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:bg-white/20"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <div key={item.href} className="m-link">
                <TransitionLink
                  href={item.href}
                  className="font-display block py-2.5 text-3xl font-medium tracking-tight text-cream transition-colors hover:text-white/60 sm:text-4xl"
                >
                  {label(item.href, item.label)}
                </TransitionLink>
                {"children" in item && item.children && (
                  <div className="mb-2 flex gap-6 pl-1">
                    {item.children.map((child) => (
                      <TransitionLink
                        key={child.href}
                        href={child.href}
                        className="text-[11px] font-medium tracking-[0.3em] uppercase text-cream/60 transition-colors hover:text-white"
                      >
                        {label(child.href, child.label)}
                      </TransitionLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="m-link mt-10 border-t border-cream/15 pt-6 text-cream">
            <div className="mb-6 flex justify-center">
              <LocaleControls align="left" />
            </div>
            <a
              href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light w-full"
            >
              {t("c.chatWhatsapp")}
            </a>
            <p className="mt-6 text-center text-[10px] tracking-[0.5em] uppercase text-cream/40">
              #Here4U
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
