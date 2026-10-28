"use client";

import { ParticleStage, type Recipe } from "@/components/motion/particles/stage";
import { die, gear, lattice, monogram, ring } from "@/components/motion/particles/shapes";

/**
 * The home page's cloud: the signature's N opens the page, then it folds into
 * a twenty-sided die for Games, a lattice for Tech and a gear for Robotics,
 * and opens out into a ring for the studio below. One brand colour throughout,
 * turning slowly; each change is spread over a screen and a half of scrolling,
 * so a shape is still forming as its section is read rather than snapping in.
 */
const HOME: Recipe = {
  seed: 20260128,
  stages: [{ build: monogram }, { build: (n, r) => die(n, r) }, { build: lattice }, { build: gear }, { build: ring }],
  anchors: ["games", "tech", "robotics", "studio"],
  tint: true,
  spin: true,
  count: { desktop: 8000, mobile: 4200 },
  run: 1.5,
};

export function ScrollScene() {
  return <ParticleStage recipe={HOME} />;
}
