import type { Metadata } from "next";

import { CareersSection } from "@/components/sections/careers";
import { href, pageAlternates, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: ui.tr.careers,
  alternates: pageAlternates("tr", href("tr", "careers")),
};

export default function CareersPage() {
  return <CareersSection locale="tr" as="h1" />;
}
