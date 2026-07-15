"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/data/properties";
import { areas } from "@/data/areas";
import { useProperties } from "@/lib/overrides";
import { formatIDR } from "@/lib/format";

/**
 * Interactive Bali map with one pin per property. Pins sit at the property's
 * AREA centre (plus a small deterministic spread so listings in the same area
 * don't overlap) — never an exact address. Clicking a pin opens that property.
 * Leaflet is imported lazily inside the effect so it never runs during SSR.
 */

const PIN_SVG = `
<svg width="30" height="38" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))">
  <path d="M12 0C5.4 0 0 5.3 0 11.9 0 20 12 32 12 32s12-12 12-20.1C24 5.3 18.6 0 12 0z" fill="#834c25"/>
  <circle cx="12" cy="11.6" r="4.4" fill="#F5F0E8"/>
</svg>`;

function pins(properties: Property[]) {
  const byArea = new Map<string, Property[]>();
  for (const p of properties) {
    const list = byArea.get(p.area) ?? [];
    list.push(p);
    byArea.set(p.area, list);
  }
  const out: { slug: string; name: string; areaName: string; price: number; lat: number; lng: number }[] = [];
  for (const [areaSlug, list] of byArea) {
    const base = areas.find((a) => a.slug === areaSlug)?.coords ?? { lat: -8.7, lng: 115.17 };
    list.forEach((p, i) => {
      const angle = list.length > 1 ? (i / list.length) * Math.PI * 2 : 0;
      const r = list.length > 1 ? 0.007 : 0; // ~700 m area-level spread
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
      map = L.map(el, { scrollWheelZoom: false, attributionControl: true }).setView([-8.71, 115.17], 11);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);

      const icon = L.divIcon({
        className: "bp-pin",
        html: PIN_SVG,
        iconSize: [30, 38],
        iconAnchor: [15, 38],
        tooltipAnchor: [0, -34],
      });

      const group: import("leaflet").Marker[] = [];
      for (const d of data) {
        const m = L.marker([d.lat, d.lng], { icon, title: d.name })
          .addTo(map)
          .bindTooltip(
            `<strong>${d.name}</strong><br>${d.areaName} · ${formatIDR(d.price)}`,
            { direction: "top", opacity: 1 }
          )
          .on("click", () => router.push(`/properties/${d.slug}`));
        group.push(m);
      }

      if (data.length > 1) {
        map.fitBounds(L.featureGroup(group).getBounds().pad(0.25));
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
