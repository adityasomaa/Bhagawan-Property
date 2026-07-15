"use client";

import { useLocale } from "@/lib/i18n/provider";
import { usePropertyView } from "@/lib/overrides";
import PropertyTags from "@/components/PropertyTags";
import type { Property } from "@/data/properties";

/** Detail-page title block: tags, area/tenure eyebrow, name, price. */
export default function PropertyHeader({ property }: { property: Property }) {
  const { t, money } = useLocale();
  const p = usePropertyView(property);

  return (
    <div className="flex flex-wrap items-start justify-between gap-6">
      <div>
        <PropertyTags property={property} className="mb-3" />
        <p className="eyebrow">
          {p.areaName}, Bali &middot;{" "}
          {p.tenures.map((x) => (x === "leasehold" ? t("card.leasehold") : t("card.freehold"))).join(" / ")}
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {p.name}
        </h1>
      </div>
      <p className="font-display text-3xl font-medium text-ink md:text-4xl">{money(p.price)}</p>
    </div>
  );
}
