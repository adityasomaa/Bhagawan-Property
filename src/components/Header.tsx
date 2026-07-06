"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/motion/PageTransition";
import { nav, site, waLink } from "@/lib/site";
import { gsap } from "@/lib/gsapClient";

const IMMERSIVE = [
  /^\/$/,
  /^\/areas\/[^/]+$/,
  /^\/properties\/(?!freehold$|leasehold$)[^/]+$/,
  /^\/about$/,
  /^\/sell-with-us$/,
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !menuOpen
            ? "border-b border-line/70 bg-cream/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between md:h-24">
          <TransitionLink
            href="/"
            aria-label="Bhagawan Property — home"
            className={`transition-colors duration-500 ${light ? "text-cream" : "text-ink"}`}
          >
            <span className="font-display block text-xl leading-none tracking-[0.22em] md:text-2xl">
              BHAGAWAN
            </span>
            <span
              className={`mt-1 block text-[9px] font-medium tracking-[0.5em] uppercase ${
                light ? "text-cream/70" : "text-bronze"
              }`}
            >
              Property &middot; Bali
            </span>
          </TransitionLink>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-8 lg:flex ${light ? "text-cream" : "text-ink"}`}
            aria-label="Primary"
          >
            {nav.map((item) =>
              "children" in item && item.children ? (
                <div key={item.href} className="group relative">
                  <TransitionLink
                    href={item.href}
                    className="link-line flex items-center gap-1.5 text-[11px] font-medium tracking-[0.22em] uppercase"
                  >
                    {item.label}
                    <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </TransitionLink>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="flex min-w-44 flex-col border border-line bg-paper py-2 text-ink shadow-[0_20px_50px_-24px_rgba(34,30,21,0.35)]">
                      {item.children.map((child) => (
                        <TransitionLink
                          key={child.href}
                          href={child.href}
                          className="px-6 py-3 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors hover:bg-sand hover:text-bronze-deep"
                        >
                          {child.label}
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={`link-line text-[11px] font-medium tracking-[0.22em] uppercase ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  {item.label}
                </TransitionLink>
              )
            )}
            <a
              href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn !px-5 !py-2.5 !text-[10px] ${light ? "btn-light" : ""}`}
            >
              WhatsApp
            </a>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden ${
              menuOpen ? "text-cream" : light ? "text-cream" : "text-ink"
            }`}
          >
            <span
              className={`block h-px w-7 bg-current transition-transform duration-400 ${
                menuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-7 bg-current transition-transform duration-400 ${
                menuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] hidden flex-col bg-ink text-cream lg:hidden"
        style={{ display: "none", opacity: 0 }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-8 pb-10 pt-32" data-lenis-prevent>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <div key={item.href} className="m-link">
                <TransitionLink
                  href={item.href}
                  className="font-display block py-2.5 text-3xl tracking-wide text-cream transition-colors hover:text-bronze sm:text-4xl"
                >
                  {item.label}
                </TransitionLink>
                {"children" in item && item.children && (
                  <div className="mb-2 flex gap-6 pl-1">
                    {item.children.map((child) => (
                      <TransitionLink
                        key={child.href}
                        href={child.href}
                        className="text-[11px] font-medium tracking-[0.3em] uppercase text-cream/60 transition-colors hover:text-bronze"
                      >
                        {child.label}
                      </TransitionLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="m-link mt-10 border-t border-cream/15 pt-6">
            <a
              href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light w-full"
            >
              Chat on WhatsApp
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
