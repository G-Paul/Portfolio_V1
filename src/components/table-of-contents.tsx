"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/projects";

/**
 * Contents list for a project page. Sticky rail on desktop, collapsible
 * disclosure above the article on mobile.
 */
export function TableOfContents({
  headings,
  label,
}: {
  headings: Heading[];
  label: string;
}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Highlight the heading nearest the top of the reading area.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Ignore the sticky header, and only count the top third of the viewport.
      { rootMargin: "-88px 0px -66% 0px", threshold: 0 },
    );

    const nodes = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => node !== null);

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ul className="flex flex-col gap-2">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? "location" : undefined}
            className={`block text-mono text-caption normal-case tracking-normal transition-colors hover:text-foreground ${
              activeId === heading.id ? "text-terminal" : "text-muted"
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsed by default so it never pushes the article down. */}
      <details className="group border border-border lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-mono text-caption text-muted transition-colors hover:text-foreground">
          {label}
          <span
            aria-hidden="true"
            className="transition-transform group-open:rotate-90"
          >
            →
          </span>
        </summary>
        <nav aria-label={label} className="border-t border-border p-4">
          {list}
        </nav>
      </details>

      {/* Desktop: sticky rail beside the article. */}
      <nav
        aria-label={label}
        className="hidden lg:block lg:sticky lg:top-24 lg:self-start"
      >
        <p className="mb-4 text-mono text-caption text-muted">{label}</p>
        {list}
      </nav>
    </>
  );
}
