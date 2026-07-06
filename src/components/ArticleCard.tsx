import Image from "next/image";
import { TransitionLink } from "@/components/motion/PageTransition";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <TransitionLink href={`/knowledge-base/${article.slug}`} className="group block">
      <div className="img-frame relative aspect-[16/10]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="pt-5">
        <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.25em] uppercase text-bronze">
          <span>{article.category}</span>
          <span className="h-px w-6 bg-line" />
          <span className="text-muted">{article.readTime}</span>
        </div>
        <h3 className="font-display mt-3 text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-bronze-deep md:text-xl">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      </div>
    </TransitionLink>
  );
}
