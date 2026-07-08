export function formatPrice(usd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

/** Compact IDR for listing prices, e.g. 5_200_000_000 → "IDR 5.2B". */
export function formatIDR(idr: number) {
  if (idr >= 1e9) {
    const b = idr / 1e9;
    return `IDR ${Number.isInteger(b) ? b : b.toFixed(1)}B`;
  }
  if (idr >= 1e6) {
    const m = idr / 1e6;
    return `IDR ${Number.isInteger(m) ? m : m.toFixed(0)}M`;
  }
  return `IDR ${new Intl.NumberFormat("en-US").format(idr)}`;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

export function formatPercent(n: number, digits = 1) {
  return `${n.toFixed(digits)}%`;
}
