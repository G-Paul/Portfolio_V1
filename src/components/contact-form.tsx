"use client";

import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { copy } from "@/content/copy";

const FIELD =
  "w-full border border-border bg-background px-3 py-2.5 text-foreground placeholder:text-muted transition-colors outline-none hover:border-foreground/60 focus-visible:border-foreground disabled:opacity-60";

const MAX_MESSAGE = 4000;

type Status = "idle" | "success" | "invalid";

/**
 * Fully client-side: there is no backend. Submitting opens the visitor's own
 * mail client with the message pre-composed to `to`. Nothing is transmitted
 * anywhere by this page.
 */
export function ContactForm({ to }: { to: string }) {
  const t = copy.contact;
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const statusId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const valid =
      name.trim().length >= 2 &&
      name.trim().length <= 80 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      message.trim().length >= 10;

    if (!valid) {
      setStatus("invalid");
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry — ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    setStatus("success");
  }

  const statusText: Record<Status, string> = {
    idle: "",
    success: t.success,
    invalid: t.invalid,
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby={statusId}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={nameId} className="text-mono text-caption text-muted">
            {t.name}
          </label>
          <span className="text-mono text-caption text-muted">{t.nameHint}</span>
        </div>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-mono text-caption text-muted">
          {t.email}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <label
            htmlFor={messageId}
            className="text-mono text-caption text-muted"
          >
            {t.message}
          </label>
          <span className="text-mono text-caption text-muted">
            {message.length} / {MAX_MESSAGE}
          </span>
        </div>
        <textarea
          id={messageId}
          name="message"
          rows={7}
          required
          minLength={10}
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${FIELD} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-mono text-small font-medium text-background transition-colors hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground"
        >
          {t.submit}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`text-mono text-small ${
            status === "invalid" ? "text-foreground" : "text-muted"
          }`}
        >
          {statusText[status]}
        </p>
      </div>
    </form>
  );
}
