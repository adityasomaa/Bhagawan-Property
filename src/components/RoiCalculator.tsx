"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice, formatPercent, formatNumber } from "@/lib/format";

function num(v: string | null, fallback: number, min: number, max: number) {
  const n = Number(v);
  return v && Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

export default function RoiCalculator() {
  const params = useSearchParams();

  const [price, setPrice] = useState(() => num(params.get("price"), 500000, 50000, 5000000));
  const [nightly, setNightly] = useState(() => num(params.get("nightly"), 350, 50, 3000));
  const [occupancy, setOccupancy] = useState(() => num(params.get("occupancy"), 70, 30, 95));
  const [mgmtFee, setMgmtFee] = useState(20);
  const [runningCosts, setRunningCosts] = useState(12000);
  const [taxRate, setTaxRate] = useState(10);
  const [leaseYears, setLeaseYears] = useState(() => num(params.get("years"), 0, 0, 50)); // 0 = freehold
  const [appreciation, setAppreciation] = useState(6);
  const [holdYears, setHoldYears] = useState(10);

  const r = useMemo(() => {
    const nightsBooked = 365 * (occupancy / 100);
    const grossRevenue = nightly * nightsBooked;
    const managementCost = grossRevenue * (mgmtFee / 100);
    const tax = grossRevenue * (taxRate / 100);
    const netIncome = grossRevenue - managementCost - runningCosts - tax;
    const grossYield = (grossRevenue / price) * 100;
    const netYield = (netIncome / price) * 100;
    const paybackYears = netIncome > 0 ? price / netIncome : Infinity;

    const isLease = leaseYears > 0;
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
      isLease,
    };
  }, [price, nightly, occupancy, mgmtFee, runningCosts, taxRate, leaseYears, appreciation, holdYears]);

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
        <div>
          <p className="font-display text-xl text-ink">The property</p>
          <div className="mt-6 space-y-7">
            {slider("Purchase price", price, setPrice, 100000, 3000000, 10000, formatPrice(price))}
            {slider(
              "Tenure",
              leaseYears,
              setLeaseYears,
              0,
              50,
              1,
              leaseYears === 0 ? "Freehold" : `Leasehold · ${leaseYears} yrs`,
              "Slide to 0 for freehold. For leasehold, set the remaining lease years."
            )}
            {leaseYears === 0 &&
              slider(
                "Assumed appreciation",
                appreciation,
                setAppreciation,
                0,
                15,
                0.5,
                `${appreciation}% / yr`,
                "Long-run land appreciation assumption for freehold."
              )}
            {slider(
              "Hold period",
              holdYears,
              setHoldYears,
              1,
              30,
              1,
              `${Math.min(holdYears, leaseYears || 99)} years`
            )}
          </div>
        </div>
        <div className="border-t border-line pt-8">
          <p className="font-display text-xl text-ink">The rental operation</p>
          <div className="mt-6 space-y-7">
            {slider("Average nightly rate", nightly, setNightly, 80, 1500, 10, formatPrice(nightly))}
            {slider(
              "Occupancy",
              occupancy,
              setOccupancy,
              30,
              95,
              1,
              `${occupancy}%`,
              `≈ ${Math.round(365 * (occupancy / 100))} booked nights per year.`
            )}
            {slider("Management fee", mgmtFee, setMgmtFee, 0, 35, 1, `${mgmtFee}% of revenue`)}
            {slider(
              "Running costs",
              runningCosts,
              setRunningCosts,
              0,
              60000,
              500,
              `${formatPrice(runningCosts)} / yr`,
              "Utilities, maintenance, insurance, staff, pool & garden."
            )}
            {slider(
              "Rental income tax",
              taxRate,
              setTaxRate,
              0,
              20,
              1,
              `${taxRate}%`,
              "10% final tax for residents with NPWP; 20% for non-residents."
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-ink p-7 text-cream md:p-10">
          <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-white/60">
            Projected returns
          </p>
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">Gross yield</p>
              <p className="font-display mt-1.5 text-3xl text-cream">{formatPercent(r.grossYield)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">Net yield</p>
              <p className="font-display mt-1.5 text-3xl text-white">{formatPercent(r.netYield)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">Gross revenue / yr</p>
              <p className="font-display mt-1.5 text-2xl text-cream">{formatPrice(r.grossRevenue)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">Net income / yr</p>
              <p className="font-display mt-1.5 text-2xl text-cream">{formatPrice(r.netIncome)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">Payback period</p>
              <p className="font-display mt-1.5 text-2xl text-cream">
                {Number.isFinite(r.paybackYears) ? `${r.paybackYears.toFixed(1)} yrs` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">Booked nights / yr</p>
              <p className="font-display mt-1.5 text-2xl text-cream">{formatNumber(r.nightsBooked)}</p>
            </div>
          </div>

          <div className="mt-9 border-t border-cream/15 pt-7">
            <p className="text-[10px] tracking-[0.22em] uppercase text-cream/50">
              Over a {r.effectiveHold}-year hold
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-cream/60">Total net rental income</span>
                <span className="font-medium">{formatPrice(r.totalIncome)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/60">
                  {r.isLease ? "Remaining lease value (straight-line)" : "Projected property value"}
                </span>
                <span className="font-medium">{formatPrice(r.endValue)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-cream/15 pt-3 text-base">
                <span className="text-cream/80">Total return</span>
                <span className={`font-display text-xl ${r.totalReturn >= 0 ? "text-white" : "text-red-300"}`}>
                  {formatPrice(r.totalReturn)} ({formatPercent(r.totalReturnPct, 0)})
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/60">Annualised ROI</span>
                <span className="font-medium text-white">{formatPercent(r.annualisedRoi)} / yr</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          Illustrative modelling only — not financial advice. Assumptions are deliberately
          conservative: flat nightly rates, straight-line leasehold amortisation, and no financing.
          We&apos;ll gladly build a property-specific model with real comparable data for any
          listing you&apos;re considering.
        </p>
      </div>
    </div>
  );
}
