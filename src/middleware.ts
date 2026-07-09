import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, ACCESS_TOKEN } from "@/lib/auth";

// While the site is "under construction", every page is rewritten to the
// gate unless the visitor has unlocked the preview. Static assets, the API
// routes, and files with an extension are excluded via the matcher below.
const GATE = "/under-construction";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = req.cookies.get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;

  // Unlocked preview: full site, and skip the gate page.
  if (authed) {
    if (pathname === GATE) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Locked: let the gate itself render; rewrite everything else onto it
  // (URL is preserved so deep links still work once unlocked).
  if (pathname === GATE) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = GATE;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
