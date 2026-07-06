"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapClient";
import LogoMark from "@/components/Logo";

/**
 * First-visit preloader. An inline <head> script sets
 * html[data-preloaded="1"] before paint on repeat visits, and CSS hides the
 * overlay entirely, so this only ever plays once per session.
 *
 * NOTE: the element is removed via React state (never el.remove()) so React's
 * reconciler stays in sync during later route transitions.
 */
export default function Preloader() {
  const played = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const el = document.getElementById("preloader");
    if (!el || document.documentElement.dataset.preloaded === "1") {
      document.documentElement.dataset.appReady = "1";
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

    const finish = () => {
      document.documentElement.dataset.appReady = "1";
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
      .to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      })
      .to(
        letters,
        {
          yPercent: -100,
          duration: 0.9,
          stagger: 0.055,
          ease: "power4.out",
        },
        "-=0.45"
      )
      .to(line, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.55")
      .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.45")
      .add(() => {
        document.documentElement.dataset.appReady = "1";
      }, "+=0.55")
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
        <div
          className="pl-logo mx-auto mb-6 text-bronze"
          style={{ opacity: 0, transform: "scale(0.85)" }}
        >
          <LogoMark className="mx-auto h-14 w-14 md:h-16 md:w-16" />
        </div>
        <div className="flex justify-center overflow-hidden pb-1">
          {"BHAGAWAN".split("").map((ch, i) => (
            <span
              key={i}
              className="pl-letter font-display inline-block translate-y-full text-4xl tracking-[0.3em] text-ink md:text-6xl"
              style={{ transform: "translateY(110%)" }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div
          className="pl-line mx-auto mt-5 h-px w-40 bg-bronze md:w-56"
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
