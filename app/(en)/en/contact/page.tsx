import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.en.contact };

export default function ContactPage() {
  return <ContactSection locale="en" as="h1" />;
}
