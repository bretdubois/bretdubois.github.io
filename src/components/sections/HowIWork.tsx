/* Hallmark · section: How I Work
 * Single-column ordinal narrative. The numbers are genuinely sequential
 * (Long Document / Manifesto eyebrow rule applies). No icon tiles,
 * no equal-column grid, no card uniformity.
 */

const steps = [
  {
    number: "1.0",
    title: "Diagnose the actual problem.",
    body: "Customers describe symptoms. I map those to root causes: architecture gaps, workflow breakdowns, integration failures. The real requirement is usually different from the stated one. Surfacing that early is where solutions engineering earns its keep.",
  },
  {
    number: "2.0",
    title: "Architect the fit.",
    body: "I scope what the product can do, what it can't, and what the integration looks like end-to-end. Tradeoffs documented, not hidden. The right solution isn't always the most technically impressive one. It's the one the customer can actually operate.",
  },
  {
    number: "3.0",
    title: "Build and demonstrate.",
    body: "PoCs, live configurations, and demos scoped to the customer's specific question, not canned walkthroughs. If it needs to be built to be understood, I build it. If it can be shown in the customer's own environment, even better.",
  },
  {
    number: "4.0",
    title: "Document and hand off clean.",
    body: "Technical specs, network diagrams, runbooks, and integration notes that make the customer successful without me in the room. A good handoff is part of the solution, not an afterthought.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="page-shell s-snug">
      <header style={{ marginBottom: "var(--space-2xl)", maxWidth: "52ch" }}>
        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-sm)",
          }}
        >
          How I work.
        </h2>
        <p
          style={{
            fontSize: "var(--text-md)",
            color: "var(--color-muted)",
            maxWidth: "48ch",
          }}
        >
          A four-stage motion. The same shape on every pre-sales or
          technical engagement, from first call to final handoff.
        </p>
      </header>

      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {steps.map((step, i) => (
          <li
            key={step.number}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(3.5rem, 5rem) 1fr",
              gap: "var(--space-md)",
              paddingTop: "var(--space-lg)",
              paddingBottom: "var(--space-lg)",
              borderTop:
                i === 0
                  ? "var(--rule-fine) solid var(--color-ink)"
                  : "var(--rule-hair) solid var(--color-rule)",
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
                paddingTop: "0.35rem",
              }}
            >
              {step.number}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-xl)",
                  letterSpacing: "var(--tracking-tight)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-2xs)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "var(--color-ink-2)",
                  lineHeight: "var(--lh-normal)",
                  maxWidth: "62ch",
                }}
              >
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
