"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { normalizePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  /** The home page section that stands for this page, by id. */
  section: string;
  lang?: string;
};

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
 * crossings and nowhere else. Off the home page none of the ids exist and the
 * answer is simply null.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const read = () => {
      const middle = window.innerHeight / 2;
      let current: string | null = null;
      for (const section of sections) {
        const box = section.getBoundingClientRect();
        if (box.top <= middle && box.bottom > middle) current = section.id;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(read, {
      rootMargin: "-50% 0px -50% 0px",
    });
    for (const section of sections) observer.observe(section);

    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [ids]);

  return active;
}

/**
 * Which item is current: the page you are on, or - on the home page, where
 * every item has a section standing in for it - the section you are reading.
 */
export function useCurrentItem(
  items: NavItem[],
): { item: NavItem; ariaCurrent: "page" | "location" } | undefined {
  const pathname = normalizePath(usePathname());
  const [ids] = useState(() => items.map((item) => item.section));
  const section = useActiveSection(ids);

  const page = items.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  if (page) return { item: page, ariaCurrent: "page" };
  const reading = items.find((item) => item.section === section);
  return reading && { item: reading, ariaCurrent: "location" };
}

/**
 * The nav, with a hairline under the current item.
 *
 * The marker is one element that moves between the items rather than one per
 * item fading in and out: `layoutId` is what makes that a slide. It is the same
 * hairline the grid is drawn in, and it is doing the same job the rails do -
 * saying where you are.
 */
export function SiteNav({ items, label }: { items: NavItem[]; label: string }) {
  const current = useCurrentItem(items);

  return (
    <nav aria-label={label} className="hidden items-center gap-6 md:flex">
      {items.map((item) => {
        const isCurrent = item === current?.item;
        return (
          <Link
            key={item.href}
            href={item.href}
            lang={item.lang}
            aria-current={isCurrent ? current?.ariaCurrent : undefined}
            className={cn(
              "relative py-1 text-sm transition-colors duration-300",
              isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            {isCurrent && (
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
