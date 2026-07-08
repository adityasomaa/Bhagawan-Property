"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Keeps a panel mounted through its exit animation. Returns `mounted`
 * (render the node) and `show` (apply the visible class). Toggling `show`
 * a frame after mount drives the CSS enter/exit transition.
 */
export function useMountTransition(open: boolean, duration = 240) {
  const [mounted, setMounted] = useState(open);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let enter: ReturnType<typeof setTimeout> | undefined;
    let exit: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      setMounted(true);
      // Flip to the visible state a tick after mount so the CSS transition
      // runs. setTimeout (not rAF) keeps this working in background tabs.
      enter = setTimeout(() => setShow(true), 30);
    } else {
      setShow(false);
      exit = setTimeout(() => setMounted(false), duration);
    }
    return () => {
      if (enter) clearTimeout(enter);
      if (exit) clearTimeout(exit);
    };
  }, [open, duration]);

  return { mounted, show };
}

/**
 * Detects whether the background behind a fixed element is dark or light by
 * sampling the nearest [data-tone] ancestor at the element's centre — the
 * same idea the header uses, but resolved live for floating controls.
 */
export function useBackdropTone(ref: RefObject<HTMLElement | null>): "light" | "dark" {
  const [tone, setTone] = useState<"light" | "dark">("light");
  const raf = useRef(0);

  useEffect(() => {
    const sample = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const stack = document.elementsFromPoint(x, y);
      let dark = false;
      for (const node of stack) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.closest("[data-floating]")) continue;
        const marked = node.closest<HTMLElement>("[data-tone]");
        if (marked) {
          dark = marked.dataset.tone === "dark";
          break;
        }
      }
      setTone((t) => (dark ? "dark" : "light") === t ? t : dark ? "dark" : "light");
    };

    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // catch background changes not tied to scroll (hero slider, route swaps)
    const interval = setInterval(sample, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(interval);
      cancelAnimationFrame(raf.current);
    };
  }, [ref]);

  return tone;
}
