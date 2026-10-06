"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/** The green of the N in the logo, sampled from the artwork itself. */
const INK = "#50b868";

/** How far right of the rail a section's flourish swings, and over how much height. */
const SWING = 14;
const REACH = 30;

/** Where on the screen the pen sits while you scroll: a little below the middle. */
const NIB_AT = 0.6;

type Geometry = { d: string; width: number; height: number };

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
 * The path is measured off the sections as laid out (anything rendering a
 * `Section` with rails marks itself `data-rails`), so it follows whatever page
 * it is on and re-measures whenever that page changes size.
 *
 * Under reduced motion the line is simply there, written out in full.
 */
export function ScrollInk() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const drawn = useMotionValue(0);
  const ink = useSpring(drawn, { stiffness: 220, damping: 40, mass: 0.6 });
  const nibX = useMotionValue(0);
  const nibY = useMotionValue(0);
  const nibOpacity = useMotionValue(0);

  const mainTop = useRef(0);

  useEffect(() => {
    const main = svgRef.current?.parentElement;
    if (!main) return;

    const measure = () => {
      const box = main.getBoundingClientRect();
      mainTop.current = box.top + window.scrollY;
      const sections = Array.from(main.querySelectorAll<HTMLElement>("section[data-rails]"));
      const rail = sections[0]?.querySelector<HTMLElement>(".grid-rail");
      if (!rail) {
        setGeometry(null);
        return;
      }

      const x = rail.getBoundingClientRect().left - box.left + 0.5;
      const tops = sections.map((section) => section.getBoundingClientRect().top - box.top);
      const last = sections[sections.length - 1].getBoundingClientRect().bottom - box.top;

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
    if (!path || !geometry) return;

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

    // Over the last screen of scrolling the nib slides from its usual height
    // to the bottom of the window, so the line finishes as the page does
    // instead of stopping wherever NIB_AT left it.
    const progressFor = (scroll: number) => {
      const viewport = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewport;
      const end = Math.min(1, Math.max(0, (scroll - (maxScroll - viewport)) / viewport));
      const nib = NIB_AT + (1 - NIB_AT) * end;
      const target = scroll + viewport * nib - mainTop.current;
      const hit = samples.find((sample) => sample.y >= target);
      return (hit ? hit.length : total) / total;
    };

    if (reducedMotion) {
      drawn.jump(1);
      ink.jump(1);
      nibOpacity.set(0);
      return;
    }

    drawn.jump(progressFor(scrollY.get()));
    ink.jump(drawn.get());
    const stopScroll = scrollY.on("change", (scroll) => drawn.set(progressFor(scroll)));

    // The nib rides the eased value, so it never runs ahead of its own ink.
    const placeNib = (progress: number) => {
      const point = path.getPointAtLength(progress * total);
      nibX.set(point.x);
      nibY.set(point.y);
      nibOpacity.set(progress > 0.001 && progress < 0.999 ? 1 : 0);
    };
    placeNib(ink.get());
    const stopInk = ink.on("change", placeNib);

    return () => {
      stopScroll();
      stopInk();
    };
  }, [geometry, reducedMotion, scrollY, drawn, ink, nibX, nibY, nibOpacity]);

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
