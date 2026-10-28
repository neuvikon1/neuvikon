"use client";

import { useEffect, useRef } from "react";

/**
 * UnderCard's page as a table: face-down cards drifting up the margins either
 * side of the copy, doing the two things the game is made of. Every few
 * seconds one is peeked at - it turns over, shows its value for a moment and
 * turns back - and now and then two of them swap places, lifting and passing
 * each other on a curve.
 *
 * Plain 2D canvas; the turn is a horizontal squash through zero, which reads
 * as a card flipping without a 3D library. On a screen too narrow to have
 * margins the cards spread over the page instead, fewer and much fainter, so
 * the copy still reads over them.
 *
 * Under reduced motion the cards are drawn once, still, with one of them
 * showing its face.
 */

const CARD = { w: 56, h: 80, r: 7 };
const FLIP = 0.45; // seconds for a card to turn over
const HOLD = 1.3; // seconds a peeked card stays face up
const SWAP = 1.4; // seconds for two cards to change places
const CONTENT = 960; // the page's content width in px (--container-max)

type Card = {
  x: number;
  y: number;
  rot: number;
  spin: number;
  rise: number;
  side: -1 | 1 | 0;
  value: number;
  /** Seconds into the current peek, or -1. */
  peek: number;
  /** An in-progress swap: from, to, and time so far. */
  swap: { fx: number; fy: number; tx: number; ty: number; t: number; lift: number } | null;
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function PeekCards() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio, 2);
    let w = 0;
    let h = 0;
    let margin = 0;
    let spread = false; // no margins: cards over the whole page, faint

    const measure = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      margin = (w - CONTENT) / 2;
      spread = margin < CARD.w * 2.2;
    };
    measure();

    /** A random x inside a card's zone: its margin, or anywhere when spread. */
    const zoneX = (side: Card["side"]) => {
      if (spread || side === 0) return CARD.w + Math.random() * (w - CARD.w * 2);
      const lo = CARD.w * 0.7;
      const hi = margin - CARD.w * 0.7;
      const x = lo + Math.random() * Math.max(0, hi - lo);
      return side < 0 ? x : w - x;
    };

    const count = spread ? 5 : 8;
    const cards: Card[] = Array.from({ length: count }, (_, i) => {
      const side: Card["side"] = spread ? 0 : i % 2 === 0 ? -1 : 1;
      return {
        x: zoneX(side),
        y: (i / count) * h + Math.random() * (h / count),
        rot: (Math.random() - 0.5) * 0.6,
        spin: (Math.random() - 0.5) * 0.12,
        rise: 10 + Math.random() * 10,
        side,
        value: Math.floor(Math.random() * 14),
        peek: -1,
        swap: null,
      };
    });

    /* ---------- What happens: drifting, peeks, swaps. ---------- */

    let nextPeek = 1.5;
    let nextSwap = 4.5;

    const startPeek = () => {
      const free = cards.filter((c) => c.peek < 0 && !c.swap && c.y > CARD.h && c.y < h - CARD.h);
      if (free.length === 0) return;
      const card = free[Math.floor(Math.random() * free.length)];
      card.value = Math.floor(Math.random() * 14);
      card.peek = 0;
    };

    const startSwap = () => {
      const free = cards.filter((c) => c.peek < 0 && !c.swap && c.y > CARD.h && c.y < h - CARD.h);
      // Two on the same side, close enough that the pass reads as a swap.
      for (const a of free) {
        const b = free.find((c) => c !== a && c.side === a.side && Math.hypot(c.x - a.x, c.y - a.y) < h * 0.45);
        if (!b) continue;
        a.swap = { fx: a.x, fy: a.y, tx: b.x, ty: b.y, t: 0, lift: 1 };
        b.swap = { fx: b.x, fy: b.y, tx: a.x, ty: a.y, t: 0, lift: -1 };
        return;
      }
    };

    let lastScroll = window.scrollY;
    const step = (dt: number) => {
      const scroll = window.scrollY;
      const drag = Math.max(-60, Math.min(60, scroll - lastScroll));
      lastScroll = scroll;

      nextPeek -= dt;
      if (nextPeek <= 0) {
        startPeek();
        nextPeek = 2.2 + Math.random() * 1.8;
      }
      nextSwap -= dt;
      if (nextSwap <= 0) {
        startSwap();
        nextSwap = 6 + Math.random() * 3;
      }

      for (const c of cards) {
        if (c.peek >= 0) {
          c.peek += dt;
          if (c.peek > FLIP * 2 + HOLD) c.peek = -1;
        }
        if (c.swap) {
          c.swap.t += dt / SWAP;
          const e = ease(Math.min(1, c.swap.t));
          // Pass on opposite curves, so the two cards go round each other.
          const nx = -(c.swap.ty - c.swap.fy);
          const ny = c.swap.tx - c.swap.fx;
          const len = Math.hypot(nx, ny) || 1;
          const bow = Math.sin(Math.PI * e) * 40 * c.swap.lift;
          c.x = c.swap.fx + (c.swap.tx - c.swap.fx) * e + (nx / len) * bow;
          c.y = c.swap.fy + (c.swap.ty - c.swap.fy) * e + (ny / len) * bow;
          if (c.swap.t >= 1) c.swap = null;
          continue;
        }
        // Drift up slowly; scrolling carries the cards along with the page.
        c.y -= c.rise * dt + drag * 0.35;
        c.rot += c.spin * dt;
        if (c.y < -CARD.h) {
          c.y = h + CARD.h;
          c.x = zoneX(c.side);
        } else if (c.y > h + CARD.h * 1.5) {
          c.y = -CARD.h;
          c.x = zoneX(c.side);
        }
      }
    };

    /* ---------- Drawing. ---------- */

    const roundRect = (x: number, y: number, rw: number, rh: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, rw, rh, r);
    };

    const drawBack = (dark: boolean) => {
      const { w: cw, h: ch, r } = CARD;
      roundRect(-cw / 2, -ch / 2, cw, ch, r);
      ctx.fillStyle = dark ? "#2c3c58" : "#24324a";
      ctx.fill();
      roundRect(-cw / 2 + 5, -ch / 2 + 5, cw - 10, ch - 10, r - 3);
      ctx.strokeStyle = "#e0393e";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // A diamond in the middle - the game's back, simplified.
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(9, 0);
      ctx.lineTo(0, 12);
      ctx.lineTo(-9, 0);
      ctx.closePath();
      ctx.fillStyle = "#e0393e";
      ctx.fill();
    };

    const drawFace = (value: number) => {
      const { w: cw, h: ch, r } = CARD;
      roundRect(-cw / 2, -ch / 2, cw, ch, r);
      ctx.fillStyle = "#f7f3ea";
      ctx.fill();
      ctx.strokeStyle = "#cfc6b6";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Low cards win, so they are the red ones.
      ctx.fillStyle = value <= 2 ? "#e0393e" : "#1d1d24";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "600 28px system-ui, sans-serif";
      ctx.fillText(String(value), 0, 2);
      ctx.font = "600 10px system-ui, sans-serif";
      ctx.fillText(String(value), -cw / 2 + 9, -ch / 2 + 10);
    };

    const draw = () => {
      const dark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = spread ? 0.22 : dark ? 0.85 : 0.75;
      for (const c of cards) {
        // Turning over: squash to nothing, swap sides, open out again.
        let turn = 0;
        if (c.peek >= 0) {
          if (c.peek < FLIP) turn = c.peek / FLIP;
          else if (c.peek < FLIP + HOLD) turn = 1;
          else turn = 1 - (c.peek - FLIP - HOLD) / FLIP;
        }
        const squash = Math.abs(Math.cos(Math.PI * turn));
        const lifted = c.swap ? 1 + Math.sin(Math.PI * Math.min(1, c.swap.t)) * 0.12 : 1;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        ctx.scale(Math.max(0.02, squash) * lifted, lifted);
        if (turn > 0.5) drawFace(c.value);
        else drawBack(dark);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    /* ---------- Loop. ---------- */

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(dt);
      draw();
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        // One still frame, one card showing its face.
        cards.forEach((c) => (c.peek = -1));
        cards[0].peek = FLIP;
        draw();
      } else if (document.visibilityState === "visible") {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const onResize = () => {
      measure();
      cards.forEach((c) => (c.x = zoneX(c.side)));
      if (reduced.matches) draw();
    };
    const themeWatch = new MutationObserver(() => reduced.matches && draw());
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
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-svh w-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
    />
  );
}
