"use client";

import {
  bandSpot,
  bandsPerSide,
  CanvasBackdrop,
  PAD,
  type Env,
  type Scene,
} from "@/components/motion/canvas-backdrop";

/**
 * EdgeOut's page with its one move played out in the margins: on a small
 * patch of hex board either side of the copy, three white marbles line up
 * behind two black ones, lean back, and push - the line shifts one hole and
 * the black marble on the edge drops off the board. Then the patch clears
 * and sets up again along a different line.
 *
 * That is Abalone's sumito, the move the whole game is about. Each patch runs
 * the same loop on its own clock, so they never push together, and moves to a
 * new random spot in its own band of the margin each time it sets up again.
 * Patches - and the marble falling off them - stay inside the margins, so the
 * copy stays on a clean ground. Without margins there is one patch, low in
 * the corner and faint. Under reduced motion each patch is drawn set up, just
 * before the push.
 */

// Slow on purpose: these sit beside the copy, and anything quicker pulls the
// eye away from it.
const LOOP = 12; // seconds per push, setup to clear
/** Most patches a margin holds; fewer when the window is too short for them. */
const PER_SIDE = 3;
/** How far the dropped marble travels along the push, in holes. */
const FALL_REACH = 3.6;
const RADIUS = 2; // board patch radius, in holes
/** Smallest patch, as a share of the largest. */
const MIN_SIZE = 0.45;

/** Axial hex directions; a push runs along one of these. */
const DIRS: [number, number][] = [[1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1]];

const HOLES: [number, number][] = [];
for (let q = -RADIUS; q <= RADIUS; q++) {
  for (let r = -RADIUS; r <= RADIUS; r++) if (Math.abs(q + r) <= RADIUS) HOLES.push([q, r]);
}

type Patch = {
  cx: number;
  cy: number;
  side: 0 | 1;
  /** Which of its margin's bands, top to bottom, the patch keeps to. */
  slot: number;
  phase: number;
  /** Scale of this patch against the base spacing; re-rolled each setup. */
  size: number;
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
  /** Spacing of the patch being drawn: the base spacing times its size. */
  let cur = spacing;
  let patches: Patch[] = [];

  let perSide = 1;

  /**
   * A random spot in the patch's band (see `bandSpot`). The extent counts the
   * board and the marble dropping off it, which depends on the push's line.
   */
  const place = (p: Patch) => {
    // Patches come big and small, so the margins don't read as a row of stamps.
    p.size = MIN_SIZE + Math.random() * (1 - MIN_SIZE);
    const sp = spacing * p.size;
    const [dq, dr] = p.dir;
    const half = sp * (RADIUS + 0.75);
    const fallX = sp * FALL_REACH * (dq + dr / 2);
    const fallY = sp * FALL_REACH * (Math.sqrt(3) / 2) * dr + sp * 2.2;
    const marble = sp * 0.4;
    Object.assign(
      p,
      bandSpot(env, p.side, p.slot, perSide, {
        left: Math.max(half, -fallX + marble),
        right: Math.max(half, fallX + marble),
        up: Math.max(half, -fallY + marble),
        down: Math.max(half, fallY + marble),
      }),
    );
  };

  const layout = () => {
    const make = (side: 0 | 1, slot: number, phase: number): Patch => {
      const p: Patch = { cx: 0, cy: 0, side, slot, phase, size: 1, dir: [1, 0], strays: [], round: -1 };
      setup(p);
      return p;
    };
    if (env.faint) {
      spacing = 24;
      const p = make(1, 0, 0);
      Object.assign(p, { cx: env.w - spacing * 3.4, cy: env.h - spacing * 3.6 });
      patches = [p];
      return;
    }
    // Room for the board and a marble dropping off either side of it.
    spacing = Math.min(34, (env.margin - PAD * 2) / 7);
    perSide = bandsPerSide(env, 270, PER_SIDE);
    patches = Array.from({ length: perSide * 2 }, (_, i) => {
      const p = make((i % 2) as 0 | 1, Math.floor(i / 2), (LOOP * i) / (perSide * 2));
      place(p);
      return p;
    });
  };
  layout();

  /** Hole (q, r) of a patch, in screen px. */
  const at = (p: Patch, q: number, r: number) => ({
    x: p.cx + cur * (q + r / 2),
    y: p.cy + cur * (Math.sqrt(3) / 2) * r,
  });

  const marble = (x: number, y: number, white: boolean, alpha: number, scale = 1) => {
    const rad = cur * 0.4 * scale;
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
    cur = spacing * p.size;
    const dark = env.dark();
    const t = (time + p.phase) % LOOP;
    const round = Math.floor((time + p.phase) / LOOP);
    if (round !== p.round) {
      if (p.round !== -1) {
        setup(p);
        if (!env.faint) place(p);
      }
      p.round = round;
    }
    // Fade in 0-1.2, lean back 2.8-3.6, push 3.6-5, fall 5-7, hold, fade out 10.5-12.
    const show = clamp01(t / 1.2) * (1 - clamp01((t - 10.5) / 1.5));
    const lean = Math.sin(Math.PI * clamp01((t - 2.8) / 0.8)) * -0.18;
    const push = ease(clamp01((t - 3.6) / 1.4));
    const fall = clamp01((t - 5) / 2);
    const base = (env.faint ? 0.3 : 0.85) * show;

    // The board: a hexagon with a hole at every point.
    ctx.globalAlpha = base;
    ctx.fillStyle = dark ? "rgba(120, 90, 60, 0.28)" : "rgba(214, 186, 140, 0.32)";
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const R = cur * (RADIUS + 0.75);
      ctx.lineTo(p.cx + Math.cos(a) * R, p.cy + Math.sin(a) * R);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = dark ? "rgba(0,0,0,0.35)" : "rgba(120, 90, 50, 0.22)";
    for (const [q, r] of HOLES) {
      const { x, y } = at(p, q, r);
      ctx.beginPath();
      ctx.arc(x, y, cur * 0.16, 0, Math.PI * 2);
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
        const off = at(p, dq * (3 + fall * (FALL_REACH - 3)), dr * (3 + fall * (FALL_REACH - 3)));
        marble(off.x, off.y + fall * fall * cur * 2.2, false, base * (1 - fall), 1 - fall * 0.5);
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
    still: 2.6,
  };
}

export function EdgePush() {
  return <CanvasBackdrop create={create} minMargin={190} />;
}
