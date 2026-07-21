"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsapClient";

/**
 * Plays the hero entrance as soon as the page mounts (the preloader that
 * used to gate it is gone). Animates children marked with [data-hero]; the
 * image wrapper marked with [data-hero-img] gets a slow scale-settle.
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
