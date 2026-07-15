"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import Select from "@/components/Select";
import { useT } from "@/lib/i18n/provider";
import { useOverrides, type Override, type BlogPost } from "@/lib/overrides";
import {
  properties,
  PROPERTY_TAGS,
  type Property,
  type PropertyTag,
  type PropertyType,
  type Tenure,
} from "@/data/properties";
import { articles, categories, getArticle } from "@/data/articles";
import { areas } from "@/data/areas";
import { formatIDR } from "@/lib/format";

/* ── form primitives ────────────────────────────────────── */

const inputCls =
  "w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-bronze";
const labelCls = "text-[10px] font-medium tracking-[0.25em] uppercase text-muted";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function chip(active: boolean) {
  return `rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors ${
    active ? "bg-ink text-cream" : "border border-line text-muted hover:border-ink hover:text-ink"
  }`;
}

const btnSolid =
  "rounded-full bg-ink px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90 disabled:opacity-40";
const btnGhost =
  "rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink disabled:opacity-40";

const TENURE_OPTIONS = [
  { value: "freehold", label: "Freehold" },
  { value: "leasehold", label: "Leasehold" },
];
const TYPE_OPTIONS = [
  { value: "villa", label: "Villa" },
  { value: "land", label: "Land" },
  { value: "townhouse", label: "Townhouse" },
];
const AREA_OPTIONS = areas.map((a) => ({ value: a.slug, label: a.name }));
const CATEGORY_OPTIONS = categories.map((c) => ({ value: c, label: c }));

const toLines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const toParas = (s: string) => s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

/* ── image uploader ─────────────────────────────────────── */

