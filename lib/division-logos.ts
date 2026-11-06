import type { StaticImageData } from "next/image";

import gamesOnDark from "@/public/divisions/games.svg";
import gamesOnLight from "@/public/divisions/games-light.svg";
import roboticsOnDark from "@/public/divisions/robotics.svg";
import roboticsOnLight from "@/public/divisions/robotics-light.svg";
import techOnDark from "@/public/divisions/tech.svg";
import techOnLight from "@/public/divisions/tech-light.svg";

/**
 * Division lockups, by slug.
 *
 * Vector lockups from the brand file in Figma: the division's mark, the
 * wordmark and the division's word. Two ink versions each; CSS picks between
 * them, for the reason given in `components/brand/logo`. On the page they play
 * as `GamesLogo`, `RoboticsLogo` and `TechLogo`, and these files are the still
 * version those show under reduced motion.
 */
export type DivisionLogo = {
  dark: StaticImageData;
  light: StaticImageData;
};

export const divisionLogos: Partial<Record<string, DivisionLogo>> = {
  games: { dark: gamesOnDark, light: gamesOnLight },
  robotics: { dark: roboticsOnDark, light: roboticsOnLight },
  tech: { dark: techOnDark, light: techOnLight },
};
