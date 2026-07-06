import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import type { Area } from "@/data/areas";

export default function AreaCard({ area, tall = false }: { area: Area; tall?: boolean }) {
  return (
    <TransitionLink
      href={`/areas/${area.slug}`}
      className="group relative block overflow-hidden"
      aria-label={`Explore ${area.name}`}
    >
      <div className={`img-frame relative ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image
          src={area.cardImage}
          alt={`${area.name}, Bali`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className="font-display text-2xl text-cream md:text-3xl">{area.name}</h3>
        <p className="mt-2 line-clamp-2 max-w-xs text-sm leading-relaxed text-cream/75">
          {area.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-cream">
          Explore Area
          <span className="block h-px w-8 bg-bronze transition-all duration-500 group-hover:w-14" />
        </span>
      </div>
    </TransitionLink>
  );
}
