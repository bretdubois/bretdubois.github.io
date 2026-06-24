"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion: skip smooth scroll entirely
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    // Expose instance so nav/scroll handlers can use Lenis.scrollTo
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Integrate Lenis with GSAP ticker for ScrollTrigger compatibility
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Recompute scroll dimensions after async layout changes. Lenis caches the
    // page height to derive its scroll limit; if the page reflows *after* that
    // measurement (web fonts swapping in, images loading, late content), the
    // limit goes stale and the user can't scroll past a mid-page point, with
    // a snap-back when they try. Re-measure on every such event.
    const recompute = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // Fonts reflow the large display headings; this is the main offender on a
    // cold load (no font cache).
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(recompute).catch(() => {});
    }
    // Images and any other load-time content.
    window.addEventListener("load", recompute);

    // Catch any later content-height changes (lazy images, dynamic sections).
    const resizeObserver = new ResizeObserver(() => lenis.resize());
    resizeObserver.observe(document.body);

    // Belt-and-suspenders: a couple of delayed recomputes cover slow font/image
    // loads that resolve after the events above on a fresh deploy.
    const t1 = window.setTimeout(recompute, 600);
    const t2 = window.setTimeout(recompute, 1800);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      resizeObserver.disconnect();
      window.removeEventListener("load", recompute);
      gsap.ticker.remove(tickerCb);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
