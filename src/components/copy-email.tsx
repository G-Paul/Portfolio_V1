"use client";

import { useToast } from "@/components/toast";

/** Clipboard API needs a secure context; this covers plain-http hosts. */
function legacyCopy(text: string): boolean {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(field);
  return ok;
}

export function CopyEmail({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children: React.ReactNode;
}) {
  const toast = useToast();

  async function copy() {
    let ok = false;

    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopy(email);
    }

    toast(ok ? "Email copied to clipboard" : email);
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {children}
    </button>
  );
}
