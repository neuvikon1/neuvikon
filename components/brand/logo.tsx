import Image from "next/image";

import { cn } from "@/lib/utils";
import glyph from "@/public/neuvikon-n.png";
import wordmarkOnDark from "@/public/neuvikon-logo.png";
import wordmarkOnLight from "@/public/neuvikon-logo-light.png";

/**
 * The Neuvikon marks, as the original artwork.
 *
 * The logo is a drawn signature, so it is never redrawn as type or as an SVG
 * path - the smallest difference in a curve reads as a forgery. What ships is
 * always the original PNG, carried over from the previous site.
 *
 * Both ink versions are printed and CSS picks between them. Choosing one in
 * JavaScript would show the wrong ink for the first frame, before next-themes
 * has put its class on the document.
 */
const INK = {
  /** Light ink, for the dark theme. */
  dark: "hidden dark:block",
  /** Dark ink, for the light theme. */
  light: "block dark:hidden",
} as const;

type MarkProps = {
  /** Rendered height in pixels; the width follows the artwork's ratio. */
  height?: number;
  /** Set on the mark in the header, which is above the fold on every page. */
  priority?: boolean;
  className?: string;
};

/**
 * The full wordmark.
 *
 * Neither copy carries alt text: only one ink version is displayed at a time,
 * so a name on the image would disappear with it in the other theme. The name
 * comes from whatever wraps the mark - the header and footer links label
 * themselves - which is also what stops it being announced twice.
 */
export function Wordmark({
  height = 24,
  priority = false,
  className,
}: MarkProps) {
  return (
    <>
      <Image
        src={wordmarkOnLight}
        alt=""
        aria-hidden
        height={height}
        style={{ height, width: "auto" }}
        priority={priority}
        className={cn(INK.light, className)}
      />
      <Image
        src={wordmarkOnDark}
        alt=""
        aria-hidden
        height={height}
        style={{ height, width: "auto" }}
        priority={priority}
        className={cn(INK.dark, className)}
      />
    </>
  );
}

/**
 * The N on its own, for the places the wordmark does not fit. Decorative
 * wherever it appears beside the name, which is why it carries no alt text.
 */
export function Glyph({ height = 20, priority = false, className }: MarkProps) {
  return (
    <Image
      src={glyph}
      alt=""
      aria-hidden
      height={height}
      style={{ height, width: "auto" }}
      priority={priority}
      className={className}
    />
  );
}
