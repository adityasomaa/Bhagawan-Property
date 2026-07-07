"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsapClient";

/**
 * Replays the hero entrance every time the page mounts — on first load it
 * waits for the preloader to finish (bp:app-ready), on later navigations it
 * plays immediately (behind the opening curtain).
 * Animates children marked with [data-hero]; the image wrapper marked with
 * [data-hero-img] gets a slow scale-settle.
 */
export default function HeroEntrance({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-hero]");
    const img = el.querySelector("[data-hero-img]");

    let ran = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    const run = () => {
      if (ran) return;
      ran = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      const tl = gsap.timeline();
      if (img) {
        tl.fromTo(
          img,
          { opacity: 0.4, scale: 1.07 },
          { opacity: 1, scale: 1, duration: 2.0, ease: "power3.out" },
          0
        );
      }
      tl.fromTo(
        targets,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" },
        0.2
      );
    };

    if (document.documentElement.dataset.appReady === "1") {
      run();
    } else {
      window.addEventListener("bp:app-ready", run, { once: true });
      fallbackTimer = setTimeout(run, 7000); // never leave the hero hidden
    }

    return () => window.removeEventListener("bp:app-ready", run);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
