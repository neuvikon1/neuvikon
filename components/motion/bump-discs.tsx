"use client";

import { useEffect, useRef } from "react";

/**
 * PushBump's page as an arena: discs in the four player colours slide about
 * behind it, bump into each other and bounce off the screen's edges - and
 * every few seconds one of them plays the game. It stops, charges (a ring
 * swells round it and a line aims at its nearest rival), then lets go: it
 * shoots across, hits, and the disc it hits flies off the screen. A new one
 * drifts in from an edge to take its place. Tilt, charge, release - the
 * game's own loop, played out in the background.
 *
 * Plain 2D canvas and a small elastic-collision simulation; nothing here needs
 * a 3D library. The discs are faint, so the copy reads over them. Scrolling
 * nudges them the other way, as if the page were the floor tilting.
 *
 * Under reduced motion the discs are drawn once, still, and nothing moves.
 */

const COLORS = ["#ff5d5d", "#4da3ff", "#ffd23f", "#4fd18b"];
const CRUISE = 34; // px/s a disc settles back to
const LAUNCH = 720; // px/s a released disc leaves at
const KNOCKOUT = 380; // px/s above which a hit disc flies out of the arena
const CHARGE = 1.3; // seconds of charging
const TRAIL = 14;

type Disc = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  trail: { x: number; y: number }[];
  /** Knocked out: no longer bounces, flies off and is replaced. */
  out: boolean;
  /** Seconds of the current charge, or -1. */
  charge: number;
  target: Disc | null;
  /** Flash after a hit or a release, fading to 0. */
  flash: number;
};

