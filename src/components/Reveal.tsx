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
      // Fire as soon as any part enters, and pre-trigger just before the
      // scroll reaches it. Threshold 0 means an element already in the first
      // viewport (e.g. the stack diagram) reveals immediately on load rather
      // than waiting for a scroll that may never come.
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
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
