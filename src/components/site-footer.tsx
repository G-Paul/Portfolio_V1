import { copy } from "@/content/copy";
import { site } from "@/content/site";

export function SiteFooter() {
  // The site is a static export, so this runs once per build: on the GitHub
  // Pages deploy it's the moment that build ran. Pinned to UTC so the label
  // doesn't depend on the build machine's timezone.
  const builtAt = new Date();
  const year = builtAt.getFullYear();
  const builtAtLabel = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(builtAt);

  return (
    <footer className="border-t border-border" aria-label={copy.a11y.siteFooter}>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-mono text-caption text-muted">
          © {year} {site.author}. {copy.footer.rights}
        </p>
        <p className="text-mono text-caption text-muted">
          {copy.footer.lastUpdated}{" "}
          <time dateTime={builtAt.toISOString()}>{builtAtLabel} UTC</time>
        </p>
      </div>
    </footer>
  );
}
