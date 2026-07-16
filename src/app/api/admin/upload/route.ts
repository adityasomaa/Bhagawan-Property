import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { cmsConfigured, uploadMedia } from "@/lib/cms";

/**
 * Vercel rejects serverless request bodies over ~4.5 MB with a raw 413 before
 * this handler runs, so the ceiling here must sit under that — advertising
 * more just produces an opaque platform error. The client downscales photos
 * before sending, so this is a backstop rather than the usual path.
 */
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!cmsConfigured) return NextResponse.json({ error: "CMS not configured" }, { status: 503 });

  try {
    const form = await req.formData();
    const prefix = String(form.get("prefix") ?? "misc").replace(/[^a-z0-9-_]/gi, "") || "misc";
    const files = form.getAll("files").filter((f): f is File => f instanceof File);
    if (files.length === 0) return NextResponse.json({ error: "No files" }, { status: 400 });

    for (const f of files) {
      if (f.size > MAX_BYTES) {
        return NextResponse.json(
          { error: `${f.name} is ${(f.size / 1024 / 1024).toFixed(1)} MB — the limit is 4 MB.` },
          { status: 400 }
        );
      }
      if (f.type && !ALLOWED.includes(f.type)) {
        return NextResponse.json(
          { error: `${f.name} is a ${f.type || "unknown"} file — use JPG, PNG, WebP or AVIF.` },
          { status: 400 }
        );
      }
    }

    const urls: string[] = [];
    for (const f of files) urls.push(await uploadMedia(f, prefix));
    return NextResponse.json({ urls });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
