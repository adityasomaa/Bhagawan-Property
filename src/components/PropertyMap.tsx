"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/data/properties";
import { areas } from "@/data/areas";
import { useProperties } from "@/lib/overrides";
import { formatIDR } from "@/lib/format";

/**
 * Interactive Bali map showing each property as an approximate AREA — a radius
 * circle centred on the property's area (plus a small deterministic spread so
 * listings in the same area don't sit on top of each other), never an exact
 * address. Clicking a circle opens that property. Leaflet is imported lazily
 * inside the effect so it never runs during SSR.
 */

/** The circle drawn around a listing's precise point, so the map communicates
    a neighbourhood rather than an address. */
export const AREA_RADIUS_M = 2000;

function pins(properties: Property[]) {
  // Listings without a geocoded point fall back to their area centre, spread
  // slightly so several in the same area don't sit exactly on top of one another.
  const fallbackByArea = new Map<string, Property[]>();
  for (const p of properties) {
    if (p.coords) continue;
    const list = fallbackByArea.get(p.area) ?? [];
    list.push(p);
    fallbackByArea.set(p.area, list);
  }

  const out: { slug: string; name: string; areaName: string; price: number; lat: number; lng: number }[] = [];

  for (const p of properties) {
    if (!p.coords) continue;
    out.push({
      slug: p.slug,
      name: p.name,
      areaName: p.areaName,
      price: p.price,
      lat: p.coords.lat,
      lng: p.coords.lng,
    });
  }

  for (const [areaSlug, list] of fallbackByArea) {
    const base = areas.find((a) => a.slug === areaSlug)?.coords ?? { lat: -8.7, lng: 115.17 };
    list.forEach((p, i) => {
      const angle = list.length > 1 ? (i / list.length) * Math.PI * 2 : 0;
      const r = list.length > 1 ? 0.012 : 0;
      out.push({
        slug: p.slug,
        name: p.name,
        areaName: p.areaName,
        price: p.price,
        lat: base.lat + Math.cos(angle) * r,
        lng: base.lng + Math.sin(angle) * r,
      });
    });
  }
  return out;
}

export default function PropertyMap({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const properties = useProperties();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el) return;

      const data = pins(properties);
      map = L.map(el, { scrollWheelZoom: false, attributionControl: true }).setView([-8.71, 115.17], 12);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);

      // A radius circle per listing — the area it sits in, not a exact point.
      const group: import("leaflet").Circle[] = [];
      for (const d of data) {
        const c = L.circle([d.lat, d.lng], {
          radius: AREA_RADIUS_M,
          color: "#834c25",
          weight: 1.5,
          opacity: 0.9,
          fillColor: "#834c25",
          fillOpacity: 0.16,
          className: "bp-area",
        })
          .addTo(map)
          .bindTooltip(
            `<strong>${d.name}</strong><br>${d.areaName} · ${formatIDR(d.price)}`,
            { direction: "top", opacity: 1, sticky: true }
          )
          .on("click", () => router.push(`/properties/${d.slug}`))
          .on("mouseover", () => c.setStyle({ fillOpacity: 0.3 }))
          .on("mouseout", () => c.setStyle({ fillOpacity: 0.16 }));
        group.push(c);
      }

      if (data.length > 1) {
        map.fitBounds(L.featureGroup(group).getBounds().pad(0.05));
      }
      setTimeout(() => map?.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [router, properties]);

  return <div ref={ref} className={`bp-map ${className}`} aria-label="Map of our properties across Bali" />;
}
