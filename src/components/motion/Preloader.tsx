"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapClient";
import LogoMark from "@/components/Logo";

/**
 * First-visit preloader. An inline <head> script sets
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
    const letters = el.querySelectorAll(".pl-letter");
    const line = el.querySelector(".pl-line");
    const sub = el.querySelector(".pl-sub");

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
    const fallback = setTimeout(finish, 6000);

    gsap
      .timeline({
        onComplete: () => {
          clearTimeout(fallback);
          finish();
        },
      })
      // Logo is visible from the first paint — this just settles it in.
      .fromTo(
        logo,
        { scale: 0.82, y: 8 },
        { scale: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 }
      )
      .to(
        letters,
        {
          yPercent: -100,
          duration: 0.9,
          stagger: 0.05,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .to(line, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.55")
      .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.45")
      .add(ready, "+=0.5")
      .to(el, {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
        delay: 0.1,
      });
  }, []);

  if (done) return null;

  return (
    <div id="preloader" aria-hidden="true">
      <div className="text-center">
        <div className="pl-logo mx-auto mb-7 text-ink">
          <LogoMark className="mx-auto h-16 w-16 md:h-20 md:w-20" />
        </div>
        <div className="flex justify-center overflow-hidden pb-1">
          {"BHAGAWAN".split("").map((ch, i) => (
            <span
              key={i}
              className="pl-letter font-display inline-block text-3xl font-medium tracking-[0.3em] text-ink md:text-5xl"
              style={{ transform: "translateY(110%)" }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div
          className="pl-line mx-auto mt-5 h-px w-40 bg-ink/40 md:w-56"
          style={{ transform: "scaleX(0)" }}
        />
        <p
          className="pl-sub mt-5 text-[10px] font-medium tracking-[0.55em] uppercase text-muted"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          Property &middot; Bali &middot; #Here4U
        </p>
      </div>
    </div>
  );
}
