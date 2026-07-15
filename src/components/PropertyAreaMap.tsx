"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { areas } from "@/data/areas";
import { usePropertyView } from "@/lib/overrides";
import { AREA_RADIUS_M } from "@/components/PropertyMap";
import type { Property } from "@/data/properties";

/**
 * Detail-page location map: a radius circle over the property's area rather
 * than a pin on the address. The exact address is only shared after an
 * introductory call, so the map deliberately shows a neighbourhood, not a point.
 */
export default function PropertyAreaMap({ property }: { property: Property }) {
  const p = usePropertyView(property);
  const ref = useRef<HTMLDivElement>(null);
  // The geocoded address when we have one, else the area centre.
  const fallback = areas.find((a) => a.slug === p.area)?.coords;
  const lat = p.coords?.lat ?? fallback?.lat ?? -8.71;
  const lng = p.coords?.lng ?? fallback?.lng ?? 115.17;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el) return;

      map = L.map(el, {
        scrollWheelZoom: false,
        attributionControl: true,
        dragging: true,
      }).setView([lat, lng], 14);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap &copy; CARTO",
      }).addTo(map);

      const circle = L.circle([lat, lng], {
        radius: AREA_RADIUS_M,
        color: "#834c25",
        weight: 1.5,
        opacity: 0.9,
        fillColor: "#834c25",
        fillOpacity: 0.16,
      }).addTo(map);

      map.fitBounds(circle.getBounds().pad(0.25));
      setTimeout(() => map?.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lng]);

  return (
    <div
      ref={ref}
      className="bp-map bp-map--flat"
      aria-label={`Approximate area of ${p.name} in ${p.areaName}, Bali`}
    />
  );
}
