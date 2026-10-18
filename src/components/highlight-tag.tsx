import { ArrowUpRight } from "lucide-react";
import type { ProjectHighlight } from "@/lib/projects";

/**
 * A filled, linked tag that sits above a project's regular tags, for things
 * like a paper acceptance. `relative z-10` lifts it above the card's
 * full-surface link so it stays clickable on its own.
 */
export function HighlightTag({ highlight }: { highlight: ProjectHighlight }) {
  return (
    <a
      href={highlight.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 inline-flex w-fit items-center gap-1 border border-terminal bg-terminal px-2 py-0.5 text-mono text-caption text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terminal"
    >
      {highlight.label}
      <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
    </a>
  );
}
