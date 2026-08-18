import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { mdxComponents } from "@/components/mdx";
import { MediaGallery } from "@/components/media-gallery";
import { TableOfContents } from "@/components/table-of-contents";
import { copy } from "@/content/copy";
import {
  getAllProjects,
  getGalleryItems,
  getHeadings,
  getProject,
} from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProject(slug);
  if (!project) notFound();

  const headings = getHeadings(project.content);

  return (
    <>
      <section
        aria-label={project.title}
        className="py-16 sm:py-24 pb-8 border-b border-border"
      >
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-6">
          <Link
            href="/works/"
            className="inline-flex w-fit items-center gap-1 text-small text-muted underline underline-offset-4 decoration-1 transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {copy.work.backTo}
          </Link>

          <div className="flex flex-col gap-3">
            <h1 className="text-display">{project.title}</h1>
            <p className="text-body max-w-2xl text-muted">{project.summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-mono text-caption">
            {project.ongoing ? (
              <span className="inline-flex items-center gap-1.5 border border-terminal px-2 py-0.5 text-terminal">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-terminal"
                />
                {copy.work.ongoing}
              </span>
            ) : null}
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2 py-0.5 text-muted"
              >
                {tag}
              </span>
            ))}
            <span className="text-muted">
              {project.readingTime} {copy.work.readingTime}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          {/* Contents rail sits left of the article from lg up, and collapses
              to a disclosure above it on smaller screens. */}
          <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
            <TableOfContents headings={headings} label={copy.work.contents} />

            <article className="min-w-0 max-w-3xl">
              <MDXRemote
                source={project.content}
                components={{
                  ...mdxComponents,
                  // Bound to this project, so MDX just writes <MediaGallery />
                  // and the files are picked up from its gallery folder.
                  MediaGallery: () => (
                    <MediaGallery items={getGalleryItems(slug)} />
                  ),
                }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [
                      // Tables, strikethrough, task lists, autolinks.
                      remarkGfm,
                      // Lone images are wrapped in <p> by default, which makes
                      // the <figure>/<figcaption> in mdxComponents invalid HTML
                      // and breaks hydration. This strips that wrapper.
                      remarkUnwrapImages,
                    ],
                    // Gives every heading an id for the contents links.
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
