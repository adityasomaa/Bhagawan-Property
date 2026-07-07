"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsapClient";
import LogoMark from "@/components/Logo";

/**
 * Page transitions with a guaranteed sequence:
 *   1. curtain CLOSES over the page
 *   2. route content swaps behind it
 *   3. window scrolls to top instantly (still covered)
 *   4. curtain OPENS
 *
 * The curtain is driven by CSS transitions (compositor thread), so
 * main-thread jank can never desync it, and the route only changes after
 * the curtain's own `transitionend` confirms it is fully closed.
 */
const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

/** Wait for the curtain's transform transition to finish (with a hard cap). */
function afterTransition(el: HTMLElement, capMs: number) {
  return new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener("transitionend", onEnd);
      clearTimeout(timer);
      resolve();
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.target === el && e.propertyName === "transform") finish();
    };
    el.addEventListener("transitionend", onEnd);
    const timer = setTimeout(finish, capMs);
  });
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (busyRef.current) return;
      const [path] = href.split("#");
      if (path === pathname || path === "") {
        // Same page — just glide to top (or anchor) without a curtain.
        window.dispatchEvent(new CustomEvent("pt:close-menu"));
        const hash = href.includes("#") ? `#${href.split("#")[1]}` : 0;
        import("./SmoothScroll").then(({ scrollToTarget }) =>
          scrollToTarget(hash === 0 ? 0 : (hash as string))
        );
        return;
      }

      const curtain = document.getElementById("transition-curtain");
      if (!curtain) {
        router.push(href);
        return;
      }

      busyRef.current = true;
      pendingRef.current = href;
      window.dispatchEvent(new CustomEvent("pt:close-menu"));
      window.__lenis?.stop();

      // Phase 1 — CLOSE. The route changes only after the curtain has
      // fully covered the viewport.
      curtain.classList.add("is-animating");
      // Force a style flush so the transition reliably starts from 102%.
      void curtain.getBoundingClientRect();
      curtain.classList.add("is-closed");

      afterTransition(curtain, 1400).then(() => {
        router.push(href);
      });
    },
    [pathname, router]
  );

  // Phase 2+3+4 — route committed behind the closed curtain: scroll to top,
  // let the new hero image decode, then open.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = null;

    const curtain = document.getElementById("transition-curtain");

    // Instant scroll-to-top while covered.
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const finish = () => {
      busyRef.current = false;
      window.__lenis?.start();
    };

    if (!curtain) {
      finish();
      return;
    }

    // Let the new page's hero image finish decoding behind the curtain so
    // the reveal shows a fully painted page (capped so it can never hang).
    const img = document.querySelector<HTMLImageElement>("main img");
    const heroReady =
      !img || img.complete
        ? Promise.resolve()
        : Promise.race([
            img.decode().catch(() => {}),
            new Promise((r) => setTimeout(r, 1200)),
          ]);

    let cancelled = false;
    heroReady
      .then(() => new Promise((r) => setTimeout(r, 300))) // settle beat
      .then(() => {
        if (cancelled) return;
        curtain.classList.add("is-opening");
        return afterTransition(curtain, 1400);
      })
      .then(() => {
        if (cancelled) return;
        // Reset to the resting position (below the viewport) without
        // animating: drop the transition class first.
        curtain.classList.remove("is-animating");
        curtain.classList.remove("is-closed", "is-opening");
        finish();
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div id="transition-curtain" aria-hidden="true">
        <div className="curtain-mark">
          <LogoMark className="h-16 w-16 text-cream md:h-20 md:w-20" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = React.ComponentProps<typeof Link> & {
  href: string;
};

/** Drop-in Link that routes through the curtain transition. */
export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          (rest.target && rest.target !== "_self")
        ) {
          return;
        }
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
