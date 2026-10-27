import type { Metadata } from "next";

import { CareersSection } from "@/components/sections/careers";
import { href, pageAlternates, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: ui.en.careers,
  alternates: pageAlternates("en", href("en", "careers")),
};

export default function CareersPage() {
  return <CareersSection locale="en" as="h1" />;
}
