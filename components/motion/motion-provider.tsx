"use client";

import { MotionConfig } from "motion/react";

import { SmoothScroll } from "./smooth-scroll";
import { TRANSITION } from "./tokens";

/**
 * Everything motion on the page hangs off this: the document's momentum
 * scrolling, and the one transition every animation inherits unless it says
 * otherwise. Setting the default here rather than per component is what keeps
 * a title, a hairline and a card feeling like the same hand.
 *
 * `reducedMotion="user"` is the whole accessibility story for the motion
 * components: with it set, every transform and layout animation below is
 * dropped while opacity is kept, so content still fades into place but nothing
 * travels. Animation that runs outside React - Lenis, the theme toggle's view
 * transition, the CSS scroll timelines - has to opt out on its own, and does.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={TRANSITION}>
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
