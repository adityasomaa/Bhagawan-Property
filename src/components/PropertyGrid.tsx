"use client";

import Reveal from "@/components/motion/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/lib/overrides";

/**
 * A grid of published listings (admin-created + built-ins, minus removed),
 * filtered for the surface it's rendered on.
 */
export default function PropertyGrid({
  featured = false,
  tenure,
  area,
  limit,
  className = "mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3",
  empty,
}: {
  featured?: boolean;
  tenure?: "freehold" | "leasehold";
  area?: string;
  limit?: number;
  className?: string;
  empty?: React.ReactNode;
}) {
  let list = useProperties();
  if (featured) list = list.filter((p) => p.featured);
  if (tenure) list = list.filter((p) => p.tenure === tenure);
  if (area) list = list.filter((p) => p.area === area);
  if (limit) list = list.slice(0, limit);

  if (list.length === 0 && empty) return <>{empty}</>;

  return (
    <div className={className}>
      {list.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.1}>
          <PropertyCard property={p} />
        </Reveal>
      ))}
    </div>
  );
}
