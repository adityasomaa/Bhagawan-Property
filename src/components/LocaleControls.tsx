"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import { LANGS, type Lang } from "@/lib/i18n/dict";
import { CURRENCIES, type Currency } from "@/lib/i18n/provider";

/** Compact glass dropdown used for both the language and currency switchers. */
function MiniDropdown<T extends string>({
  value,
  label,
  options,
  onChange,
  align = "right",
  tone = "auto",
}: {
  value: string;
  label: string;
  options: { value: T; label: string; hint?: string }[];
  onChange: (v: T) => void;
  align?: "left" | "right";
  tone?: "auto" | "light";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-current transition-opacity hover:opacity-70"
      >
        {value}
        <svg
          width="8"
          height="5"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          data-lenis-prevent
          className={`glass-light absolute top-full z-50 mt-3 max-h-72 min-w-[10rem] overflow-y-auto rounded-2xl p-1.5 text-ink ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-ink/5 ${
                    selected ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  <span className="w-8 shrink-0 text-[11px] font-semibold tracking-wide">
                    {o.label}
                  </span>
                  {o.hint && <span className="truncate text-xs text-muted">{o.hint}</span>}
                  {selected && <span className="ml-auto h-px w-3.5 shrink-0 bg-ink" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function LocaleControls({ align = "right" }: { align?: "left" | "right" }) {
  const { lang, currency, setLang, setCurrency } = useLocale();
  const activeLabel = LANGS.find((l) => l.code === lang)?.label ?? "EN";

  return (
    <div className="flex items-center gap-3">
      <MiniDropdown<Lang>
        value={activeLabel}
        label="Language"
        align={align}
        options={LANGS.map((l) => ({ value: l.code, label: l.label, hint: l.name }))}
        onChange={setLang}
      />
      <span className="h-3.5 w-px bg-current opacity-25" aria-hidden />
      <MiniDropdown<Currency>
        value={currency}
        label="Currency"
        align={align}
        options={CURRENCIES.map((c) => ({ value: c, label: c }))}
        onChange={setCurrency}
      />
    </div>
  );
}
