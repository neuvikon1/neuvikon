import { SiteShell, siteMetadata } from "@/components/site-shell";

export const metadata = siteMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
