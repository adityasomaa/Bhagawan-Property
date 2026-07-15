"use client";

import Gallery from "@/components/Gallery";
import { usePropertyView } from "@/lib/overrides";
import type { Property } from "@/data/properties";

/** Gallery for a property, using its admin-managed photo set. */
export default function PropertyGallery({ property }: { property: Property }) {
  const p = usePropertyView(property);
  return <Gallery images={p.images} name={p.name} />;
}
