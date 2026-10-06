import type { Metadata } from "next";

import { StudioSection } from "@/components/sections/studio";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.en.about };

export default function AboutPage() {
  return <StudioSection locale="en" as="h1" />;
}
