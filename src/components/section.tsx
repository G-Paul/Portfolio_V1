import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/** Standard page section: vertical rhythm + centered 6xl container. */
export function Section({
  id,
  label,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`py-16 sm:py-24 ${className}`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex flex-col ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
