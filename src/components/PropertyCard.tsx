"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import { formatNumber } from "@/lib/format";
import { useLocale } from "@/lib/i18n/provider";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const { t, money } = useLocale();

  return (
    <TransitionLink
      href={`/properties/${property.slug}`}
      className="group block"
      aria-label={`View ${property.name} in ${property.areaName}`}
    >
      <div className="img-frame relative aspect-[4/3] rounded-3xl">
        <Image
          src={property.images[0]}
          alt={`${property.name} — ${property.areaName}, Bali`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="glass-dark absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.24em] uppercase text-white">
          {property.tenure === "leasehold" ? t("card.leasehold") : t("card.freehold")}
          {property.tenure === "leasehold" && property.leaseholdYears
            ? ` · ${property.leaseholdYears} ${t("card.yrs")}`
            : ""}
        </span>
        <span className="glass-dark absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-white">
          {money(property.price)}
        </span>
      </div>
      <div className="px-1 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-muted md:text-2xl">
            {property.name}
          </h3>
          <span className="link-line shrink-0 text-[10px] font-semibold tracking-[0.2em] uppercase text-ink">
            {t("c.view")}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-medium tracking-[0.25em] uppercase text-muted">
          {property.areaName}, Bali
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
          {property.bedrooms > 0 && (
            <>
              <span>
                {property.bedrooms} {property.bedrooms > 1 ? t("c.beds") : t("c.bed")}
              </span>
              <span className="h-1 w-1 rounded-full bg-line" />
            </>
          )}
          <span>
            {formatNumber(property.landSize)} {t("c.landSuffix")}
          </span>
          {property.buildingSize && (
            <>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>
                {formatNumber(property.buildingSize)} {t("c.buildSuffix")}
              </span>
            </>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
