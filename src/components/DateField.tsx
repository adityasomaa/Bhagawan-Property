"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMountTransition } from "@/lib/uiHooks";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Local (not UTC) YYYY-MM-DD, so the picker never shifts a day by timezone. */
function toISO(d: Date) {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function fromISO(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/**
 * Brand-styled date picker replacing <input type="date"> — the native control
 * renders a browser-default popup that can't be styled. The whole field is the
 * trigger (not just an icon), matching Select's popover, keyboard and
 * outside-click behaviour.
 */
export default function DateField({
  value,
  onChange,
  className,
  triggerClassName,
  ariaLabel,
}: {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const { mounted, show } = useMountTransition(open);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => fromISO(value), [value]);
  const [view, setView] = useState<Date>(() => selected ?? new Date());

  // Re-centre the grid on the selected month each time the picker opens.
  useEffect(() => {
    if (open) setView(selected ?? new Date());
  }, [open, selected]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
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

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const label = selected
    ? selected.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "Select a date";

  const pick = (day: number) => {
    onChange(toISO(new Date(year, month, day)));
    setOpen(false);
  };

  const shiftMonth = (by: number) => setView(new Date(year, month + by, 1));

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      {/* The entire field opens the calendar — not just the icon. */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        className={`${triggerClassName ?? "field mt-1"} flex w-full cursor-pointer items-center justify-between gap-3 text-left`}
      >
        <span className={selected ? "" : "text-muted"}>{label}</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0 text-muted">
          <rect x="2" y="3.5" width="12" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2 6.8h12M5.5 1.8v2.4M10.5 1.8v2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {mounted && (
        <div
          role="dialog"
          aria-label="Choose a date"
          data-lenis-prevent
          className={`glass-light absolute left-0 top-full z-40 mt-2 w-[17.5rem] origin-top rounded-2xl p-3 transition-all duration-240 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M7.5 2L4 6l3.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="font-display text-sm font-medium text-ink">
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4.5 2L8 6l-3.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-0.5">
            {DAYS.map((d) => (
              <span key={d} className="py-1 text-center text-[9px] font-semibold tracking-[0.1em] uppercase text-muted">
                {d}
              </span>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <span key={`e${i}`} />;
              const date = new Date(year, month, day);
              const isSelected = selected ? sameDay(date, selected) : false;
              const isToday = sameDay(date, today);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => pick(day)}
                  aria-current={isSelected ? "date" : undefined}
                  className={`flex h-8 items-center justify-center rounded-lg text-xs transition-colors ${
                    isSelected
                      ? "bg-ink font-semibold text-cream"
                      : isToday
                        ? "font-semibold text-bronze hover:bg-ink/5"
                        : "text-ink-soft hover:bg-ink/5"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-between border-t border-line pt-2">
            <button
              type="button"
              onClick={() => {
                onChange(toISO(new Date()));
                setOpen(false);
              }}
              className="rounded-lg px-2 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-bronze hover:bg-ink/5"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted hover:bg-ink/5 hover:text-ink"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
