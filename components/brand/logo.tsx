"use client";

import Image from "next/image";
import { useId } from "react";

import { cn } from "@/lib/utils";
import glyph from "@/public/neuvikon-n.png";

/**
 * The Neuvikon marks, as the original artwork.
 *
 * The wordmark is the current mark, a vector original in Figma: `Wordmark`
 * serves the design system's SVG (the same file the header shows), and the
 * hero's `SignedWordmark` ships its paths so it can animate them. The glyph is
 * still the old signature, a drawn PNG, and so is never redrawn as type or as
 * an SVG path - the smallest difference in a curve reads as a forgery.
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

/** The design system wordmark's own width over its height. */
const WORDMARK_RATIO = 115.938 / 20.0069;

/**
 * The full wordmark, as the header shows it: the design system's SVG, with a
 * copy whose letters are set in the dark theme's foreground. The green N is
 * the same in both.
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
  const width = Math.round(height * WORDMARK_RATIO);
  return (
    <>
      <Image
        src="/brand/neuvikon-wordmark.svg"
        alt=""
        aria-hidden
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={cn(INK.light, className)}
      />
      <Image
        src="/brand/neuvikon-wordmark-dark.svg"
        alt=""
        aria-hidden
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={cn(INK.dark, className)}
      />
    </>
  );
}

/**
 * The current mark, drawn from the Figma "Main logo" (file neuvikon, node
 * 198:511): the green wave-N and the geometric "euvikon" beside it. Unlike the
 * old signature this is a vector original, so the paths below are the artwork
 * itself, copied out of Figma - each letter at its offset in the logo.
 *
 * The N alone is set a touch lighter than in Figma: its outline is pulled in
 * by 1.5 units all round (strokes ~15 -> ~12), keeping its shape. The right
 * foot was held to the baseline while doing so, so it still sits level with
 * "euvikon".
 */
