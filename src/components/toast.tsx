"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const VISIBLE_MS = 2200;

type ShowToast = (message: string) => void;

const ToastContext = createContext<ShowToast>(() => {});

export function useToast(): ShowToast {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  // Bumped on every show so repeat copies replace the live-region node and
  // get re-announced by screen readers.
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ShowToast>((next) => {
    setMessage(next);
    setVisible(true);
    setCount((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [visible, count]);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6"
      >
        <div
          className={`border border-foreground bg-foreground px-4 py-2.5 text-mono text-caption text-background transition-all duration-200 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <span key={count}>
            <span className="text-terminal-inverse" aria-hidden="true">
              #
            </span>{" "}
            {message}
          </span>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
