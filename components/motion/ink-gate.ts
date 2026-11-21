"use client";

import { useEffect, type RefObject } from "react";

/** Set on a division lockup: `waiting`, then `playing`, then `done`. */
export const INK_GATE = "data-ink-gate";

/** Bubbles from a lockup when its entrance has finished. */
export const INK_GATE_OPEN = "ink-gate-open";

/**
 * Holds the scroll ink beside a division lockup until its entrance has played.
 *
 * The lockup renders with `data-ink-gate="waiting"`; from the moment it starts
 * playing, this keeps that attribute current and announces the end. `ScrollInk`
 * reads the attribute, so the logos do not need to know the line exists.
 */
export function useInkGate(ref: RefObject<Element | null>, playing: boolean, seconds: number) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !playing) return;
    element.setAttribute(INK_GATE, "playing");
    const timer = window.setTimeout(() => {
      element.setAttribute(INK_GATE, "done");
      element.dispatchEvent(new Event(INK_GATE_OPEN, { bubbles: true }));
    }, seconds * 1000);
    return () => window.clearTimeout(timer);
  }, [ref, playing, seconds]);
}