const MARK = {
  n: "M 2.06 34.12 L 2.74 34.73 L 3.46 35.31 L 4.21 35.85 L 4.79 36.22 L 5.59 36.66 L 6.20 36.94 L 7.02 37.26 L 7.64 37.45 L 8.46 37.63 L 9.08 37.71 L 9.69 37.74 L 10.30 37.71 L 10.91 37.63 L 11.52 37.50 L 12.12 37.30 L 12.73 37.04 L 13.53 36.58 L 14.13 36.12 L 15 35.31 L 16.28 34 L 19.05 30.92 L 25.70 23.28 L 27.04 21.80 L 28.17 20.63 L 28.40 20.44 L 28.66 20.30 L 28.95 20.22 L 29.25 20.19 L 29.69 20.27 L 29.96 20.39 L 30.20 20.56 L 30.41 20.78 L 30.57 21.03 L 30.67 21.31 L 30.72 21.60 L 30.87 24.56 L 30.96 27.54 L 31.01 33.11 L 30.92 43.46 L 30.90 59.09 L 30.85 62.23 L 30.91 63.82 L 31.09 65.07 L 31.28 65.81 L 31.50 66.41 L 31.82 67.08 L 32.23 67.73 L 32.70 68.33 L 33.22 68.86 L 33.79 69.33 L 34.41 69.74 L 35.07 70.09 L 35.76 70.38 L 36.48 70.61 L 37.49 70.82 L 38.26 70.91 L 39.30 70.92 L 40.08 70.86 L 40.85 70.73 L 41.86 70.47 L 42.83 70.09 L 43.73 69.61 L 44.37 69.18 L 44.96 68.69 L 45.51 68.14 L 46.50 66.98 L 47.46 65.77 L 49.19 63.40 L 53.34 57.32 L 58.79 49.64 L 69.29 34.63 L 72.72 29.80 L 76.32 24.83 L 78.97 20.93 L 80.19 19.29 L 81.32 17.95 L 82.01 17.22 L 82.53 16.73 L 83.29 16.08 L 83.84 15.67 L 84.45 15.27 L 85.05 14.93 L 85.68 14.64 L 86.33 14.39 L 87.01 14.20 L 87.71 14.06 L 88.43 14 L 89.10 14 L 89.85 14.06 L 90.30 14.14 L 91.06 14.32 L 91.78 14.56 L 92.56 14.89 L 93.21 15.23 L 93.78 15.58 L 94.52 16.13 L 95.04 16.60 L 95.66 17.26 L 96.09 17.79 L 96.59 18.52 L 96.93 19.10 L 97.35 19.93 L 97.70 20.76 L 98.01 21.63 L 98.27 22.53 L 98.50 23.45 L 98.67 24.36 L 98.86 25.57 L 98.99 26.77 L 99.10 28.24 L 99.18 31.25 L 99.19 73.29 L 110.19 73.29 L 110.31 65.02 L 110.29 64.76 L 110.40 56.77 L 110.45 50.24 L 110.45 43.48 L 110.36 36.80 L 110.15 30.47 L 109.87 25.68 L 109.64 23.10 L 109.47 21.52 L 109.17 19.40 L 108.94 18.18 L 108.70 17.13 L 108.45 16.26 L 107.88 14.88 L 107.39 13.88 L 106.85 12.93 L 105.96 11.55 L 105.30 10.69 L 104.24 9.46 L 103.48 8.69 L 102.68 7.96 L 101.85 7.27 L 100.54 6.32 L 99.64 5.74 L 98.22 4.96 L 96.76 4.29 L 95.76 3.91 L 94.23 3.42 L 93.19 3.16 L 91.62 2.88 L 90.56 2.75 L 88.96 2.67 L 87.89 2.69 L 86.29 2.83 L 85.23 2.99 L 83.65 3.35 L 82.61 3.67 L 81.07 4.26 L 80.06 4.73 L 79.08 5.27 L 77.92 6.02 L 77.04 6.68 L 76.01 7.57 L 75.04 8.52 L 74.11 9.54 L 73.05 10.83 L 72.03 12.19 L 68.33 17.52 L 65.54 21.41 L 63.14 24.83 L 54.03 38.19 L 50.26 43.61 L 47.80 47.03 L 45.64 49.94 L 45.33 50.24 L 44.95 50.45 L 44.67 50.52 L 44.38 50.53 L 44.10 50.49 L 43.82 50.40 L 43.57 50.26 L 43.36 50.07 L 43.18 49.84 L 43.05 49.58 L 42.97 49.31 L 42.91 48.68 L 42.67 45.23 L 42.50 40.78 L 42.46 36.32 L 42.50 31.37 L 42.67 21.53 L 42.71 16.96 L 42.87 11.89 L 42.83 10.10 L 42.68 8.60 L 42.46 7.40 L 42.11 6.28 L 41.90 5.75 L 41.65 5.25 L 41.15 4.46 L 40.49 3.69 L 39.72 3.03 L 38.88 2.49 L 37.96 2.06 L 37.38 1.87 L 36.78 1.71 L 36.17 1.60 L 35.54 1.53 L 34.91 1.50 L 34.27 1.52 L 33.63 1.57 L 32.78 1.71 L 31.95 1.92 L 31.35 2.13 L 30.76 2.37 L 30.19 2.65 L 29.64 2.97 L 29.13 3.32 L 28 4.24 L 26.93 5.26 L 25.90 6.36 L 24.76 7.68 L 22.12 10.90 L 20.82 12.42 L 11.81 22.21 L 8.08 26.39 L 5.68 29.21 L 3.67 31.72 L 1.94 34.01 Z",
  rest: [
    { x: 115.11, y: 39.79, d: "M 6.89 3.58 C 14.21 -2.06 24.94 -0.93 30.83 6.2 C 32.53 8.26 34.04 10.55 34.38 13.22 L 34.46 16.88 L 34.46 20.44 L 11.84 20.29 L 11.83 14.43 L 28.34 14.4 C 27.84 11.85 26.4 9.56 24.25 8.01 C 15.68 1.81 3.4 9.97 6.83 20.28 C 7.38 21.94 8.35 23.43 9.58 24.67 C 11.01 26.11 12.89 27.13 14.84 27.65 C 17.47 28.36 20.4 28.24 23.1 27.95 C 26.79 27.54 29.77 26.04 32.96 24.28 C 31.55 35.08 17.15 35.81 9.37 31.83 C 4.74 29.46 1.46 25.15 0.43 20.62 C -0.14 18.09 -0.14 15.41 0.43 12.88 C 1.23 9.36 3.63 6.09 6.89 3.58 Z" },
    { x: 151.7, y: 40.18, d: "M 27.15 0.07 C 29.23 -0.24 31.47 0.47 32.88 2.08 C 34.82 4.27 38.26 16.49 39.4 20.02 C 39.86 21.43 40.7 25.45 41.96 26.13 C 44.61 27.55 45.5 22.61 46.04 20.98 C 47.5 16.57 48.99 12.18 50.49 7.78 C 51.33 5.32 52.06 2.79 53.11 0.42 L 59.01 0.4 C 58.64 2.62 57.7 4.8 56.96 6.95 C 55.52 11.14 54.06 15.32 52.62 19.51 C 51.61 22.49 50.4 27.65 48.77 30.13 C 46.38 33.78 41.1 34.39 37.95 31.36 C 35.73 29.22 32.22 16.75 31.07 13.11 C 30.67 11.86 29.62 7.75 28.88 6.96 C 28.65 6.73 28.37 6.77 28.14 6.6 C 27.95 6.81 27.65 6.82 27.48 7.1 C 26.87 8.15 27.25 11.43 27.24 12.73 C 27.24 17.1 27.77 21.78 25.86 25.86 C 19.97 38.36 1.77 35.53 0 20.73 L 0 0.38 L 5.61 0.41 C 5.61 4.61 5.77 8.73 5.77 12.79 C 5.61 15.59 5.63 18.05 5.8 20.66 C 6.29 28.31 16.26 30.17 20.27 24.03 C 24.3 17.85 16.84 1.62 27.15 0.07 Z" },
    { x: 214.16, y: 39.92, d: "M 5.92 32.77 L 0.01 32.78 L 0 0 L 5.92 0 L 5.92 32.77 Z" },
    { x: 224.01, y: 33.33, d: "M 5.88 0.02 L 5.92 19.4 C 6.88 18.3 7.8 17.1 8.97 16.18 C 13.91 12.33 17.01 12.38 20.78 6.54 L 27.54 6.63 C 24.81 14.99 18.05 16.44 11.77 21.08 C 14.01 21.58 16.09 22.1 17.97 23.51 C 21.01 25.8 23.31 30.23 25.5 33.35 C 26.92 35.37 28.49 37.27 29.97 39.25 C 28.8 39.32 23.38 39.63 22.62 39.17 C 22.14 38.88 21.81 38.31 21.44 37.9 C 19.38 35.6 15.85 29.67 14.21 28.36 C 12.04 26.61 7.68 25.76 6.29 28.95 C 5.71 30.28 5.88 31.85 5.88 33.26 C 5.88 35.23 5.9 37.2 5.85 39.16 L 0 39.36 L 0 0 L 5.88 0.02 Z" },
    { x: 249.1, y: 39.06, d: "M 17.17 0 C 26.66 0 34.35 7.69 34.35 17.17 C 34.35 26.66 26.66 34.35 17.17 34.35 C 7.69 34.35 0 26.66 0 17.17 C 0 7.69 7.69 0 17.17 0 Z M 17.17 5.99 C 11 5.99 5.99 11 5.99 17.17 C 5.99 23.35 11 28.36 17.17 28.36 C 23.35 28.36 28.36 23.35 28.36 17.17 C 28.36 11 23.35 5.99 17.17 5.99 Z" },
    { x: 285.51, y: 39.12, d: "M 4.44 3.49 C 10.83 -2.1 20.97 -0.88 25.51 6.45 C 28.08 10.6 27.6 15.35 27.6 20.03 C 27.6 24.46 27.6 28.96 27.45 33.51 L 21.79 33.47 C 21.79 28.63 21.7 23.27 21.69 18.22 C 21.68 15.59 22.07 12.71 20.84 10.28 C 17.78 4.29 8.82 4.66 6.3 10.92 C 4.81 14.64 5.58 28.3 5.58 33.52 L 0 33.55 L 0 20.03 C 0 11.37 0.64 6.82 4.44 3.49 Z" },
  ],
  /** The dot over the i. */
  dot: { cx: 217.12, cy: 34.96, r: 2.96 },
};

