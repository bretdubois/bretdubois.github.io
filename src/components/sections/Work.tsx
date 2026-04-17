"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { staggerContainer, fadeUp, scaleUp, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { caseStudies } from "@/data/work";

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={scaleUp}
      className="card overflow-hidden group"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: study.accent }} />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${study.accent}20` }}
              >
                <Briefcase size={16} style={{ color: study.accent }} />
              </div>
              <span className="section-label" style={{ color: study.accent }}>
                {study.period}
              </span>
            </div>
            <h3
              className="font-display text-2xl font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {study.company}
            </h3>
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              {study.role}
            </p>
          </div>
          <span className="tag hidden sm:inline-flex">{study.location.split(",")[1]?.trim()}</span>
        </div>

        {/* Summary */}
        <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {study.summary}
        </p>

        {/* Metrics (if present) or qualitative highlights */}
        {study.metrics.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl" style={{ background: "var(--bg-alt)" }}>
            {study.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-display font-bold text-2xl md:text-3xl"
                  style={{ color: study.accent }}
                >
                  <AnimatedCounter
                    to={parseInt(m.value)}
                    prefix={m.prefix}
                    suffix={m.suffix}
                  />
                </div>
                <div className="text-xs mt-1 leading-tight" style={{ color: "var(--text-muted)" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        ) : study.highlights && study.highlights.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-6">
            {study.highlights.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                style={{
                  background: `${study.accent}18`,
                  color: study.accent,
                  border: `1px solid ${study.accent}30`,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: study.accent,
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                />
                {h}
              </span>
            ))}
          </div>
        ) : null}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: study.accent }}
        >
          {expanded ? "Show less" : "The full story"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-5">
                <div>
                  <h4
                    className="font-semibold text-sm uppercase tracking-wider mb-2"
                    style={{ color: study.accent }}
                  >
                    The Challenge
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm uppercase tracking-wider mb-2"
                    style={{ color: study.accent }}
                  >
                    My Approach
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.approach}
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm uppercase tracking-wider mb-2"
                    style={{ color: study.accent }}
                  >
                    The Outcome
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Work Highlights
          </motion.p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold max-w-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            <RevealLine delay={0.1}>
              Results I&apos;ve{" "}
              <span className="gradient-text">driven.</span>
            </RevealLine>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Three roles that shaped how I think about selling, serving, and solving. Numbers
            tell part of the story—expand each card to read the rest.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
            Also: UC San Diego Product Management Club · Independent network deployments · Drone operations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
