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
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import LogoMark from "@/components/Logo";

/**
 * Page transitions: on click the curtain CLOSES over the page, the route
 * content swaps behind it, the window scrolls to top instantly, then the
 * curtain OPENS. All the change happens while the page is covered.
 */
const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);
  const closeTlRef = useRef<gsap.core.Timeline | null>(null);

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

      busyRef.current = true;
      pendingRef.current = href;
      window.dispatchEvent(new CustomEvent("pt:close-menu"));
      window.__lenis?.stop();

      const curtain = document.getElementById("transition-curtain");
      const mark = curtain?.querySelector(".curtain-mark");
      if (!curtain || !mark) {
        router.push(href);
        return;
      }

      // Safety net: if rAF is throttled (background tab), never strand the
      // user — force the route change after a grace period.
      let pushed = false;
      const push = () => {
        if (pushed) return;
        pushed = true;
        router.push(href);
      };
      const fallback = setTimeout(push, 3500);

      // The route only changes in onComplete — i.e. strictly AFTER the
      // curtain has fully covered the page. Sequence: close → change
      // content → scroll top → open.
      closeTlRef.current = gsap
        .timeline({
          onComplete: () => {
            clearTimeout(fallback);
            push();
          },
        })
        .set(curtain, { yPercent: 101 })
        .set(mark, { opacity: 0, y: 28 })
        .to(curtain, { yPercent: 0, duration: 1.0, ease: "power4.inOut" })
        .to(mark, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    },
    [pathname, router]
  );

  // Route committed behind the closed curtain: scroll to top, then open.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = null;

    // The close timeline has served its purpose — make sure a throttled
    // remnant can never resume and re-cover the page.
    closeTlRef.current?.kill();
    closeTlRef.current = null;

    // Instant scroll-to-top while covered.
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const curtain = document.getElementById("transition-curtain");
    const mark = curtain?.querySelector(".curtain-mark");
    if (!curtain || !mark) {
      busyRef.current = false;
      window.__lenis?.start();
      return;
    }

    let finished = false;
    let tl: gsap.core.Timeline | null = null;
    const finish = () => {
      if (finished) return;
      finished = true;
      busyRef.current = false;
      window.__lenis?.start();
    };

    // Let the new page's hero image finish decoding behind the curtain so
    // the reveal shows a fully painted page (capped so it can never hang).
    const heroReady = () => {
      const img = document.querySelector<HTMLImageElement>("main img");
      if (!img || img.complete) return Promise.resolve();
      return Promise.race([
        img.decode().catch(() => {}),
        new Promise((r) => setTimeout(r, 1200)),
      ]);
    };

    heroReady().then(() => {
      if (finished) return;
      tl = gsap
        .timeline({ delay: 0.3 })
        .to(mark, { opacity: 0, y: -22, duration: 0.45, ease: "power2.in" })
        .to(curtain, { yPercent: -101, duration: 1.1, ease: "power4.inOut" }, "-=0.15")
        .set(curtain, { yPercent: 101 })
        .add(finish);
    });

    // Safety net: if rAF is throttled, snap the curtain away instead of
    // leaving the page covered and navigation locked.
    setTimeout(() => {
      if (finished) return;
      tl?.kill();
      gsap.set(curtain, { yPercent: 101 });
      gsap.set(mark, { opacity: 0 });
      finish();
    }, 4500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div id="transition-curtain" aria-hidden="true">
        <div className="curtain-mark text-center">
          <LogoMark className="mx-auto mb-5 h-12 w-12 text-bronze" />
          <span className="font-display block text-2xl tracking-[0.35em] uppercase md:text-3xl">
            Bhagawan
          </span>
          <span className="mt-2 block text-[10px] tracking-[0.5em] uppercase opacity-60">
            #Here4U
          </span>
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