/** The green of the N, as set in Figma. */
const MARK_GREEN = "#4AB166";

/**
 * The pen's path through the N - not its outline but the line a pen would
 * travel: up the short flick on the left, down the left stem, up the diagonal,
 * over the arch and down the right stem. The same path animates the N in the
 * Figma file.
 *
 * It is drawn as a thick white stroke into a mask and opened by animating its
 * path length, so the N underneath is revealed in the order it is written. The
 * artwork itself is never redrawn.
 */
const PEN =
  "M 5 36 L 29 10 C 32 6.5 36.8 6 36.8 14 L 36.8 58 C 36.8 66 42 64 48 56 L 79 12 C 85 4 98 2 103 12 C 105 16 104.7 22 104.7 28 L 104.7 76";

/** The N's strokes are ~15 units thick; 22 covers them and their joins. */
const PEN_WIDTH = 22;

/**
 * How far "euvikon" rises, in viewBox units: 120% of its own height, as the
 * hero's `RisingWords` travel, so it starts wholly below its clip.
 */
const RISE_FROM = 50;

/** Where "euvikon" begins; its clip starts here so the N is never cut. */
const REST_X = 110;

/** The mark's own box; a unit of headroom covers the arch's overshoot. */
const ART = { x: 0, y: -1, w: 314, h: 75 };

