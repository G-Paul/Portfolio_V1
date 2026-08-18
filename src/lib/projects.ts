import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");
const WORDS_PER_MINUTE = 200;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  featured: boolean;
  /** Still in progress. Shows an "Ongoing" badge on the card and page. */
  ongoing?: boolean;
  tags: string[];
  /**
   * Manual sort position, lowest first. Optional: anything without one falls
   * to the bottom, ordered by date. Gaps are fine, so numbering in tens leaves
   * room to slot a project in without renumbering the rest.
   */
  order?: number;
  /** ISO date (YYYY-MM-DD). Breaks ties when `order` is absent or equal. */
  date: string;
  /** Computed from the body — never written by hand. */
  readingTime: number;
  /** Raw MDX body, without frontmatter. */
  content: string;
};

function fail(slug: string, message: string): never {
  throw new Error(`Project "${slug}": ${message}`);
}

function parse(fileName: string): Project {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (typeof data.title !== "string") fail(slug, "frontmatter needs a `title`");
  if (typeof data.summary !== "string")
    fail(slug, "frontmatter needs a `summary`");

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    summary: data.summary,
    featured: data.featured === true,
    ongoing: data.ongoing === true,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    order: typeof data.order === "number" ? data.order : undefined,
    date: typeof data.date === "string" ? data.date : "",
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  };
}

/**
 * Sort by explicit `order` first, then newest date. Projects with an `order`
 * always come before those without, so adding one to a single file promotes it
 * without touching any others.
 */
function compare(a: Project, b: Project): number {
  if (a.order !== b.order) {
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  }
  return b.date.localeCompare(a.date);
}

/** All projects, in display order. */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parse)
    .sort(compare);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export type GalleryItem = { src: string; type: "image" | "video" };

const VIDEO_EXTS = [".mp4", ".webm"];
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

/**
 * Everything in public/projects/<slug>/gallery/, sorted by filename. Adding a
 * file to that folder is all it takes to put it in the gallery.
 */
export function getGalleryItems(slug: string): GalleryItem[] {
  const dir = path.join(process.cwd(), "public", "projects", slug, "gallery");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => !file.startsWith("."))
    .sort()
    .flatMap((file) => {
      const ext = path.extname(file).toLowerCase();
      const type = VIDEO_EXTS.includes(ext)
        ? ("video" as const)
        : IMAGE_EXTS.includes(ext)
          ? ("image" as const)
          : null;
      if (!type) return [];
      return [{ src: `/projects/${slug}/gallery/${file}`, type }];
    });
}

export type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * Pulls `##` and `###` headings out of an MDX body for the contents sidebar.
 * Uses the same slugger as rehype-slug, so the ids line up with the anchors it
 * writes into the rendered headings.
 */
export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let insideFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    // Strip inline markdown so the label reads as plain text.
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}
