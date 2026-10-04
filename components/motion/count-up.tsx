"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { EASE, VIEWPORT } from "./tokens";

/**
 * A figure that counts up to itself the first time it is seen.
 *
 * It holds the *final* number, not the starting one: that is what renders on
 * the server, so the page says "16 projects" to a crawler and to a reader whose
 * JavaScript never arrived, and the count is only ever an embellishment laid
 * over a correct document.
 *
 * The consequence is that the start of the count has to be set on the client,
 * which means there is one frame where the final figure is already on screen.
 * Off screen that is free. On screen - the hero's figures are visible at load -
 * the element has to enter under a fade, so that frame happens while it is
 * still transparent. `Reveal` with a delay is enough.
 *
 * The roll itself is deliberately a little slower than the entrance around it:
 * a figure that lands at the same moment as its own label reads as a glitch
 * rather than as counting.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  className,
}: {
  to: number;
  /** Where the roll starts. Equal durations keep a row of them in step. */
  from?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: VIEWPORT.margin });
  const reducedMotion = usePrefersReducedMotion();

  const count = useMotionValue(to);
  const text = useTransform(() => String(Math.round(count.get())));

  useEffect(() => {
    if (!seen || reducedMotion) return;
    count.jump(from);
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [seen, reducedMotion, count, from, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
