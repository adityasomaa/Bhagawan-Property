import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import {
  cmsConfigured,
  writeOverride,
  deleteOverride,
  deleteAllOverrides,
  createProperty,
  removeProperty,
  readContent,
} from "@/lib/cms";
import { getProperty } from "@/data/properties";
import { geocode } from "@/lib/geocode";

/**
 * Resolve an address to coordinates when it's set or changed. A failed or
 * out-of-Bali lookup clears coords so the map falls back to the area centre
 * rather than pointing somewhere wrong.
 */
async function withCoords<T extends { mapQuery?: string; coords?: { lat: number; lng: number } }>(
  data: T,
  previousAddress?: string
): Promise<T> {
  const address = data.mapQuery?.trim();
  if (!address) return data;
  if (address === previousAddress && data.coords) return data;
  const coords = await geocode(address);
  return { ...data, coords: coords ?? undefined };
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!cmsConfigured) return NextResponse.json({ error: "CMS not configured" }, { status: 503 });

  try {
    const body = await req.json();

    if (body.resetAll) {
      await deleteAllOverrides();
      return NextResponse.json({ ok: true });
    }

    // Create a new listing.
    if (body.create) {
      const p = body.property;
      if (!p?.slug || !p?.name) {
        return NextResponse.json({ error: "slug and name are required" }, { status: 400 });
      }
      const { customProperties } = await readContent();
      if (getProperty(p.slug) || customProperties.some((c) => c.slug === p.slug)) {
        return NextResponse.json({ error: "That URL slug is already taken" }, { status: 409 });
      }
      await createProperty(await withCoords(p));
      return NextResponse.json({ ok: true });
    }

    const slug = String(body.slug ?? "");
    if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

    // Delete (custom) / remove from the site (built-in).
    if (body.remove) {
      await removeProperty(slug, Boolean(getProperty(slug)));
      return NextResponse.json({ ok: true });
    }

    // Restore a removed built-in, or clear edits.
    if (body.reset || body.restore) {
      await deleteOverride(slug);
      return NextResponse.json({ ok: true });
    }

    const previousAddress = getProperty(slug)?.mapQuery;
    await writeOverride(slug, await withCoords(body.data ?? {}, previousAddress));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
