import Image from "next/image";

type Tone = "color" | "white" | "black";

const SRC: Record<Tone, string> = {
  color: "/logo/wordmark-color.png",
  white: "/logo/wordmark-white.png",
  black: "/logo/wordmark-black.png",
};

/**
 * The Bhagawan Property Bali wordmark. `tone` picks the recoloured variant:
 * color (copper) for image overlays, white for dark surfaces, black for light.
 * Size it by setting a height class (e.g. "h-9 w-auto").
 */
export default function Wordmark({
  tone = "color",
  className,
  priority = false,
}: {
  tone?: Tone;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt="Bhagawan Property Bali"
      width={538}
      height={186}
      priority={priority}
      className={className}
    />
  );
}
