import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectView } from "@/components/views/project";
import { getContent, getProject } from "@/lib/content";
import { projectSlug } from "@/lib/i18n";

type Params = { division: string; project: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getContent("en").divisions.flatMap((division) =>
    division.projects.map((project) => ({
      division: division.slug,
      project: projectSlug(project.name),
    })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { division, project } = await params;
  const found = getProject("en", division, project);
  return found ? { title: found.project.name, description: found.project.tagline } : {};
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { division, project } = await params;
  const found = getProject("en", division, project);
  if (!found) notFound();
  return <ProjectView locale="en" division={found.division} project={found.project} />;
}
