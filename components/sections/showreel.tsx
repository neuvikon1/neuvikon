"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { asset } from "@/lib/content";

/**
 * The work itself, before any of it is described: a band of real screens from
 * the shipped and in-flight projects, drifting sideways as the page scrolls
 * past it. It is the proof the three divisions' copy then explains.
 *
 * Two rows travelling in opposite directions, so the band reads as a reel
 * rather than a carousel waiting to be swiped. Under reduced motion both rows
 * sit still and the band is simply a wall of screens.
 *
 * Mixed shapes on purpose - phone portrait beside desktop landscape - at one
 * height, since that is what the studio ships: games, apps and tools.
 */

type Frame = { src: string; w: number; h: number; name: string };

const TOP: Frame[] = [
  { src: "/media/kor-ve-kul/01.webp", w: 720, h: 1280, name: "Kor ve Kül" },
  { src: "/media/shardbound/01.webp", w: 1600, h: 900, name: "Shardbound" },
  { src: "/media/worddeck/01.webp", w: 591, h: 1280, name: "WordDeck" },
  { src: "/media/undercard/01.webp", w: 720, h: 1280, name: "UnderCard" },
  { src: "/media/neu-source/01.webp", w: 1440, h: 900, name: "Neu-Source" },
  { src: "/media/eclosion/01.webp", w: 739, h: 1600, name: "Eclosion" },
  { src: "/media/kor-ve-kul/03.webp", w: 720, h: 1280, name: "Kor ve Kül" },
];

const BOTTOM: Frame[] = [
  { src: "/media/shardbound/03.webp", w: 1600, h: 900, name: "Shardbound" },
  { src: "/media/edgeout/01.webp", w: 780, h: 1070, name: "EdgeOut" },
  { src: "/media/guessfast/01.webp", w: 600, h: 1304, name: "GuessFast" },
  { src: "/media/kor-ve-kul/05.webp", w: 720, h: 1280, name: "Kor ve Kül" },
  { src: "/media/shardbound/05.webp", w: 1600, h: 900, name: "Shardbound" },
  { src: "/media/undercard/03.webp", w: 720, h: 1280, name: "UnderCard" },
  { src: "/media/worddeck/02.webp", w: 591, h: 1280, name: "WordDeck" },
];

function Row({ frames, from, to, progress }: {
  frames: Frame[];
  from: string;
  to: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduced = useReducedMotion();
  const x = useTransform(progress, [0, 1], reduced ? ["-8%", "-8%"] : [from, to]);
  return (
    <motion.ul style={{ x }} className="flex w-max gap-3 md:gap-4">
      {frames.map((frame, i) => (
        <li key={`${frame.src}-${i}`} className="shrink-0">
          <figure className="group/frame relative overflow-hidden rounded-xl bg-muted">
            <Image
              src={asset(frame.src)}
              alt={frame.name}
              width={frame.w}
              height={frame.h}
              sizes="(min-width: 768px) 40vw, 70vw"
              className="h-56 w-auto object-cover transition-transform duration-700 ease-house group-hover/frame:scale-[1.03] md:h-80"
            />
            <figcaption
              lang="en"
              className="absolute bottom-2 left-2 rounded-md bg-background/85 px-2 py-1 text-xs text-foreground"
            >
              {frame.name}
            </figcaption>
          </figure>
        </li>
      ))}
    </motion.ul>
  );
}

export function Showreel({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} aria-label={label} className="relative w-full overflow-hidden py-6 md:py-10">
      <div className="flex flex-col gap-3 md:gap-4">
        <Row frames={TOP} from="0%" to="-22%" progress={scrollYProgress} />
        <Row frames={BOTTOM} from="-22%" to="0%" progress={scrollYProgress} />
      </div>
    </section>
  );
}