export function BumpDiscs() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 1023px)");
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const isDark = () => document.documentElement.classList.contains("dark");

    const measure = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    measure();

    const randomDir = (speed: number) => {
      const a = Math.random() * Math.PI * 2;
      return { vx: Math.cos(a) * speed, vy: Math.sin(a) * speed };
    };
    let colorTurn = 0;
    const makeDisc = (fromEdge: boolean): Disc => {
      const r = (small.matches ? 12 : 16) + Math.random() * (small.matches ? 8 : 14);
      let x = r + Math.random() * (w - 2 * r);
      let y = r + Math.random() * (h - 2 * r);
      let { vx, vy } = randomDir(CRUISE * (0.6 + Math.random() * 0.8));
      if (fromEdge) {
        // Drift in from just outside a random edge, heading inwards.
        const side = Math.floor(Math.random() * 4);
        if (side === 0) [x, vx] = [-r, Math.abs(vx) + 20];
        else if (side === 1) [x, vx] = [w + r, -Math.abs(vx) - 20];
        else if (side === 2) [y, vy] = [-r, Math.abs(vy) + 20];
        else [y, vy] = [h + r, -Math.abs(vy) - 20];
      }
      return { x, y, vx, vy, r, color: COLORS[colorTurn++ % COLORS.length], trail: [], out: false, charge: -1, target: null, flash: 0 };
    };
    const discs: Disc[] = Array.from({ length: small.matches ? 5 : 9 }, () => makeDisc(false));

    /* ---------- Simulation. ---------- */

    let nextCharge = 2.5;
    const startCharge = () => {
      const ready = discs.filter((d) => !d.out && d.charge < 0 && d.x > d.r * 3 && d.x < w - d.r * 3);
      if (ready.length < 2) return;
      const shooter = ready[Math.floor(Math.random() * ready.length)];
      let best: Disc | null = null;
      let bestD = Infinity;
      for (const d of ready) {
        if (d === shooter) continue;
        const dist = Math.hypot(d.x - shooter.x, d.y - shooter.y);
        if (dist < bestD) [best, bestD] = [d, dist];
      }
      shooter.charge = 0;
      shooter.target = best;
    };

    const collide = (a: Disc, b: Disc) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const min = a.r + b.r;
      if (dist === 0 || dist >= min) return;
      const nx = dx / dist;
      const ny = dy / dist;
      // Separate, then exchange momentum along the normal (mass ~ area).
      const ma = a.r * a.r;
      const mb = b.r * b.r;
      const overlap = min - dist;
      a.x -= nx * overlap * (mb / (ma + mb));
      a.y -= ny * overlap * (mb / (ma + mb));
      b.x += nx * overlap * (ma / (ma + mb));
      b.y += ny * overlap * (ma / (ma + mb));
      const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
      if (rel <= 0) return;
      // The slower of the two before the hit is the one being hit.
      const victim = Math.hypot(a.vx, a.vy) < Math.hypot(b.vx, b.vy) ? a : b;
      const impulse = (2 * rel) / (ma + mb) * 0.95;
      a.vx -= impulse * mb * nx;
      a.vy -= impulse * mb * ny;
      b.vx += impulse * ma * nx;
      b.vy += impulse * ma * ny;
      if (Math.hypot(victim.vx, victim.vy) > KNOCKOUT) {
        victim.out = true;
        victim.flash = 1;
      }
    };

    let lastScroll = window.scrollY;
    const step = (dt: number) => {
      // The page scrolling is the floor tilting: everything slides the other way.
      const scroll = window.scrollY;
      const tilt = Math.max(-40, Math.min(40, scroll - lastScroll));
      lastScroll = scroll;

      nextCharge -= dt;
      if (nextCharge <= 0) {
        startCharge();
        nextCharge = 3.5 + Math.random() * 2.5;
      }

      for (const d of discs) {
        d.flash = Math.max(0, d.flash - dt * 1.6);
        if (d.charge >= 0) {
          // Charging: brake to a stop, swell, then let go at the target.
          d.charge += dt;
          d.vx *= Math.exp(-dt * 6);
          d.vy *= Math.exp(-dt * 6);
          if (d.charge >= CHARGE) {
            const t = d.target && !d.target.out ? d.target : null;
            const dir = t ? { x: t.x - d.x, y: t.y - d.y } : { x: Math.random() - 0.5, y: Math.random() - 0.5 };
            const len = Math.hypot(dir.x, dir.y) || 1;
            d.vx = (dir.x / len) * LAUNCH;
            d.vy = (dir.y / len) * LAUNCH;
            d.charge = -1;
            d.target = null;
            d.flash = 1;
          }
        } else if (!d.out) {
          // Fast discs ease back to a cruise; slow ones keep drifting.
          const speed = Math.hypot(d.vx, d.vy);
          if (speed > CRUISE * 1.5) {
            const k = Math.exp(-dt * 1.4);
            d.vx *= k;
            d.vy *= k;
          }
          d.vy -= tilt * 0.6;
        }
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (!d.out) {
          if (d.x < d.r) [d.x, d.vx] = [d.r, Math.abs(d.vx)];
          if (d.x > w - d.r) [d.x, d.vx] = [w - d.r, -Math.abs(d.vx)];
          if (d.y < d.r) [d.y, d.vy] = [d.r, Math.abs(d.vy)];
          if (d.y > h - d.r) [d.y, d.vy] = [h - d.r, -Math.abs(d.vy)];
        }
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > TRAIL) d.trail.shift();
      }

      for (let i = 0; i < discs.length; i++) {
        for (let j = i + 1; j < discs.length; j++) {
          if (!discs[i].out && !discs[j].out) collide(discs[i], discs[j]);
        }
      }

      // A disc that has left the screen is replaced by a fresh one drifting in.
      for (let i = 0; i < discs.length; i++) {
        const d = discs[i];
        const gone = d.x < -d.r * 4 || d.x > w + d.r * 4 || d.y < -d.r * 4 || d.y > h + d.r * 4;
        if (d.out && gone) discs[i] = makeDisc(true);
        else if (!d.out && gone) [d.x, d.y] = [Math.min(Math.max(d.x, d.r), w - d.r), Math.min(Math.max(d.y, d.r), h - d.r)];
      }
    };

    /* ---------- Drawing. ---------- */

    const draw = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, w, h);
      for (const d of discs) {
        // Trail: a fading line behind anything moving fast enough to leave one.
        if (d.trail.length > 1 && Math.hypot(d.vx, d.vy) > CRUISE * 2) {
          ctx.lineCap = "round";
          for (let i = 1; i < d.trail.length; i++) {
            const t = i / d.trail.length;
            ctx.strokeStyle = d.color;
            ctx.globalAlpha = t * (dark ? 0.35 : 0.28);
            ctx.lineWidth = d.r * 1.4 * t;
            ctx.beginPath();
            ctx.moveTo(d.trail[i - 1].x, d.trail[i - 1].y);
            ctx.lineTo(d.trail[i].x, d.trail[i].y);
            ctx.stroke();
          }
        }

        // Charging: an aim line to the target and a ring that swells.
        if (d.charge >= 0) {
          const p = d.charge / CHARGE;
          if (d.target && !d.target.out) {
            ctx.globalAlpha = 0.25 + p * 0.35;
            ctx.strokeStyle = d.color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.target.x, d.target.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
          ctx.globalAlpha = 0.35 + p * 0.45;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r + 4 + p * 14, 0, Math.PI * 2);
          ctx.stroke();
        }

        // The disc: a soft fill and a firmer rim, brighter for a moment after a hit.
        const glow = d.flash;
        ctx.globalAlpha = (dark ? 0.22 : 0.18) + glow * 0.35;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = (dark ? 0.6 : 0.5) + glow * 0.4;
        ctx.strokeStyle = d.color;
        ctx.lineWidth = 2;
        ctx.stroke();
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
      if (reduced.matches) draw(); // one still frame
      else if (document.visibilityState === "visible") {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const onResize = () => {
      measure();
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
