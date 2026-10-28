"use client";

import { CanvasBackdrop, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * EdgeOut's page with its one move played out in the margins: on a small
 * patch of hex board either side of the copy, three white marbles line up
 * behind two black ones, lean back, and push - the line shifts one hole and
 * the black marble on the edge drops off the board. Then the patch clears
 * and sets up again along a different line.
 *
 * That is Abalone's sumito, the move the whole game is about. Each patch runs
 * the same loop on its own clock, so the two never push together. Without
 * margins there is one patch, low in the corner and faint. Under reduced
 * motion each patch is drawn set up, just before the push.
 */

const LOOP = 6.5; // seconds per push, setup to clear
const RADIUS = 2; // board patch radius, in holes

/** Axial hex directions; a push runs along one of these. */
const DIRS: [number, number][] = [[1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1]];

const HOLES: [number, number][] = [];
for (let q = -RADIUS; q <= RADIUS; q++) {
  for (let r = -RADIUS; r <= RADIUS; r++) if (Math.abs(q + r) <= RADIUS) HOLES.push([q, r]);
}

type Patch = {
  cx: number;
  cy: number;
  phase: number;
  dir: [number, number];
  strays: { q: number; r: number; white: boolean }[];
  round: number;
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function setup(p: Patch) {
  p.dir = DIRS[Math.floor(Math.random() * DIRS.length)];
  // A few marbles elsewhere on the patch, off the pushing line.
  const onLine = (q: number, r: number) => [-2, -1, 0, 1, 2].some((k) => q === p.dir[0] * k && r === p.dir[1] * k);
  p.strays = HOLES.filter(([q, r]) => !onLine(q, r))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4 + Math.floor(Math.random() * 3))
    .map(([q, r]) => ({ q, r, white: Math.random() < 0.5 }));
}

function create(env: Env): Scene {
  const { ctx } = env;
  let spacing = 30;
  let patches: Patch[] = [];

  const layout = () => {
    spacing = env.faint ? 24 : Math.min(32, (env.margin - 30) / 5.2);
    const make = (cx: number, cy: number, phase: number): Patch => {
      const p: Patch = { cx, cy, phase, dir: [1, 0], strays: [], round: -1 };
      setup(p);
      return p;
    };
    patches = env.faint
      ? [make(env.w - spacing * 3.4, env.h - spacing * 3.6, 0)]
      : [make(env.margin / 2, env.h * 0.34, 0), make(env.w - env.margin / 2, env.h * 0.68, LOOP / 2)];
  };
  layout();

  /** Hole (q, r) of a patch, in screen px. */
  const at = (p: Patch, q: number, r: number) => ({
    x: p.cx + spacing * (q + r / 2),
    y: p.cy + spacing * (Math.sqrt(3) / 2) * r,
  });

  const marble = (x: number, y: number, white: boolean, alpha: number, scale = 1) => {
    const rad = spacing * 0.4 * scale;
    if (rad <= 0.5 || alpha <= 0) return;
    const g = ctx.createRadialGradient(x - rad * 0.35, y - rad * 0.4, rad * 0.1, x, y, rad);
    g.addColorStop(0, white ? "#ffffff" : "#5a6878");
    g.addColorStop(1, white ? "#cfd3d8" : "#1d2530");
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (white) {
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const drawPatch = (p: Patch, time: number) => {
    const dark = env.dark();
    const t = (time + p.phase) % LOOP;
    const round = Math.floor((time + p.phase) / LOOP);
    if (round !== p.round) {
      if (p.round !== -1) setup(p);
      p.round = round;
    }
    // Fade in 0-0.6, lean back 1.4-1.8, push 1.8-2.5, fall 2.5-3.6, hold, fade out 5.8-6.5.
    const show = clamp01(t / 0.6) * (1 - clamp01((t - 5.8) / 0.7));
    const lean = Math.sin(Math.PI * clamp01((t - 1.4) / 0.4)) * -0.18;
    const push = ease(clamp01((t - 1.8) / 0.7));
    const fall = clamp01((t - 2.5) / 1.1);
    const base = (env.faint ? 0.3 : 0.85) * show;

    // The board: a hexagon with a hole at every point.
    ctx.globalAlpha = base;
    ctx.fillStyle = dark ? "rgba(120, 90, 60, 0.28)" : "rgba(214, 186, 140, 0.32)";
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const R = spacing * (RADIUS + 0.75);
      ctx.lineTo(p.cx + Math.cos(a) * R, p.cy + Math.sin(a) * R);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = dark ? "rgba(0,0,0,0.35)" : "rgba(120, 90, 50, 0.22)";
    for (const [q, r] of HOLES) {
      const { x, y } = at(p, q, r);
      ctx.beginPath();
      ctx.arc(x, y, spacing * 0.16, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const s of p.strays) {
      const { x, y } = at(p, s.q, s.r);
      marble(x, y, s.white, base);
    }

    // The line: whites at -2, -1, 0 and blacks at 1, 2, along the push.
    const [dq, dr] = p.dir;
    for (let k = -2; k <= 2; k++) {
      if (k === 2 && push > 0.99) {
        // Over the edge: carried on, dropping, shrinking and gone.
        const off = at(p, dq * (3 + fall * 0.6), dr * (3 + fall * 0.6));
        marble(off.x, off.y + fall * fall * spacing * 2.2, false, base * (1 - fall), 1 - fall * 0.5);
      } else {
        const step = k + lean + push;
        const { x, y } = at(p, dq * step, dr * step);
        marble(x, y, k <= 0, base);
      }
    }
    ctx.globalAlpha = 1;
  };

  return {
    draw: (t) => patches.forEach((p) => drawPatch(p, t)),
    resize: layout,
    still: 1.2,
  };
}

export function EdgePush() {
  return <CanvasBackdrop create={create} minMargin={190} />;
}
