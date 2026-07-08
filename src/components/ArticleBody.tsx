"use client";

import { useLocale } from "@/lib/i18n/provider";
import { articleTr } from "@/data/tr/articles";
import type { Article } from "@/data/articles";

/**
 * Renders an article's body (sections + FAQ) in the active language, falling
 * back to the English original per section / paragraph / list item / FAQ entry
 * so a partially translated article never renders blank.
 */
export default function ArticleBody({ article }: { article: Article }) {
  const { t, lang } = useLocale();
  const tr = articleTr[article.slug]?.[lang];
  const trSections = tr?.sections;
  const trFaq = tr?.faq;

  const pick = <T,>(en: T, translated: T | undefined): T =>
    translated !== undefined && translated !== null ? translated : en;

  return (
    <>
      <div className="prose-editorial mx-auto mt-14 max-w-3xl">
        {article.sections.map((s, i) => {
          const st = trSections?.[i];
          return (
            <section key={i}>
              {s.heading && <h2>{pick(s.heading, st?.heading)}</h2>}
              {s.paragraphs?.map((p, j) => <p key={j}>{pick(p, st?.paragraphs?.[j])}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((li, j) => (
                    <li key={j}>{pick(li, st?.list?.[j])}</li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {article.faq && (
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-paper p-8 md:p-10">
          <h2 className="font-display text-2xl text-ink">{t("kb.faq")}</h2>
          <dl className="mt-6 space-y-6">
            {article.faq.map((f, i) => (
              <div key={i} className="border-t border-line pt-5">
                <dt className="font-medium text-ink">{pick(f.q, trFaq?.[i]?.q)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{pick(f.a, trFaq?.[i]?.a)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
}
