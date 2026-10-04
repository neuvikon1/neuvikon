"use client";

import { useTheme } from "next-themes";

import SideRays from "@/components/ui/side-rays";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Decorative light rays behind the hero, raking in from the top right.
 * Full-bleed on purpose - it sits outside the Container, so it never
 * contributes a horizontal edge of its own.
 *
 * The theme only ever reaches the shader as a uniform, never as markup, so the
 * rendered tree is identical on the server and the client - `resolvedTheme`
 * resolving late changes what the canvas paints, not what React hydrates.
 *
 * `isolate` is load-bearing: SideRays puts z-[3] on its own root, which would
 * otherwise paint the canvas over the hero copy. A stacking context here traps
 * that z-index inside, leaving this whole layer below the section.
 *
 * The mask is anchored to the ray origin rather than fading straight down.
 * Ray strength is floored at 0.5 in the shader, so the far field never reaches
 * zero on its own - unmasked, that lands as a gray wash across the copy.
 *
 * Colours are matched to the reference by sampling it: a pale steel-blue beam
 * (#96b0b9 at its core) with a muted olive edge (#4a4b3c), over near-black.
 *
 * The props are not those hexes. The shader multiplies each ray by brightness
 * and then pushes it away from grey by `saturation`, so the colour fed in is a
 * long way from the colour that lands - `rayColor2` has to be markedly bluer
 * than the target, or the warm ray drags the overlap green. Intensity is the
 * other half: too high and the core clips to white, taking the hue with it.
 * Both were set by rendering, re-sampling, and comparing against the reference.
 */
export function HeroBackdrop() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const isLight = resolvedTheme === "light";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 isolate z-0 select-none [mask-image:radial-gradient(125%_105%_at_88%_-5%,#000_15%,transparent_72%)]"
    >
      <SideRays
        origin="top-right"
        rayColor1="#c6bd8a"
        rayColor2="#6ea2d4"
        speed={reducedMotion ? 0 : 1.2}
        intensity={isLight ? 2.5 : 2.9}
        spread={1.4}
        tilt={-14}
        saturation={1.15}
        blend={0.44}
        falloff={1.6}
        opacity={isLight ? 0.65 : 0.95}
      />
    </div>
  );
}
