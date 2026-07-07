import Reveal from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`font-display mt-4 text-3xl leading-[1.12] font-medium tracking-tight md:text-5xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-cream/65" : "text-muted"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
