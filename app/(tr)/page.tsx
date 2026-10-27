import type { Metadata } from "next";

import { HomeView } from "@/components/views/home";
import { href, pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = { alternates: pageAlternates("tr", href("tr", "home")) };

export default function HomePage() {
  return <HomeView locale="tr" />;
}
