# Portfolio

A minimal, terminal-flavoured personal site.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · MDX ·
Geist · lucide-react

## Getting started

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run typecheck
```

## Where the content lives

Everything you'll want to edit is under [src/content/](src/content/) — no
component changes needed for normal content updates.

| File | What it holds |
| --- | --- |
| [site.ts](src/content/site.ts) | Name, handle, email, social links, Calendly link |
| [copy.ts](src/content/copy.ts) | Every string on the site, plus the nav order |
| [experience.ts](src/content/experience.ts) | Companies and roles for the home page timeline |
| [projects/](src/content/projects/) | One `.mdx` file per project |

**Start here:** [src/content/site.ts](src/content/site.ts). The hero `h1` types
out `site.author`, the header shows `# {site.shortName}`, and the footer and
contact page read their links from the same file.

### Adding a project

Create `src/content/projects/my-project.mdx`. The filename becomes the URL
(`/works/my-project/`), and images go in `public/projects/my-project/`.

```mdx
---
title: My Project
summary: One or two sentences. Used on the card and the page header.
featured: true          # show in "Featured Work" on the home page
ongoing: true           # optional: shows an "Ongoing" badge
order: 15               # sort position, lowest first (see below)
date: 2026-08-01        # tie-breaker when order is absent or equal
tags: [Next.js, TypeScript]
---

## A heading

Markdown from here down. Headings become the contents sidebar automatically.

![A caption that renders under the image](/projects/my-project/shot.png)

<Video src="/projects/my-project/demo.mp4" width="50%" caption="It working" />

<Gallery>
  ![Left](/projects/my-project/a.jpg)
  ![Right](/projects/my-project/b.jpg)
</Gallery>

<MediaGallery />
```

Routes generate from the directory — no other wiring required. `readingTime` is
computed from the word count, so there's nothing to keep in sync.

`<MediaGallery />` renders a staggered masonry wall of everything in
`public/projects/my-project/gallery/`. Drop files in, they appear; images and
`.mp4` both work, no captions.

### Ordering projects

`order` sorts ascending, lowest first, and applies to both the `/works/` listing
and the home page grid.

- Projects **with** an `order` always come before those without.
- Projects **without** one fall to the bottom, newest `date` first.
- Ties fall back to `date`.

The existing files are numbered in tens (10, 20, 30…) so you can slot something
in at 15 without renumbering anything else.

### The experience timeline

[experience.ts](src/content/experience.ts) drives the alternating timeline on
the home page. Leave `to` out for a current role and the card shows "Present".
`logo` names one of the outline marks in
[src/components/logos.tsx](src/components/logos.tsx); they stroke in
`currentColor`, so the purple comes from the theme rather than the file.

## Routes

| Route | Source |
| --- | --- |
| `/` | [src/app/page.tsx](src/app/page.tsx) — hero, timeline, featured work, CTA |
| `/works/` | [src/app/works/page.tsx](src/app/works/page.tsx) |
| `/works/{slug}/` | [src/app/works/[slug]/page.tsx](src/app/works/[slug]/page.tsx) |
| `/contact/` | [src/app/contact/page.tsx](src/app/contact/page.tsx) |

There is **no backend** — every route is a static page. Nothing this site does
sends data anywhere.

## Design system

All tokens and the type scale live in
[src/app/globals.css](src/app/globals.css).

- **Colours** — eight CSS variables (`--background`, `--foreground`, `--muted`,
  `--border`, `--accent`, `--accent-inverse`, `--terminal`,
  `--terminal-inverse`), redefined once under `prefers-color-scheme: dark`.
  There is no theme toggle; the site follows the OS. Change these to reskin the
  whole site.
- **Type scale** — `text-display`, `text-title`, `text-headline`, `text-body`,
  `text-small`, `text-caption`, plus `text-mono` for the Geist Mono face. Use
  these instead of raw Tailwind `text-*` sizes so the rhythm stays consistent.
- **Borders** — `border border-border` everywhere; cards go
  `hover:border-foreground`.
- **Accent** — `--terminal` purple carries the `#` prompt glyphs, bold text in
  MDX, the timeline rail, and the company logos.

## Troubleshooting

**Errors on `npm run dev` after a `npm run build`** — `next dev` and
`next build` share the `.next` directory, and stale generated type validators
there can reference files that no longer exist. Fix:

```bash
rm -rf .next && npm run dev
```

**A new project doesn't show up** — routes are enumerated at startup, so restart
the dev server after adding an `.mdx` file.

**`Blocked cross-origin request to Next.js dev resource`** — you opened the
`Network` URL Next prints (`http://192.168.x.x:3000`) rather than
`http://localhost:3000`. [next.config.ts](next.config.ts) allows this machine's
own LAN addresses automatically, so both URLs work.

## Notes

- **Contact form** — entirely client-side. On submit it validates the fields and
  opens the visitor's own mail client via `mailto:` addressed to `site.email`.
  No network request, no backend, no third party. If you later want real
  in-page submission, add an API route and swap the `mailto:` in
  [src/components/contact-form.tsx](src/components/contact-form.tsx).
- **Email links copy instead of opening mail** — the footer and contact tile
  copy the address to the clipboard and raise a toast.
- **Booking** — the contact page links out to Calendly rather than embedding it.
  An inline embed was tried and reverted: recolouring the widget to match this
  site needs a paid Calendly plan, so on the free tier it renders as a light
  panel on a dark page. The link also keeps the site free of third-party
  scripts. Set the URL in `site.meeting`.
- **`site.url`** is still `https://example.com`. It feeds the OpenGraph
  metadata, so set it before deploying.
