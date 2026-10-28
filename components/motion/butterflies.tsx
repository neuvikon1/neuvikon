"use client";

import { CanvasBackdrop, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * Eclosion's page - the word means a butterfly's emergence - with butterflies
 * rising through the margins: each beats its wings and climbs on its own
 * wandering path, turned in the direction it is heading, with a little pollen
 * drifting in the air around them.
 *
 * Without margins there are a few, small and faint. Under reduced motion they
 * hang still, wings open.
 */

const WINGS = [
  ["#8b5cf6", "#ffb86b"],
  ["#a78bfa", "#f9a8d4"],
  ["#7c3aed", "#fcd34d"],
];

type Fly = { x: number; y: number; base: number; phase: number; speed: number; size: number; colors: string[] };
type Mote = { x: number; y: number; phase: number };

function create(env: Env): Scene {
  const { ctx } = env;
  let flies: Fly[] = [];
  let motes: Mote[] = [];

  const zoneX = () => {
    if (env.faint) return 20 + Math.random() * (env.w - 40);
    const x = 20 + Math.random() * Math.max(0, env.margin - 40);
    return Math.random() < 0.5 ? x : env.w - x;
  };
  const make = (y: number): Fly => {
    const x = zoneX();
    return {
      x, y, base: x,
      phase: Math.random() * 10,
      speed: 18 + Math.random() * 16,
      size: env.faint ? 9 : 12 + Math.random() * 8,
      colors: WINGS[Math.floor(Math.random() * WINGS.length)],
    };
  };
  const layout = () => {
    const n = env.faint ? 4 : 10;
    flies = Array.from({ length: n }, (_, i) => make((i / n) * env.h + Math.random() * 40));
    motes = Array.from({ length: env.faint ? 12 : 40 }, () => ({ x: zoneX(), y: Math.random() * env.h, phase: Math.random() * 10 }));
  };
  layout();

  const wing = (sx: number, size: number, colors: string[], open: number) => {
    // Upper and lower wing on one side, squashed towards the body as it beats.
    ctx.save();
    ctx.scale(sx * open, 1);
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.ellipse(size * 0.55, -size * 0.3, size * 0.6, size * 0.45, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors[1];
    ctx.beginPath();
    ctx.ellipse(size * 0.4, size * 0.35, size * 0.38, size * 0.3, 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  return {
    draw: (t, dt) => {
      const dark = env.dark();
      const alpha = env.faint ? 0.3 : dark ? 0.85 : 0.75;

      ctx.fillStyle = dark ? "#fde68a" : "#e0a526";
      for (const m of motes) {
        m.y -= 6 * dt;
        if (m.y < -4) [m.y, m.x] = [env.h + 4, zoneX()];
        ctx.globalAlpha = alpha * (0.25 + 0.25 * Math.sin(t * 2 + m.phase));
        ctx.beginPath();
        ctx.arc(m.x + Math.sin(t * 0.6 + m.phase) * 6, m.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const f of flies) {
        const prevX = f.x;
        f.y -= f.speed * dt;
        f.x = f.base + Math.sin(t * 0.9 + f.phase) * 26 + Math.sin(t * 2.3 + f.phase) * 6;
        if (f.y < -30) Object.assign(f, make(env.h + 30));
        const heading = Math.atan2(f.x - prevX, Math.max(0.001, f.speed * dt)) * 0.6;
        const open = 0.25 + 0.75 * Math.abs(Math.sin(t * 9 + f.phase));
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(heading);
        ctx.globalAlpha = alpha;
        wing(1, f.size, f.colors, open);
        wing(-1, f.size, f.colors, open);
        ctx.fillStyle = dark ? "#e9d5ff" : "#3b2a4a";
        ctx.beginPath();
        ctx.ellipse(0, 0, f.size * 0.09, f.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    },
    resize: layout,
  };
}

export function Butterflies() {
  return <CanvasBackdrop create={create} minMargin={120} />;
}
