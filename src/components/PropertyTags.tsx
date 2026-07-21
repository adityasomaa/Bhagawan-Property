"use client";

import { useT } from "@/lib/i18n/provider";
import { usePropertyView } from "@/lib/overrides";
import type { Property, PropertyTag } from "@/data/properties";

const STYLE: Record<PropertyTag, string> = {
  offplan: "bg-bronze text-cream",
  "new-listing": "bg-emerald-600 text-white",
  "price-drop": "bg-amber-500 text-ink",
  "great-value": "bg-teal-700 text-white",
  turnkey: "bg-bronze-deep text-cream",
  sold: "bg-ink text-cream",
};

/**
 * Marketing status badges for a property (offplan / new listing / price drop /
 * sold). Reads the admin override layer so /admin edits show immediately.
 */
export default function PropertyTags({
  property,
  // Replaces the wrapper's classes entirely — pass "contents" to let the
  // chips join a parent flex row as direct items.
  className = "flex flex-wrap gap-1.5",
}: {
  property: Property;
  className?: string;
}) {
  const t = useT();
  const tags = usePropertyView(property).tags ?? [];
  if (!tags.length) return null;

  return (
    <div className={className}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] uppercase shadow-sm ${STYLE[tag]}`}
        >
          {t(`tag.${tag}`)}
        </span>
      ))}
    </div>
  );
}
