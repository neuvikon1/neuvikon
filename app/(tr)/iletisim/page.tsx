import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact";
import { href, pageAlternates, ui } from "@/lib/i18n";

export const metadata: Metadata = {
  title: ui.tr.contact,
  alternates: pageAlternates("tr", href("tr", "contact")),
};

export default function ContactPage() {
  return <ContactSection locale="tr" as="h1" />;
}
