"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Select from "@/components/Select";
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
        <Select
          label="Area"
          value={area}
          onChange={setArea}
          options={[
            { value: "all", label: "All areas" },
            ...areas.map((a) => ({ value: a.slug, label: a.name })),
          ]}
        />
        <Select
          label="Property type"
          value={type}
          onChange={setType}
          options={[
            { value: "all", label: "All types" },
            { value: "villa", label: "Villa" },
            { value: "townhouse", label: "Townhouse" },
            { value: "land", label: "Land" },
          ]}
        />
        <Select
          label="Price"
          value={String(price)}
          onChange={(v) => setPrice(Number(v))}
          options={priceBands.map((b, i) => ({ value: String(i), label: b.label }))}
        />
        <Select
          label="Bedrooms"
          value={String(beds)}
          onChange={(v) => setBeds(Number(v))}
          options={[
            { value: "0", label: "Any" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
            { value: "5", label: "5+" },
          ]}
        />
        <Select
          label="Land size"
          value={String(land)}
          onChange={(v) => setLand(Number(v))}
          options={landBands.map((b, i) => ({ value: String(i), label: b.label }))}
        />
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
