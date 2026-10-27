import type { Metadata } from "next";

import { StudioSection } from "@/components/sections/studio";
import { href, pageAlternates, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: ui.tr.about,
  alternates: pageAlternates("tr", href("tr", "about")),
};

export default function AboutPage() {
  return <StudioSection locale="tr" as="h1" />;
}
