"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { cancelFrame, frame, motion, useMotionValue } from "motion/react";

import { afterIntro } from "@/components/motion/after-intro";
import { INK_GATE, INK_GATE_OPEN } from "@/components/motion/ink-gate";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/** The green of the N in the logo, sampled from the artwork itself. */
const INK = "#50b868";

/** How far right of the rail a section's flourish swings, and over how much height. */
const SWING = 14;
const REACH = 30;

/** Where on the screen the pen sits while you scroll: a little below the middle. */
const NIB_AT = 0.6;

/** How quickly the ink closes the gap once a lockup releases it, per second. */
const CATCH_UP = 7;

type Geometry = { d: string; width: number; height: number };
type Gate = { element: Element; y: number };

/** Where the ink meets a section, and the two sections sharing that crossing. */
type Crossing = { y: number; section: HTMLElement; previous: HTMLElement };

/**
 * The left rail, written in green as you read.
 *
 * The page's grid already draws a grey rail down the left edge of every
 * section, and the N in the header is written by a pen. This is that pen
 * carrying on down the page: the ink follows the rail, keeping a little
 * below the middle of the screen, and at each new section it swings out in a
 * small hooked stroke - the same hand as the N - before carrying on. Scrolling
 * back up takes the ink back with it.
 *
 * Behind the swing the grey has nothing left to do, so the crossings the nib has
 * passed are marked on their sections and the CSS masks clear the rail and rule
 * out of the curve. Ahead of the nib the grid stays whole.
 *
 * It also waits for the division lockups. The ink stops level with a lockup
 * until that lockup's entrance has finished, however far the page has gone on
 * without it, and then runs on to catch up. A lockup scrolled past before it
 * ever started does not hold it: nothing would ever let it go.
 *
 * The path is measured off the sections as laid out (anything rendering a
 * `Section` with rails marks itself `data-rails`), so it follows whatever page
 * it is on and re-measures whenever that page changes size.
 *
 * Under reduced motion the line is simply there, written out in full.
 */
