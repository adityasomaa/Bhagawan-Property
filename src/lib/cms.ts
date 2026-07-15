import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Override, BlogPost } from "@/lib/content-types";

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

export interface CmsContent {
  overrides: Record<string, Override>;
  blogs: BlogPost[];
  hiddenArticles: string[];
}

export const EMPTY_CONTENT: CmsContent = { overrides: {}, blogs: [], hiddenArticles: [] };

/** Read the whole CMS payload. Never throws — falls back to base data. */
export async function readContent(): Promise<CmsContent> {
  if (!supabase) return EMPTY_CONTENT;
  try {
    const [ov, bl] = await Promise.all([
      supabase.from(OVERRIDES_TABLE).select("slug, data"),
      supabase.from(BLOGS_TABLE).select("slug, data, hidden"),
    ]);
    if (ov.error || bl.error) {
      console.error("CMS read failed", ov.error ?? bl.error);
      return EMPTY_CONTENT;
    }

    const overrides: Record<string, Override> = {};
    for (const row of ov.data ?? []) overrides[row.slug] = (row.data ?? {}) as Override;

    const blogs: BlogPost[] = [];
    const hiddenArticles: string[] = [];
    for (const row of bl.data ?? []) {
      if (row.hidden) hiddenArticles.push(row.slug);
      else blogs.push({ ...(row.data as BlogPost), slug: row.slug });
    }
    blogs.sort((a, b) => b.date.localeCompare(a.date));

    return { overrides, blogs, hiddenArticles };
  } catch (e) {
    console.error("CMS read threw", e);
    return EMPTY_CONTENT;
  }
}

export async function writeOverride(slug: string, data: Override) {
  if (!supabase) throw new Error("CMS not configured");
  if (Object.keys(data).length === 0) return deleteOverride(slug);
  const { error } = await supabase
    .from(OVERRIDES_TABLE)
    .upsert({ slug, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function deleteOverride(slug: string) {
  if (!supabase) throw new Error("CMS not configured");
  const { error } = await supabase.from(OVERRIDES_TABLE).delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

export async function deleteAllOverrides() {
  if (!supabase) throw new Error("CMS not configured");
  const { error } = await supabase.from(OVERRIDES_TABLE).delete().neq("slug", "");
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
