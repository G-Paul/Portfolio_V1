import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { copy } from "@/content/copy";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: copy.work.title,
  description: copy.work.intro,
};

export default function WorksPage() {
  const projects = getAllProjects();

  return (
    <Section label={copy.work.title} containerClassName="gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-display">{copy.work.title}</h1>
        <p className="text-body max-w-2xl text-muted">{copy.work.intro}</p>
      </header>

      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-body text-muted">{copy.work.empty}</p>
      )}
    </Section>
  );
}
