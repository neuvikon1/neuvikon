import { SiteShell, siteMetadata } from "@/components/site-shell";

export const metadata = siteMetadata("tr");

export default function TurkishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="tr">{children}</SiteShell>;
}
