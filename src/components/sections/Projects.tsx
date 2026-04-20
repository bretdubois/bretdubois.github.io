"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Network, Layers, Code2, TrendingUp, Cpu, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { staggerContainer, fadeUp, scaleUp, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";
import { projects } from "@/data/projects";

const iconMap: Record<string, typeof Radio> = {
  drone: Radio,
  network: Network,
  product: Layers,
  code: Code2,
  finance: TrendingUp,
  pi: Cpu,
  web: Globe,
};

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-[var(--border)]">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]"
        style={{ background: "var(--dark-surface, #231A15)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs font-mono text-stone-400">{language}</span>
      </div>
      <pre
        className="overflow-x-auto text-xs p-4 font-mono leading-relaxed"
        style={{ background: "#1A1210", color: "#D4C5B5" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[project.icon] || Code2;

  return (
    <motion.article variants={scaleUp} className="card overflow-hidden group">
      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
        style={{ background: project.accent }}
      />

      <div className="p-6 pl-7">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${project.accent}18` }}
          >
            <Icon size={20} style={{ color: project.accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="section-label text-xs mb-1 block" style={{ color: project.accent }}>
              {project.category}
            </span>
            <h3
              className="font-display text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Highlight badge */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${project.accent}15`, color: project.accent }}
          >
            ✦ {project.highlight}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: project.accent }}
        >
          {expanded ? "Show less" : "Read more + code"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {project.details}
                </p>

                {/* All tags when expanded */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Code snippet */}
                {project.codeSnippet && (
                  <CodeBlock
                    language={project.codeSnippet.language}
                    code={project.codeSnippet.code}
                  />
                )}

                {/* External links */}
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                        style={{ color: project.accent }}
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[var(--bg-alt)]">
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
            Technical Work
          </motion.p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold max-w-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            <RevealLine delay={0.1}>
              Projects that prove{" "}
              <span className="gradient-text">depth.</span>
            </RevealLine>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Independent technical work that shows how I approach a problem end-to-end—from
            requirements through deployment and documentation. Expand any card for the full technical story.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>

        {/* Bottom context */}
        <motion.div
          className="mt-12 p-6 rounded-2xl border border-[var(--border)] text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{ background: "var(--surface)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            These are personal and independent projects—not covered by NDAs. For a fuller picture of
            professional work, see the case studies above or{" "}
            <a
              href="https://www.linkedin.com/in/bretdubois/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors"
              style={{ color: "var(--accent)" }}
            >
              connect on LinkedIn.
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
