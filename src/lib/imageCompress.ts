"use client";

/**
 * Downscale + re-encode a photo in the browser before upload.
 *
 * Why: Vercel rejects any serverless request body over ~4.5 MB with a raw 413
 * before our handler ever runs, and phone/DSLR photos routinely exceed that.
 * Shrinking here keeps uploads well under the cap, makes them faster, and
 * normalises odd formats to JPEG.
 */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stay under Vercel's ~4.5 MB
const MAX_DIMENSION = 2400; // plenty for full-screen gallery viewing
const QUALITY = 0.82;
/** Below this, a photo is already small enough to send untouched. */
const SKIP_UNDER = 900 * 1024;

export class UnreadableImageError extends Error {
  constructor(public fileName: string) {
    super(
      `${fileName} couldn't be read by the browser. If it's an iPhone HEIC photo, ` +
        `set Settings → Camera → Formats to "Most Compatible", or convert it to JPG first.`
    );
    this.name = "UnreadableImageError";
  }
}

export async function compressImage(file: File): Promise<File> {
  // Animated GIFs would lose their animation through a canvas — pass through.
  if (file.type === "image/gif") return file;

  let bitmap: ImageBitmap;
  try {
    // Throws for formats the browser can't decode (e.g. HEIC outside Safari).
    bitmap = await createImageBitmap(file);
  } catch {
    throw new UnreadableImageError(file.name);
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));

  // Already modest in both size and dimensions — don't re-encode it.
  if (scale === 1 && file.size <= SKIP_UNDER) {
    bitmap.close?.();
    return file;
  }

  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close?.();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY)
  );
  if (!blob) return file;

  // If re-encoding somehow made it bigger, keep the original.
  if (blob.size >= file.size && scale === 1) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
}
