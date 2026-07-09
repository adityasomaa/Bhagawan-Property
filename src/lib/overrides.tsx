"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Property, PropertyTag } from "@/data/properties";

/** Admin-managed, per-property overrides persisted in the browser. */
export interface Override {
  tags?: PropertyTag[];
  price?: number; // IDR
}

type OverrideMap = Record<string, Override>;

interface OverridesState {
  overrides: OverrideMap;
  ready: boolean;
  setTags: (slug: string, tags: PropertyTag[]) => void;
  setPrice: (slug: string, price: number | undefined) => void;
  resetOne: (slug: string) => void;
  resetAll: () => void;
}

const KEY = "bp-overrides";
const OverridesContext = createContext<OverridesState | null>(null);

export function OverridesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [ready, setReady] = useState(false);

  // Hydrate after mount so SSR always renders the base data.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setOverrides(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  // Reflect edits made in the /admin tab into other open tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try {
          setOverrides(e.newValue ? JSON.parse(e.newValue) : {});
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: OverrideMap) => {
    setOverrides(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const patch = useCallback(
    (slug: string, p: Override) => {
      setOverrides((prev) => {
        const merged: Override = { ...prev[slug], ...p };
        // Drop empty keys so the map stays tidy.
        if (merged.tags && merged.tags.length === 0) delete merged.tags;
        if (merged.price === undefined) delete merged.price;
        const next = { ...prev, [slug]: merged };
        if (Object.keys(merged).length === 0) delete next[slug];
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const setTags = useCallback((slug: string, tags: PropertyTag[]) => patch(slug, { tags }), [patch]);
  const setPrice = useCallback(
    (slug: string, price: number | undefined) => patch(slug, { price }),
    [patch]
  );
  const resetOne = useCallback(
    (slug: string) =>
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[slug];
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      }),
    []
  );
  const resetAll = useCallback(() => persist({}), [persist]);

  return (
    <OverridesContext.Provider value={{ overrides, ready, setTags, setPrice, resetOne, resetAll }}>
      {children}
    </OverridesContext.Provider>
  );
}

export function useOverrides() {
  const ctx = useContext(OverridesContext);
  if (!ctx) throw new Error("useOverrides must be used within OverridesProvider");
  return ctx;
}

/** Merge a property's base data with any active override (tags + price). */
export function usePropertyView(property: Property): { tags: PropertyTag[]; price: number } {
  const { overrides } = useOverrides();
  const o = overrides[property.slug];
  return {
    tags: o?.tags ?? property.tags ?? [],
    price: o?.price ?? property.price,
  };
}
