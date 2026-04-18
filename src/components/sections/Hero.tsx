"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { RevealLine } from "@/components/ui/TextReveal";
import { smoothScrollTo } from "@/lib/utils";

const NetworkScene = dynamic(() => import("@/components/three/NetworkScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const HERO_BG = "#120D0A";

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Hero() {
  const scrollDown = () => smoothScrollTo("#about");
  const scrollToContact = () => smoothScrollTo("#contact");

  return (
    <section
      id="hero"
      style={{ background: HERO_BG, minHeight: "100svh", position: "relative", overflow: "hidden" }}
    >
      {/* ── Full-bleed 3D canvas ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <NetworkScene />
      </div>

      {/* ── Vignette layers ── */}
      {/* Radial: fade from center transparent to edges dark */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `radial-gradient(ellipse 90% 90% at 65% 40%,
            transparent 0%,
            rgba(18,13,10,0.45) 55%,
            rgba(18,13,10,0.92) 100%)`,
        }}
      />
      {/* Left gradient so text stays legible */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `linear-gradient(100deg,
            rgba(18,13,10,0.88) 0%,
            rgba(18,13,10,0.55) 45%,
            transparent 70%)`,
        }}
      />
      {/* Bottom fade into About section */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "28%", zIndex: 1,
          background: `linear-gradient(to bottom, transparent, ${HERO_BG})`,
        }}
      />

      {/* ── Content ── */}
      <div
        className="container-wide"
        style={{
          position: "relative", zIndex: 10,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "clamp(5rem, 9vh, 7rem)",
          paddingTop: "6rem",
        }}
      >
        {/* Eyebrow */}
        <RevealLine delay={0.05} immediate className="mb-4 md:mb-6">
          <p
            className="font-mono tracking-widest uppercase"
            style={{
              fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
              color: "rgba(250,247,242,0.45)",
              letterSpacing: "0.18em",
            }}
          >
            Redwood City, CA &nbsp;·&nbsp; Sales × Engineering × Design
          </p>
        </RevealLine>

        {/* MASSIVE name */}
        <h1
          aria-label="Bret DuBois"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4.5rem, 10.5vw, 11.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#FAF7F2",
            marginBottom: "clamp(1rem, 2vw, 1.75rem)",
          }}
        >
          <RevealLine delay={0.15} immediate>
            <span aria-hidden>Bret</span>
          </RevealLine>
          <RevealLine delay={0.28} immediate>
            <span aria-hidden>DuBois</span>
          </RevealLine>
        </h1>

        {/* Tagline */}
        <RevealLine delay={0.46} immediate className="mb-8 md:mb-10">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.15rem, 2.6vw, 2.25rem)",
              color: "rgba(250,247,242,0.55)",
              letterSpacing: "-0.01em",
            }}
          >
            — where technical depth meets human connection
          </p>
        </RevealLine>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          <button
            onClick={scrollToContact}
            className="btn-primary"
            style={{ fontSize: "0.9rem", padding: "0.7rem 1.6rem" }}
          >
            Get in Touch
          </button>
          <button
            onClick={scrollDown}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.7rem 1.6rem",
              border: "1.5px solid rgba(250,247,242,0.25)",
              borderRadius: "9999px",
              color: "rgba(250,247,242,0.75)",
              background: "transparent",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(250,247,242,0.5)";
              (e.currentTarget as HTMLButtonElement).style.color = "#FAF7F2";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(250,247,242,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(250,247,242,0.75)";
            }}
          >
            Explore Work <ArrowDown size={14} />
          </button>
          <a
            href="https://www.linkedin.com/in/bretdubois/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              color: "rgba(250,247,242,0.4)",
              fontSize: "0.82rem",
              transition: "color 0.2s",
              marginLeft: "0.25rem",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,247,242,0.75)")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,247,242,0.4)")}
          >
            <LinkedInIcon size={13} /> LinkedIn
          </a>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        onClick={scrollDown}
        aria-label="Scroll down"
        style={{
          position: "absolute",
          bottom: "2.25rem",
          right: "clamp(1.5rem, 4vw, 3rem)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "rgba(250,247,242,0.3)",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          padding: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        whileHover={{ color: "rgba(250,247,242,0.7)" } as Record<string, string>}
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em", writingMode: "vertical-rl" }}
        >
          scroll
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}
