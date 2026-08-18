import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { copy, navItems } from "@/content/copy";
import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border" aria-label={copy.a11y.siteFooter}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-mono text-caption text-muted">
            <span aria-hidden="true" className="text-terminal">
              #
            </span>{" "}
            <CopyEmail
              email={site.email}
              className="cursor-pointer text-foreground underline underline-offset-4 decoration-1 transition-colors hover:text-terminal"
            >
              {site.email}
            </CopyEmail>
          </p>
        </div>

        <nav aria-label={copy.a11y.footerNav}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-mono text-caption text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-mono text-caption text-muted">
            © {year} {site.author}. {copy.footer.rights}
          </p>
          <p className="text-mono text-caption text-muted">
            {copy.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
