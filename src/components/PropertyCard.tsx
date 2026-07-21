"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import { formatNumber } from "@/lib/format";
import { useLocale } from "@/lib/i18n/provider";
import { usePropertyView } from "@/lib/overrides";
import PropertyTags from "@/components/PropertyTags";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const { t, money } = useLocale();
  const p = usePropertyView(property);

  return (
    <TransitionLink
      href={`/properties/${p.slug}`}
      className="group block"
      aria-label={t("card.viewAria").replace("{name}", p.name).replace("{area}", p.areaName)}
    >
      <div className="img-frame relative aspect-[4/3] rounded-3xl">
        <Image
          src={p.images[0]}
          alt={`${p.name} — ${p.areaName}, Bali`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        {/* One flowing row: tenure chip first, then the status tags beside it
            (display:contents lets the tag chips join this flex row directly). */}
        <div className="absolute inset-x-4 top-4 flex flex-wrap items-start gap-1.5">
          <span className="glass-dark rounded-full px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.24em] uppercase text-white">
            {p.tenures.map((x) => (x === "leasehold" ? t("card.leasehold") : t("card.freehold"))).join(" / ")}
            {p.tenures.includes("leasehold") && p.leaseholdYears ? ` · ${p.leaseholdYears} ${t("card.yrs")}` : ""}
          </span>
          <PropertyTags property={property} className="contents" />
        </div>
        <span className="glass-dark absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-white">
          {money(p.price)}
        </span>
      </div>
      <div className="px-1 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-muted md:text-2xl">
            {p.name}
          </h3>
          <span className="link-line shrink-0 text-[10px] font-semibold tracking-[0.2em] uppercase text-ink">
            {t("c.view")}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-medium tracking-[0.25em] uppercase text-muted">
          {p.areaName}, Bali
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
          {p.bedrooms > 0 && (
            <>
              <span>
                {p.bedrooms} {p.bedrooms > 1 ? t("c.beds") : t("c.bed")}
              </span>
              <span className="h-1 w-1 rounded-full bg-line" />
            </>
          )}
          <span>
            {formatNumber(p.landSize)} {t("c.landSuffix")}
          </span>
          {p.buildingSize && (
            <>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>
                {formatNumber(p.buildingSize)} {t("c.buildSuffix")}
              </span>
            </>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
