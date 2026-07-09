// Soft access gate for the pre-launch "under construction" phase. This is a
// preview lock, not hardened security — credentials live server-side (used
// only by middleware + the login/logout route handlers, never shipped to the
// client bundle).

export const ADMIN_USER = "joseph";
export const ADMIN_PASS = "Joseph@2026#!";

export const ACCESS_COOKIE = "bp_access";
/** Opaque token stored in the cookie once a visitor unlocks the preview. */
export const ACCESS_TOKEN = "bhagawan-preview-2026-6f4c9ad1e7b240";

export function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
}
