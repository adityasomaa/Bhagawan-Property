"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useT } from "@/lib/i18n/provider";

/**
 * Property image gallery. The trigger grid opens a full-screen lightbox that
 * shows one image at a time with prev/next navigation (buttons, keyboard
 * arrows, and a thumbnail strip). While open, Lenis is stopped and body scroll
 * is locked so nothing behind the overlay moves.
 */
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => setMounted(true), []);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="img-frame relative col-span-4 aspect-[16/9] cursor-zoom-in md:col-span-3 md:aspect-[16/10]"
          aria-label={`${t("gallery.open")} — ${name}`}
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
              onClick={() => openAt(i + 1)}
              className="img-frame relative aspect-[4/3] cursor-zoom-in md:aspect-[16/10.2]"
              aria-label={`${t("gallery.photo")} ${i + 2} — ${name}`}
            >
              <Image
                src={src}
                alt={`${name} — view ${i + 2}`}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              {i === 2 && total > 4 && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/45 text-[10px] font-medium tracking-[0.3em] uppercase text-cream">
                  +{total - 4}
                </span>
              )}
              {i === 2 && total <= 4 && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/30 text-[10px] font-medium tracking-[0.3em] uppercase text-cream opacity-0 transition-opacity hover:opacity-100">
                  {t("gallery.all")}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Portalled to <body>: the trigger grid sits inside GSAP-transformed
          wrappers (Reveal), and a transformed ancestor becomes the containing
          block for position:fixed — which trapped the lightbox mid-page. */}
      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label={`${t("gallery.open")} — ${name}`}
          data-lenis-prevent
        >
          {/* top bar: counter + close */}
          <div className="flex items-center justify-between px-5 py-5 md:px-8">
            <p className="text-[11px] tracking-[0.35em] uppercase text-cream/60">
              {index + 1} / {total}
            </p>
            <button
              type="button"
              onClick={close}
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
              aria-label={t("gallery.close")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>

          {/* main stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <div className="relative h-full max-h-[72vh] w-full max-w-5xl">
              <Image
                key={index}
                src={images[index]}
                alt={`${name} — ${t("gallery.photo")} ${index + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="animate-[fadeIn_.3s_ease] object-contain"
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="glass absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 md:left-6"
                  aria-label={t("gallery.prev")}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="glass absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 md:right-6"
                  aria-label={t("gallery.next")}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* thumbnail strip */}
          <div className="shrink-0 overflow-x-auto px-4 py-5 md:px-8" data-lenis-prevent>
            <div className="mx-auto flex w-max gap-2 md:gap-2.5">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity md:h-16 md:w-24 ${
                    i === index ? "opacity-100 ring-2 ring-cream" : "opacity-45 hover:opacity-80"
                  }`}
                  aria-label={`${t("gallery.photo")} ${i + 1}`}
                  aria-current={i === index}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
