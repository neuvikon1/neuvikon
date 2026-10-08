"use client";

import { Children, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

import { RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * A division's project cards, cut to the first `limit` with a button that
 * shows the rest. The cards themselves are rendered on the server and handed
 * in as children; only the cut is client state.
 *
 * The extra cards mount after the group has already played its reveal, and a
 * late child does not pick that cue up - it would sit at its hidden state. So
 * they get a group of their own that plays as soon as it mounts, laid out with
 * `display: contents` so the cards still flow in the same grid.
 *
 * Collapsing plays the very same animation as expanding, towards the hidden
 * state: same order (first card first), stagger, duration, curve and 14px of
 * travel. It is driven the same way too - the extra group's `animate` target
 * is flipped back to "hidden" - rather than as an AnimatePresence exit, which
 * resolves its transition differently and moves on another curve. Only once
 * the last card has gone does the group leave the grid. Taking them out removes height
 * from above the reader, so once they have gone the button is scrolled back
 * into view; otherwise the page would land further down than they were.
 */
const STAGGER = 0.06;
export function ProjectGrid({
  children,
  limit,
  moreLabel,
  lessLabel,
  className,
}: {
  children: React.ReactNode;
  limit?: number;
  moreLabel: string;
  lessLabel: string;
  className?: string;
}) {
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const expanded = phase === "open";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const items = Children.toArray(children);
  const collapsible = limit !== undefined && items.length > limit;

  const scrollToToggle = () => toggleRef.current?.scrollIntoView({ block: "nearest" });

  return (
    <>
      <RevealGroup stagger={STAGGER} className={className}>
        {limit === undefined ? items : items.slice(0, limit)}
        {limit !== undefined && phase !== "closed" && (
          <RevealGroup
            inView={false}
            animate={phase === "closing" ? "hidden" : "shown"}
            variants={{
              hidden: { transition: { staggerChildren: STAGGER } },
              shown: { transition: { staggerChildren: STAGGER } },
            }}
            onAnimationComplete={(definition) => {
              if (definition !== "hidden") return;
              setPhase("closed");
              requestAnimationFrame(scrollToToggle);
            }}
            className="contents"
          >
            {items.slice(limit)}
          </RevealGroup>
        )}
      </RevealGroup>
      {collapsible && (
        <Button
          ref={toggleRef}
          variant="outline"
          aria-expanded={expanded}
          onClick={() => setPhase(expanded ? "closing" : "open")}
        >
          {expanded ? lessLabel : moreLabel}
          {expanded ? <ArrowUp data-icon="inline-end" /> : <ArrowDown data-icon="inline-end" />}
        </Button>
      )}
    </>
  );
}
