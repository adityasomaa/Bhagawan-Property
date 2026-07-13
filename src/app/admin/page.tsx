"use client";

import { useMemo, useState } from "react";
import { TransitionLink } from "@/components/motion/PageTransition";
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
import { categories } from "@/data/articles";
import { formatIDR } from "@/lib/format";

/* ── small form primitives ──────────────────────────────── */

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

const toLines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const toParas = (s: string) => s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

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
  };
}

/** Build the minimal override patch: only fields that differ from base. */
function diff(p: Property, d: Draft): Override {
  const num = (s: string) => (s.trim() === "" ? undefined : Number(s));
  const pick = <T,>(next: T, base: T): T | undefined =>
    JSON.stringify(next) === JSON.stringify(base) ? undefined : next;

  return {
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
  };
}

function PropertyEditor({ property }: { property: Property }) {
  const t = useT();
  const { overrides, patchProperty, resetOne } = useOverrides();
  const o = overrides[property.slug];
  const edited = !!o;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saved, setSaved] = useState(false);

  const d = draft ?? draftFrom(property, o);
  const set = (patch: Partial<Draft>) => setDraft({ ...d, ...patch });

  const save = () => {
    // Replace the whole override with the diff so reverted fields clear.
    resetOne(property.slug);
    patchProperty(property.slug, diff(property, d));
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${edited ? "border-bronze/50 bg-bronze/5" : "border-line bg-paper"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <TransitionLink href={`/properties/${property.slug}`} className="font-display text-lg text-ink hover:text-muted">
            {(o?.name ?? property.name) || property.name}
          </TransitionLink>
          <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
            {property.areaName} · {o?.tenure ?? property.tenure}
            {edited && <span className="ml-2 text-bronze">· edited</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {edited && (
            <button
              type="button"
              onClick={() => {
                resetOne(property.slug);
                setDraft(null);
              }}
              className="rounded-full border border-line px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink"
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
            className="rounded-full bg-ink px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90"
          >
            {open ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-5 space-y-5 border-t border-line pt-5">
          <Field label="Name">
            <input className={inputCls} value={d.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Tenure">
              <select className={inputCls} value={d.tenure} onChange={(e) => set({ tenure: e.target.value as Tenure })}>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
              </select>
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
              <select className={inputCls} value={d.type} onChange={(e) => set({ type: e.target.value as PropertyType })}>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price (IDR)">
              <input type="number" step={100_000_000} className={inputCls} value={d.price} onChange={(e) => set({ price: e.target.value })} />
            </Field>
            <div className="flex items-end pb-2 text-sm font-medium text-ink">
              {formatIDR(Number(d.price) || 0)}
            </div>
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
                  onClick={() =>
                    set({ tags: d.tags.includes(tag) ? d.tags.filter((x) => x !== tag) : [...d.tags, tag] })
                  }
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
            <button type="button" onClick={save} className="rounded-full bg-ink px-6 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90">
              {saved ? "Saved ✓" : "Save"}
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

/* ── blog editor ────────────────────────────────────────── */

interface SectionDraft {
  heading: string;
  paragraphs: string;
  list: string;
}
interface FaqDraft {
  q: string;
  a: string;
}

const emptySection: SectionDraft = { heading: "", paragraphs: "", list: "" };

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function BlogEditor({
  initial,
  onDone,
}: {
  initial?: BlogPost;
  onDone: () => void;
}) {
  const { saveBlog } = useOverrides();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [category, setCategory] = useState<string>(initial?.category ?? categories[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [readTime, setReadTime] = useState(initial?.readTime ?? "5 min read");
  const [image, setImage] = useState(initial?.image ?? "");
  const [sections, setSections] = useState<SectionDraft[]>(
    initial?.sections.map((s) => ({
      heading: s.heading ?? "",
      paragraphs: (s.paragraphs ?? []).join("\n\n"),
      list: (s.list ?? []).join("\n"),
    })) ?? [{ ...emptySection }]
  );
  const [faq, setFaq] = useState<FaqDraft[]>(initial?.faq ?? []);
  const [err, setErr] = useState("");

  const setSection = (i: number, patch: Partial<SectionDraft>) =>
    setSections((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const submit = () => {
    const finalSlug = slugify(slug || title);
    if (!title.trim() || !finalSlug) {
      setErr("Title is required.");
      return;
    }
    const builtSections = sections
      .map((s) => ({
        heading: s.heading.trim() || undefined,
        paragraphs: toParas(s.paragraphs).length ? toParas(s.paragraphs) : undefined,
        list: toLines(s.list).length ? toLines(s.list) : undefined,
      }))
      .filter((s) => s.heading || s.paragraphs || s.list);
    if (builtSections.length === 0) {
      setErr("Add at least one section with content.");
      return;
    }
    const builtFaq = faq.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q && f.a);

    saveBlog({
      custom: true,
      slug: finalSlug,
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      date,
      readTime: readTime.trim() || "5 min read",
      image: image.trim(),
      sections: builtSections,
      faq: builtFaq.length ? builtFaq : undefined,
    });
    onDone();
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
            disabled={!!initial}
          />
        </Field>
        <Field label="Category">
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date">
          <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Read time">
          <input className={inputCls} value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="5 min read" />
        </Field>
      </div>

      <Field label="Hero image URL (optional)">
        <input className={inputCls} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" />
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
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-bronze">
                  Section {i + 1}
                </p>
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
              <input
                className={inputCls}
                value={s.heading}
                onChange={(e) => setSection(i, { heading: e.target.value })}
                placeholder="Heading (optional)"
              />
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
        <button
          type="button"
          onClick={() => setSections((prev) => [...prev, { ...emptySection }])}
          className="mt-3 rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink"
        >
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
        <button
          type="button"
          onClick={() => setFaq((prev) => [...prev, { q: "", a: "" }])}
          className="mt-3 rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink"
        >
          + Add FAQ
        </button>
      </div>

      {err && <p className="text-xs text-red-600">{err}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button type="button" onClick={submit} className="rounded-full bg-ink px-6 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90">
          {initial ? "Save changes" : "Publish post"}
        </button>
        <button type="button" onClick={onDone} className="rounded-full border border-line px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink">
          Cancel
        </button>
      </div>
    </div>
  );
}

function BlogTab() {
  const { blogs, deleteBlog } = useOverrides();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);

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
      <button
        type="button"
        onClick={() => setCreating(true)}
        className="rounded-full bg-ink px-6 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90"
      >
        + New post
      </button>

      {blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-cream/60 p-8 text-center text-sm text-muted">
          No posts yet. Posts you publish here appear in the Knowledge Base alongside the built-in
          articles, using the exact same page template.
        </div>
      ) : (
        blogs.map((b) => (
          <div key={b.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-5">
            <div>
              <TransitionLink href={`/knowledge-base/${b.slug}`} className="font-display text-lg text-ink hover:text-muted">
                {b.title}
              </TransitionLink>
              <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
                {b.category} · {b.date} · {b.readTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditing(b)}
                className="rounded-full bg-ink px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete "${b.title}"?`)) deleteBlog(b.slug);
                }}
                className="rounded-full border border-line px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ── page ───────────────────────────────────────────────── */

export default function AdminPage() {
  const { overrides, blogs, resetAll } = useOverrides();
  const [tab, setTab] = useState<"properties" | "blog">("properties");
  const [copied, setCopied] = useState(false);
  const count = Object.keys(overrides).length;

  const payload = useMemo(
    () => JSON.stringify({ overrides, blogs }, null, 2),
    [overrides, blogs]
  );

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  const exportJson = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Content JSON", payload);
    }
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
            <TransitionLink href="/" className="rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink">
              View Site
            </TransitionLink>
            <button type="button" onClick={logout} className="rounded-full bg-ink px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream hover:opacity-90">
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream/60 p-4 text-xs leading-relaxed text-muted">
          Edits save instantly in this browser and appear across the site right away. To publish
          them permanently for every visitor, use <strong className="text-ink">Copy content</strong>{" "}
          and send the JSON to your developer.
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportJson}
              disabled={count === 0 && blogs.length === 0}
              className="rounded-full border border-ink bg-ink px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream disabled:opacity-40"
            >
              {copied ? "Copied ✓" : "Copy content"}
            </button>
            {tab === "properties" && (
              <button
                type="button"
                onClick={resetAll}
                disabled={count === 0}
                className="rounded-full border border-line px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted hover:border-ink hover:text-ink disabled:opacity-40"
              >
                Reset all
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          {tab === "properties" ? (
            <div className="space-y-4">
              {properties.map((p) => (
                <PropertyEditor key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <BlogTab />
          )}
        </div>
      </div>
    </section>
  );
}
