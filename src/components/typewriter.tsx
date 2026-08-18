"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  /** Milliseconds per character. */
  delay?: number;
  /** Milliseconds to wait before the first character. */
  startDelay?: number;
  className?: string;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Typewriter({
  text,
  delay = 80,
  startDelay = 0,
  className = "",
}: TypewriterProps) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(text);
      setDone(true);
      return;
    }

    setTyped("");
    setDone(false);

    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, delay);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, startDelay]);

  useEffect(() => {
    const blink = setInterval(() => setCaretOn((on) => !on), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <span className={className}>
      <span className="whitespace-pre-line">{typed}</span>
      {/* The caret only exists while typing — it disappears once done. */}
      {!done ? (
        <span
          aria-hidden="true"
          className="inline-block h-[1em] w-[0.6em] ml-1 bg-foreground align-middle"
          style={{ opacity: caretOn ? 1 : 0, transition: "opacity 0.1s" }}
        />
      ) : null}
    </span>
  );
}
