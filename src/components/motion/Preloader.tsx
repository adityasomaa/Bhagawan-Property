"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapClient";
import LogoMark from "@/components/Logo";

/**
 * First-visit preloader — logo only. An inline <head> script sets
 * html[data-preloaded="1"] before paint on repeat visits, and CSS hides the
 * overlay entirely, so this only ever plays once per session.
 *
 * The element is removed via React state (never el.remove()) so React's
 * reconciler stays in sync during later route transitions.
 */
export default function Preloader() {
  const played = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const ready = () => {
      document.documentElement.dataset.appReady = "1";
      window.dispatchEvent(new CustomEvent("bp:app-ready"));
    };

    const el = document.getElementById("preloader");
    if (!el || document.documentElement.dataset.preloaded === "1") {
      ready();
      setDone(true);
      return;
    }

    sessionStorage.setItem("bp-preloaded", "1");
    window.__lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const logo = el.querySelector(".pl-logo");
    const ring = el.querySelector(".pl-ring");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      ready();
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
      setDone(true);
    };

    // Safety net: if rAF is throttled (background tab), never trap the user
    // behind the preloader.
    const fallback = setTimeout(finish, 5000);

    gsap
      .timeline({
        onComplete: () => {
          clearTimeout(fallback);
          finish();
        },
      })
      // Logo is visible from first paint — this just settles it in.
      .fromTo(
        logo,
        { scale: 0.8, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
      )
      .fromTo(
        ring,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
        "-=0.7"
      )
      .add(ready, "+=0.45")
      .to(logo, { scale: 1.08, duration: 0.4, ease: "power2.in" })
      .to(
        el,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.15"
      );
  }, []);

  if (done) return null;

  return (
    <div id="preloader" aria-hidden="true">
      <div className="pl-logo relative flex items-center justify-center text-ink">
        <span className="pl-ring absolute h-28 w-28 rounded-full border border-ink/15 md:h-32 md:w-32" />
        <LogoMark className="h-16 w-16 md:h-20 md:w-20" />
      </div>
    </div>
  );
}
