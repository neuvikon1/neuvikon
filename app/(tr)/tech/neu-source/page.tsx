import type { Metadata } from "next";
import Link from "next/link";

import { RedirectNow } from "@/components/redirect-now";

const TARGET = "/tech/source/";

/**
 * The project's old address, from when it was called Neu-Source. Pages has no
 * server redirects, so this is a page that sends the reader on, marked so
 * search engines index the new address instead.
 */
export const metadata: Metadata = {
  title: "Source",
  robots: { index: false, follow: true },
  alternates: { canonical: TARGET },
};

export default function Page() {
  return (
    <main className="p-10">
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <RedirectNow to={TARGET} />
      <Link href={TARGET}>Source</Link>
    </main>
  );
}
