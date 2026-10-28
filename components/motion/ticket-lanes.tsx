"use client";

import { CanvasBackdrop, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * Neu-Source's page with its board running in the margins: three lanes in
 * each - to do, doing, done - and ticket chips travelling down them. A ticket
 * enters at the top of "to do", slides across into "doing" partway down, then
 * into "done", turning green, and leaves at the bottom. Work moving across a
 * board, which is what the tool watches.
 *
 * Without margins there is one narrow board, faint, at the right edge. Under
 * reduced motion the tickets are still, spread across the three lanes.
 */

const STAGE = ["#a78bfa", "#60a5fa", "#34d399"];

type Ticket = { lane: number; laneX: number; y: number; speed: number; side: 0 | 1; width: number; hop: number };

function create(env: Env): Scene {
  const { ctx } = env;
  let laneGap = 60;
  let boards: { x: number }[] = [];
  let tickets: Ticket[] = [];

  /** Lane centre for board b, lane l. */
  const laneX = (b: number, l: number) => boards[b].x + (l - 1) * laneGap;

  const make = (side: 0 | 1, y: number, lane = 0): Ticket => ({
    lane, laneX: 0, y,
    speed: 26 + Math.random() * 18,
    side,
    width: laneGap * (0.55 + Math.random() * 0.2),
    hop: -1,
  });

  const layout = () => {
    laneGap = env.faint ? 26 : Math.min(64, (env.margin - 30) / 3);
    boards = env.faint ? [{ x: env.w - laneGap * 1.6 }] : [{ x: env.margin / 2 }, { x: env.w - env.margin / 2 }];
    tickets = [];
    boards.forEach((_, b) => {
      for (let i = 0; i < (env.faint ? 4 : 7); i++) {
        const y = (i / 7) * env.h;
        const t = make(b as 0 | 1, y, Math.min(2, Math.floor((y / env.h) * 3)));
        t.laneX = laneX(b, t.lane);
        tickets.push(t);
      }
    });
  };
  layout();

  return {
    draw: (_t, dt) => {
      const dark = env.dark();
      const alpha = env.faint ? 0.3 : 0.85;
      const lh = Math.max(16, laneGap * 0.38);

      // The lanes: faint dashed rails.
      ctx.globalAlpha = alpha * 0.6;
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 7]);
      boards.forEach((_, b) => {
        for (let l = 0; l < 3; l++) {
          ctx.beginPath();
          ctx.moveTo(laneX(b, l), 0);
          ctx.lineTo(laneX(b, l), env.h);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);

      for (const k of tickets) {
        k.y += k.speed * dt;
        // Each third of the screen down, the ticket moves one lane across.
        const due = Math.min(2, Math.floor((k.y / env.h) * 3));
        if (due > k.lane && k.hop < 0) k.hop = 0;
        if (k.hop >= 0) {
          k.hop += dt / 0.6;
          if (k.hop >= 1) {
            k.lane = Math.min(2, k.lane + 1);
            k.hop = -1;
          }
        }
        const from = laneX(k.side, k.lane);
        const to = laneX(k.side, Math.min(2, k.lane + 1));
        const e = k.hop < 0 ? 0 : k.hop < 0.5 ? 2 * k.hop * k.hop : 1 - Math.pow(-2 * k.hop + 2, 2) / 2;
        k.laneX = from + (to - from) * e;
        if (k.y > env.h + 30) Object.assign(k, make(k.side, -30));

        const color = STAGE[k.hop >= 0.5 ? Math.min(2, k.lane + 1) : k.lane];
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.roundRect(k.laneX - k.width / 2, k.y - lh / 2, k.width, lh, 4);
        ctx.fillStyle = dark ? "rgba(30,34,48,0.9)" : "rgba(255,255,255,0.95)";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // A status dot and a line of "text".
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(k.laneX - k.width / 2 + 6, k.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = alpha * 0.4;
        ctx.fillRect(k.laneX - k.width / 2 + 12, k.y - 1.5, k.width - 20, 3);
      }
      ctx.globalAlpha = 1;
    },
    resize: layout,
  };
}

export function TicketLanes() {
  return <CanvasBackdrop create={create} minMargin={140} />;
}
