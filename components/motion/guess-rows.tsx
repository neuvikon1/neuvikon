"use client";

import { CanvasBackdrop, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * GuessFast's page with a game being solved in each margin: a guess is typed
 * into a row of four tiles, the tiles turn over one by one - green for a digit
 * in the right place, yellow for one in the wrong place, grey for a miss - and
 * the next row tries again, closer, until a row comes up all green. Then the
 * board clears and a new number is hidden.
 *
 * Without margins there is one board, low in the corner and faint. Under
 * reduced motion each board is drawn mid-game, two rows revealed.
 */

const ROWS = 4;
const ROW_TIME = 1.6; // seconds per guess: typing, then the reveal
const LOOP = 0.5 + ROWS * ROW_TIME + 2.4;

type Board = { cx: number; cy: number; phase: number; round: number; rows: { digits: number[]; marks: number[] }[] };

const COLORS = {
  light: { hit: "#4fbf6b", near: "#e8b931", miss: "#a3abb5", empty: "rgba(0,0,0,0.12)", ink: "#1d2530" },
  dark: { hit: "#4fbf6b", near: "#e8b931", miss: "#4a525c", empty: "rgba(255,255,255,0.16)", ink: "#e8ecf1" },
};

/** Wordle-style marks: 2 right place, 1 wrong place, 0 not in the number. */
function score(guess: number[], secret: number[]) {
  const marks: number[] = guess.map((d, i) => (d === secret[i] ? 2 : 0));
  const left = secret.filter((_, i) => marks[i] !== 2);
  guess.forEach((d, i) => {
    if (marks[i] === 2) return;
    const k = left.indexOf(d);
    if (k >= 0) {
      marks[i] = 1;
      left.splice(k, 1);
    }
  });
  return marks;
}

function deal(b: Board) {
  const digits = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
  const secret = digits();
  b.rows = Array.from({ length: ROWS }, (_, i) => {
    // Each wrong guess keeps the greens it has found, so the game converges.
    const guess = i === ROWS - 1 ? secret : digits().map((d, k) => (Math.random() < i * 0.3 ? secret[k] : d));
    return { digits: guess, marks: score(guess, secret) };
  });
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function create(env: Env): Scene {
  const { ctx } = env;
  let tile = 34;
  let boards: Board[] = [];

  const layout = () => {
    tile = env.faint ? 24 : Math.min(36, (env.margin - 40) / 4.6);
    const make = (cx: number, cy: number, phase: number): Board => {
      const b: Board = { cx, cy, phase, round: -1, rows: [] };
      deal(b);
      return b;
    };
    boards = env.faint
      ? [make(env.w - tile * 3, env.h - tile * 3.4, 0)]
      : [make(env.margin / 2, env.h * 0.36, 0), make(env.w - env.margin / 2, env.h * 0.7, LOOP / 2)];
  };
  layout();

  const drawBoard = (b: Board, time: number) => {
    const c = env.dark() ? COLORS.dark : COLORS.light;
    const t = (time + b.phase) % LOOP;
    const round = Math.floor((time + b.phase) / LOOP);
    if (round !== b.round) {
      if (b.round !== -1) deal(b);
      b.round = round;
    }
    const fade = clamp01(t / 0.4) * (1 - clamp01((t - (LOOP - 0.6)) / 0.6));
    const alpha = (env.faint ? 0.3 : 0.9) * fade;
    const gap = tile * 0.16;
    const width = 4 * tile + 3 * gap;
    const top = b.cy - (ROWS * (tile + gap)) / 2;

    ctx.font = `600 ${Math.round(tile * 0.52)}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    b.rows.forEach((row, r) => {
      const start = 0.5 + r * ROW_TIME;
      row.digits.forEach((digit, i) => {
        const x = b.cx - width / 2 + i * (tile + gap) + tile / 2;
        const y = top + r * (tile + gap) + tile / 2;
        const typed = t > start + i * 0.12;
        // The reveal: each tile squashes shut and opens in its colour.
        const flipT = clamp01((t - (start + 0.6 + i * 0.18)) / 0.3);
        const squash = Math.abs(Math.cos(Math.PI * flipT));
        const shown = flipT > 0.5;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1, Math.max(0.04, squash));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.roundRect(-tile / 2, -tile / 2, tile, tile, tile * 0.16);
        if (shown) {
          ctx.fillStyle = [c.miss, c.near, c.hit][row.marks[i]];
          ctx.fill();
        } else {
          ctx.strokeStyle = c.empty;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (typed) {
          ctx.fillStyle = shown ? "#ffffff" : c.ink;
          ctx.fillText(String(digit), 0, 1);
        }
        ctx.restore();
      });
    });
    ctx.globalAlpha = 1;
  };

  return {
    draw: (t) => boards.forEach((b) => drawBoard(b, t)),
    resize: layout,
    still: 0.5 + ROW_TIME * 2 - 0.1,
  };
}

export function GuessRows() {
  return <CanvasBackdrop create={create} minMargin={180} />;
}