/**
 * The wordmark, signing itself: the N is written out stroke by stroke, then
 * holds, while "euvikon" stands still beside it. For the hero, where it is the
 * first thing the page shows. The letters take the text colour, so the mark
 * follows the theme without a second copy; the N keeps its green.
 *
 * Both run in CSS (`.enter-pen`, `.enter-rise` in globals.css), so they start
 * on the first paint, on the same frame as the hero's rising words, rather
 * than after hydration. Both take the words' `slow` duration so the name and
 * the statement land together. The pen's curve is the symmetrical one, not
 * the words' `EASE`: a pen travels rather than arrives, and the house curve
 * front-loads so hard that the N would be four-fifths drawn in the first few
 * frames and read as a pop instead of being written. Under reduced motion the
 * N is simply whole and "euvikon" does not move.
 *
 * "euvikon" moves the way the hero's text does (see `RisingWords`): it climbs
 * out from behind a clip the height of the mark.
 */
export function SignedWordmark({ height = 24, className }: Omit<MarkProps, "priority">) {
  const maskId = useId();
  const clipId = useId();

  return (
    <svg
      viewBox={`${ART.x} ${ART.y} ${ART.w} ${ART.h}`}
      height={height}
      style={{ height, width: "auto" }}
      aria-hidden
      className={cn("text-foreground", className)}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x={ART.x} y={ART.y} width={ART.w} height={ART.h}>
          <path
            d={PEN}
            className="enter-pen"
            pathLength={1}
            fill="none"
            stroke="#fff"
            strokeWidth={PEN_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
        <clipPath id={clipId}>
          <rect x={REST_X} y={ART.y} width={ART.w - REST_X} height={ART.h} />
        </clipPath>
      </defs>
      <path d={MARK.n} fill={MARK_GREEN} mask={`url(#${maskId})`} />
      <g clipPath={`url(#${clipId})`}>
        <g
          className="enter-rise"
          fill="currentColor"
          style={{ "--enter-from": `${RISE_FROM}px` } as React.CSSProperties}
        >
          {MARK.rest.map((letter) => (
            <path key={letter.x} d={letter.d} transform={`translate(${letter.x} ${letter.y})`} />
          ))}
          <circle {...MARK.dot} />
        </g>
      </g>
    </svg>
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
