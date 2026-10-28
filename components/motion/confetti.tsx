"use client";

import { CanvasBackdrop, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * Neu-Pummel Party's page mid-party: confetti drifting down the margins,
 * fluttering as it falls, and every few seconds a popper going off somewhere
 * along the edge and throwing a fresh burst up into the air.
 *
 * Kept to the margins; without them it is a light, faint fall over the page.
 * Under reduced motion the confetti hangs still.
 */

const COLORS = ["#ff5d8f", "#ffd23f", "#4da3ff", "#4fd18b", "#b06bff", "#ff8a3d"];

type Bit = { x: number; y: number; vx: number; vy: number; rot: number; spin: number; flutter: number; color: string; round: boolean; size: number };

function create(env: Env): Scene {
  const { ctx } = env;
  const bits: Bit[] = [];

  /** A point in a margin (or anywhere, when there are none). */
  const zoneX = () => {
    if (env.faint) return Math.random() * env.w;
    const x = 12 + Math.random() * Math.max(0, env.margin - 24);
    return Math.random() < 0.5 ? x : env.w - x;
  };
  const make = (x: number, y: number, vx: number, vy: number): Bit => ({
    x, y, vx, vy,
    rot: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 8,
    flutter: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    round: Math.random() < 0.3,
    size: 4 + Math.random() * 5,
  });
  const fill = () => {
    bits.length = 0;
    const n = env.faint ? 30 : 70;
    for (let i = 0; i < n; i++) bits.push(make(zoneX(), Math.random() * env.h, 0, 20 + Math.random() * 30));
  };
  fill();

  let nextPop = 2;
  const pop = () => {
    // A popper on the edge of a margin, firing up and inwards.
    const left = env.faint ? Math.random() < 0.5 : Math.random() < 0.5;
    const x = env.faint ? Math.random() * env.w : left ? env.margin * (0.2 + Math.random() * 0.6) : env.w - env.margin * (0.2 + Math.random() * 0.6);
    const y = env.h * (0.55 + Math.random() * 0.35);
    for (let i = 0; i < 26; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.1;
      const s = 260 + Math.random() * 260;
      bits.push(make(x, y, Math.cos(a) * s, Math.sin(a) * s));
    }
  };

  return {
    draw: (_t, dt) => {
      nextPop -= dt;
      if (nextPop <= 0) {
        pop();
        nextPop = 3.5 + Math.random() * 3;
      }
      const alpha = env.faint ? 0.35 : env.dark() ? 0.85 : 0.75;
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        // Air drag pulls bursts down to a flutter; gravity takes it from there.
        b.vx *= Math.exp(-dt * 2.2);
        b.vy = b.vy * Math.exp(-dt * 2.2) + 140 * dt * (b.vy < 40 ? 1 : 0.2);
        b.flutter += dt * 4;
        b.x += (b.vx + Math.sin(b.flutter) * 18) * dt;
        b.y += b.vy * dt;
        b.rot += b.spin * dt;
        if (b.y > env.h + 20) {
          // The ambient fall loops; burst confetti beyond the base count is dropped.
          if (bits.length > (env.faint ? 30 : 70)) bits.splice(i, 1);
          else Object.assign(b, make(zoneX(), -20, 0, 20 + Math.random() * 30));
          continue;
        }
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        // The flutter: a strip turning edge-on and back.
        ctx.scale(1, Math.abs(Math.cos(b.flutter)) * 0.8 + 0.2);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = b.color;
        if (b.round) {
          ctx.beginPath();
          ctx.arc(0, 0, b.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else ctx.fillRect(-b.size / 2, -b.size * 0.3, b.size, b.size * 0.6);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    },
    resize: fill,
  };
}

export function Confetti() {
  return <CanvasBackdrop create={create} minMargin={120} />;
}
