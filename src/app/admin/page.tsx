"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/motion/PageTransition";
import { useT } from "@/lib/i18n/provider";
import { useOverrides, usePropertyView } from "@/lib/overrides";
import { properties, PROPERTY_TAGS, type Property, type PropertyTag } from "@/data/properties";
import { formatIDR } from "@/lib/format";

function Row({ property }: { property: Property }) {
  const t = useT();
  const { setTags, setPrice, resetOne, overrides } = useOverrides();
  const { tags, price } = usePropertyView(property);
  const edited = !!overrides[property.slug];

  const toggle = (tag: PropertyTag) => {
    const next = tags.includes(tag) ? tags.filter((x) => x !== tag) : [...tags, tag];
    setTags(property.slug, next);
  };

  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${edited ? "border-[#834c25]/50 bg-[#834c25]/5" : "border-line bg-paper"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <TransitionLink href={`/properties/${property.slug}`} className="font-display text-lg text-ink hover:text-muted">
            {property.name}
          </TransitionLink>
          <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
            {property.areaName} · {property.tenure}
          </p>
        </div>
        {edited && (
          <button
            type="button"
            onClick={() => resetOne(property.slug)}
            className="rounded-full border border-line px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink"
          >
            Reset
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="mt-4">
        <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted">Tags</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROPERTY_TAGS.map((tag) => {
            const on = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggle(tag)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                  on ? "bg-ink text-cream" : "border border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {t(`tag.${tag}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="mt-4">
        <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted">Price (IDR)</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={price}
            min={0}
            step={100_000_000}
            onChange={(e) => {
              const v = Number(e.target.value);
              setPrice(property.slug, Number.isFinite(v) && v > 0 && v !== property.price ? v : undefined);
            }}
            className="w-52 rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          />
          <span className="text-sm font-medium text-ink">{formatIDR(price)}</span>
          {price !== property.price && (
            <span className="text-[11px] text-muted">was {formatIDR(property.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { overrides, resetAll } = useOverrides();
  const [copied, setCopied] = useState(false);
  const count = Object.keys(overrides).length;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/under-construction";
  };

  const exportJson = async () => {
    const payload = JSON.stringify(overrides, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback: open in a new tab if clipboard is blocked.
      window.prompt("Overrides JSON", payload);
    }
  };

  return (
    <section className="container-x min-h-screen pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="font-display mt-3 text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Property Manager
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <TransitionLink href="/" className="rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink">
              View Site
            </TransitionLink>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-ink px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream/60 p-4 text-xs leading-relaxed text-muted">
          Manage each listing&apos;s status tags and price. Changes save instantly in this browser
          and appear across the site right away. To publish them permanently for every visitor,
          use <strong className="text-ink">Copy changes</strong> and send the JSON to your developer.
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={exportJson}
            disabled={count === 0}
            className="rounded-full border border-ink bg-ink px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream disabled:opacity-40"
          >
            {copied ? "Copied ✓" : `Copy changes (${count})`}
          </button>
          <button
            type="button"
            onClick={resetAll}
            disabled={count === 0}
            className="rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink disabled:opacity-40"
          >
            Reset all
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {properties.map((p) => (
            <Row key={p.slug} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
