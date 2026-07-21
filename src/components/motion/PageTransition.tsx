"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsapClient";

/**
 * Instant navigation — the curtain transition and preloader were removed by
 * request, so content just swaps. This keeps the old exports (TransitionLink
 * is used everywhere) but TransitionLink is now a plain next/link.
 *
 * On every route change: close the mobile menu, jump to the top, and refresh
 * ScrollTrigger so scroll-reveals measure the new page.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pt:close-menu"));
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}

type TransitionLinkProps = React.ComponentProps<typeof Link> & {
  href: string;
};

/** Historic name kept so call sites don't churn — now just a Link. */
export function TransitionLink({ href, children, ...rest }: TransitionLinkProps) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
