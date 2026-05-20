import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smooth-scroll to a selector or element. Prefers the Lenis instance
 * attached to `window` (see LenisProvider); falls back to native
 * scroll so it still works under prefers-reduced-motion.
 */
const HEADER_OFFSET = 80;

interface LenisLike {
  scrollTo: (target: number | string | HTMLElement, opts?: { offset?: number }) => void;
}

export function smoothScrollTo(target: string | HTMLElement) {
  if (typeof window === "undefined") return;
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;

  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -HEADER_OFFSET });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
