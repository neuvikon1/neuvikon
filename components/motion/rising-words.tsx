"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

import { DURATION, EASE, VIEWPORT } from "./tokens";

/**
 * Type that rises into place a word at a time, each word climbing out from
 * behind a clip the height of its own line.
 *
 * Word-level rather than line-level: a line split has to measure the rendered
 * text, so it cannot be server-rendered and has to redo itself on every
 * resize. Clipping each word needs no measurement, survives `text-wrap:
 * balance`, and - because what ends up in the DOM is real words with real
 * spaces between them - leaves the heading selectable, searchable, and read as
 * one sentence by a screen reader.
 *
 * It renders inline and brings no type classes of its own, so it goes *inside*
 * the heading rather than around it:
 *
 *     <Title as="h1" level="display">
 *       <RisingWords inView={false}>{org.tagline}</RisingWords>
 *     </Title>
 *
 * Only for the tight leading of the `Title` levels. Under `leading-relaxed` the
 * clip sits far enough off the glyphs that the rise reads as a jump.
 */

/**
 * Clip height is the line box plus this much, in ems, so descenders have
 * somewhere to live; the matching negative margin hands the space back, which
 * keeps the heading exactly as tall as it would be set as plain text.
 */
const DESCENDER = 0.14;

/**
 * Travel, as a share of the word's own height. It has to clear the clip - line
 * box plus `DESCENDER` - or the top of the word shows before it is cued.
 */
const TRAVEL = "120%";

type RisingWordsProps = {
  children: string;
  /** Seconds to hold before the first word. */
  delay?: number;
  /** Seconds between words. Low: the sentence should land as one gesture. */
  stagger?: number;
  /**
   * Wait to be scrolled into view. Off for the hero, which is already on screen
   * when the page loads and should not wait to be scrolled to.
   */
  inView?: boolean;
};

export function RisingWords({
  children,
  delay = 0,
  stagger = 0.055,
  inView = true,
}: RisingWordsProps) {
  const cue = inView
    ? ({ whileInView: "shown", viewport: VIEWPORT } as const)
    : ({ animate: "shown" } as const);

  return (
    <motion.span
      initial="hidden"
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...cue}
    >
      {children.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 && " "}
          <span
            className="inline-block overflow-hidden"
            style={{
              paddingBottom: `${DESCENDER}em`,
              marginBottom: `-${DESCENDER}em`,
            }}
          >
            <motion.span
              data-motion
              className="inline-block"
              variants={{ hidden: { y: TRAVEL }, shown: { y: "0%" } }}
              transition={{ duration: DURATION.slow, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.span>
  );
}
