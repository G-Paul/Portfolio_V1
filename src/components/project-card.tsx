import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { copy } from "@/content/copy";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col gap-5 border border-border bg-background p-6 transition-colors hover:border-foreground focus-within:border-foreground">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-headline transition-colors group-hover:text-foreground">
          <Link
            href={`/works/${project.slug}/`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted transition-all group-hover:text-terminal group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      <p className="text-body text-muted line-clamp-3">{project.summary}</p>

      {/* No flex-wrap here: the tags wrap inside their own column so the read
          time stays pinned right instead of dropping to a line of its own. */}
      <div className="mt-auto flex items-end justify-between gap-3 pt-2">
        <ul className="flex min-w-0 flex-wrap gap-2" aria-label={copy.work.tags}>
          {project.ongoing ? (
            <li className="text-mono text-caption inline-flex items-center gap-1.5 border border-terminal px-2 py-0.5 text-terminal">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-terminal"
              />
              {copy.work.ongoing}
            </li>
          ) : null}
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="text-mono text-caption border border-border px-2 py-0.5 text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="shrink-0 whitespace-nowrap text-mono text-caption text-muted">
          {project.readingTime} {copy.work.readingTime}
        </span>
      </div>
    </article>
  );
}
