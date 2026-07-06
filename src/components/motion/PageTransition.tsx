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
      const fallback = setTimeout(push, 2500);

      closeTlRef.current = gsap
        .timeline()
        .set(curtain, { yPercent: 101 })
        .set(mark, { opacity: 0, y: 24 })
        .to(curtain, { yPercent: 0, duration: 0.8, ease: "power4.inOut" })
        .to(mark, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .add(() => {
          clearTimeout(fallback);
          push();
        });
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
    const finish = () => {
      if (finished) return;
      finished = true;
      busyRef.current = false;
      window.__lenis?.start();
    };

    const tl = gsap
      .timeline({ delay: 0.35 }) // let the new page settle behind the curtain
      .to(mark, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
      .to(curtain, { yPercent: -101, duration: 0.9, ease: "power4.inOut" }, "-=0.15")
      .set(curtain, { yPercent: 101 })
      .add(finish);

    // Safety net: if rAF is throttled, snap the curtain away instead of
    // leaving the page covered and navigation locked.
    setTimeout(() => {
      if (finished) return;
      tl.kill();
      gsap.set(curtain, { yPercent: 101 });
      gsap.set(mark, { opacity: 0 });
      finish();
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div id="transition-curtain" aria-hidden="true">
        <div className="curtain-mark text-center">
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
