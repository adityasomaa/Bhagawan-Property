"use client";

import ContactForm from "@/components/ContactForm";
import { TransitionLink } from "@/components/motion/PageTransition";
import { useLocale } from "@/lib/i18n/provider";
import { usePropertyView } from "@/lib/overrides";
import { formatNumber, formatIDR } from "@/lib/format";
import type { Property } from "@/data/properties";

/** Detail-page sidebar: specifications, ROI shortcut, enquiry form. */
export default function PropertyAside({ property }: { property: Property }) {
  const { t, money } = useLocale();
  const p = usePropertyView(property);

  const tenureLabel = p.tenures
    .map((x) =>
      x === "leasehold"
        ? `${t("card.leasehold")}${p.leaseholdYears ? ` · ${p.leaseholdYears} ${t("card.yrs")}` : ""}`
        : t("card.freehold")
    )
    .join(" / ");

  const specs: { k: string; v: React.ReactNode }[] = [
    { k: "pd.tenure", v: tenureLabel },
    { k: "pd.type", v: t(`val.type.${p.type}`) },
    { k: "pd.locationLabel", v: `${p.areaName}, Bali` },
    { k: "pd.landSize", v: `${formatNumber(p.landSize)} m²` },
    ...(p.buildingSize ? [{ k: "pd.buildingSize", v: `${formatNumber(p.buildingSize)} m²` }] : []),
    ...(p.bedrooms > 0 ? [{ k: "pd.bedrooms", v: String(p.bedrooms) }] : []),
    ...(p.bathrooms > 0 ? [{ k: "pd.bathrooms", v: String(p.bathrooms) }] : []),
    { k: "pd.price", v: money(p.price) },
  ];

  return (
    <div className="rounded-3xl border border-line bg-paper p-7 md:p-9 lg:sticky lg:top-28">
      <h2 className="font-display text-xl text-ink">{t("pd.specifications")}</h2>
      <dl className="mt-5">
        {specs.map(({ k, v }) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-t border-line py-3 text-sm">
            <dt className="text-muted">{t(k)}</dt>
            <dd className="text-right font-medium capitalize text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      {p.nightlyRate && (
        <TransitionLink
          href={`/roi-calculator?price=${p.price}&nightly=${p.nightlyRate}&occupancy=${p.occupancy ?? 70}${p.tenures.includes("leasehold") && p.leaseholdYears ? `&years=${p.leaseholdYears}` : ""}`}
          className="mt-5 block rounded-full border border-ink/20 bg-cream p-4 text-center text-[10px] font-semibold tracking-[0.25em] uppercase text-ink transition-colors hover:border-ink"
        >
          {t("pd.runRoi")}
        </TransitionLink>
      )}
      <div className="mt-8">
        <h3 className="font-display text-xl text-ink">
          {t("pd.enquireAbout").replace("{name}", p.name)}
        </h3>
        <div className="mt-6">
          <ContactForm subject={`${p.name}, ${p.areaName} (${formatIDR(p.price)})`} />
        </div>
      </div>
    </div>
  );
}
