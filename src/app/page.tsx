import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { Typewriter } from "@/components/typewriter";
import { copy } from "@/content/copy";
import { logos } from "@/components/logos";
import { roles, type Role } from "@/content/experience";
import { getFeaturedProjects } from "@/lib/projects";
import { site } from "@/content/site";

const LINK =
  "inline-flex items-center gap-2 text-mono text-small font-medium text-foreground underline underline-offset-4 decoration-1 transition-colors hover:text-terminal";

/**
 * Static so Tailwind can see the class names. Restores source order when the
 * two timeline columns collapse to one on mobile; extend if the list grows.
 */
const ORDER = [
  "order-1",
  "order-2",
  "order-3",
  "order-4",
  "order-5",
  "order-6",
  "order-7",
  "order-8",
];

/**
 * Dashed connector from the card to the timeline rail, plus the node dot where
 * they meet. Below `lg` every card connects leftward; from `lg` the left column
 * connects rightward instead, so both meet the centre rail.
 */
const CONNECTOR =
  "before:absolute before:top-9 before:border-t before:border-dashed before:border-terminal before:content-[''] " +
  "before:-left-8 before:w-8 " +
  "after:absolute after:top-9 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full " +
  "after:border after:border-terminal after:bg-background after:content-[''] " +
  "after:left-[calc(-2rem-4px)]";

const CONNECTOR_LEFT_COLUMN =
  "lg:before:left-auto lg:before:-right-12 lg:before:w-12 " +
  "lg:after:left-auto lg:after:right-[calc(-3rem-4px)]";

const CONNECTOR_RIGHT_COLUMN =
  "lg:before:-left-12 lg:before:w-12 lg:after:left-[calc(-3rem-4px)]";

function RoleCard({ role, side }: { role: Role; side: "left" | "right" }) {
  const Logo = role.logo ? logos[role.logo] : null;

  return (
    <article
      className={`relative border border-border bg-background p-6 ${CONNECTOR} ${
        side === "left" ? CONNECTOR_LEFT_COLUMN : CONNECTOR_RIGHT_COLUMN
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Sized to the combined height of the company name and job title.
            Fixed box either way, so cards line up with or without a mark. */}
        <span className="logo-glow block h-12 w-12 shrink-0 text-terminal sm:h-14 sm:w-14">
          {Logo ? <Logo className="h-full w-full" /> : null}
        </span>

        {/* Container query, not a breakpoint: this block's own width decides
            whether the dates sit beside the company name, and it varies with
            the one- vs two-column timeline. Grid columns cannot overlap, so a
            long company name wraps rather than colliding with the dates. */}
        <div className="@container min-w-0 flex-1">
          <div className="flex flex-col gap-1 @min-[17rem]:grid @min-[17rem]:grid-cols-[minmax(0,1fr)_auto] @min-[17rem]:items-baseline @min-[17rem]:gap-x-4">
            <h3 className="text-headline break-words @min-[17rem]:col-start-1 @min-[17rem]:row-start-1">
              {role.company}
            </h3>
            <p className="text-body text-muted @min-[17rem]:col-start-1 @min-[17rem]:row-start-2">
              {role.title}
            </p>
            <p className="text-mono text-caption whitespace-nowrap text-muted @min-[17rem]:col-start-2 @min-[17rem]:row-start-1 @min-[17rem]:text-right">
              {role.from} – {role.to ?? copy.home.present}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const featured = getFeaturedProjects();

  // The headline starts typing once the intro line has finished.
  const introDelay = 80;
  const headlineStart = copy.home.intro.length * introDelay + 300;

  return (
    <>
      <Section
        id="hero"
        label={copy.a11y.introduction}
        className="border-b border-border"
        containerClassName="gap-6"
      >
        <h4 className="text-mono text-caption text-muted h-6">
          <Typewriter text={copy.home.intro} delay={introDelay} />
        </h4>

        <h1 className="text-display max-w-3xl min-h-[1.2em]">
          <Typewriter text={site.author} delay={55} startDelay={headlineStart} />
        </h1>

        <div className="pt-2">
          {/* The last tag is the accent one, picked out in the theme purple. */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-mono text-caption text-muted">
            {copy.home.identityTags.map((tag, index) => (
              <li
                key={tag}
                className={
                  index === copy.home.identityTags.length - 1
                    ? "text-terminal"
                    : undefined
                }
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-body max-w-2xl text-muted pt-2">
          {copy.home.identityLead}
        </p>
        <p className="text-body max-w-2xl text-muted">
          {copy.home.identityBody}
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Link href="/contact/" className={LINK}>
            {copy.home.contactLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section
        id="domains"
        label={copy.home.domainTitle}
        containerClassName="gap-8"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-title">{copy.home.domainTitle}</h2>
          <p className="text-body max-w-2xl text-muted">
            {copy.home.domainHint}
          </p>
        </div>

        {/* Timeline. Below `lg` the rail sits hard left with every card to its
            right, since two columns plus the gap leave the cards too narrow to
            read. From `lg` the rail centres and the cards alternate. The column
            wrappers are display:contents until then, so the cards flatten into
            one grid and `order` can put them back in 1-2-3-4 sequence. */}
        <div className="relative">
          {/* The mask fades the rail out at both ends so it reads as a
              continuing timeline rather than a line with hard stops. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 border-l border-dashed border-terminal lg:left-1/2 [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]"
          />

          <div className="grid gap-6 pl-8 lg:grid-cols-2 lg:gap-x-24 lg:pl-0">
            <div className="contents lg:flex lg:flex-col lg:gap-6">
              {roles.map((role, index) =>
                index % 2 === 0 ? (
                  <div
                    key={`${role.company}-${index}`}
                    className={`${ORDER[index]} lg:order-none`}
                  >
                    <RoleCard role={role} side="left" />
                  </div>
                ) : null,
              )}
            </div>

            <div className="contents lg:mt-16 lg:flex lg:flex-col lg:gap-6">
              {roles.map((role, index) =>
                index % 2 === 1 ? (
                  <div
                    key={`${role.company}-${index}`}
                    className={`${ORDER[index]} lg:order-none`}
                  >
                    <RoleCard role={role} side="right" />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="featured"
        label={copy.home.featuredWork}
        className="border-t border-border"
        containerClassName="gap-10"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-title">{copy.home.featuredWork}</h2>
          <p className="text-body text-muted">{copy.home.featuredWorkHint}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        label={copy.nav.contact}
        className="border-t border-border"
        containerClassName="gap-6"
      >
        <h2 className="text-title">{copy.home.ctaTitle}</h2>
        <p className="text-body max-w-xl text-muted">{copy.home.ctaBody}</p>
        <Link
          href="/contact/"
          className="inline-flex w-fit items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-mono text-small font-medium text-background transition-colors hover:bg-background hover:text-foreground"
        >
          {copy.home.ctaButton}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </Section>
    </>
  );
}
