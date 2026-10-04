"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * `--header-h` in pixels. The sticky header covers the top of the viewport, so
 * an anchor has to land that far short of its target. The CSS equivalent
 * (`scroll-mt-20` on every section) still has to exist for the paths this does
 * not own: a cold load on `/#careers`, and reduced motion, where the jump is
 * handed back to the browser.
 */
const HEADER_OFFSET = 80;

/**
 * easeInOutCubic. Deliberately not the house curve, which starts at full speed:
 * that is right for a card travelling fourteen pixels and wrong for a jump
 * across eight thousand, where it reads as the page having been thrown. An
 * anchor should pull away and settle.
 */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Stops the browser jumping to a fragment that Lenis is already on its way to.
 *
 * Lenis watches for clicks on same-page anchors and animates to them, but it
 * never calls `preventDefault`, so for a plain `<a href="#x">` the browser's own
 * instant jump still happens - the page lands on the target, and then Lenis
 * animates to it from where the click started. `next/link` happens to hide this
 * because it prevents the default itself; a bare anchor does not, and the site
 * uses both.
 *
 * So: cancel the default, and push the history entry the browser would have
 * pushed, leaving the scrolling to Lenis. Anything already handled by a
 * framework link is left alone - `defaultPrevented` is how that announces
 * itself - and so is any click that was never going to be a plain navigation.
 */
function useAnchorHandoff(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null;
      if (!link || link.target === "_blank") return;

      const target = new URL(link.href);
      const here = new URL(window.location.href);
      const samePage =
        target.host === here.host && target.pathname === here.pathname;
      if (!samePage || !target.hash) return;

      event.preventDefault();
      history.pushState(null, "", target.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);
}

/**
 * Momentum scrolling for the document.
 *
 * Lenis drives the real `scrollTop` rather than transforming a wrapper, which
 * is what makes it safe here: `position: sticky` keeps working, so the header
 * and every CSS `scroll()` timeline on the page are still reading the same
 * number they would without it.
 *
 * In `root` mode the component renders no element of its own, so it adds no
 * box to the layout and no horizontal edge - the Container stays the only
 * source of those.
 *
 * Under reduced motion the wheel is handed straight back to the browser and
 * anchors stop being intercepted. Note that scrolling still *works* in that
 * mode - it is the easing that goes away, not the scroll.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useAnchorHandoff(!reducedMotion);

  return (
    <ReactLenis
      root
      options={{
        /* Light touch. Past about 0.08 the page starts to feel detached from
           the wheel, which reads as lag rather than as smoothness. */
        lerp: 0.11,
        smoothWheel: !reducedMotion,
        /* Touch is left native: a synced touch scroll fights the OS rubber
           band, and no amount of tuning makes that feel right. */
        syncTouch: false,
        anchors: reducedMotion
          ? false
          : { offset: -HEADER_OFFSET, duration: 1.2, easing: easeInOutCubic },
      }}
    >
      {children}
    </ReactLenis>
  );
}
