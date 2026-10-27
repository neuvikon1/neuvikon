"use client";

/**
 * How long, from the start of the page, the hero's entrance runs: the index
 * rows are the last to land (0.5s cue, two 0.07s staggers, 0.7s rise).
 */
const INTRO_MS = 1350;

let intro: Promise<void> | null = null;

/**
 * Resolves once the hero's entrance has played, or as soon as the reader
 * scrolls, whichever is first.
 *
 * For the heavy start-up work below the hero, such as sampling the scroll
 * ink's page-long path, which holds the main thread for a few hundred
 * milliseconds. Started on mount, that lands in the middle of the entrance,
 * and the N's pen, which draws on the main thread, stutters through it. None
 * of it is visible at the top of the page, so it waits; a scroll means the
 * reader is on the way to it, and it starts at once. Later navigations are
 * past the intro and resolve straight away.
 */
export function afterIntro() {
  intro ??= new Promise((resolve) => {
    const done = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", done);
      resolve();
    };
    const timer = window.setTimeout(done, Math.max(0, INTRO_MS - performance.now()));
    window.addEventListener("scroll", done, { passive: true });
  });
  return intro;
}
