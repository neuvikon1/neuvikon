"use client";

import { useMemo } from "react";

import { ParticleStage, type Mode, type Recipe } from "@/components/motion/particles/stage";
import {
  arena,
  board,
  board3,
  butterfly,
  crystal,
  deck,
  dial,
  hand,
  hearth,
  imageCloud,
  loadImage,
  party,
  type Cloud,
  type Rand,
} from "@/components/motion/particles/shapes";

/**
 * A project page's cloud: one scene that is this app's alone - a hearth for
 * Kor ve Kül, a butterfly for Eclosion - doing what it does while the page is
 * read (embers rise, wings beat), beside the copy and the gallery. It fades
 * out as the other projects come up.
 *
 * A project without a scene of its own falls back to its icon, built from the
 * icon's pixels, so a new project still gets a cloud.
 */
const SCENES: Record<string, { build: (n: number, r: Rand) => Cloud; mode: Mode }> = {
  "kor-ve-kul": { build: hearth, mode: "rise" },
  shardbound: { build: crystal, mode: "burst" },
  pushbump: { build: arena, mode: "orbit" },
  "neu-pummel-party": { build: party, mode: "spin" },
  undercard: { build: hand, mode: "wave" },
  edgeout: { build: board, mode: "fall" },
  guessfast: { build: dial, mode: "spin" },
  worddeck: { build: deck, mode: "wave" },
  "neu-source": { build: board3, mode: "flow" },
  eclosion: { build: butterfly, mode: "flap" },
};

/** A stable seed per project, so each page has its own but always the same cloud. */
function seedOf(slug: string) {
  let h = 2166136261;
  for (const ch of slug) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

export function ProjectScene({ slug, icon }: { slug: string; icon?: string }) {
  const scene = SCENES[slug];
  const recipe = useMemo<Recipe>(
    () => ({
      seed: seedOf(slug),
      stages: [
        scene
          ? { build: scene.build, mode: scene.mode }
          : { build: async (n: number, r: Rand) => imageCloud(await loadImage(icon!), n, r, { height: 2.8, cutout: true }), size: 1.15 },
      ],
      anchors: [],
      fadeAt: "more",
      count: { desktop: 10000, mobile: 5000 },
    }),
    [slug, icon, scene],
  );

  if (!scene && !icon) return null;
  return <ParticleStage recipe={recipe} />;
}
