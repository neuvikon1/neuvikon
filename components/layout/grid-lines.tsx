"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { DURATION, EASE, VIEWPORT } from "@/components/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * The grid, drawing itself.
 *
 * The frame a `Section` wears - a rule along its top edge, between the rails, a rail
 * down each container edge, a dot at each crossing - arrives the first time the
 * section is scrolled to: the rule sweeps out from the left, the rails run down
 * behind it, and the dots land last, once there is a crossing for them to mark.
 * It is the one piece of motion on the page that is about the layout itself
 * rather than the content sitting in it.
 *
 * Each line is two elements, and that is the load-bearing part. The mask that
 * gaps a line at its crossings is measured against the element's own box, and a
 * transform scales whatever it is applied to *including* its mask - so scaling
 * the masked element directly would drag the gaps along with the sweep and land
 * them short. The outer element holds the mask and never moves; the inner one
 * is a plain hairline that grows inside it. The gaps stay nailed to the
 * crossings while the line travels through them.
 *
 * The rail watches the outer element too, not the line. At `scaleY: 0` the line
 * is no height at all, sitting at the section's top edge, so a section reached
 * any way but past that edge - a reload that restores the scroll, a jump to an
 * anchor, a hard flick - would never draw its rails.
 */

/** A hairline between the container rails, stopping short of each crossing. */
export function GridRule({
  className,
  delay = 0,
  still = false,
}: {
  className?: string;
  delay?: number;
  /** Already drawn: for the footer, which is too near the page's end to be cued. */
  still?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-px grid-rule",
        className,
      )}
    >
      {still ? (
        <span className="block h-px w-full bg-rule" />
      ) : (
        <motion.span
          data-motion
          className="block h-px w-full origin-left bg-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: DURATION.slow, ease: EASE, delay }}
        />
      )}
    </span>
  );
}

/** A vertical hairline at one edge of the container, gapped at both ends. */
export function GridRail({
  side,
  delay = 0.1,
  still = false,
}: {
  side: "left" | "right";
  delay?: number;
  still?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <span
      ref={ref}
      aria-hidden
      data-side={side}
      className={cn(
        "pointer-events-none absolute inset-y-0 w-px grid-rail",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      {still ? (
        <span className="block h-full w-px bg-rule" />
      ) : (
        <motion.span
          data-motion
          className="block h-full w-px origin-top bg-rule"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: inView ? 1 : 0 }}
          transition={{ duration: DURATION.slow, ease: EASE, delay }}
        />
      )}
    </span>
  );
}

/**
 * A 2px dot marking a rail/rule intersection. Near-foreground on purpose: the
 * contrast against the hairlines is the point.
 *
 * It is a sibling of the rails, never a child - a mask clips its descendants
 * too, and the rail's mask exists precisely to keep this crossing clear.
 *
 * Its own offset travels in `x`/`y` rather than in a utility class, because the
 * entrance animates `scale`: one transform, one owner. A Tailwind `-translate`
 * here would be overwritten the moment the dot was cued.
 */
export function GridTick({
  side,
  delay = 0.55,
  still = false,
}: {
  side: "left" | "right";
  delay?: number;
  still?: boolean;
}) {
  const offset = { x: side === "left" ? "-50%" : "50%", y: "-50%" };

  if (still) {
    return (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 size-[2px] rounded-full bg-tick",
          side === "left" ? "left-0" : "right-0",
        )}
        style={{ transform: `translate(${offset.x}, ${offset.y})` }}
      />
    );
  }

  return (
    <motion.span
      aria-hidden
      data-motion
      className={cn(
        "pointer-events-none absolute top-0 size-[2px] rounded-full bg-tick",
        side === "left" ? "left-0" : "right-0",
      )}
      initial={{ ...offset, scale: 0, opacity: 0 }}
      whileInView={{ ...offset, scale: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.fast, ease: EASE, delay }}
    />
  );
}
