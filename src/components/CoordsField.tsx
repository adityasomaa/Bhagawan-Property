"use client";

import { useState } from "react";

export interface Coords {
  lat: number;
  lng: number;
}

// Bali bounding box — a coordinate outside this is almost certainly a typo
// (or lat/lng swapped), which would silently place the listing far away.
const BALI = { minLat: -8.95, maxLat: -8.03, minLng: 114.4, maxLng: 115.75 };

export function inBali(c: Coords) {
  return (
    c.lat >= BALI.minLat && c.lat <= BALI.maxLat && c.lng >= BALI.minLng && c.lng <= BALI.maxLng
  );
}

/** Accepts "-8.6478, 115.1385" — the format Google Maps copies to the clipboard. */
export function parseCoords(input: string): Coords | null {
  const m = input.trim().match(/^\s*(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = Number(m[1]);
  const lng = Number(m[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export const coordsToText = (c?: Coords) => (c ? `${c.lat}, ${c.lng}` : "");

const inputCls =
  "w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-bronze";

/**
 * Location input for /admin. The listing's point is entered as coordinates
 * (pasted from Google Maps); the site then draws a 500 m circle around it, so
 * the neighbourhood is right while the address stays private.
 */
export default function CoordsField({
  value,
  onChange,
}: {
  value?: Coords;
  onChange: (c: Coords | undefined) => void;
}) {
  const [text, setText] = useState(coordsToText(value));
  const parsed = parseCoords(text);
  const empty = text.trim() === "";
  const outside = parsed ? !inBali(parsed) : false;

  const commit = (raw: string) => {
    setText(raw);
    const c = parseCoords(raw);
    onChange(c && inBali(c) ? c : undefined);
  };

  return (
    <div>
      <input
        className={inputCls}
        value={text}
        onChange={(e) => commit(e.target.value)}
        placeholder="-8.6478, 115.1385"
        inputMode="decimal"
        aria-label="Coordinates"
      />
      {!empty && !parsed && (
        <p className="mt-1.5 text-[11px] text-red-600">
          Enter as <strong>latitude, longitude</strong> — e.g. -8.6478, 115.1385
        </p>
      )}
      {outside && (
        <p className="mt-1.5 text-[11px] text-red-600">
          That point isn&apos;t in Bali. Check the order — latitude first (≈ -8.x), then longitude
          (≈ 115.x).
        </p>
      )}
      {parsed && !outside && (
        <p className="mt-1.5 text-[11px] text-bronze">
          ✓ In Bali — the map will show a 1 km circle around this point.
        </p>
      )}
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
        In Google Maps, right-click the spot → click the coordinates to copy → paste here. Leave
        blank to fall back to the area centre. The exact point is never shown publicly.
      </p>
    </div>
  );
}
