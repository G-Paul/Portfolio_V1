import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <p className="text-mono text-caption text-muted">
          <span className="text-terminal">#</span> cd — no such route
        </p>
        <h1 className="text-display">404</h1>
        <p className="text-body max-w-xl text-muted">
          This page does not exist. It may have moved, or it may never have been
          built.
        </p>
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-mono text-small font-medium text-background transition-colors hover:bg-background hover:text-foreground"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}
