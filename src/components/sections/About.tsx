/* Hallmark · section: Background
 * Inline timeline. Year + title + description as a single typographic
 * row. No cards inside the timeline (card-in-card removed), no logos,
 * no scroll-linked GSAP, no per-entry hover lift.
 */

import { timeline } from "@/data/work";

export default function About() {
  return (
    <section id="about" className="page-shell s-snug">
      <header
        style={{
          marginBottom: "var(--space-2xl)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
          gap: "var(--space-2xl)",
          alignItems: "end",
        }}
        className="about-header"
      >
        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
          }}
        >
          Built for the
          <br />
          <span className="serif-italic" style={{ color: "var(--color-accent)" }}>
            technical middle.
          </span>
        </h2>
        <p
          style={{
            fontSize: "var(--text-md)",
            lineHeight: "var(--lh-normal)",
            color: "var(--color-ink-2)",
            maxWidth: "56ch",
          }}
        >
          I sit between engineering and sales. Engineers tend to think
          I&apos;m too sales-flavored; sales reps tend to think I&apos;m too
          technical. In pre-sales work that gap is the seat. The job is to
          take a customer&apos;s actual environment, map it to the
          product&apos;s architecture, walk through the real tradeoffs in
          plain language, and stay in the room until the integration runs.
        </p>
      </header>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: "var(--rule-fine) solid var(--color-ink)",
        }}
      >
        {timeline.map((item, i) => (
          <li
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "5.5rem minmax(0, 1fr)",
              gap: "var(--space-lg)",
              paddingTop: "var(--space-md)",
              paddingBottom: "var(--space-md)",
              borderBottom: "var(--rule-hair) solid var(--color-rule)",
              alignItems: "baseline",
            }}
          >
            <span
              className="nums-tabular"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                color: "var(--color-accent)",
                letterSpacing: "0.04em",
              }}
            >
              {item.year}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-md)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-3xs)",
                }}
              >
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="tlink-quiet">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-muted)",
                  marginBottom: "var(--space-2xs)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.02em",
                }}
              >
                {item.company}
              </p>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  lineHeight: "var(--lh-normal)",
                  color: "var(--color-ink-2)",
                  maxWidth: "68ch",
                }}
              >
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p
        style={{
          marginTop: "var(--space-xl)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--color-muted)",
        }}
      >
        B.S. Cognitive Science + HCI, UCSD &nbsp;·&nbsp; A.S. Computer Science, CSM &nbsp;·&nbsp; Eagle Scout
      </p>

      <style>{`
        @media (max-width: 768px) {
          .about-header {
            grid-template-columns: 1fr !important;
            gap: var(--space-md) !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}
