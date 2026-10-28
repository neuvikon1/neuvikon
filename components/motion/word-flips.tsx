"use client";

import { CanvasBackdrop, type Env, type Scene } from "@/components/motion/canvas-backdrop";

/**
 * WordDeck's page with its flashcards in the margins: a few word cards bob
 * gently, and every few seconds one turns over to show its other side - a
 * Turkish word on the front, its English on the back - holds, and turns back.
 * The next time that card comes round it has a new word.
 *
 * Without margins there is one card, low in the corner and faint. Under
 * reduced motion the cards are still, one of them showing its back.
 */

const WORDS: [string, string][] = [
  ["elma", "apple"], ["kitap", "book"], ["deniz", "sea"], ["yıldız", "star"], ["umut", "hope"],
  ["rüzgâr", "wind"], ["bahar", "spring"], ["köprü", "bridge"], ["ışık", "light"], ["bulut", "cloud"],
  ["yol", "road"], ["ateş", "fire"], ["anahtar", "key"], ["gece", "night"], ["merak", "curiosity"],
];
const FLIP = 0.5;
const HOLD = 1.6;

type Card = { x: number; y: number; phase: number; word: [string, string]; flip: number; tilt: number };

function create(env: Env): Scene {
  const { ctx } = env;
  let cards: Card[] = [];
  let cw = 130;
  let ch = 78;
  let next = 1.5;
  // A word no card on screen is already showing.
  const pick = () => {
    const free = WORDS.filter((w) => !cards.some((c) => c.word === w));
    return free[Math.floor(Math.random() * free.length)];
  };

  const layout = () => {
    cw = env.faint ? 104 : Math.min(140, env.margin - 40);
    ch = cw * 0.6;
    const at = (x: number, y: number): Card => ({ x, y, phase: Math.random() * 6, word: pick(), flip: -1, tilt: (Math.random() - 0.5) * 0.16 });
    const spots: [number, number][] = env.faint
      ? [[env.w - cw * 0.75, env.h - ch * 1.4]]
      : [0.22, 0.52, 0.82].flatMap((f, i): [number, number][] => [
          [env.margin / 2, env.h * (f - 0.06 * (i % 2))],
          [env.w - env.margin / 2, env.h * (f + 0.05)],
        ]);
    // One at a time, so each new card's word is checked against the ones before it.
    cards = [];
    for (const [x, y] of spots) cards.push(at(x, y));
    cards[0].flip = FLIP; // one card opens on its back, so a still frame shows both sides
  };
  layout();

  const drawCard = (c: Card, t: number) => {
    const dark = env.dark();
    let turn = 0;
    if (c.flip >= 0) turn = c.flip < FLIP ? c.flip / FLIP : c.flip < FLIP + HOLD ? 1 : 1 - (c.flip - FLIP - HOLD) / FLIP;
    const back = turn > 0.5;
    const bob = Math.sin(t * 0.7 + c.phase) * 6;
    ctx.save();
    ctx.translate(c.x, c.y + bob);
    ctx.rotate(c.tilt + Math.sin(t * 0.5 + c.phase) * 0.02);
    ctx.scale(Math.max(0.03, Math.abs(Math.cos(Math.PI * turn))), 1);
    ctx.globalAlpha = env.faint ? 0.3 : 0.9;
    ctx.beginPath();
    ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 10);
    ctx.fillStyle = back ? "#3b6cf6" : dark ? "#1e2a44" : "#eef3ff";
    ctx.fill();
    ctx.strokeStyle = back ? "#3b6cf6" : dark ? "#3a4a70" : "#c7d5fb";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = back ? "#ffffff" : dark ? "#c7d5fb" : "#2a4fd0";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${Math.round(cw * 0.15)}px system-ui, sans-serif`;
    ctx.fillText(back ? c.word[1] : c.word[0], 0, 2);
    ctx.font = `500 ${Math.round(cw * 0.075)}px system-ui, sans-serif`;
    ctx.globalAlpha *= 0.6;
    ctx.fillText(back ? "EN" : "TR", cw / 2 - 14, -ch / 2 + 12);
    ctx.restore();
  };

  return {
    draw: (t, dt) => {
      next -= dt;
      if (next <= 0) {
        const idle = cards.filter((c) => c.flip < 0);
        if (idle.length) idle[Math.floor(Math.random() * idle.length)].flip = 0;
        next = 1.8 + Math.random() * 1.6;
      }
      for (const c of cards) {
        if (c.flip >= 0) {
          c.flip += dt;
          if (c.flip > FLIP * 2 + HOLD) {
            c.flip = -1;
            c.word = pick();
          }
        }
        drawCard(c, t);
      }
      ctx.globalAlpha = 1;
    },
    resize: layout,
    still: 3,
  };
}

export function WordFlips() {
  return <CanvasBackdrop create={create} minMargin={150} />;
}
