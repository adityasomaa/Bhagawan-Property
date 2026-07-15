import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { cmsConfigured, writeOverride, deleteOverride, deleteAllOverrides } from "@/lib/cms";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!cmsConfigured) return NextResponse.json({ error: "CMS not configured" }, { status: 503 });

  try {
    const body = await req.json();

    if (body.resetAll) {
      await deleteAllOverrides();
      return NextResponse.json({ ok: true });
    }

    const slug = String(body.slug ?? "");
    if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

    if (body.reset) {
      await deleteOverride(slug);
      return NextResponse.json({ ok: true });
    }

    await writeOverride(slug, body.data ?? {});
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