function Ink() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Read from Lenis, in the same frame it moves the page, and used as it comes.
  // The scroll is already eased; a spring on top of it left the nib sliding up
  // and down the screen behind the page on every flick.
  const lenis = useLenis();
  const ink = useMotionValue(0);
  const nibX = useMotionValue(0);
  const nibY = useMotionValue(0);
  const nibOpacity = useMotionValue(0);

  const mainTop = useRef(0);
  const crossings = useRef<Crossing[]>([]);
  const gates = useRef<Gate[]>([]);

  useEffect(() => {
    const main = svgRef.current?.parentElement;
    if (!main) return;

    const measure = () => {
      const box = main.getBoundingClientRect();
      mainTop.current = box.top + window.scrollY;
      const sections = Array.from(main.querySelectorAll<HTMLElement>("section[data-rails]"));
      const rail = sections[0]?.querySelector<HTMLElement>(".grid-rail");
      if (!rail) {
        crossings.current = [];
        setGeometry(null);
        return;
      }

      const x = rail.getBoundingClientRect().left - box.left + 0.5;
      const tops = sections.map((section) => section.getBoundingClientRect().top - box.top);
      const last = sections[sections.length - 1].getBoundingClientRect().bottom - box.top;

      crossings.current = sections.slice(1).map((section, i) => ({
        y: tops[i + 1],
        section,
        previous: sections[i],
      }));

      gates.current = Array.from(main.querySelectorAll(`[${INK_GATE}]`)).map((element) => {
        const logo = element.getBoundingClientRect();
        return { element, y: logo.top + logo.height / 2 - box.top };
      });

      let d = `M ${x} ${tops[0]}`;
      for (const y of tops.slice(1)) {
        d +=
          ` L ${x} ${y - REACH}` +
          ` C ${x} ${y - REACH / 3} ${x + SWING} ${y - REACH / 2} ${x + SWING} ${y}` +
          ` C ${x + SWING} ${y + REACH / 2} ${x} ${y + REACH / 3} ${x} ${y + REACH}`;
      }
      d += ` L ${x} ${last}`;

      setGeometry({ d, width: box.width, height: box.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  // Once the path is in the DOM, sample it so a screen height can be turned
  // into a length along it - the flourishes make the two drift apart.
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !geometry || !lenis) return;

    // The sampling walks the whole page-long path and holds the main thread
    // for a few hundred milliseconds, so it waits out the hero's entrance; the
    // line starts below the hero and has nothing to show before then.
    const start = () => {
      const total = path.getTotalLength();
      const samples: { y: number; length: number }[] = [];
      let reached = -Infinity;
      for (let length = 0; length <= total; length += 4) {
        const { y } = path.getPointAtLength(length);
        if (y > reached) {
          reached = y;
          samples.push({ y, length });
        }
      }
      samples.push({ y: path.getPointAtLength(total).y, length: total });

      // The first lockup ahead of the ink that is still owed its entrance. One
      // the ink is already past is ignored, or a lockup played on the way back
      // up would snap the line back to it.
      const holdAt = (scroll: number) => {
        const top = scroll - mainTop.current;
        for (const { element, y } of gates.current) {
          if (y < nibY.get() - 2) continue;
          const state = element.getAttribute(INK_GATE);
          if (state === "done" || !element.isConnected) continue;
          if (state === "waiting" && y < top) continue;
          return y;
        }
        return Infinity;
      };

      // Over the last screen of scrolling the nib slides from its usual height
      // to the bottom of the window, so the line finishes as the page does
      // instead of stopping wherever NIB_AT left it.
      const progressFor = (scroll: number) => {
        const viewport = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - viewport;
        const end = Math.min(1, Math.max(0, (scroll - (maxScroll - viewport)) / viewport));
        const nib = NIB_AT + (1 - NIB_AT) * end;
        const target = Math.min(scroll + viewport * nib - mainTop.current, holdAt(scroll));
        // Between two samples, not on one: snapping to the 4px grid they sit on
        // would make the nib tick against the page as it scrolled.
        let low = 0;
        let high = samples.length - 1;
        if (target >= samples[high].y) return 1;
        if (target <= samples[0].y) return samples[0].length / total;
        while (high - low > 1) {
          const middle = (low + high) >> 1;
          if (samples[middle].y < target) low = middle;
          else high = middle;
        }
        const a = samples[low];
        const b = samples[high];
        return (a.length + ((target - a.y) / (b.y - a.y)) * (b.length - a.length)) / total;
      };

      // The bottom of a rail leaves when the ink does, a swing ahead of the
      // crossing; the rest waits until the nib is at the crossing itself.
      const clearBehind = (y: number) => {
        for (const crossing of crossings.current) {
          crossing.previous.toggleAttribute("data-ink-bottom", y >= crossing.y - REACH);
          crossing.section.toggleAttribute("data-ink-top", y >= crossing.y);
        }
      };

      if (reducedMotion) {
        ink.jump(1);
        nibOpacity.set(0);
        clearBehind(Infinity);
        return;
      }

      ink.jump(progressFor(lenis.scroll));

      // While the ink catches up it is not tied to the scroll; the rest of the
      // time it stays exactly on it, with nothing smoothing it.
      let chasing = false;
      const chase = ({ delta }: { delta: number }) => {
        const goal = progressFor(lenis.scroll);
        const gap = goal - ink.get();
        if (gap * total < 1) {
          chasing = false;
          cancelFrame(chase);
          ink.set(goal);
          return;
        }
        ink.set(ink.get() + gap * (1 - Math.exp((-CATCH_UP * delta) / 1000)));
      };
      const release = () => {
        if (chasing) return;
        chasing = true;
        frame.update(chase, true);
      };
      const main = path.ownerSVGElement?.parentElement;
      main?.addEventListener(INK_GATE_OPEN, release);

      const stopScroll = lenis.on("scroll", ({ scroll }) => {
        if (!chasing) ink.set(progressFor(scroll));
      });

      const placeNib = (progress: number) => {
        const point = path.getPointAtLength(progress * total);
        nibX.set(point.x);
        nibY.set(point.y);
        nibOpacity.set(progress > 0.001 && progress < 0.999 ? 1 : 0);
        clearBehind(point.y);
      };
      placeNib(ink.get());
      const stopInk = ink.on("change", placeNib);

      return () => {
        main?.removeEventListener(INK_GATE_OPEN, release);
        cancelFrame(chase);
        stopScroll();
        stopInk();
      };
    };

    let cancelled = false;
    let stop: (() => void) | void;
    afterIntro().then(() => {
      if (!cancelled) stop = start();
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [geometry, lenis, reducedMotion, ink, nibX, nibY, nibOpacity]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      width={geometry?.width ?? 0}
      height={geometry?.height ?? 0}
      className="pointer-events-none absolute top-0 left-0 z-[1] overflow-visible"
    >
      {geometry && (
        <>
          <motion.path
            ref={pathRef}
            d={geometry.d}
            fill="none"
            stroke={INK}
            strokeWidth={1.5}
            strokeLinecap="round"
            style={{ pathLength: ink }}
          />
          <motion.circle
            r={3}
            fill={INK}
            style={{ cx: nibX, cy: nibY, opacity: nibOpacity, filter: `drop-shadow(0 0 6px ${INK})` }}
          />
        </>
      )}
    </svg>
  );
}

/** The landing page in either language; the export has trailing slashes. */
const HOME = new Set(["/", "/en"]);

/**
 * The ink belongs to the landing page alone: on the inner pages - a game's
 * page above all, where its own scene already moves in the margins - the
 * green line down the rail is one moving thing too many.
 */
export function ScrollInk() {
  const pathname = usePathname();
  return HOME.has(pathname.replace(/\/+$/, "") || "/") ? <Ink /> : null;
}
