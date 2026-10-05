import type { StaticImageData } from "next/image";

import gamesOnDark from "@/public/divisions/games.png";
import gamesOnLight from "@/public/divisions/games-light.png";
import roboticsOnDark from "@/public/divisions/robotics.png";
import roboticsOnLight from "@/public/divisions/robotics-light.png";

/**
 * Division lockups, by slug.
 *
 * Each is the hand-drawn Neuvikon signature with the division's icon and
 * word set beside it - the same artwork as the main logo, so it is used as
 * the original PNG rather than redrawn. Two ink versions per division;
 * CSS picks between them, for the reason given in `components/brand/logo`.
 *
 * The source squares were padded with a wide soft shadow, which would have
 * held the mark off the grid's left edge. They are stored here trimmed to
 * the ink, so the lockup starts where the container does.
 *
 * Not every division has one: Tech has no lockup, and the section falls
 * back to its text heading. Keep this partial rather than inventing art to
 * fill it in.
 */
export type DivisionLogo = {
  dark: StaticImageData;
  light: StaticImageData;
};

export const divisionLogos: Partial<Record<string, DivisionLogo>> = {
  games: { dark: gamesOnDark, light: gamesOnLight },
  robotics: { dark: roboticsOnDark, light: roboticsOnLight },
};
