"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A media query as a React value.
 *
 * `useSyncExternalStore` rather than state-set-in-an-effect: the query itself
 * is the source of truth, so there is never a committed render holding a stale
 * value, and nothing re-renders on mount just to catch up.
 *
 * The server snapshot is `false` for every query - "no match until proven".
 * Branching *markup* on the result is therefore a hydration hazard; branching
 * behaviour on it is not. Where the layout has to differ, let CSS decide.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    useCallback(() => window.matchMedia(query).matches, [query]),
    () => false,
  );
}

/**
 * The OS "reduce motion" setting. Motion components get this for free from
 * `MotionConfig reducedMotion="user"`; this is for the places that animate
 * outside React - Lenis, and the theme toggle's view transition.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
