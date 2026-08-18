/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from "mdx/types";

/**
 * How Markdown elements render inside a project page. Mirrors the site's type
 * scale so MDX bodies match the rest of the design without extra classes.
 */
export const mdxComponents: MDXComponents = {
  // scroll-mt keeps headings clear of the sticky header when jumped to.
  h2: (props) => (
    <h2 className="text-headline mt-10 mb-4 scroll-mt-24" {...props} />
  ),
  h3: (props) => (
    <h3
      className="text-body mt-8 mb-3 font-medium text-foreground scroll-mt-24"
      {...props}
    />
  ),
  p: (props) => <p className="text-body mb-5 text-foreground" {...props} />,
  ul: (props) => <ul className="mb-5 list-disc pl-5" {...props} />,
  ol: (props) => <ol className="mb-5 list-decimal pl-5" {...props} />,
  li: (props) => <li className="mb-2 leading-relaxed" {...props} />,
  a: ({ href = "", ...props }) => (
    <a
      href={href}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="underline underline-offset-4 decoration-1 transition-colors hover:text-terminal"
      {...props}
    />
  ),
  // Purple rather than a heavier weight: at body size, 500 vs 400 reads as
  // almost nothing, so colour is what actually makes bold text stand out.
  strong: (props) => (
    <strong className="font-medium text-terminal" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-5 border-l-2 border-border pl-4 text-body text-muted italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: (props) => (
    <code
      className="text-mono rounded bg-border px-1 py-0.5 text-sm"
      {...props}
    />
  ),
  // Fenced code blocks: <pre> wraps a <code>, so reset the inline pill styling.
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto border border-border p-4 text-mono text-small [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse text-small" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border px-3 py-2 text-left text-mono text-caption text-muted"
      {...props}
    />
  ),
  td: (props) => <td className="border border-border px-3 py-2" {...props} />,
  /**
   * `![alt](src)` becomes a figure; the alt text doubles as a caption. Plain
   * <img> rather than next/image so animated GIFs play untouched.
   */
  img: ({ src, alt }) => (
    <figure className="my-8">
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full border border-border"
      />
      {alt ? (
        <figcaption className="mt-2 text-mono text-caption text-muted">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  ),

  /**
   * <Video src="/projects/x/demo.mp4" /> — looping muted clip, autoplays.
   * `width` caps how wide it renders and centres it, e.g. width="50%", for
   * square clips that would otherwise eat a screen of vertical space.
   */
  Video: ({
    src,
    caption,
    poster,
    width,
  }: {
    src: string;
    caption?: string;
    poster?: string;
    width?: string;
  }) => (
    <figure
      className={`my-8 ${width ? "mx-auto" : ""}`}
      style={width ? { maxWidth: width } : undefined}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="w-full border border-border"
      />
      {caption ? (
        <figcaption className="mt-2 text-mono text-caption text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  ),

  /** <Gallery> wrapping several images — lays them out side by side. */
  Gallery: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 grid gap-4 sm:grid-cols-2 [&_figure]:my-0">
      {children}
    </div>
  ),
};
