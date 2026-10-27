import type { Metadata } from "next";

import { HomeView } from "@/components/views/home";
import { href, pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = { alternates: pageAlternates("en", href("en", "home")) };

export default function HomePage() {
  return <HomeView locale="en" />;
}
