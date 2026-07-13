"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Property, PropertyTag, PropertyType, Tenure } from "@/data/properties";
import type { Article, ArticleSection } from "@/data/articles";

/**
 * Client-side content store for the /admin panel.
 *
 * - `overrides`  : per-property field overrides (every editable detail field)
 * - `blogs`      : admin-authored blog posts (same shape as KB articles)
 *
 * Both persist in localStorage and hydrate after mount, so SSR always renders
 * the base data and admin edits appear instantly in the same browser.
 */

export interface Override {
  name?: string;
  areaName?: string;
  tenure?: Tenure;
  leaseholdYears?: number;
  type?: PropertyType;
  price?: number; // IDR
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;
  excerpt?: string;
  description?: string[];
  highlights?: string[];
  features?: string[];
  tags?: PropertyTag[];
  nightlyRate?: number;
  occupancy?: number;
  featured?: boolean;
}

export type BlogPost = Article & { custom: true };

type OverrideMap = Record<string, Override>;

interface OverridesState {
  overrides: OverrideMap;
  blogs: BlogPost[];
  ready: boolean;
  patchProperty: (slug: string, patch: Override) => void;
  resetOne: (slug: string) => void;
  resetAll: () => void;
  saveBlog: (post: BlogPost) => void;
  deleteBlog: (slug: string) => void;
}

const KEY = "bp-overrides";
const BLOG_KEY = "bp-blogs";
const OverridesContext = createContext<OverridesState | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/** Drop undefined keys and empty arrays/strings so the map stays tidy. */
function compact(o: Override): Override {
  const out: Override = {};
  for (const [k, v] of Object.entries(o)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (Array.isArray(v) && v.length === 0 && k !== "tags") continue;
    // an explicitly-empty tags array is meaningful (= clear all tags on a
    // property that has base tags), so keep it
    (out as Record<string, unknown>)[k] = v;
  }
  if (out.tags && out.tags.length === 0) {
    // keep [] only as an override; harmless either way
  }
  return out;
}

export function OverridesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOverrides(readJson<OverrideMap>(KEY, {}));
    setBlogs(readJson<BlogPost[]>(BLOG_KEY, []));
    setReady(true);
  }, []);

  // Reflect edits made in another open tab (e.g. /admin next to the site).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setOverrides(e.newValue ? JSON.parse(e.newValue) : {});
      if (e.key === BLOG_KEY) setBlogs(e.newValue ? JSON.parse(e.newValue) : []);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const patchProperty = useCallback((slug: string, patch: Override) => {
    setOverrides((prev) => {
      const merged = compact({ ...prev[slug], ...patch });
      const next = { ...prev };
      if (Object.keys(merged).length === 0) delete next[slug];
      else next[slug] = merged;
      writeJson(KEY, next);
      return next;
    });
  }, []);

  const resetOne = useCallback((slug: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[slug];
      writeJson(KEY, next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides(() => {
      writeJson(KEY, {});
      return {};
    });
  }, []);

  const saveBlog = useCallback((post: BlogPost) => {
    setBlogs((prev) => {
      const next = [...prev.filter((b) => b.slug !== post.slug), post].sort((a, b) =>
        b.date.localeCompare(a.date)
      );
      writeJson(BLOG_KEY, next);
      return next;
    });
  }, []);

  const deleteBlog = useCallback((slug: string) => {
    setBlogs((prev) => {
      const next = prev.filter((b) => b.slug !== slug);
      writeJson(BLOG_KEY, next);
      return next;
    });
  }, []);

  return (
    <OverridesContext.Provider
      value={{ overrides, blogs, ready, patchProperty, resetOne, resetAll, saveBlog, deleteBlog }}
    >
      {children}
    </OverridesContext.Provider>
  );
}

export function useOverrides() {
  const ctx = useContext(OverridesContext);
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

/** Admin-authored blog posts (already sorted newest first). */
export function useBlogs() {
  const { blogs } = useOverrides();
  return blogs;
}

export type { ArticleSection };
