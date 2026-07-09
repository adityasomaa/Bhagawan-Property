"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice, formatPercent, formatNumber } from "@/lib/format";
import { useT } from "@/lib/i18n/provider";

function num(v: string | null, fallback: number, min: number, max: number) {
  const n = Number(v);
  return v && Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

type Mode = "freehold" | "leasehold";

export default function RoiCalculator() {
  const params = useSearchParams();
  const t = useT();

  const [mode, setMode] = useState<Mode>(() =>
    num(params.get("years"), 0, 0, 50) > 0 ? "leasehold" : "freehold"
  );
  const [price, setPrice] = useState(() => num(params.get("price"), 500000, 50000, 5000000));
  const [nightly, setNightly] = useState(() => num(params.get("nightly"), 350, 50, 3000));
  const [occupancy, setOccupancy] = useState(() => num(params.get("occupancy"), 70, 30, 95));
  const [mgmtFee, setMgmtFee] = useState(20);
  const [runningCosts, setRunningCosts] = useState(12000);
  const [taxRate, setTaxRate] = useState(10);
  const [leaseYears, setLeaseYears] = useState(() => num(params.get("years"), 27, 5, 50));
  const [appreciation, setAppreciation] = useState(6);
  const [holdYears, setHoldYears] = useState(10);

  const isLease = mode === "leasehold";

  const r = useMemo(() => {
    const nightsBooked = 365 * (occupancy / 100);
    const grossRevenue = nightly * nightsBooked;
    const managementCost = grossRevenue * (mgmtFee / 100);
    const tax = grossRevenue * (taxRate / 100);
    const netIncome = grossRevenue - managementCost - runningCosts - tax;
    const grossYield = (grossRevenue / price) * 100;
    const netYield = (netIncome / price) * 100;
    const paybackYears = netIncome > 0 ? price / netIncome : Infinity;

    const effectiveHold = isLease ? Math.min(holdYears, leaseYears) : holdYears;

    // Income over the hold period (flat, conservative — no rate growth assumed)
    const totalIncome = netIncome * effectiveHold;

    // Capital value at end of hold
    const endValue = isLease
      ? price * Math.max(0, (leaseYears - effectiveHold) / leaseYears) // straight-line amortisation
      : price * Math.pow(1 + appreciation / 100, effectiveHold);

    const totalReturn = totalIncome + endValue - price;
    const totalReturnPct = (totalReturn / price) * 100;
    const annualisedRoi = effectiveHold > 0 ? totalReturnPct / effectiveHold : 0;

    return {
      nightsBooked,
      grossRevenue,
      netIncome,
      grossYield,
      netYield,
      paybackYears,
      totalIncome,
      endValue,
      totalReturn,
      totalReturnPct,
      annualisedRoi,
      effectiveHold,
    };
  }, [price, nightly, occupancy, mgmtFee, runningCosts, taxRate, leaseYears, appreciation, holdYears, isLease]);

  const slider = (
    label: string,
    value: number,
    setValue: (n: number) => void,
    min: number,
    max: number,
    step: number,
    display: string,
    hint?: string
  ) => (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="eyebrow">{label}</label>
        <span className="font-display text-lg text-ink">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-3"
        aria-label={label}
      />
      {hint && <p className="mt-2 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
      {/* Inputs */}
      <div className="space-y-8 rounded-3xl border border-line bg-paper p-7 md:p-10">
        {/* Tenure tabs */}
        <div>
          <p className="eyebrow">{t("roi.tenure")}</p>
          <div
            role="tablist"
            aria-label="Property tenure"
            className="mt-3 grid grid-cols-2 gap-1.5 rounded-full border border-line bg-cream p-1.5"
          >
            {(["freehold", "leasehold"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full py-2.5 text-[11px] font-semibold capitalize tracking-[0.2em] uppercase transition-colors duration-300 ${
                  mode === m ? "bg-ink text-cream" : "text-muted hover:text-ink"
                }`}
              >
                {m === "freehold" ? t("roi.freehold") : t("roi.leasehold")}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {isLease ? t("roi.leaseHint") : t("roi.freeHint")}
          </p>
        </div>

        <div className="border-t border-line pt-8">
          <p className="font-display text-xl text-ink">{t("roi.property")}</p>
          <div className="mt-6 space-y-7">
            {slider(t("roi.purchasePrice"), price, setPrice, 100000, 3000000, 10000, formatPrice(price))}
            {isLease
              ? slider(
                  t("roi.remainingLease"),
                  leaseYears,
                  setLeaseYears,
                  5,
                  50,
                  1,
                  `${leaseYears} ${t("roi.years")}`,
                  t("roi.remainingLeaseHint")
                )
              : slider(
                  t("roi.appreciation"),
                  appreciation,
                  setAppreciation,
                  0,
                  15,
                  0.5,
                  `${appreciation}% / yr`,
                  t("roi.appreciationHint")
                )}
            {slider(
              t("roi.holdPeriod"),
              holdYears,
              setHoldYears,
              1,
              30,
              1,
              `${isLease ? Math.min(holdYears, leaseYears) : holdYears} ${t("roi.years")}`
            )}
          </div>
        </div>
        <div className="border-t border-line pt-8">
          <p className="font-display text-xl text-ink">{t("roi.rental")}</p>
          <div className="mt-6 space-y-7">
            {slider(t("roi.nightlyRate"), nightly, setNightly, 80, 1500, 10, formatPrice(nightly))}
            {slider(
              t("roi.occupancy"),
              occupancy,
              setOccupancy,
              30,
              95,
              1,
              `${occupancy}%`,
              t("roi.bookedNote").replace("{n}", String(Math.round(365 * (occupancy / 100))))
            )}
            {slider(t("roi.mgmtFee"), mgmtFee, setMgmtFee, 0, 35, 1, `${mgmtFee}%`)}
            {slider(
              t("roi.runningCosts"),
              runningCosts,
              setRunningCosts,
              0,
              60000,
              500,
              `${formatPrice(runningCosts)} / yr`,
              t("roi.runningHint")
            )}
            {slider(
              t("roi.taxRate"),
              taxRate,
              setTaxRate,
              0,
              20,
              1,
              `${taxRate}%`,
              t("roi.taxHint")
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-ink p-7 text-cream md:p-10">
          <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-white/60">
            {t("roi.projected")}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">{t("roi.grossYield")}</p>
              <p className="font-display mt-1.5 text-3xl text-cream">{formatPercent(r.grossYield)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">{t("roi.netYield")}</p>
              <p className="font-display mt-1.5 text-3xl text-white">{formatPercent(r.netYield)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">{t("roi.grossRev")}</p>
              <p className="font-display mt-1.5 text-2xl text-cream">{formatPrice(r.grossRevenue)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">{t("roi.netIncome")}</p>
              <p className="font-display mt-1.5 text-2xl text-cream">{formatPrice(r.netIncome)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">{t("roi.payback")}</p>
              <p className="font-display mt-1.5 text-2xl text-cream">
                {Number.isFinite(r.paybackYears) ? `${r.paybackYears.toFixed(1)} ${t("roi.yrs")}` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">{t("roi.bookedNights")}</p>
              <p className="font-display mt-1.5 text-2xl text-cream">{formatNumber(r.nightsBooked)}</p>
            </div>
          </div>

          <div className="mt-9 border-t border-cream/15 pt-7">
            <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">
              {t("roi.overHold").replace("{n}", String(r.effectiveHold))}
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-cream/60">{t("roi.totalNetIncome")}</span>
                <span className="font-medium">{formatPrice(r.totalIncome)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/60">
                  {isLease ? t("roi.remainingLeaseValue") : t("roi.projectedValue")}
                </span>
                <span className="font-medium">{formatPrice(r.endValue)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-cream/15 pt-3 text-base">
                <span className="text-cream/80">{t("roi.totalReturn")}</span>
                <span className={`font-display text-xl ${r.totalReturn >= 0 ? "text-white" : "text-red-300"}`}>
                  {formatPrice(r.totalReturn)} ({formatPercent(r.totalReturnPct, 0)})
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/60">{t("roi.annualised")}</span>
                <span className="font-medium text-white">{formatPercent(r.annualisedRoi)} / yr</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted">{t("roi.disclaimer")}</p>
      </div>
    </div>
  );
}
