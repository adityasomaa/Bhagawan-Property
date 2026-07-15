import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, ACCESS_TOKEN } from "@/lib/auth";

/** True when the caller holds a valid admin/preview cookie. */
export async function isAdmin(): Promise<boolean> {
  return (await cookies()).get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;
}
