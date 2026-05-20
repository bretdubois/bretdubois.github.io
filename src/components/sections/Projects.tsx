/* Hallmark · section: Technical Work
 * Asymmetric typographic list. No card grid, no left side-stripe,
 * no icon tiles, no highlight pill. Each project is an inline entry
 * with year/category as label, title, prose summary, and an expandable
 * detail block with optional code.
 */

"use client";

import { useState } from "react";
import { projects } from "@/data/projects";

function Project({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article
      style={{
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-xl)",
        borderTop:
          index === 0
            ? "var(--rule-fine) solid var(--color-ink)"
            : "var(--rule-hair) solid var(--color-rule)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 2fr)",
        gap: "var(--space-lg) var(--space-xl)",
      }}
      className="proj-row"
    >
      <header>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "var(--space-2xs)",
          }}
        >
          {project.category}
        </p>
        <h3
          className="display"
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-sm)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.02em",
          }}
        >
          {project.highlight}
        </p>
      </header>

      <div>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--lh-relaxed)",
            color: "var(--color-ink-2)",
            marginBottom: "var(--space-md)",
            maxWidth: "68ch",
          }}
        >
          {project.description}
        </p>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.02em",
            marginBottom: "var(--space-md)",
          }}
        >
          {project.tags.join(" · ")}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="tlink"
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            paddingBottom: "0.125rem",
            cursor: "pointer",
            fontSize: "var(--text-base)",
            fontFamily: "var(--font-body)",
          }}
          aria-expanded={expanded}
        >
          {expanded ? "Less" : "Read more"}
        </button>

        {expanded && (
          <div style={{ marginTop: "var(--space-md)" }}>
            <p
              style={{
                fontSize: "var(--text-base)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--color-ink-2)",
                whiteSpace: "pre-line",
                maxWidth: "68ch",
              }}
            >
              {project.details}
            </p>

            {project.codeSnippet && (
              <pre
                style={{
                  marginTop: "var(--space-md)",
                  padding: "var(--space-md)",
                  background: "var(--color-paper-2)",
                  border: "var(--rule-fine) solid var(--color-rule)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-ink)",
                  overflowX: "auto",
                  lineHeight: 1.6,
                }}
              >
                <code>{project.codeSnippet.code}</code>
              </pre>
            )}

            {project.links && project.links.length > 0 && (
              <div style={{ marginTop: "var(--space-md)" }}>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tlink"
                    style={{ fontSize: "var(--text-base)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .proj-row {
            grid-template-columns: 1fr !important;
            gap: var(--space-md) !important;
          }
        }
      `}</style>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="page-shell s-snug">
      <header style={{ marginBottom: "var(--space-md)", maxWidth: "60ch" }}>
        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-sm)",
          }}
        >
          Independent technical work.
        </h2>
        <p
          style={{
            fontSize: "var(--text-md)",
            color: "var(--color-muted)",
            maxWidth: "52ch",
          }}
        >
          End-to-end builds I&apos;ve done outside paid roles, from
          requirements through deployment and documentation. Expand each for
          the full technical story.
        </p>
      </header>

      {projects.map((project, i) => (
        <Project key={project.id} project={project} index={i} />
      ))}

      <p
        style={{
          marginTop: "var(--space-xl)",
          paddingTop: "var(--space-md)",
          borderTop: "var(--rule-hair) solid var(--color-rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.02em",
          color: "var(--color-muted)",
          maxWidth: "62ch",
        }}
      >
        These are personal and independent projects, not covered by NDAs.
        For professional work covered by NDA, see the case studies above or{" "}
        <a
          href="https://www.linkedin.com/in/bretdubois/"
          target="_blank"
          rel="noopener noreferrer"
          className="tlink-quiet"
        >
          connect on LinkedIn
        </a>
        .
      </p>
    </section>
  );
}
