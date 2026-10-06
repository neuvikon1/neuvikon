import type { Metadata } from "next";

import { CareersSection } from "@/components/sections/careers";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.en.careers };

export default function CareersPage() {
  return <CareersSection locale="en" as="h1" />;
}
