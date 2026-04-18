"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SPRING = [0.16, 1, 0.3, 1] as const;

interface RevealLineProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Use animate (not whileInView) — for hero which is already in viewport on load */
  immediate?: boolean;
}

/**
 * Wraps children in an overflow-hidden container.
 * The inner element clips up from the baseline — the signature terminal-industries reveal.
 */
export function RevealLine({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: RevealLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldAnimate = immediate ? true : isInView;

  return (
    <span ref={ref} className={`block overflow-hidden ${className}`} style={{ paddingBottom: "0.15em", marginBottom: "-0.15em" }}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={shouldAnimate ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 1, ease: SPRING, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface RevealHeadingProps {
  children: string;
  className?: string;
  /** Stagger delay between each word */
  wordStagger?: number;
  /** Base delay before stagger starts */
  baseDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4";
}

/**
 * Splits a plain string headline into words, each in its own
 * overflow-hidden clip container. Staggered spring reveal on scroll entry.
 */
export function RevealHeading({
  children,
  className = "",
  wordStagger = 0.08,
  baseDelay = 0,
  as: Tag = "h2",
}: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.22em", verticalAlign: "bottom" }}
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={isInView ? { y: "0%" } : { y: "105%" }}
            transition={{
              duration: 0.9,
              ease: SPRING,
              delay: baseDelay + i * wordStagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
