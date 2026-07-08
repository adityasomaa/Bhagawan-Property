"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale, type Currency } from "@/lib/i18n/provider";
import { LANGS, type Lang } from "@/lib/i18n/dict";
import { CURRENCIES } from "@/lib/i18n/provider";
import { site, waLink } from "@/lib/site";

/** A pill trigger with a fully-opaque drop-UP menu (readable on any background). */
function DropUp({
  trigger,
  children,
  align,
  panelClass = "",
}: {
  trigger: (open: boolean) => ReactNode;
  children: (close: () => void) => ReactNode;
  align: "left" | "right";
  panelClass?: string;
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
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {trigger(open)}
      </button>
      {open && (
        <div
          data-lenis-prevent
          className={`absolute bottom-full mb-2.5 ${
            align === "left" ? "left-0" : "right-0"
          } z-10 overflow-hidden rounded-2xl border border-line bg-paper text-ink shadow-[0_28px_60px_-20px_rgba(11,11,12,0.5)] ${panelClass}`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

const chevron = (open: boolean) => (
  <svg
    width="9"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    aria-hidden
    className={`shrink-0 opacity-60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export default function FloatingUI() {
  const { lang, currency, setLang, setCurrency, t } = useLocale();
  const langLabel = LANGS.find((l) => l.code === lang)?.label ?? "EN";

  return (
    <>
      {/* ── Bottom-left: language + currency ─────────────────── */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 md:bottom-6 md:left-6">
        <DropUp
          align="left"
          panelClass="min-w-[11rem]"
          trigger={(open) => (
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-white shadow-[0_16px_40px_-16px_rgba(11,11,12,0.5)]">
              <span className="text-[8px] font-medium tracking-[0.28em] uppercase opacity-60">
                {t("sw.language")}
              </span>
              <span className="text-[11px] font-semibold tracking-wide">{langLabel}</span>
              {chevron(open)}
            </span>
          )}
        >
          {(close) => (
            <ul className="p-1.5">
              {LANGS.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setLang(l.code as Lang);
                      close();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-ink/5 ${
                      l.code === lang ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    <span className="w-7 shrink-0 text-[11px] font-semibold">{l.label}</span>
                    <span className="truncate text-xs text-muted">{l.name}</span>
                    {l.code === lang && <span className="ml-auto h-px w-3.5 shrink-0 bg-ink" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DropUp>

        <DropUp
          align="left"
          panelClass="min-w-[8rem]"
          trigger={(open) => (
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-white shadow-[0_16px_40px_-16px_rgba(11,11,12,0.5)]">
              <span className="text-[8px] font-medium tracking-[0.28em] uppercase opacity-60">
                {t("sw.currency")}
              </span>
              <span className="text-[11px] font-semibold tracking-wide">{currency}</span>
              {chevron(open)}
            </span>
          )}
        >
          {(close) => (
            <ul className="max-h-72 overflow-y-auto p-1.5" data-lenis-prevent>
              {CURRENCIES.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency(c as Currency);
                      close();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[11px] font-semibold transition-colors hover:bg-ink/5 ${
                      c === currency ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {c}
                    {c === currency && <span className="ml-auto h-px w-3.5 shrink-0 bg-ink" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DropUp>
      </div>

      {/* ── Bottom-right: contact ────────────────────────────── */}
      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
        <DropUp
          align="right"
          panelClass="min-w-[13rem]"
          trigger={(open) => (
            <span className="glass flex items-center gap-2.5 rounded-full py-2.5 pl-5 pr-4 text-white shadow-[0_16px_40px_-16px_rgba(11,11,12,0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase">
                {t("c.contactUs")}
              </span>
              {chevron(open)}
            </span>
          )}
        >
          {(close) => (
            <div className="p-1.5">
              <a
                href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors hover:bg-ink/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0 text-ink">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.3.3.1.4.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4.1 0 .1.6-.2 1.2Z" />
                </svg>
                <span>
                  <span className="block text-[9px] tracking-[0.24em] uppercase text-muted">
                    {t("contact.whatsapp")}
                  </span>
                  <span className="text-sm font-medium text-ink">{site.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors hover:bg-ink/5"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden
                  className="shrink-0 text-ink"
                >
                  <rect x="2" y="4" width="20" height="16" rx="1" />
                  <path d="m2 7 10 6L22 7" />
                </svg>
                <span>
                  <span className="block text-[9px] tracking-[0.24em] uppercase text-muted">
                    {t("contact.email")}
                  </span>
                  <span className="text-sm font-medium text-ink">{site.email}</span>
                </span>
              </a>
            </div>
          )}
        </DropUp>
      </div>
    </>
  );
}
