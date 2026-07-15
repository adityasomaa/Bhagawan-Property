import "server-only";
import { createClient } from "@supabase/supabase-js";
import { properties as baseProperties, type Property } from "@/data/properties";
import type { Override, BlogPost, Content } from "@/lib/content-types";

/**
 * Server-side CMS layer backed by Supabase.
 *
 * The secret key never reaches the browser: public pages read through server
 * components, and the admin writes through /api/admin/* route handlers that
 * are gated by the access cookie. If the env vars are missing (e.g. a fork
 * without secrets) every read degrades to empty so the site still renders its
 * base data.
 */

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

export const cmsConfigured = Boolean(url && key);

export const supabase = cmsConfigured
  ? createClient(url!, key!, { auth: { persistSession: false } })
  : null;

export const MEDIA_BUCKET = "bhagawan-media";
const OVERRIDES_TABLE = "bhagawan_property_overrides";
const BLOGS_TABLE = "bhagawan_blogs";

export type CmsContent = Content;

export const EMPTY_CONTENT: CmsContent = {
  overrides: {},
  customProperties: [],
  hiddenProperties: [],
  blogs: [],
  hiddenArticles: [],
};

/** Read the whole CMS payload. Never throws — falls back to base data. */
export async function readContent(): Promise<CmsContent> {
  if (!supabase) return EMPTY_CONTENT;
  try {
    const [ov, bl] = await Promise.all([
      supabase.from(OVERRIDES_TABLE).select("slug, data, hidden, custom"),
      supabase.from(BLOGS_TABLE).select("slug, data, hidden"),
    ]);
    if (ov.error || bl.error) {
      console.error("CMS read failed", ov.error ?? bl.error);
      return EMPTY_CONTENT;
    }

    const overrides: Record<string, Override> = {};
    const customProperties: Property[] = [];
    const hiddenProperties: string[] = [];
    for (const row of ov.data ?? []) {
      if (row.custom) customProperties.push({ ...(row.data as Property), slug: row.slug });
      else if (row.hidden) hiddenProperties.push(row.slug);
      else overrides[row.slug] = (row.data ?? {}) as Override;
    }

    const blogs: BlogPost[] = [];
    const hiddenArticles: string[] = [];
    for (const row of bl.data ?? []) {
      if (row.hidden) hiddenArticles.push(row.slug);
      else blogs.push({ ...(row.data as BlogPost), slug: row.slug });
    }
    blogs.sort((a, b) => b.date.localeCompare(a.date));

    return { overrides, customProperties, hiddenProperties, blogs, hiddenArticles };
  } catch (e) {
    console.error("CMS read threw", e);
    return EMPTY_CONTENT;
  }
}

/**
 * Every listing for display: admin-created ones first, then the built-ins
 * that haven't been removed. Field overrides are applied by the client
 * (usePropertyView) so the admin sees edits instantly.
 */
export async function getAllProperties(content?: CmsContent): Promise<Property[]> {
  const c = content ?? (await readContent());
  const customSlugs = new Set(c.customProperties.map((p) => p.slug));
  const base = baseProperties.filter(
    (p) => !c.hiddenProperties.includes(p.slug) && !customSlugs.has(p.slug)
  );
  return [...c.customProperties, ...base];
}

export async function writeOverride(slug: string, data: Override) {
  if (!supabase) throw new Error("CMS not configured");

  // Editing an admin-created listing patches the stored record itself.
  const { data: existing } = await supabase
    .from(OVERRIDES_TABLE)
    .select("data, custom")
    .eq("slug", slug)
    .maybeSingle();

  if (existing?.custom) {
    const merged = { ...(existing.data as Property), ...data, slug };
    const { error } = await supabase
      .from(OVERRIDES_TABLE)
      .update({ data: merged, updated_at: new Date().toISOString() })
      .eq("slug", slug);
    if (error) throw new Error(error.message);
    return;
  }

  if (Object.keys(data).length === 0) return deleteOverride(slug);
  const { error } = await supabase
    .from(OVERRIDES_TABLE)
    .upsert({ slug, data, custom: false, hidden: false, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

/** Insert a brand-new listing authored in /admin. */
export async function createProperty(property: Property) {
  if (!supabase) throw new Error("CMS not configured");
  const { error } = await supabase.from(OVERRIDES_TABLE).insert({
    slug: property.slug,
    data: property,
    custom: true,
    hidden: false,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

/**
 * Remove a listing. Admin-created ones are deleted outright; built-ins are
 * tombstoned (they live in code, so a plain delete would resurrect them).
 */
export async function removeProperty(slug: string, isBuiltIn: boolean) {
  if (!supabase) throw new Error("CMS not configured");
  if (!isBuiltIn) return deleteOverride(slug);
  const { error } = await supabase.from(OVERRIDES_TABLE).upsert({
    slug,
    data: {},
    hidden: true,
    custom: false,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

export async function deleteOverride(slug: string) {
  if (!supabase) throw new Error("CMS not configured");
  const { error } = await supabase.from(OVERRIDES_TABLE).delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

/** Reset built-in listings to their original data. Custom ones are kept. */
export async function deleteAllOverrides() {
  if (!supabase) throw new Error("CMS not configured");
  const { error } = await supabase.from(OVERRIDES_TABLE).delete().eq("custom", false);
  if (error) throw new Error(error.message);
}

export async function writeBlog(post: BlogPost) {
  if (!supabase) throw new Error("CMS not configured");
  const { slug, ...rest } = post;
  const { error } = await supabase
    .from(BLOGS_TABLE)
    .upsert({ slug, data: { ...rest, slug }, hidden: false, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

/** Remove a custom post, or tombstone a built-in article so it stops showing. */
export async function removeBlog(slug: string, isBuiltIn: boolean) {
  if (!supabase) throw new Error("CMS not configured");
  if (isBuiltIn) {
    const { error } = await supabase
      .from(BLOGS_TABLE)
      .upsert({ slug, data: {}, hidden: true, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return;
  }
  const { error } = await supabase.from(BLOGS_TABLE).delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

/** Clear a tombstone / customisation so a built-in article returns to base. */
export async function restoreBlog(slug: string) {
  if (!supabase) throw new Error("CMS not configured");
  const { error } = await supabase.from(BLOGS_TABLE).delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

export async function uploadMedia(file: File, prefix: string): Promise<string> {
  if (!supabase) throw new Error("CMS not configured");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safe = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(safe, file, { contentType: file.type || "image/jpeg", upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(safe);
  return data.publicUrl;
}