function ImageUploader({
  urls,
  onChange,
  prefix,
  multiple = true,
}: {
  urls: string[];
  onChange: (next: string[]) => void;
  prefix: string;
  multiple?: boolean;
}) {
  const { uploadMedia } = useOverrides();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setErr("");
    try {
      const uploaded = await uploadMedia(Array.from(files), prefix);
      onChange(multiple ? [...urls, ...uploaded] : uploaded.slice(0, 1));
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  /** Swap with the neighbour — the arrows are the touch/keyboard fallback,
      since HTML5 drag events never fire on touch devices. */
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= urls.length) return;
    const next = [...urls];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  /** Pull the dragged photo out and re-insert it at the drop position. */
  const reorder = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    const next = [...urls];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const endDrag = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div>
      {urls.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {urls.map((u, i) => (
            <div
              key={u + i}
              draggable={multiple}
              onDragStart={(e) => {
                setDragIndex(i);
                e.dataTransfer.effectAllowed = "move";
                // Firefox only starts a drag when data is set.
                e.dataTransfer.setData("text/plain", String(i));
              }}
              onDragOver={(e) => {
                if (!multiple || dragIndex === null) return;
                e.preventDefault(); // required to allow a drop
                e.dataTransfer.dropEffect = "move";
                setOverIndex(i);
              }}
              onDragLeave={() => setOverIndex((o) => (o === i ? null : o))}
              onDrop={(e) => {
                if (!multiple) return;
                e.preventDefault();
                const from = dragIndex ?? Number(e.dataTransfer.getData("text/plain"));
                reorder(from, i);
                endDrag();
              }}
              onDragEnd={endDrag}
              className={`group relative h-20 w-28 overflow-hidden rounded-lg border transition-all ${
                multiple ? "cursor-grab active:cursor-grabbing" : ""
              } ${dragIndex === i ? "scale-95 opacity-40" : ""} ${
                overIndex === i && dragIndex !== i
                  ? "border-bronze ring-2 ring-bronze"
                  : "border-line"
              }`}
            >
              {/* draggable={false} so the browser drags the tile, not the image */}
              <Image src={u} alt="" fill sizes="112px" draggable={false} className="object-cover" />
              {multiple && i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-ink/80 px-1.5 py-0.5 text-[8px] font-semibold uppercase text-cream">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
                {multiple ? (
                  <>
                    <button type="button" onClick={() => move(i, -1)} className="px-1.5 text-xs text-cream" aria-label="Move left">
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => onChange(urls.filter((_, j) => j !== i))}
                      className="px-1.5 text-[9px] font-semibold uppercase text-red-300"
                    >
                      Del
                    </button>
                    <button type="button" onClick={() => move(i, 1)} className="px-1.5 text-xs text-cream" aria-label="Move right">
                      ›
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => onChange([])}
                    className="w-full px-1.5 py-0.5 text-[9px] font-semibold uppercase text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {multiple && urls.length > 1 && (
        <p className="mb-3 text-[11px] text-muted">
          Drag photos to reorder — the first one is the cover. (On a touch screen, use the ‹ ›
          arrows.)
        </p>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => pick(e.target.files)}
        className="block w-full text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[10px] file:font-semibold file:uppercase file:tracking-[0.2em] file:text-cream hover:file:opacity-90"
      />
      {busy && <p className="mt-2 text-xs text-bronze">Uploading…</p>}
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
    </div>
  );
}

/* ── property editor ────────────────────────────────────── */

interface Draft {
  name: string;
  tenure: Tenure;
  leaseholdYears: string;
  type: PropertyType;
  price: string;
  bedrooms: string;
  bathrooms: string;
  landSize: string;
  buildingSize: string;
  nightlyRate: string;
  occupancy: string;
  excerpt: string;
  description: string;
  highlights: string;
  features: string;
  tags: PropertyTag[];
  images: string[];
}

function draftFrom(p: Property, o: Override | undefined): Draft {
  const v = { ...p, ...o };
  return {
    name: v.name,
    tenure: v.tenure,
    leaseholdYears: String(v.leaseholdYears ?? ""),
    type: v.type,
    price: String(v.price),
    bedrooms: String(v.bedrooms),
    bathrooms: String(v.bathrooms),
    landSize: String(v.landSize),
    buildingSize: String(v.buildingSize ?? ""),
    nightlyRate: String(v.nightlyRate ?? ""),
    occupancy: String(v.occupancy ?? ""),
    excerpt: v.excerpt,
    description: (o?.description ?? p.description).join("\n\n"),
    highlights: (o?.highlights ?? p.highlights).join("\n"),
    features: (o?.features ?? p.features).join("\n"),
    tags: o?.tags ?? p.tags ?? [],
    images: o?.images ?? p.images,
  };
}

/** Only fields that differ from the base data get stored. */
function diff(p: Property, d: Draft): Override {
  const num = (s: string) => (s.trim() === "" ? undefined : Number(s));
  const pick = <T,>(next: T, base: T): T | undefined =>
    JSON.stringify(next) === JSON.stringify(base) ? undefined : next;

  const out: Override = {
    name: pick(d.name.trim(), p.name),
    tenure: pick(d.tenure, p.tenure),
    leaseholdYears: pick(num(d.leaseholdYears), p.leaseholdYears),
    type: pick(d.type, p.type),
    price: pick(num(d.price) ?? p.price, p.price),
    bedrooms: pick(num(d.bedrooms) ?? p.bedrooms, p.bedrooms),
    bathrooms: pick(num(d.bathrooms) ?? p.bathrooms, p.bathrooms),
    landSize: pick(num(d.landSize) ?? p.landSize, p.landSize),
    buildingSize: pick(num(d.buildingSize), p.buildingSize),
    nightlyRate: pick(num(d.nightlyRate), p.nightlyRate),
    occupancy: pick(num(d.occupancy), p.occupancy),
    excerpt: pick(d.excerpt.trim(), p.excerpt),
    description: pick(toParas(d.description), p.description),
    highlights: pick(toLines(d.highlights), p.highlights),
    features: pick(toLines(d.features), p.features),
    tags: pick(d.tags, p.tags ?? []),
    images: pick(d.images, p.images),
  };
  // Strip undefined so the stored JSON stays minimal.
  return Object.fromEntries(Object.entries(out).filter(([, v]) => v !== undefined)) as Override;
}

function PropertyEditor({ property, custom }: { property: Property; custom: boolean }) {
  const t = useT();
  const { overrides, patchProperty, resetOne, deleteProperty, saving } = useOverrides();
  const o = overrides[property.slug];
  const edited = !!o && Object.keys(o).length > 0;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saved, setSaved] = useState(false);

  const d = draft ?? draftFrom(property, o);
  const set = (patch: Partial<Draft>) => setDraft({ ...d, ...patch });

  const save = async () => {
    await patchProperty(property.slug, diff(property, d));
    setDraft(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${edited ? "border-bronze/50 bg-bronze/5" : "border-line bg-paper"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <TransitionLink href={`/properties/${property.slug}`} className="font-display text-lg text-ink hover:text-muted">
            {o?.name ?? property.name}
          </TransitionLink>
          <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
            {property.areaName} · {o?.tenure ?? property.tenure}
            {custom && <span className="ml-2 text-bronze">· added by you</span>}
            {edited && <span className="ml-2 text-bronze">· edited</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {edited && (
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                await resetOne(property.slug);
                setDraft(null);
              }}
              className={btnGhost}
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              if (!open) setDraft(draftFrom(property, o));
            }}
            className={btnSolid}
          >
            {open ? "Close" : "Edit"}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              const msg = custom
                ? `Delete "${o?.name ?? property.name}" permanently? This cannot be undone.`
                : `Remove "${o?.name ?? property.name}" from the site? You can restore it later.`;
              if (window.confirm(msg)) deleteProperty(property.slug);
            }}
            className={`${btnGhost} hover:border-red-500 hover:text-red-600`}
          >
            Delete
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-5 space-y-5 border-t border-line pt-5">
          <Field label="Photos (first = cover)">
            <ImageUploader urls={d.images} onChange={(images) => set({ images })} prefix={property.slug} />
          </Field>

          <Field label="Name">
            <input className={inputCls} value={d.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Tenure">
              <Select
                ariaLabel="Tenure"
                value={d.tenure}
                onChange={(v) => set({ tenure: v as Tenure })}
                options={TENURE_OPTIONS}
                triggerClassName={inputCls}
              />
            </Field>
            <Field label="Lease years">
              <input
                type="number"
                className={inputCls}
                value={d.leaseholdYears}
                disabled={d.tenure !== "leasehold"}
                onChange={(e) => set({ leaseholdYears: e.target.value })}
              />
            </Field>
            <Field label="Type">
              <Select
                ariaLabel="Type"
                value={d.type}
                onChange={(v) => set({ type: v as PropertyType })}
                options={TYPE_OPTIONS}
                triggerClassName={inputCls}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price (IDR)">
              <input type="number" step={100_000_000} className={inputCls} value={d.price} onChange={(e) => set({ price: e.target.value })} />
            </Field>
            <div className="flex items-end pb-2 text-sm font-medium text-ink">{formatIDR(Number(d.price) || 0)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label="Bedrooms">
              <input type="number" className={inputCls} value={d.bedrooms} onChange={(e) => set({ bedrooms: e.target.value })} />
            </Field>
            <Field label="Bathrooms">
              <input type="number" className={inputCls} value={d.bathrooms} onChange={(e) => set({ bathrooms: e.target.value })} />
            </Field>
            <Field label="Land (m²)">
              <input type="number" className={inputCls} value={d.landSize} onChange={(e) => set({ landSize: e.target.value })} />
            </Field>
            <Field label="Building (m²)">
              <input type="number" className={inputCls} value={d.buildingSize} onChange={(e) => set({ buildingSize: e.target.value })} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nightly rate (USD)">
              <input type="number" className={inputCls} value={d.nightlyRate} onChange={(e) => set({ nightlyRate: e.target.value })} />
            </Field>
            <Field label="Occupancy (%)">
              <input type="number" className={inputCls} value={d.occupancy} onChange={(e) => set({ occupancy: e.target.value })} />
            </Field>
          </div>

          <Field label="Tags">
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => set({ tags: d.tags.includes(tag) ? d.tags.filter((x) => x !== tag) : [...d.tags, tag] })}
                  className={chip(d.tags.includes(tag))}
                >
                  {t(`tag.${tag}`)}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Excerpt (card summary)">
            <textarea rows={2} className={inputCls} value={d.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
          </Field>
          <Field label="Description (blank line = new paragraph)">
            <textarea rows={6} className={inputCls} value={d.description} onChange={(e) => set({ description: e.target.value })} />
          </Field>
          <Field label="Highlights (one per line)">
            <textarea rows={4} className={inputCls} value={d.highlights} onChange={(e) => set({ highlights: e.target.value })} />
          </Field>
          <Field label="Features (one per line)">
            <textarea rows={4} className={inputCls} value={d.features} onChange={(e) => set({ features: e.target.value })} />
          </Field>

          <div className="flex items-center gap-3">
            <button type="button" onClick={save} disabled={saving} className={btnSolid}>
              {saved ? "Saved ✓" : saving ? "Saving…" : "Save"}
            </button>
            <TransitionLink href={`/properties/${property.slug}`} className="text-[11px] font-medium text-muted underline hover:text-ink">
              View listing →
            </TransitionLink>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── new property ───────────────────────────────────────── */

function slugifyName(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

function NewProperty({ onDone }: { onDone: () => void }) {
  const t = useT();
  const { createProperty, saving } = useOverrides();
  const [f, setF] = useState({
    name: "",
    slug: "",
    area: areas[0].slug,
    tenure: "freehold" as Tenure,
    leaseholdYears: "",
    type: "villa" as PropertyType,
    price: "",
    bedrooms: "",
    bathrooms: "",
    landSize: "",
    buildingSize: "",
    nightlyRate: "",
    occupancy: "",
    excerpt: "",
    description: "",
    highlights: "",
    features: "",
    featured: true,
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [tags, setTags] = useState<PropertyTag[]>(["new-listing"]);
  const [images, setImages] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const set = (patch: Partial<typeof f>) => setF({ ...f, ...patch });

  const submit = async () => {
    const slug = slugifyName(f.slug || f.name);
    const area = areas.find((a) => a.slug === f.area)!;
    if (!f.name.trim() || !slug) return setErr("Name is required.");
    if (!Number(f.price)) return setErr("Price is required.");
    if (images.length === 0) return setErr("Add at least one photo.");

    const num = (s: string) => (s.trim() === "" ? undefined : Number(s));
    try {
      await createProperty({
        slug,
        name: f.name.trim(),
        area: area.slug,
        areaName: area.name,
        tenure: f.tenure,
        leaseholdYears: f.tenure === "leasehold" ? num(f.leaseholdYears) : undefined,
        type: f.type,
        price: Number(f.price),
        bedrooms: Number(f.bedrooms) || 0,
        bathrooms: Number(f.bathrooms) || 0,
        landSize: Number(f.landSize) || 0,
        buildingSize: num(f.buildingSize),
        images,
        excerpt: f.excerpt.trim(),
        description: toParas(f.description),
        highlights: toLines(f.highlights),
        features: toLines(f.features),
        featured: f.featured,
        mapQuery: `${area.name}, Bali`,
        nightlyRate: num(f.nightlyRate),
        occupancy: num(f.occupancy),
        tags,
      });
      onDone();
    } catch (e) {
      setErr((e as Error).message);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-bronze/40 bg-bronze/5 p-5 md:p-6">
      <p className="font-display text-lg text-ink">New listing</p>

      <Field label="Photos (first = cover)">
        <ImageUploader urls={images} onChange={setImages} prefix={slugifyName(f.slug || f.name) || "new"} />
      </Field>

      <Field label="Name">
        <input
          className={inputCls}
          value={f.name}
          onChange={(e) => {
            set({ name: e.target.value, ...(slugTouched ? {} : { slug: slugifyName(e.target.value) }) });
          }}
          placeholder="e.g. Villa Sunset, Pererenan"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (URL)">
          <input
            className={inputCls}
            value={f.slug}
            onChange={(e) => {
              set({ slug: e.target.value });
              setSlugTouched(true);
            }}
          />
        </Field>
        <Field label="Area">
          <Select
            ariaLabel="Area"
            value={f.area}
            onChange={(v) => set({ area: v })}
            options={AREA_OPTIONS}
            triggerClassName={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Tenure">
          <Select
            ariaLabel="Tenure"
            value={f.tenure}
            onChange={(v) => set({ tenure: v as Tenure })}
            options={TENURE_OPTIONS}
            triggerClassName={inputCls}
          />
        </Field>
        <Field label="Lease years">
          <input
            type="number"
            className={inputCls}
            value={f.leaseholdYears}
            disabled={f.tenure !== "leasehold"}
            onChange={(e) => set({ leaseholdYears: e.target.value })}
          />
        </Field>
        <Field label="Type">
          <Select
            ariaLabel="Type"
            value={f.type}
            onChange={(v) => set({ type: v as PropertyType })}
            options={TYPE_OPTIONS}
            triggerClassName={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price (IDR)">
          <input type="number" step={100_000_000} className={inputCls} value={f.price} onChange={(e) => set({ price: e.target.value })} />
        </Field>
        <div className="flex items-end pb-2 text-sm font-medium text-ink">
          {f.price ? formatIDR(Number(f.price)) : ""}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Bedrooms">
          <input type="number" className={inputCls} value={f.bedrooms} onChange={(e) => set({ bedrooms: e.target.value })} />
        </Field>
        <Field label="Bathrooms">
          <input type="number" className={inputCls} value={f.bathrooms} onChange={(e) => set({ bathrooms: e.target.value })} />
        </Field>
        <Field label="Land (m²)">
          <input type="number" className={inputCls} value={f.landSize} onChange={(e) => set({ landSize: e.target.value })} />
        </Field>
        <Field label="Building (m²)">
          <input type="number" className={inputCls} value={f.buildingSize} onChange={(e) => set({ buildingSize: e.target.value })} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nightly rate (USD)">
          <input type="number" className={inputCls} value={f.nightlyRate} onChange={(e) => set({ nightlyRate: e.target.value })} />
        </Field>
        <Field label="Occupancy (%)">
          <input type="number" className={inputCls} value={f.occupancy} onChange={(e) => set({ occupancy: e.target.value })} />
        </Field>
      </div>

      <Field label="Tags">
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTags(tags.includes(tag) ? tags.filter((x) => x !== tag) : [...tags, tag])}
              className={chip(tags.includes(tag))}
            >
              {t(`tag.${tag}`)}
            </button>
          ))}
        </div>
      </Field>

      <label className="flex items-center gap-2 text-xs text-muted">
        <input type="checkbox" checked={f.featured} onChange={(e) => set({ featured: e.target.checked })} />
        Show in Featured on the homepage
      </label>

      <Field label="Excerpt (card summary)">
        <textarea rows={2} className={inputCls} value={f.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
      </Field>
      <Field label="Description (blank line = new paragraph)">
        <textarea rows={5} className={inputCls} value={f.description} onChange={(e) => set({ description: e.target.value })} />
      </Field>
      <Field label="Highlights (one per line)">
        <textarea rows={3} className={inputCls} value={f.highlights} onChange={(e) => set({ highlights: e.target.value })} />
      </Field>
      <Field label="Features (one per line)">
        <textarea rows={3} className={inputCls} value={f.features} onChange={(e) => set({ features: e.target.value })} />
      </Field>

      {err && <p className="text-xs text-red-600">{err}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button type="button" onClick={submit} disabled={saving} className={btnSolid}>
          {saving ? "Publishing…" : "Publish listing"}
        </button>
        <button type="button" onClick={onDone} className={btnGhost}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── blog editor ────────────────────────────────────────── */

interface SectionDraft {
  heading: string;
  paragraphs: string;
  list: string;
}

const emptySection: SectionDraft = { heading: "", paragraphs: "", list: "" };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

function BlogEditor({ initial, onDone }: { initial?: BlogPost; onDone: () => void }) {
  const { saveBlog, saving } = useOverrides();
  const isExisting = !!initial;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isExisting);
  const [category, setCategory] = useState<string>(initial?.category ?? categories[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [date, setDate] = useState(initial?.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
  const [readTime, setReadTime] = useState(initial?.readTime ?? "5 min read");
  const [image, setImage] = useState<string[]>(initial?.image ? [initial.image] : []);
  const [sections, setSections] = useState<SectionDraft[]>(
    initial?.sections.map((s) => ({
      heading: s.heading ?? "",
      paragraphs: (s.paragraphs ?? []).join("\n\n"),
      list: (s.list ?? []).join("\n"),
    })) ?? [{ ...emptySection }]
  );
  const [faq, setFaq] = useState<{ q: string; a: string }[]>(initial?.faq ?? []);
  const [err, setErr] = useState("");

  const setSection = (i: number, patch: Partial<SectionDraft>) =>
    setSections((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const submit = async () => {
    const finalSlug = slugify(slug || title);
    if (!title.trim() || !finalSlug) return setErr("Title is required.");
    const builtSections = sections
      .map((s) => ({
        heading: s.heading.trim() || undefined,
        paragraphs: toParas(s.paragraphs).length ? toParas(s.paragraphs) : undefined,
        list: toLines(s.list).length ? toLines(s.list) : undefined,
      }))
      .filter((s) => s.heading || s.paragraphs || s.list);
    if (!builtSections.length) return setErr("Add at least one section with content.");
    const builtFaq = faq.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q && f.a);

    try {
      await saveBlog({
        slug: finalSlug,
        title: title.trim(),
        category,
        excerpt: excerpt.trim(),
        date,
        readTime: readTime.trim() || "5 min read",
        image: image[0] ?? "",
        sections: builtSections,
        faq: builtFaq.length ? builtFaq : undefined,
      });
      onDone();
    } catch (e) {
      setErr((e as Error).message);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-line bg-paper p-5 md:p-6">
      <Field label="Title">
        <input
          className={inputCls}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="e.g. Bali Property Outlook 2027"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (URL)">
          <input
            className={inputCls}
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            disabled={isExisting}
          />
        </Field>
        <Field label="Category">
          <Select
            ariaLabel="Category"
            value={category}
            onChange={setCategory}
            options={CATEGORY_OPTIONS}
            triggerClassName={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date">
          <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Read time">
          <input className={inputCls} value={readTime} onChange={(e) => setReadTime(e.target.value)} />
        </Field>
      </div>

      <Field label="Hero image">
        <ImageUploader urls={image} onChange={setImage} prefix="blog" multiple={false} />
      </Field>

      <Field label="Excerpt (card summary)">
        <textarea rows={2} className={inputCls} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </Field>

      <div>
        <p className={labelCls}>Sections</p>
        <div className="mt-2 space-y-4">
          {sections.map((s, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-dashed border-line p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-bronze">Section {i + 1}</p>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setSections((prev) => prev.filter((_, j) => j !== i))}
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input className={inputCls} value={s.heading} onChange={(e) => setSection(i, { heading: e.target.value })} placeholder="Heading (optional)" />
              <textarea
                rows={4}
                className={inputCls}
                value={s.paragraphs}
                onChange={(e) => setSection(i, { paragraphs: e.target.value })}
                placeholder="Paragraphs — blank line starts a new paragraph"
              />
              <textarea
                rows={3}
                className={inputCls}
                value={s.list}
                onChange={(e) => setSection(i, { list: e.target.value })}
                placeholder="Bullet list — one item per line (optional)"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setSections((prev) => [...prev, { ...emptySection }])} className={`${btnGhost} mt-3`}>
          + Add section
        </button>
      </div>

      <div>
        <p className={labelCls}>FAQ (optional)</p>
        <div className="mt-2 space-y-3">
          {faq.map((f, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-dashed border-line p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-bronze">Q{i + 1}</p>
                <button
                  type="button"
                  onClick={() => setFaq((prev) => prev.filter((_, j) => j !== i))}
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <input
                className={inputCls}
                value={f.q}
                onChange={(e) => setFaq((prev) => prev.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))}
                placeholder="Question"
              />
              <textarea
                rows={2}
                className={inputCls}
                value={f.a}
                onChange={(e) => setFaq((prev) => prev.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))}
                placeholder="Answer"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setFaq((prev) => [...prev, { q: "", a: "" }])} className={`${btnGhost} mt-3`}>
          + Add FAQ
        </button>
      </div>

      {err && <p className="text-xs text-red-600">{err}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button type="button" onClick={submit} disabled={saving} className={btnSolid}>
          {saving ? "Saving…" : isExisting ? "Save changes" : "Publish post"}
        </button>
        <button type="button" onClick={onDone} className={btnGhost}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function BlogTab() {
  const { blogs, hiddenArticles, deleteBlog, restoreBlog, saving } = useOverrides();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);

  // Every post: CMS versions replace their built-in counterpart.
  const rows = useMemo(() => {
    const cms = new Map(blogs.map((b) => [b.slug, b]));
    const list: { post: BlogPost; builtIn: boolean; edited: boolean; hidden: boolean }[] = [];
    for (const a of articles) {
      const c = cms.get(a.slug);
      list.push({
        post: c ?? a,
        builtIn: true,
        edited: !!c,
        hidden: hiddenArticles.includes(a.slug),
      });
    }
    for (const b of blogs) {
      if (!getArticle(b.slug)) list.push({ post: b, builtIn: false, edited: false, hidden: false });
    }
    return list.sort((x, y) => y.post.date.localeCompare(x.post.date));
  }, [blogs, hiddenArticles]);

  if (creating || editing) {
    return (
      <BlogEditor
        initial={editing ?? undefined}
        onDone={() => {
          setCreating(false);
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={() => setCreating(true)} className={btnSolid}>
        + New post
      </button>

      {rows.map(({ post, builtIn, edited, hidden }) => (
        <div
          key={post.slug}
          className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-5 ${
            hidden ? "border-line bg-cream/50 opacity-60" : edited ? "border-bronze/50 bg-bronze/5" : "border-line bg-paper"
          }`}
        >
          <div>
            <TransitionLink href={`/knowledge-base/${post.slug}`} className="font-display text-lg text-ink hover:text-muted">
              {post.title}
            </TransitionLink>
            <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
              {post.category} · {post.date} · {post.readTime}
              {builtIn && <span className="ml-2 text-muted/70">· built-in</span>}
              {edited && <span className="ml-2 text-bronze">· edited</span>}
              {hidden && <span className="ml-2 text-red-600">· removed</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hidden ? (
              <button type="button" disabled={saving} onClick={() => restoreBlog(post.slug)} className={btnSolid}>
                Restore
              </button>
            ) : (
              <>
                <button type="button" onClick={() => setEditing(post)} className={btnSolid}>
                  Edit
                </button>
                {edited && (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => {
                      if (window.confirm(`Revert "${post.title}" to the original built-in article?`)) restoreBlog(post.slug);
                    }}
                    className={btnGhost}
                  >
                    Revert
                  </button>
                )}
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    const msg = builtIn
                      ? `Remove "${post.title}" from the site? You can restore it later.`
                      : `Delete "${post.title}" permanently? This cannot be undone.`;
                    if (window.confirm(msg)) deleteBlog(post.slug);
                  }}
                  className={`${btnGhost} hover:border-red-500 hover:text-red-600`}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── properties tab ─────────────────────────────────────── */

function PropertiesTab() {
  const { customProperties, hiddenProperties, restoreProperty, saving } = useOverrides();
  const [creating, setCreating] = useState(false);

  if (creating) return <NewProperty onDone={() => setCreating(false)} />;

  const customSlugs = new Set(customProperties.map((p) => p.slug));
  const live = [
    ...customProperties.map((p) => ({ p, custom: true })),
    ...properties
      .filter((p) => !hiddenProperties.includes(p.slug) && !customSlugs.has(p.slug))
      .map((p) => ({ p, custom: false })),
  ];
  const removed = properties.filter((p) => hiddenProperties.includes(p.slug));

  return (
    <div className="space-y-4">
      <button type="button" onClick={() => setCreating(true)} className={btnSolid}>
        + New property
      </button>

      {live.map(({ p, custom }) => (
        <PropertyEditor key={p.slug} property={p} custom={custom} />
      ))}

      {removed.length > 0 && (
        <div className="pt-4">
          <p className={labelCls}>Removed from the site</p>
          <div className="mt-2 space-y-2">
            {removed.map((p) => (
              <div
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-cream/50 p-4 opacity-70"
              >
                <div>
                  <p className="font-display text-base text-ink">{p.name}</p>
                  <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
                    {p.areaName} · <span className="text-red-600">removed</span>
                  </p>
                </div>
                <button type="button" disabled={saving} onClick={() => restoreProperty(p.slug)} className={btnSolid}>
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── page ───────────────────────────────────────────────── */

export default function AdminPage() {
  const { overrides, blogs, customProperties, resetAll, saving } = useOverrides();
  const [tab, setTab] = useState<"properties" | "blog">("properties");
  const count = Object.keys(overrides).length + customProperties.length;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <section className="container-x min-h-screen pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="font-display mt-3 text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Content Manager
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <TransitionLink href="/" className={btnGhost}>
              View Site
            </TransitionLink>
            <button type="button" onClick={logout} className={btnSolid}>
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream/60 p-4 text-xs leading-relaxed text-muted">
          Changes save to the database and go live for <strong className="text-ink">every visitor</strong>{" "}
          immediately — no developer step needed. Photos you upload are stored and served from the site&apos;s
          own media library.
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5 rounded-full border border-line bg-cream p-1.5">
            {(["properties", "blog"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setTab(v)}
                className={`rounded-full px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors ${
                  tab === v ? "bg-ink text-cream" : "text-muted hover:text-ink"
                }`}
              >
                {v === "properties" ? `Properties${count ? ` (${count})` : ""}` : `Blog${blogs.length ? ` (${blogs.length})` : ""}`}
              </button>
            ))}
          </div>
          {tab === "properties" && Object.keys(overrides).length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset the built-in listings back to their original data? Listings you added are kept."))
                  resetAll();
              }}
              disabled={saving}
              className={btnGhost}
            >
              Reset edits
            </button>
          )}
        </div>

        <div className="mt-6">{tab === "properties" ? <PropertiesTab /> : <BlogTab />}</div>
      </div>
    </section>
  );
}
