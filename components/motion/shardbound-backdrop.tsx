"use client";

import { useEffect, useState } from "react";

import { CrystalShards } from "@/components/motion/crystal-shards";
import { TorchDust } from "@/components/motion/torch-dust";

/**
 * Temporary: Shardbound has two candidate backgrounds while one is chosen.
 * Crystal shards by default; `?arkaplan=mesale` shows the torchlight and dust.
 * Once one is picked, this file goes and the winner is mapped directly.
 */
export function ShardboundBackdrop() {
  const [torch, setTorch] = useState(false);
  useEffect(() => {
    // After mount: the static page cannot know the query string at build time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTorch(new URLSearchParams(window.location.search).get("arkaplan") === "mesale");
  }, []);
  return torch ? <TorchDust /> : <CrystalShards />;
}
