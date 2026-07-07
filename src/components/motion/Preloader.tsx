"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapClient";
import LogoMark from "@/components/Logo";

/**
 * First-visit preloader — logo + counting percentage. An inline <head>
 * script sets html[data-preloaded="1"] before paint on repeat visits, and
 * CSS hides the overlay entirely, so this only ever plays once per session.
 *
 * The element is removed via React state (never el.remove()) so React's
 * reconciler stays in sync during later route transitions.
 */
export default function Preloader() {
  const played = useRef(false);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

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
    const bar = el.querySelector(".pl-bar");

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

    // Drive the counter 0 → 100 through a tweened proxy.
    const counter = { v: 0 };

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
        { scale: 0.82, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
      )
      .to(
        counter,
        {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => setPct(Math.round(counter.v)),
        },
        "-=0.6"
      )
      .to(bar, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, "<")
      .add(ready, "+=0.2")
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
      <div className="flex flex-col items-center">
        <div className="pl-logo text-ink">
          <LogoMark className="h-16 w-16 md:h-20 md:w-20" />
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <span className="font-display text-sm font-medium tabular-nums tracking-[0.35em] text-ink">
            {String(pct).padStart(3, "0")}
          </span>
          <span className="relative block h-px w-40 overflow-hidden bg-ink/15 md:w-56">
            <span
              className="pl-bar absolute inset-0 origin-left bg-ink"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
