"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { usePrefersReducedMotion } from "@/hooks/use-media-query"

function BrightnessIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 18" />
      <path d="M12 9l4.65 -4.65" />
      <path d="M12 14.3l7.37 -7.37" />
      <path d="M12 19.6l8.85 -8.85" />
    </svg>
  )
}

/**
 * Switches the theme as a circle opening out of the button that was pressed.
 *
 * The browser takes a picture of the page before and after, and the new picture
 * is wiped in through a growing circle centred on the pointer - so the change
 * has a source, instead of every colour on the page flipping at once with
 * nothing to say why. The geometry is handed to CSS as three custom properties
 * (see `theme-sweep` in `globals.css`); the radius is the distance to the
 * furthest corner, which is what makes the circle finish exactly as it clears
 * the screen.
 *
 * The class is flipped by hand inside the callback, and that is the fiddly
 * part: the browser snapshots "after" the moment the callback returns, and
 * next-themes applies the class from a passive effect, which is a tick too
 * late - the second snapshot would come out identical to the first and nothing
 * would appear to happen. `setTheme` still runs, to persist the choice and keep
 * next-themes' own state in step; it re-applies the class we just set.
 *
 * Where there is no View Transitions API, or where motion is unwelcome, the
 * theme simply changes.
 */
function ModeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const isDark = resolvedTheme === "dark"

  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    const next = isDark ? "light" : "dark"
    const root = document.documentElement

    const apply = () => {
      root.classList.remove("light", "dark")
      root.classList.add(next)
      root.style.colorScheme = next
      setTheme(next)
    }

    if (reducedMotion || typeof document.startViewTransition !== "function") {
      setTheme(next)
      return
    }

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    root.style.setProperty("--sweep-x", `${x}px`)
    root.style.setProperty("--sweep-y", `${y}px`)
    root.style.setProperty("--sweep-r", `${radius}px`)

    document.startViewTransition(apply)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={toggle}
    >
      {/*
        Half-lit either way up: the icon turns over rather than swapping for a
        different one, so the control reads as one thing in two states.

        Turned by the `dark` class rather than by `resolvedTheme`, and that is
        not a style preference. next-themes cannot know the theme while
        rendering on the server - it is in the visitor's own storage - so a
        rotation driven by React would be absent from the server's HTML and
        present in the client's, which is a hydration mismatch React will not
        patch up. The class is on `<html>` before first paint, courtesy of
        next-themes' blocking script, so CSS has an answer when React does not.
      */}
      <span className="flex rotate-0 transition-transform duration-500 ease-house dark:rotate-180">
        <BrightnessIcon className="size-4.5" />
      </span>
    </Button>
  )
}

export { ModeToggle }
