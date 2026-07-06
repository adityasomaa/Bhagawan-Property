"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}

/** Scroll-triggered fade-up reveal used across all sections. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

/** Refresh ScrollTrigger measurements after route swaps / image loads. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
