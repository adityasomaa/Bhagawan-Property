"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";

export interface HeroSlide {
  name: string;
  slug: string;
  caption: string;
  image: string;
}

const INTERVAL = 5000;

/**
 * Full-bleed hero background slider that cycles through Bali landmark
 * locations with a crossfade. The active location name is shown in a glass
 * chip that links to that area's guide. Pauses on tab blur / reduced motion.
 */
export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const start = () => {
      stop();
      timer.current = setInterval(() => {
        setActive((i) => (i + 1) % slides.length);
      }, INTERVAL);
    };
    const stop = () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length]);

  const go = (i: number) => {
    setActive(i);
    // restart the timer so a manual pick gets a full dwell
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = setInterval(
        () => setActive((n) => (n + 1) % slides.length),
        INTERVAL
      );
    }
  };

  const current = slides[active];

  return (
    <>
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.slug + i}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <Image
              src={s.image}
              alt={`${s.name}, Bali`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="scale-105 object-cover"
              style={{
                transform: i === active ? "scale(1.06)" : "scale(1)",
                transition: "transform 6s ease-out",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/40" />
      </div>

      {/* Location chip + dots — bottom right */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 md:bottom-10">
        <div className="container-x flex items-end justify-end">
          <div className="pointer-events-auto flex flex-col items-end gap-4">
            <TransitionLink
              href={`/areas/${current.slug}`}
              className="glass group flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-white transition-colors hover:bg-white/20"
            >
              <span className="flex flex-col text-right leading-tight">
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/60">
                  {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-medium tracking-tight">
                  {current.caption}
                </span>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </TransitionLink>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${s.name}`}
                  className="group h-2.5 py-1"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-500 ${
                      i === active ? "w-8 bg-white" : "w-4 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
