import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { cmsConfigured, uploadMedia } from "@/lib/cms";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB per image
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
        return NextResponse.json({ error: `${f.name} is over 8 MB` }, { status: 400 });
      }
      if (f.type && !ALLOWED.includes(f.type)) {
        return NextResponse.json({ error: `${f.name} is not an image` }, { status: 400 });
      }
    }

    const urls: string[] = [];
    for (const f of files) urls.push(await uploadMedia(f, prefix));
    return NextResponse.json({ urls });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
