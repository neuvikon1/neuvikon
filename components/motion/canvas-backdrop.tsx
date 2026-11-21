"use client";

import { useEffect, useRef } from "react";

/**
 * The frame every 2D project background shares, so each one is only its own
 * scene: a fixed, full-screen canvas behind the page, sized for the device's
 * pixel ratio, paused while the tab is hidden, and drawn once and left still
 * under reduced motion.
 *
 * `margin` is the free width either side of the page's content; scenes keep
 * to it so the copy stays on a clean ground. Where there is not enough of it
 * (`faint`), a scene should shrink to something small and quiet instead.
 */

const CONTENT = 1190; // the page's content width in px (--container-max)

export type Env = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  margin: number;
  faint: boolean;
  dark: () => boolean;
};

export type Scene = {
  /** Draw a frame; `t` is seconds since start, `dt` since the last frame. */
  draw: (t: number, dt: number) => void;
  /** After the canvas has been resized (env already updated). */
  resize?: () => void;
  /** The moment drawn, alone, under reduced motion. */
  still?: number;
};

/** Clear space between a shape and the screen edge, the content and its neighbours. */
export const PAD = 24;
/** The fixed site header, which no shape should sit under. */
export const HEADER = 64;

/** How many shapes each margin holds: one per band of at least `band` px. */
export function bandsPerSide(env: Env, band: number, most: number) {
  return Math.max(1, Math.min(most, Math.floor((env.h - HEADER) / band)));
}

/**
 * A random spot for a shape inside one band of one margin. Each margin is cut
 * into `perSide` horizontal bands with one shape to a band, so shapes spread
 * down the whole edge instead of bunching up; inside its band a shape sits
 * near the middle and drifts at most a third of the slack either way, so
 * neighbours never close the gap between them.
 *
 * `extent` is how far the shape reaches from its centre in each direction,
 * including anything it throws (a marble falling off a board), so the whole
 * of it stays clear of the copy.
 */
export function bandSpot(
  env: Env,
  side: 0 | 1,
  slot: number,
  perSide: number,
  extent: { left: number; right: number; up: number; down: number },
) {
  const zoneLeft = side === 0 ? PAD : env.w - env.margin + PAD;
  const room = Math.max(0, env.margin - PAD * 2 - extent.left - extent.right);
  const cx = zoneLeft + extent.left + Math.random() * room;
  const top = HEADER + PAD;
  const band = (env.h - top - PAD) / perSide;
  const slack = Math.max(0, band - PAD - extent.up - extent.down);
  const middle = top + slot * band + PAD / 2 + extent.up + slack / 2;
  return { cx, cy: middle + (Math.random() - 0.5) * slack * 0.66 };
}

export function CanvasBackdrop({ create, minMargin = 170 }: { create: (env: Env) => Scene; minMargin?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio, 2);
    const env: Env = { ctx, w: 0, h: 0, margin: 0, faint: false, dark: () => document.documentElement.classList.contains("dark") };
    const measure = () => {
      env.w = window.innerWidth;
      env.h = window.innerHeight;
      env.margin = Math.max(0, (env.w - CONTENT) / 2);
      env.faint = env.margin < minMargin;
      canvas.width = Math.round(env.w * dpr);
      canvas.height = Math.round(env.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    measure();
    const scene = create(env);

    let frame = 0;
    let last = performance.now();
    const t0 = last;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, env.w, env.h);
      scene.draw((now - t0) / 1000, dt);
    };
    const still = () => {
      ctx.clearRect(0, 0, env.w, env.h);
      scene.draw(scene.still ?? 2, 0);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) still();
      else if (document.visibilityState === "visible") {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const onResize = () => {
      measure();
      scene.resize?.();
      if (reduced.matches) still();
    };
    const themeWatch = new MutationObserver(() => reduced.matches && still());
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", start);
    reduced.addEventListener("change", start);
    start();
    canvas.dataset.ready = "";

    return () => {
      cancelAnimationFrame(frame);
      themeWatch.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
      reduced.removeEventListener("change", start);
    };
  }, [create, minMargin]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-svh w-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
    />
  );
}
