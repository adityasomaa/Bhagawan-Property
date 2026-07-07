"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** When set, renders a hidden input so the value posts with FormData. */
  name?: string;
  className?: string;
}

/**
 * Styled replacement for the native <select> — paper popover, warm hover
 * states, Escape/outside-click to close, arrow-key navigation.
 */
export default function Select({ label, value, onChange, options, name, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the selected option when the list opens.
  useEffect(() => {
    if (open) {
      const el = listRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]');
      el?.focus();
    }
  }, [open]);

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("button[role='option']") ?? []
    );
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(idx + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[Math.max(idx - 1, 0)]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      {label && (
        <span className="eyebrow block" id={`${id}-label`}>
          {label}
        </span>
      )}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label` : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className="field mt-1 flex w-full cursor-pointer items-center justify-between gap-3 text-left"
      >
        <span className="truncate">{current?.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          className={`shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {name && <input type="hidden" name={name} value={current?.value ?? ""} />}

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={label ? `${id}-label` : undefined}
          onKeyDown={onListKeyDown}
          data-lenis-prevent
          className="glass-light absolute inset-x-0 top-full z-40 mt-2 max-h-64 overflow-y-auto rounded-2xl p-1.5"
        >
          {options.map((o) => {
            const selected = o.value === current?.value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-selected={selected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-colors duration-200 hover:bg-ink/5 focus:bg-ink/5 focus:outline-none ${
                    selected ? "font-semibold text-ink" : "text-ink-soft"
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {selected && <span className="h-px w-4 shrink-0 bg-ink" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
