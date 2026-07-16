import type { Property, PropertyTag, PropertyType, Tenure } from "@/data/properties";
import type { Article } from "@/data/articles";

/** Per-property field overrides authored in /admin. Only changed fields are stored. */
export interface Override {
  name?: string;
  area?: string; // area slug
  areaName?: string;
  tenures?: Tenure[];
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
  images?: string[];
  /** Place label kept for reference; the map is driven by `coords`. */
  mapQuery?: string;
  coords?: { lat: number; lng: number };
}

/** A knowledge-base post stored in the CMS (custom, or an edited built-in). */
export type BlogPost = Article;

/**
 * Apply an admin override to a listing. Used by BOTH the server (so tenure /
 * area filters and listing pages see edited values) and the client, so a
 * property reads the same everywhere. Idempotent.
 */
export function applyOverride(p: Property, o: Override | undefined): Property {
  if (!o) return p;
  return { ...p, ...o, tags: o.tags ?? p.tags };
}

export interface Content {
  overrides: Record<string, Override>;
  /** Listings created in /admin (full records, not overrides). */
  customProperties: Property[];
  /** Slugs of built-in listings the admin removed. */
  hiddenProperties: string[];
  blogs: BlogPost[];
  /** Slugs of built-in articles the admin removed. */
  hiddenArticles: string[];
}
