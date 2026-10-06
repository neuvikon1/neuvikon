import type { Metadata } from "next";

import { CareersSection } from "@/components/sections/careers";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.tr.careers };

export default function CareersPage() {
  return <CareersSection locale="tr" as="h1" />;
}
