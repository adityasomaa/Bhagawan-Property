import type { Property, PropertyTag, PropertyType, Tenure } from "@/data/properties";
import type { Article } from "@/data/articles";

/** Per-property field overrides authored in /admin. Only changed fields are stored. */
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
  images?: string[];
}

/** A knowledge-base post stored in the CMS (custom, or an edited built-in). */
export type BlogPost = Article;

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
