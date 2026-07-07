/**
 * Bhagawan Property logo mark — a modern, solid trace of a candi bentar
 * (Balinese split gateway): two mirrored arch halves, a sun in the opening,
 * and a grounding base. Filled shapes so it stays crisp at any size.
 */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden="true">
      {/* left arch half */}
      <path d="M10 40.5 L10 26 C10 15.2 14.6 7 21 7 L21 40.5 Z" />
      {/* right arch half (mirrored) */}
      <path d="M38 40.5 L38 26 C38 15.2 33.4 7 27 7 L27 40.5 Z" />
      {/* sun in the gateway */}
      <circle cx="24" cy="16.5" r="2.6" />
      {/* base */}
      <rect x="7" y="43" width="34" height="2.4" rx="1.2" />
    </svg>
  );
}
