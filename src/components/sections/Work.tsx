/* Hallmark · section: Work Highlights
 * Stacked editorial case studies. No grid, no card with side-stripe,
 * no animated counters. Each case study is an inline article with
 * heading, summary, metrics inline, and expandable detail.
 */

"use client";

import { useState } from "react";
import { caseStudies } from "@/data/work";

function CaseStudy({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article
      style={{
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
        borderTop:
          index === 0
            ? "var(--rule-fine) solid var(--color-ink)"
            : "var(--rule-hair) solid var(--color-rule)",
      }}
    >
      <header style={{ marginBottom: "var(--space-md)" }}>
        <p
          className="nums-tabular"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: "var(--space-2xs)",
          }}
        >
          {study.period} &nbsp;·&nbsp; {study.location}
        </p>
        <h3
          className="display"
          style={{
            fontSize: "var(--text-2xl)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-3xs)",
          }}
        >
          {study.company}
        </h3>
        <p
          className="serif-italic"
          style={{
            fontSize: "var(--text-md)",
            color: "var(--color-accent)",
          }}
        >
          {study.role}
        </p>
      </header>

      <p
        style={{
          fontSize: "var(--text-md)",
          lineHeight: "var(--lh-relaxed)",
          color: "var(--color-ink-2)",
          maxWidth: "68ch",
          marginBottom: "var(--space-md)",
        }}
      >
        {study.summary}
      </p>

      {study.metrics.length > 0 && (
        <dl
          className="nums-tabular"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-xl) var(--space-2xl)",
            margin: "var(--space-md) 0 var(--space-md)",
            paddingTop: "var(--space-md)",
            borderTop: "var(--rule-hair) solid var(--color-rule)",
          }}
        >
          {study.metrics.map((m, i) => (
            <div key={i} style={{ minWidth: "12rem" }}>
              <dt
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  marginBottom: "var(--space-3xs)",
                }}
              >
                {m.label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-3xl)",
                  color: "var(--color-ink)",
                  margin: 0,
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                {m.prefix ?? ""}
                {m.value}
                {m.suffix ?? ""}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {study.highlights && study.highlights.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "var(--space-md) 0",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2xs)",
          }}
        >
          {study.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                paddingLeft: "var(--space-md)",
                color: "var(--color-ink-2)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--lh-snug)",
                maxWidth: "68ch",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  top: "0.4em",
                  width: "0.5rem",
                  height: "1px",
                  background: "var(--color-accent)",
                }}
              />
              {h}
            </li>
          ))}
        </ul>
      )}

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
        {expanded ? "Less" : "The full story"}
      </button>

      {expanded && (
        <div style={{ marginTop: "var(--space-lg)" }}>
          <Block label="The challenge" body={study.challenge} />
          <Block label="My approach" body={study.approach} />
          <Block label="The outcome" body={study.outcome} />
        </div>
      )}
    </article>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div style={{ marginBottom: "var(--space-md)", maxWidth: "68ch" }}>
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
        {label}
      </p>
      <p
        style={{
          fontSize: "var(--text-base)",
          lineHeight: "var(--lh-normal)",
          color: "var(--color-ink-2)",
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="page-shell s-snug">
      <header style={{ marginBottom: "var(--space-md)", maxWidth: "60ch" }}>
        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-sm)",
          }}
        >
          Three roles, one through-line.
        </h2>
        <p
          style={{
            fontSize: "var(--text-md)",
            color: "var(--color-muted)",
            maxWidth: "52ch",
          }}
        >
          Each shaped the technical instincts, communication depth, and
          customer focus a Solutions Engineer needs. Expand each to read
          the full story.
        </p>
      </header>

      {caseStudies.map((study, i) => (
        <CaseStudy key={study.id} study={study} index={i} />
      ))}
    </section>
  );
}
