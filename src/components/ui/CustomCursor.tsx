"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch / coarse-pointer devices: keep native cursor
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Reveal on first mouse move
    let shown = false;
    const show = () => {
      if (!shown) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        shown = true;
      }
    };

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
      dot.style.transform = `translate(${mx}px,${my}px)`;
    };

    // Lerp ring toward dot
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const tick = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Grow ring on interactive elements
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest("a,button,[role='button'],input,select,textarea,label,[data-hover]")) {
        ring.classList.add("is-hovering");
      } else {
        ring.classList.remove("is-hovering");
      }
    };

    // Hide while over iframe / canvas (3D scene)
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; shown = false; };
    const onEnter = () => show();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
