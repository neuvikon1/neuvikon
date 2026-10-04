"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { DURATION, STAGGER, VIEWPORT, fade, fadeUp } from "./tokens";

/**
 * Entrance primitives. Three of them, and between them they cover the whole
 * site - the same bargain `Stack` makes with spacing: pick a primitive, never
 * write a one-off keyframe.
 *
 * All of them fire once. A section that re-animates every time it is scrolled
 * past stops being content and becomes a toy, and on a page this long the
 * reader passes most sections twice.
 *
 * Each renders a plain `div`, so it has to *be* the layout box rather than sit
 * inside one: pass it the grid/flex classes the element it replaces was
 * carrying. Wrapping a grid child in an un-classed animator is how a tidy grid
 * turns into a single column.
 */

type RevealProps = React.ComponentProps<typeof motion.div> & {
  /** Seconds to hold before starting. For hand-sequencing two siblings. */
  delay?: number;
  /** Fade without the rise, for elements whose position is load-bearing. */
  still?: boolean;
  /**
   * Wait to be scrolled into view. Off above the fold, where the content is
   * already on screen at load and has nothing to be scrolled to.
   */
  inView?: boolean;
};

/** One element, rising into place the first time it is scrolled into view. */
export function Reveal({
  className,
  delay = 0,
  still = false,
  inView = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      data-motion
      initial="hidden"
      {...(inView
        ? { whileInView: "shown", viewport: VIEWPORT }
        : { animate: "shown" })}
      variants={still ? fade : fadeUp}
      transition={{ duration: DURATION.base, delay }}
      className={className}
      {...props}
    />
  );
}

type RevealGroupProps = React.ComponentProps<typeof motion.div> & {
  delay?: number;
  /** Seconds between siblings. */
  stagger?: number;
  /** Wait to be scrolled into view. See `Reveal`. */
  inView?: boolean;
};

/**
 * A group whose children arrive one after another.
 *
 * The group itself does not move; it owns the timing and leaves the travelling
 * to `RevealItem`. Children inherit the cue through motion's variant context,
 * so plain elements in between - a `Stack`, a `ul` - do not break the chain,
 * and only the items that actually animate need to be motion components.
 */
export function RevealGroup({
  className,
  delay = 0,
  stagger = STAGGER,
  inView = true,
  ...props
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      {...(inView
        ? { whileInView: "shown", viewport: VIEWPORT }
        : { animate: "shown" })}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      {...props}
    />
  );
}

/** One member of a `RevealGroup`. Takes its cue and its delay from the group. */
export function RevealItem({
  className,
  still = false,
  ...props
}: React.ComponentProps<typeof motion.div> & { still?: boolean }) {
  return (
    <motion.div
      data-motion
      variants={still ? fade : fadeUp}
      transition={{ duration: DURATION.base }}
      className={className}
      {...props}
    />
  );
}

/**
 * A `RevealItem` that is a list row - for the ruled index lists, where the row
 * carries its own hairline and should bring it along as it arrives.
 */
export function RevealRow({
  className,
  ...props
}: React.ComponentProps<typeof motion.li>) {
  return (
    <motion.li
      data-motion
      variants={fadeUp}
      transition={{ duration: DURATION.base }}
      className={className}
      {...props}
    />
  );
}

/**
 * A `RevealItem` shaped for a grid cell: it stretches, and so does whatever it
 * holds, which keeps cards in a row the same height once the animator sits
 * between the grid and the card.
 */
export function RevealCell({
  className,
  ...props
}: React.ComponentProps<typeof RevealItem>) {
  return <RevealItem className={cn("h-full *:h-full", className)} {...props} />;
}
