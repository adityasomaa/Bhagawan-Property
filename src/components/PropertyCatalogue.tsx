"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";
import { areas } from "@/data/areas";

const priceBands = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $400k", min: 0, max: 400000 },
  { label: "$400k – $800k", min: 400000, max: 800000 },
  { label: "$800k – $1.2m", min: 800000, max: 1200000 },
  { label: "Over $1.2m", min: 1200000, max: Infinity },
];

const landBands = [
  { label: "Any land size", min: 0, max: Infinity },
  { label: "Under 400 m²", min: 0, max: 400 },
  { label: "400 – 800 m²", min: 400, max: 800 },
  { label: "Over 800 m²", min: 800, max: Infinity },
];

export default function PropertyCatalogue({ items }: { items: Property[] }) {
  const [area, setArea] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState(0);
  const [beds, setBeds] = useState(0);
  const [land, setLand] = useState(0);

  const filtered = useMemo(() => {
    const pb = priceBands[price];
    const lb = landBands[land];
    return items.filter(
      (p) =>
        (area === "all" || p.area === area) &&
        (type === "all" || p.type === type) &&
        p.price >= pb.min &&
        p.price < pb.max &&
        (beds === 0 || p.bedrooms >= beds) &&
        p.landSize >= lb.min &&
        p.landSize < lb.max
    );
  }, [items, area, type, price, beds, land]);

  return (
    <div>
      <div className="grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block">
          <span className="eyebrow">Area</span>
          <select className="field mt-1" value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="all">All areas</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Property type</span>
          <select className="field mt-1" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All types</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Price</span>
          <select
            className="field mt-1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            {priceBands.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Bedrooms</span>
          <select
            className="field mt-1"
            value={beds}
            onChange={(e) => setBeds(Number(e.target.value))}
          >
            <option value={0}>Any</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Land size</span>
          <select
            className="field mt-1"
            value={land}
            onChange={(e) => setLand(Number(e.target.value))}
          >
            {landBands.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-[11px] font-medium tracking-[0.25em] uppercase text-muted">
        {filtered.length} propert{filtered.length === 1 ? "y" : "ies"} found
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-line bg-paper p-14 text-center">
          <p className="font-display text-2xl text-ink">Nothing matches those filters — yet.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            Our best properties often sell before they reach the website. Tell us what you&apos;re
            looking for and we&apos;ll search privately on your behalf.
          </p>
        </div>
      )}
    </div>
  );
}
