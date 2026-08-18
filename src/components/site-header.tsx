import Link from "next/link";
import { copy, navItems } from "@/content/copy";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label={`${site.shortName} — ${copy.a11y.home}`}
            className="text-mono text-small font-medium tracking-tight text-foreground transition-colors hover:text-terminal"
          >
            <span className="text-terminal" aria-hidden="true">
              #
            </span>{" "}
            {site.shortName}
          </Link>

          <div className="flex items-center gap-3">
            <nav aria-label={copy.a11y.primaryNav} className="hidden md:block">
              <ul className="flex items-center gap-2 whitespace-nowrap">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="px-2 py-1 text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <details className="group relative w-[5rem] border border-border p-[7.5px] md:hidden">
              <summary className="flex w-full cursor-pointer list-none items-center justify-center px-2 py-1 text-mono text-caption text-muted transition-colors hover:text-foreground group-open:bg-foreground group-open:text-background">
                {copy.a11y.menu}
              </summary>
              <nav
                aria-label={copy.a11y.primaryNav}
                className="absolute right-0 top-full z-50 mt-2 min-w-56 border border-border bg-background p-1"
              >
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="block w-full px-2 py-1 text-muted transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
