"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

/**
 * Lenis smooth scrolling — desktop only (disabled on tablet/mobile and for
 * users who prefer reduced motion). Scrollable popups opt out natively via
 * the `data-lenis-prevent` attribute so the mousewheel scrolls the popup.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    const create = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      window.__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    };

    const destroy = () => {
      if (!lenis) return;
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenis = null;
      window.__lenis = null;
    };

    const sync = () => (mq.matches ? create() : destroy());
    sync();
    mq.addEventListener("change", sync);

    // Belt-and-braces: some environments don't dispatch matchMedia change
    // events on viewport changes (device rotation, emulation, window resize).
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sync, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      destroy();
    };
  }, []);

  return null;
}

/** Scroll to a target without getting stuck — uses Lenis when active, native otherwise. */
export function scrollToTarget(target: string | number, offset = 0) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior: "smooth" });
  } else {
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}
