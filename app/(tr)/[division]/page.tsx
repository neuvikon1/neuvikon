import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DivisionView } from "@/components/views/division";
import { getContent, getDivision } from "@/lib/content";

type Params = { division: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getContent("tr").divisions.map((division) => ({ division: division.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const division = getDivision("tr", (await params).division);
  return division ? { title: division.name, description: division.tagline } : {};
}

export default async function DivisionPage({ params }: { params: Promise<Params> }) {
  const division = getDivision("tr", (await params).division);
  if (!division) notFound();
  return <DivisionView locale="tr" division={division} />;
}
