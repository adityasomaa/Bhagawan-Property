"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Select from "@/components/Select";
import { useLocale } from "@/lib/i18n/provider";
import type { Property } from "@/data/properties";
import { areas } from "@/data/areas";

const priceBands = [
  { min: 0, max: Infinity },
  { min: 0, max: 3_000_000_000 },
  { min: 3_000_000_000, max: 4_000_000_000 },
  { min: 4_000_000_000, max: 5_000_000_000 },
  { min: 5_000_000_000, max: Infinity },
];

const landBands = [
  { key: "f.anyLand", min: 0, max: Infinity },
  { key: "< 150 m²", min: 0, max: 150 },
  { key: "150 – 250 m²", min: 150, max: 250 },
  { key: "> 250 m²", min: 250, max: Infinity },
];

export default function PropertyCatalogue({ items }: { items: Property[] }) {
  const { t, money } = useLocale();
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
          label={t("f.area")}
          value={area}
          onChange={setArea}
          options={[
            { value: "all", label: t("f.allAreas") },
            ...areas.map((a) => ({ value: a.slug, label: a.name })),
          ]}
        />
        <Select
          label={t("f.type")}
          value={type}
          onChange={setType}
          options={[
            { value: "all", label: t("f.allTypes") },
            { value: "villa", label: t("f.villa") },
            { value: "townhouse", label: t("f.townhouse") },
            { value: "land", label: t("f.land") },
          ]}
        />
        <Select
          label={t("f.price")}
          value={String(price)}
          onChange={(v) => setPrice(Number(v))}
          options={priceBands.map((b, i) => ({
            value: String(i),
            label:
              i === 0
                ? t("f.anyPrice")
                : b.max === Infinity
                  ? `${money(b.min)}+`
                  : `${money(b.min)} – ${money(b.max)}`,
          }))}
        />
        <Select
          label={t("f.bedrooms")}
          value={String(beds)}
          onChange={(v) => setBeds(Number(v))}
          options={[
            { value: "0", label: t("f.any") },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
            { value: "5", label: "5+" },
          ]}
        />
        <Select
          label={t("f.landSize")}
          value={String(land)}
          onChange={(v) => setLand(Number(v))}
          options={landBands.map((b, i) => ({
            value: String(i),
            label: i === 0 ? t("f.anyLand") : b.key,
          }))}
        />
      </div>

      <p className="mt-6 text-[11px] font-medium tracking-[0.25em] uppercase text-muted">
        {filtered.length} {filtered.length === 1 ? t("f.found1") : t("f.foundN")}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-line bg-paper p-14 text-center">
          <p className="font-display text-2xl text-ink">{t("f.emptyT")}</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{t("f.emptyB")}</p>
        </div>
      )}
    </div>
  );
}
