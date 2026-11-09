"use client";

import { Children, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

import { RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A grid of cards that shows the first few and keeps the rest behind a button.
 *
 * The cards are rendered on the server and handed in as children; only the
 * open/closed state lives here. Cards added on opening rise in with the same
 * motion as the ones above them.
 * With no more than `initial` cards there is nothing to hide and no button.
 */
export function ExpandableGrid({
  children,
  initial,
  moreLabel,
  lessLabel,
  className,
}: {
  children: React.ReactNode;
  initial: number;
  moreLabel: string;
  lessLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const cells = Children.toArray(children);
  const canExpand = cells.length > initial;

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <RevealGroup stagger={0.06} id={id} className={cn("w-full", className)}>
        {canExpand ? cells.slice(0, initial) : cells}
        {/* The extra cards start their own entrance: the group's cue has
            already fired by the time they mount, so they would otherwise sit
            at "hidden". `contents` keeps them direct members of the grid. */}
        {canExpand && open && (
          <motion.div
            className="contents"
            initial="hidden"
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
          >
            {cells.slice(initial)}
          </motion.div>
        )}
      </RevealGroup>
      {canExpand && (
        <Button
          variant="outline"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown
            data-icon="inline-end"
            className={cn("transition-transform duration-300", open && "rotate-180")}
          />
        </Button>
      )}
    </div>
  );
}
