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
 * resolving late changes what the canvas paints, not what React hydrates. The
 * one thing that cannot be a uniform is the mask, so that switches in CSS
 * through the `dark:` variant rather than by swapping a class in JS.
 *
 * `isolate` is load-bearing: SideRays puts z-[3] on its own root, which would
 * otherwise paint the canvas over the hero copy. A stacking context here traps
 * that z-index inside, leaving this whole layer below the section. It also
 * rules out `mix-blend-mode` as the light-mode answer: the group this layer
 * would blend with has no background of its own - the page's white comes from
 * `body`, outside the isolated group - so a multiply here would blend against
 * nothing. The polarity flip lives in the shader for that reason.
 *
 * The mask is anchored to the ray origin rather than fading straight down.
 * Ray strength is floored at 0.5 in the shader, so the far field never reaches
 * zero on its own - unmasked, that lands as a gray wash across the copy. Light
 * mode wants the tighter of the two: the tint is a darkening, so any of it that
 * reaches the headline is read as dirt on the page rather than as light.
 *
 * Dark: colours matched to the reference by sampling it - a pale steel-blue
 * beam (#96b0b9 at its core) with a muted olive edge (#4a4b3c), over near-black.
 *
 * The props are not those hexes. The shader multiplies each ray by brightness
 * and then pushes it away from grey by `saturation`, so the colour fed in is a
 * long way from the colour that lands - `rayColor2` has to be markedly bluer
 * than the target, or the warm ray drags the overlap green. Intensity is the
 * other half: too high and the core clips to white, taking the hue with it.
 * Both were set by rendering, re-sampling, and comparing against the reference.
 *
 * Light is not the same beam turned down. Over white there is no such thing as
 * a brighter pixel, so turning the dark settings down only ever produced a grey
 * haze - the beam was always there, just with nowhere to go. `polarity="tint"`
 * inverts it: the same ray field becomes coverage for a dark hue, so the beam
 * reads as tinted glass over the page. That changes what the other numbers
 * mean. Brightness no longer lands as light but as alpha, so `intensity` and
 * `falloff` come down to keep the core off a flat silhouette; the hues go
 * deeper and cleaner, because a tint carries its colour at full strength where
 * an additive beam washes out; and `blend` leans cool, since the overlap of a
 * warm and a cool tint is grey, and grey on white is the haze this replaces.
 */

/**
 * Per-theme shader settings. Everything here is a uniform, not markup.
 * `depth` is read only under `tint`, so the dark set does not carry one.
 */
const RAYS = {
  dark: {
    polarity: "add",
    rayColor1: "#c6bd8a",
    rayColor2: "#6ea2d4",
    intensity: 2.9,
    saturation: 1.15,
    blend: 0.44,
    falloff: 1.6,
    opacity: 0.95,
  },
  light: {
    polarity: "tint",
    rayColor1: "#3f7a45",
    rayColor2: "#3a8a70",
    intensity: 2.4,
    saturation: 1.9,
    blend: 0.64,
    falloff: 1.35,
    opacity: 0.9,
    depth: 0.95,
  },
} as const;

export function HeroBackdrop() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const rays = RAYS[resolvedTheme === "light" ? "light" : "dark"];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 isolate z-0 select-none [mask-image:radial-gradient(115%_96%_at_90%_-8%,#000_10%,transparent_70%)] dark:[mask-image:radial-gradient(125%_105%_at_88%_-5%,#000_15%,transparent_72%)]"
    >
      <SideRays
        origin="top-right"
        spread={1.4}
        tilt={-14}
        speed={reducedMotion ? 0 : 1.2}
        {...rays}
      />
    </div>
  );
}
