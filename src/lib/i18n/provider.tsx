"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang } from "./dict";
import { dict2 } from "./dict2";
import { dict3 } from "./dict3";
import { dict4 } from "./dict4";

const merged: Record<Lang, Record<string, string>> = {
  en: { ...dict.en, ...dict2.en, ...dict3.en, ...dict4.en },
  id: { ...dict.id, ...dict2.id, ...dict3.id, ...dict4.id },
  zh: { ...dict.zh, ...dict2.zh, ...dict3.zh, ...dict4.zh },
  ja: { ...dict.ja, ...dict2.ja, ...dict3.ja, ...dict4.ja },
};

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
    (key: string) => merged[lang][key] ?? merged.en[key] ?? key,
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

/**
 * Inline translated text with {placeholder} interpolation — usable inside
 * server components. E.g. <Tx k="ag.livingIn" vars={{ name: "Uluwatu" }} />.
 */
export function Tx({ k, vars }: { k: string; vars?: Record<string, string | number> }) {
  const { t } = useLocale();
  let s = t(k);
  if (vars) for (const [key, val] of Object.entries(vars)) s = s.split(`{${key}}`).join(String(val));
  return <>{s}</>;
}

/** Interpolating translator for attribute strings (aria-label, alt, etc.). */
export function useTx() {
  const { t } = useLocale();
  return (k: string, vars?: Record<string, string | number>) => {
    let s = t(k);
    if (vars) for (const [key, val] of Object.entries(vars)) s = s.split(`{${key}}`).join(String(val));
    return s;
  };
}

/** Inline converted price — usable inside server components. */
export function Money({ idr }: { idr: number }) {
  const { money } = useLocale();
  return <>{money(idr)}</>;
}

/**
 * Inline localised string: renders the active language's override, falling
 * back to the English `en` value. Usable inside server components.
 */
export function AL({ en, tr }: { en: string; tr?: Partial<Record<Lang, string>> }) {
  const { lang } = useLocale();
  return <>{(lang !== "en" && tr?.[lang]) || en}</>;
}
