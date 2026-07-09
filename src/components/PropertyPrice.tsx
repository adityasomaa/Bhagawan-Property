"use client";

import { useLocale } from "@/lib/i18n/provider";
import { usePropertyView } from "@/lib/overrides";
import type { Property } from "@/data/properties";

/** A property's price in the active currency, honouring admin overrides. */
export default function PropertyPrice({ property }: { property: Property }) {
  const { money } = useLocale();
  const { price } = usePropertyView(property);
  return <>{money(price)}</>;
}
