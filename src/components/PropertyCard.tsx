import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import { formatNumber, formatPrice } from "@/lib/format";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <TransitionLink
      href={`/properties/${property.slug}`}
      className="group block"
      aria-label={`View ${property.name} in ${property.areaName}`}
    >
      <div className="img-frame relative aspect-[4/3]">
        <Image
          src={property.images[0]}
          alt={`${property.name} — ${property.areaName}, Bali`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 bg-cream/95 px-3 py-1.5 text-[9px] font-semibold tracking-[0.28em] uppercase text-ink">
          {property.tenure}
          {property.tenure === "leasehold" && property.leaseholdYears
            ? ` · ${property.leaseholdYears} yrs`
            : ""}
        </span>
      </div>
      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-bronze-deep md:text-2xl">
            {property.name}
          </h3>
          <span className="shrink-0 text-sm font-semibold tracking-wide text-ink">
            {formatPrice(property.price)}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-medium tracking-[0.25em] uppercase text-muted">
          {property.areaName}, Bali
        </p>
        <div className="mt-4 flex items-center gap-5 border-t border-line pt-4 text-xs text-ink-soft">
          {property.bedrooms > 0 && (
            <span>
              {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
            </span>
          )}
          <span>{formatNumber(property.landSize)} m² land</span>
          {property.buildingSize && <span>{formatNumber(property.buildingSize)} m² build</span>}
          <span className="link-line ml-auto hidden text-[10px] font-medium tracking-[0.2em] uppercase text-bronze-deep sm:inline">
            View
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}
