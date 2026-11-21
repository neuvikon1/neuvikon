"use client";

import { CanvasBackdrop, PAD, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * Neu-Pummel Party's page mid-party: confetti drifting down the margins,
 * fluttering as it falls, and every few seconds a popper going off somewhere
 * along the edge and throwing a fresh burst up into the air.
 *
 * Kept to the margins - every bit belongs to one and is held inside it, bursts
 * included - so the copy stays on a clean ground; without margins it is a
 * light, faint fall over the page. Slow on purpose: it sits beside the copy.
 * Under reduced motion the confetti hangs still.
 */

const COLORS = ["#ff5d8f", "#ffd23f", "#4da3ff", "#4fd18b", "#b06bff", "#ff8a3d"];

type Bit = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
  flutter: number;
  color: string;
  round: boolean;
  size: number;
  /** The margin it falls in, or -1 over the whole page. */
  side: -1 | 0 | 1;
};

/** Bits in the steady fall; bursts add to it for a while. */
const AMBIENT = { margins: 110, faint: 30 };

function create(env: Env): Scene {
  const { ctx } = env;
  const bits: Bit[] = [];

  /** The span of x a bit may use: its margin, or the whole page. */
  const zone = (side: Bit["side"]) => {
    if (side < 0) return { x0: 0, x1: env.w };
    const left = side === 0 ? 0 : env.w - env.margin;
    return { x0: left + PAD, x1: left + env.margin - PAD };
  };
  const randomSide = (): Bit["side"] => (env.faint ? -1 : Math.random() < 0.5 ? 0 : 1);
  const zoneX = (side: Bit["side"]) => {
    const { x0, x1 } = zone(side);
    return x0 + Math.random() * Math.max(0, x1 - x0);
  };
  const make = (side: Bit["side"], x: number, y: number, vx: number, vy: number): Bit => ({
    side,
    x, y, vx, vy,
    rot: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 4,
    flutter: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    round: Math.random() < 0.3,
    size: 4 + Math.random() * 5,
  });
  const fill = () => {
    bits.length = 0;
    const n = env.faint ? AMBIENT.faint : AMBIENT.margins;
    for (let i = 0; i < n; i++) {
      const side = randomSide();
      bits.push(make(side, zoneX(side), Math.random() * env.h, 0, 12 + Math.random() * 18));
    }
  };
  fill();

  let nextPop = 3;
  const pop = () => {
    // A popper low in a margin, firing straight up; the burst stays in that margin.
    const side = randomSide();
    const { x0, x1 } = zone(side);
    const x = x0 + (x1 - x0) * (0.3 + Math.random() * 0.4);
    const y = env.h * (0.6 + Math.random() * 0.3);
    for (let i = 0; i < 22; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 0.7;
      const s = 180 + Math.random() * 160;
      bits.push(make(side, x, y, Math.cos(a) * s, Math.sin(a) * s));
    }
  };

  return {
    draw: (_t, dt) => {
      nextPop -= dt;
      if (nextPop <= 0) {
        pop();
        nextPop = 7 + Math.random() * 4;
      }
      const alpha = env.faint ? 0.35 : env.dark() ? 0.85 : 0.75;
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        // Air drag pulls bursts down to a flutter; gravity takes it from there.
        b.vx *= Math.exp(-dt * 2.2);
        b.vy = b.vy * Math.exp(-dt * 2.2) + 90 * dt * (b.vy < 26 ? 1 : 0.2);
        b.flutter += dt * 2.5;
        b.x += (b.vx + Math.sin(b.flutter) * 12) * dt;
        b.y += b.vy * dt;
        // Held inside its own margin: the edge it drifts to turns it back.
        const { x0, x1 } = zone(b.side);
        if (b.x < x0) [b.x, b.vx] = [x0, Math.abs(b.vx)];
        if (b.x > x1) [b.x, b.vx] = [x1, -Math.abs(b.vx)];
        b.rot += b.spin * dt;
        if (b.y > env.h + 20) {
          // The ambient fall loops; burst confetti beyond the base count is dropped.
          if (bits.length > (env.faint ? AMBIENT.faint : AMBIENT.margins)) bits.splice(i, 1);
          else {
            const side = randomSide();
            Object.assign(b, make(side, zoneX(side), -20, 0, 12 + Math.random() * 18));
          }
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
