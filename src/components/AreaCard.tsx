"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import { useLocale } from "@/lib/i18n/provider";
import { areaTr } from "@/data/tr/areas";
import type { Area } from "@/data/areas";

export default function AreaCard({ area, tall = false }: { area: Area; tall?: boolean }) {
  const { t, lang } = useLocale();
  const tagline = (lang !== "en" && areaTr[area.slug]?.tagline?.[lang]) || area.tagline;

  return (
    <TransitionLink
      href={`/areas/${area.slug}`}
      className="group relative block"
      aria-label={t("area.exploreAria").replace("{name}", area.name)}
    >
      <div className={`img-frame relative rounded-3xl ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image
          src={area.cardImage}
          alt={`${area.name}, Bali`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute inset-x-3 bottom-3">
          <div className="glass rounded-2xl p-5 transition-colors duration-500 group-hover:bg-white/15 md:p-6">
            <h3 className="font-display text-xl font-medium tracking-tight text-white md:text-2xl">
              {area.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/70">
              {tagline}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase text-white">
              {t("area.explore")}
              <span className="block h-px w-7 bg-white/70 transition-all duration-500 group-hover:w-12" />
            </span>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}
