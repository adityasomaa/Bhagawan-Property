/**
 * Bhagawan Property logo mark — a minimal candi bentar (Balinese split gate)
 * with a rising sun in the opening. Thin strokes, editorial weight.
 */
export default function LogoMark({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      {/* left half of the gate */}
      <path d="M10 54 V38 H14 V30 H18 V22 H22 V13 H26 V54" />
      {/* right half of the gate */}
      <path d="M54 54 V38 H50 V30 H46 V22 H42 V13 H38 V54" />
      {/* sun in the opening */}
      <circle cx="32" cy="24" r="3.25" />
      {/* base */}
      <path d="M6 54 H58" />
    </svg>
  );
}
