import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { cmsConfigured, writeBlog, removeBlog, restoreBlog } from "@/lib/cms";
import { getArticle } from "@/data/articles";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!cmsConfigured) return NextResponse.json({ error: "CMS not configured" }, { status: 503 });

  try {
    const body = await req.json();

    if (body.remove) {
      const slug = String(body.slug ?? "");
      if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
      await removeBlog(slug, Boolean(getArticle(slug)));
      return NextResponse.json({ ok: true });
    }

    if (body.restore) {
      const slug = String(body.slug ?? "");
      if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
      await restoreBlog(slug);
      return NextResponse.json({ ok: true });
    }

    const post = body.post;
    if (!post?.slug || !post?.title) {
      return NextResponse.json({ error: "post.slug and post.title required" }, { status: 400 });
    }
    await writeBlog(post);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
