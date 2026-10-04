import type { Transition, Variants } from "motion/react";

/**
 * The site's motion scale, in one place - the same role `typography.tsx` plays
 * for type. A component picks a token, never a raw duration.
 *
 * The character to hold on to: things arrive, they do not bounce. Every ease
 * here is a decelerating curve with a long tail, so movement starts fast and
 * settles slowly; nothing overshoots, because an overshoot on a hairline grid
 * reads as a misalignment rather than as life.
 */

/** cubic-bezier(0.16, 1, 0.3, 1). The house curve: quick out, long settle. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Symmetrical, for things that travel rather than arrive (scroll, sweeps). */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  /** Hover and state changes - under the threshold where it reads as a wait. */
  fast: 0.4,
  /** The default for anything entering the page. */
  base: 0.7,
  /** Titles and rules: the two things worth watching arrive. */
  slow: 1.1,
} as const;

/** How far an entering element travels. Small on purpose: a hint of arrival. */
export const RISE = 14;

/** The site's default transition, set once on the root `MotionConfig`. */
export const TRANSITION: Transition = { duration: DURATION.base, ease: EASE };

/**
 * When an entering element fires. The negative bottom margin pulls the trigger
 * line up off the very edge of the screen, so content animates as it is read
 * into place rather than the instant its first pixel appears.
 */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** The one entrance used across the site. Opacity carries it; `y` seasons it. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  shown: { opacity: 1, y: 0 },
};

/** Opacity only - for elements whose position is load-bearing. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

/** The step between siblings in a staggered group. */
export const STAGGER = 0.07;
