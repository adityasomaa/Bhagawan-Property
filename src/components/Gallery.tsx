"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

/**
 * Property image gallery with a scrollable lightbox popup. While the popup
 * is open, Lenis is stopped and the popup opts out via data-lenis-prevent so
 * the mousewheel scrolls the popup natively.
 */
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="img-frame relative col-span-4 aspect-[16/9] cursor-zoom-in md:col-span-3 md:aspect-[16/10]"
          aria-label={`Open photo gallery of ${name}`}
        >
          <Image
            src={images[0]}
            alt={`${name} — main view`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            className="object-cover"
          />
        </button>
        <div className="col-span-4 grid grid-cols-3 gap-2 md:col-span-1 md:grid-cols-1 md:gap-3">
          {images.slice(1, 4).map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setOpen(true)}
              className="img-frame relative aspect-[4/3] cursor-zoom-in md:aspect-[16/10.2]"
              aria-label={`Open photo ${i + 2} of ${name}`}
            >
              <Image
                src={src}
                alt={`${name} — view ${i + 2}`}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              {i === 2 && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/45 text-[10px] font-medium tracking-[0.3em] uppercase text-cream">
                  All Photos
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-ink/97"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo gallery of ${name}`}
        >
          <button
            type="button"
            onClick={close}
            className="fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center border border-cream/30 text-cream transition-colors hover:border-cream"
            aria-label="Close gallery"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <div className="h-full overflow-y-auto px-4 py-20 md:px-10" data-lenis-prevent>
            <div className="mx-auto max-w-5xl space-y-4">
              <p className="text-center text-[10px] tracking-[0.4em] uppercase text-cream/50">
                {name} &middot; {images.length} photos
              </p>
              {images.map((src, i) => (
                <div key={src + i} className="relative aspect-[16/10] w-full">
                  <Image
                    src={src}
                    alt={`${name} — photo ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
