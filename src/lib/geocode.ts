import "server-only";

/**
 * Address → coordinates, via OpenStreetMap's Nominatim.
 *
 * Two guards matter here: an unconstrained lookup happily returns a match on
 * the wrong island (e.g. "Jalan Kayu Tulang" resolves to Sumatra), so the
 * search is bounded to Bali AND the result is re-checked against the bounding
 * box. Anything outside it is discarded — callers fall back to the area centre
 * rather than show a confidently wrong location.
 */

// minLon, maxLat, maxLon, minLat
const BALI_VIEWBOX = "114.40,-8.03,115.75,-8.95";
const BALI = { minLat: -8.95, maxLat: -8.03, minLng: 114.4, maxLng: 115.75 };

export interface Coords {
  lat: number;
  lng: number;
}

export function inBali({ lat, lng }: Coords) {
  return lat >= BALI.minLat && lat <= BALI.maxLat && lng >= BALI.minLng && lng <= BALI.maxLng;
}

export async function geocode(address: string): Promise<Coords | null> {
  const q = address.trim();
  if (!q) return null;

  const url =
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=id&bounded=1` +
    `&viewbox=${BALI_VIEWBOX}&q=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url, {
      headers: {
        // Nominatim's usage policy requires an identifying User-Agent.
        "User-Agent": "BhagawanProperty/1.0 (https://bhagawanproperty.com)",
        "Accept-Language": "en",
      },
      // The address rarely changes; let Next cache the lookup for a day.
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { lat: string; lon: string }[];
    if (!Array.isArray(data) || data.length === 0) return null;

    const hit = { lat: Number(data[0].lat), lng: Number(data[0].lon) };
    if (!Number.isFinite(hit.lat) || !Number.isFinite(hit.lng)) return null;
    return inBali(hit) ? hit : null;
  } catch {
    return null;
  }
}
