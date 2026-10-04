"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

/**
 * Which section the reader is actually looking at.
 *
 * The test is a line across the middle of the screen: whichever section crosses
 * it is the current one. That is the one rule that stays right for a page whose
 * sections run from half a screen to three screens tall - a "topmost visible
 * section" test marks the next section current the moment one pixel of it
 * appears, and a ratio test never fires at all for a section taller than the
 * window.
 *
 * The observer is only a cue to re-check; the answer is read off the geometry.
 * Margins collapse the root to that single line, so the callback runs on the
 * crossings and nowhere else.
 */
function useActiveSection(items: NavItem[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((node): node is Element => node instanceof Element);

    if (sections.length === 0) return;

    const read = () => {
      const middle = window.innerHeight / 2;
      let current: string | null = null;
      for (const section of sections) {
        const box = section.getBoundingClientRect();
        if (box.top <= middle && box.bottom > middle) current = `#${section.id}`;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(read, {
      rootMargin: "-50% 0px -50% 0px",
    });
    for (const section of sections) observer.observe(section);

    return () => observer.disconnect();
  }, [items]);

  return active;
}

/**
 * The nav, with a hairline under whichever section is being read.
 *
 * The marker is one element that moves between the items rather than one per
 * item fading in and out: `layoutId` is what makes that a slide. It is the same
 * hairline the grid is drawn in, and it is doing the same job the rails do -
 * saying where you are.
 */
export function SiteNav({ items }: { items: NavItem[] }) {
  const active = useActiveSection(items);

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {items.map((item) => {
        const current = active === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "true" : undefined}
            className={cn(
              "relative py-1 text-sm transition-colors duration-300",
              current
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            {current && (
              <motion.span
                aria-hidden
                layoutId="nav-current"
                className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 38,
                  mass: 0.8,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
