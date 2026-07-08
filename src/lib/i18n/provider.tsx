"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang } from "./dict";

export type Currency = "USD" | "AUD" | "IDR" | "GBP" | "EUR" | "JPY" | "CNY" | "SGD" | "MYR";

export const CURRENCIES: Currency[] = ["USD", "AUD", "IDR", "GBP", "EUR", "JPY", "CNY", "SGD", "MYR"];

// Indicative IDR value of 1 unit of each currency (approximate, mid-2026).
const IDR_PER: Record<Currency, number> = {
  IDR: 1,
  USD: 16300,
  AUD: 10800,
  GBP: 20800,
  EUR: 17700,
  JPY: 110,
  CNY: 2270,
  SGD: 12100,
  MYR: 3500,
};

interface LocaleState {
  lang: Lang;
  currency: Currency;
  setLang: (l: Lang) => void;
  setCurrency: (c: Currency) => void;
  t: (key: string) => string;
  money: (idr: number) => string;
}

const LocaleContext = createContext<LocaleState | null>(null);

/** Convert an IDR amount to the active currency and format compactly. */
export function formatMoney(idr: number, currency: Currency) {
  const value = idr / IDR_PER[currency];
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return `${currency} ${Math.round(value).toLocaleString("en-US")}`;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [currency, setCurrencyState] = useState<Currency>("IDR");

  // Hydrate from localStorage after mount (keeps SSR = default EN/IDR).
  useEffect(() => {
    try {
      const l = localStorage.getItem("bp-lang") as Lang | null;
      const c = localStorage.getItem("bp-currency") as Currency | null;
      if (l && l in dict) setLangState(l);
      if (c && CURRENCIES.includes(c)) setCurrencyState(c);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("bp-lang", l);
    } catch {}
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("bp-currency", c);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => dict[lang][key] ?? dict.en[key] ?? key,
    [lang]
  );

  const money = useCallback((idr: number) => formatMoney(idr, currency), [currency]);

  return (
    <LocaleContext.Provider value={{ lang, currency, setLang, setCurrency, t, money }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

/** Convenience hook returning just the translator. */
export function useT() {
  return useLocale().t;
}

/** Inline translated text — usable inside server components. */
export function T({ k }: { k: string }) {
  const { t } = useLocale();
  return <>{t(k)}</>;
}

/** Inline converted price — usable inside server components. */
export function Money({ idr }: { idr: number }) {
  const { money } = useLocale();
  return <>{money(idr)}</>;
}
