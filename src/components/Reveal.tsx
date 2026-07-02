"use client";

import { useEffect, useRef } from "react";

/*
 * Adds .in-view when the wrapped content scrolls into the viewport.
 * The hidden initial state is gated on html.js (set here on mount),
 * so visitors without JavaScript see everything immediately.
 */
export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
