import { ArrowUpRight, CalendarClock, Mail } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { LinkedInLogo, XLogo } from "@/components/icons";
import { Section } from "@/components/section";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: copy.contact.title,
  description: copy.contact.intro,
};

const TILE =
  "group flex w-full items-center gap-4 border border-border p-4 text-left transition-colors hover:border-foreground";

const channels = [
  {
    icon: Mail,
    label: copy.contact.channels.email,
    value: site.email,
    /** Click copies to the clipboard instead of opening a mail client. */
    copyToClipboard: true,
    href: "",
    external: false,
  },
  {
    icon: LinkedInLogo,
    label: copy.contact.channels.linkedin,
    value: site.links.linkedin.replace("https://www.", ""),
    copyToClipboard: false,
    href: site.links.linkedin,
    external: true,
  },
  {
    icon: XLogo,
    label: copy.contact.channels.x,
    value: site.links.x.replace("https://", ""),
    copyToClipboard: false,
    href: site.links.x,
    external: true,
  },
];

function TileBody({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <>
      <Icon
        aria-hidden
        className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-foreground"
      />
      <div className="flex flex-col">
        <span className="text-mono text-caption text-muted">{label}</span>
        <span className="text-mono text-small text-foreground">{value}</span>
      </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <Section label={copy.nav.contact} containerClassName="gap-12">
      <header className="flex flex-col gap-4">
        <p className="text-mono text-caption text-muted">
          <span className="text-terminal">#</span> {copy.contact.prompt}
        </p>
        <h1 className="text-display">{copy.contact.title}</h1>
        <p className="text-body max-w-2xl text-muted">{copy.contact.intro}</p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <h2 className="text-mono text-caption text-muted">
            {copy.contact.formHeading}
          </h2>
          <ContactForm to={site.email} />
        </div>

        <aside className="flex flex-col gap-10">
          <section aria-labelledby="meet" className="flex flex-col gap-6">
            <h2 id="meet" className="text-mono text-caption text-muted">
              {copy.contact.meetHeading}
            </h2>
            {/* gap-2 + a caption-height label row mirrors the form's field
                labels, so this card's top edge lines up with the Name input. */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-mono text-caption text-muted">
                  {site.meeting.provider}
                </span>
                <span className="text-mono text-caption text-muted">
                  {site.meeting.duration}
                </span>
              </div>
              <a
                href={site.meeting.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-foreground bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-background hover:text-foreground"
              >
                <CalendarClock aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="text-mono text-small font-medium">
                  {copy.contact.meetLabel}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-auto h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </section>

          <section aria-labelledby="direct" className="flex flex-col gap-6">
            <h2 id="direct" className="text-mono text-caption text-muted">
              {copy.contact.directHeading}
            </h2>
            <ul className="flex flex-col gap-3">
              {channels.map((channel) => (
                <li key={channel.label}>
                  {channel.copyToClipboard ? (
                    <CopyEmail email={channel.value} className={TILE}>
                      <TileBody {...channel} />
                    </CopyEmail>
                  ) : (
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={TILE}
                    >
                      <TileBody {...channel} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </Section>
  );
}
