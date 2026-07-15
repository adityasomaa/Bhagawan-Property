"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { properties as baseProperties, type Property } from "@/data/properties";
import { articles, type Article } from "@/data/articles";
import type { Content, Override, BlogPost } from "@/lib/content-types";

/**
 * Content store shared by the site and /admin.
 *
 * Data is fetched server-side (Supabase) and handed in as `initial`, so every
 * visitor sees the same published content and SSR matches. Writes go through
 * /api/admin/* (cookie-gated, service key server-side) and then refresh the
 * route so the server data — the single source of truth — flows back down.
 */

interface ContentState extends Content {
  saving: boolean;
  patchProperty: (slug: string, patch: Override) => Promise<void>;
  createProperty: (property: Property) => Promise<void>;
  deleteProperty: (slug: string) => Promise<void>;
  restoreProperty: (slug: string) => Promise<void>;
  resetOne: (slug: string) => Promise<void>;
  resetAll: () => Promise<void>;
  saveBlog: (post: BlogPost) => Promise<void>;
  deleteBlog: (slug: string) => Promise<void>;
  restoreBlog: (slug: string) => Promise<void>;
  uploadMedia: (files: File[], prefix: string) => Promise<string[]>;
}

const ContentContext = createContext<ContentState | null>(null);

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Request failed");
  return res.json();
}

export function OverridesProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial: Content;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Optimistic layer on top of the server snapshot, cleared on refresh.
  const [local, setLocal] = useState<Content | null>(null);
  const data = local ?? initial;

  const run = useCallback(
    async (fn: () => Promise<void>) => {
      setSaving(true);
      try {
        await fn();
        setLocal(null);
        router.refresh();
      } finally {
        setSaving(false);
      }
    },
    [router]
  );

  const patchProperty = useCallback(
    (slug: string, patch: Override) =>
      run(async () => {
        setLocal({ ...data, overrides: { ...data.overrides, [slug]: patch } });
        await post("/api/admin/property", { slug, data: patch });
      }),
    [run, data]
  );

  const resetOne = useCallback(
    (slug: string) =>
      run(async () => {
        const next = { ...data.overrides };
        delete next[slug];
        setLocal({ ...data, overrides: next });
        await post("/api/admin/property", { slug, reset: true });
      }),
    [run, data]
  );

  const resetAll = useCallback(
    () =>
      run(async () => {
        setLocal({ ...data, overrides: {} });
        await post("/api/admin/property", { resetAll: true });
      }),
    [run, data]
  );

  const createProperty = useCallback(
    (property: Property) =>
      run(async () => void (await post("/api/admin/property", { create: true, property }))),
    [run]
  );

  const deleteProperty = useCallback(
    (slug: string) => run(async () => void (await post("/api/admin/property", { slug, remove: true }))),
    [run]
  );

  const restoreProperty = useCallback(
    (slug: string) => run(async () => void (await post("/api/admin/property", { slug, restore: true }))),
    [run]
  );

  const saveBlog = useCallback(
    (postData: BlogPost) => run(async () => void (await post("/api/admin/blog", { post: postData }))),
    [run]
  );

  const deleteBlog = useCallback(
    (slug: string) => run(async () => void (await post("/api/admin/blog", { slug, remove: true }))),
    [run]
  );

  const restoreBlog = useCallback(
    (slug: string) => run(async () => void (await post("/api/admin/blog", { slug, restore: true }))),
    [run]
  );

  const uploadMedia = useCallback(async (files: File[], prefix: string) => {
    const form = new FormData();
    form.append("prefix", prefix);
    for (const f of files) form.append("files", f);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Upload failed");
    const json = await res.json();
    return json.urls as string[];
  }, []);

  const value = useMemo<ContentState>(
    () => ({
      ...data,
      saving,
      patchProperty,
      createProperty,
      deleteProperty,
      restoreProperty,
      resetOne,
      resetAll,
      saveBlog,
      deleteBlog,
      restoreBlog,
      uploadMedia,
    }),
    [
      data,
      saving,
      patchProperty,
      createProperty,
      deleteProperty,
      restoreProperty,
      resetOne,
      resetAll,
      saveBlog,
      deleteBlog,
      restoreBlog,
      uploadMedia,
    ]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useOverrides() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useOverrides must be used within OverridesProvider");
  return ctx;
}

/** A property with any admin overrides applied — the canonical display view. */
export function usePropertyView(property: Property): Property {
  const { overrides } = useOverrides();
  const o = overrides[property.slug];
  if (!o) return property;
  return { ...property, ...o, tags: o.tags ?? property.tags };
}

/**
 * Every listing for display: admin-created ones first, then built-ins that
 * haven't been removed. Field overrides are applied per card via
 * usePropertyView, so this returns the base records.
 */
export function useProperties(): Property[] {
  const { customProperties, hiddenProperties } = useOverrides();
  return useMemo(() => {
    const customSlugs = new Set(customProperties.map((p) => p.slug));
    const base = baseProperties.filter(
      (p) => !hiddenProperties.includes(p.slug) && !customSlugs.has(p.slug)
    );
    return [...customProperties, ...base];
  }, [customProperties, hiddenProperties]);
}

/**
 * Every knowledge-base article for display: CMS posts first (a CMS post with a
 * built-in slug replaces that article), minus any the admin removed.
 */
export function useArticles(): Article[] {
  const { blogs, hiddenArticles } = useOverrides();
  return useMemo(() => {
    const overridden = new Set(blogs.map((b) => b.slug));
    const base = articles.filter((a) => !overridden.has(a.slug) && !hiddenArticles.includes(a.slug));
    return [...blogs, ...base].sort((a, b) => b.date.localeCompare(a.date));
  }, [blogs, hiddenArticles]);
}

export type { Override, BlogPost };
