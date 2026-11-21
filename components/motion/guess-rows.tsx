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
 * GuessFast's page with games being solved in both margins: a guess is typed
 * into a row of four tiles, the tiles turn over one by one - green for a digit
 * in the right place, yellow for one in the wrong place, grey for a miss - and
 * the next row tries again, closer, until a row comes up all green. Then the
 * board clears, a new number is hidden and the board moves somewhere else.
 *
 * Boards are placed at random but only inside the margins, one to each band
 * of the edge, so they spread out rather than cluster and the copy in the
 * middle column always stays on a clean ground.
 *
 * Without margins there is one board, low in the corner and faint. Under
 * reduced motion each board is drawn mid-game, two rows revealed.
 */

const ROWS = 4;
// Slow on purpose: these sit beside the copy, and anything quicker pulls
// the eye away from it.
const ROW_TIME = 3.6; // seconds per guess: typing, then the reveal
const START = 1.2; // the empty board fading in before the first guess
const HOLD = 5; // the solved board left on show before it clears
const LOOP = START + ROWS * ROW_TIME + HOLD;

type Board = {
  cx: number;
  cy: number;
  tile: number;
  side: 0 | 1;
  /** Which of its margin's bands, top to bottom, the board keeps to. */
  slot: number;
  phase: number;
  round: number;
  rows: { digits: number[]; marks: number[] }[];
};

/** Most boards a margin holds; fewer when the window is too short for them. */
const PER_SIDE = 3;

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

const boardSize = (tile: number) => ({ w: 4 * tile + 3 * tile * 0.16, h: ROWS * tile * 1.16 });

function create(env: Env): Scene {
  const { ctx } = env;
  let boards: Board[] = [];

  let perSide = 1;

  /** A new size and a random spot in the board's own band (see `bandSpot`). */
  const place = (b: Board) => {
    const maxTile = Math.min(32, (env.margin - PAD * 2) / 4.48);
    const tile = maxTile * (0.7 + Math.random() * 0.3);
    const { w, h } = boardSize(tile);
    const spot = bandSpot(env, b.side, b.slot, perSide, { left: w / 2, right: w / 2, up: h / 2, down: h / 2 });
    Object.assign(b, spot, { tile });
  };

  const layout = () => {
    if (env.faint) {
      const tile = 24;
      const b: Board = { cx: env.w - tile * 3, cy: env.h - tile * 3.4, tile, side: 1, slot: 0, phase: 0, round: -1, rows: [] };
      deal(b);
      boards = [b];
      return;
    }
    perSide = bandsPerSide(env, 260, PER_SIDE);
    boards = Array.from({ length: perSide * 2 }, (_, i) => {
      const b: Board = {
        cx: 0,
        cy: 0,
        tile: 0,
        side: (i % 2) as 0 | 1,
        slot: Math.floor(i / 2),
        phase: (LOOP * i) / (perSide * 2),
        round: -1,
        rows: [],
      };
      deal(b);
      place(b);
      return b;
    });
  };
  layout();

  const drawBoard = (b: Board, time: number) => {
    const c = env.dark() ? COLORS.dark : COLORS.light;
    const t = (time + b.phase) % LOOP;
    const round = Math.floor((time + b.phase) / LOOP);
    if (round !== b.round) {
      if (b.round !== -1) {
        deal(b);
        if (!env.faint) place(b);
      }
      b.round = round;
    }
    const fade = clamp01(t / START) * (1 - clamp01((t - (LOOP - 1.5)) / 1.5));
    const alpha = (env.faint ? 0.3 : 0.9) * fade;
    const { tile } = b;
    const gap = tile * 0.16;
    const width = 4 * tile + 3 * gap;
    const top = b.cy - (ROWS * (tile + gap)) / 2;

    ctx.font = `600 ${Math.round(tile * 0.52)}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    b.rows.forEach((row, r) => {
      const start = START + r * ROW_TIME;
      row.digits.forEach((digit, i) => {
        const x = b.cx - width / 2 + i * (tile + gap) + tile / 2;
        const y = top + r * (tile + gap) + tile / 2;
        const typed = t > start + i * 0.3;
        // The reveal: each tile squashes shut and opens in its colour.
        const flipT = clamp01((t - (start + 1.6 + i * 0.35)) / 0.6);
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
    still: START + ROW_TIME * 2 - 0.1,
  };
}

export function GuessRows() {
  return <CanvasBackdrop create={create} minMargin={180} />;
}
