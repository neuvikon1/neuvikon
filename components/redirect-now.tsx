"use client";

import { useEffect } from "react";

/** Moves on at once, leaving the old address out of the back button's history. */
export function RedirectNow({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}
