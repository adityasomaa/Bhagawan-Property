"use client";

import Reveal from "@/components/motion/Reveal";
import { useLocale } from "@/lib/i18n/provider";
import { propertyTr } from "@/data/tr/properties";
import type { Property } from "@/data/properties";

/** Localised description / highlights / features for a property detail page. */
export default function PropertyProse({ property }: { property: Property }) {
  const { lang, t } = useLocale();
  const tr = propertyTr[property.slug]?.[lang];

  const description = tr?.description ?? property.description;
  const highlights = tr?.highlights ?? property.highlights;
  const features = tr?.features ?? property.features;

  return (
    <>
      <Reveal delay={0.1}>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
          {description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display mt-14 text-2xl text-ink">{t("pd.highlights")}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex gap-4 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft"
            >
              <span className="mt-2 block h-px w-6 shrink-0 bg-ink" />
              {h}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="font-display mt-14 text-2xl text-ink">{t("pd.features")}</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-line bg-paper px-4 py-2 text-xs tracking-wide text-ink-soft"
            >
              {f}
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
