/* Hallmark · macrostructure: Stat-Led
 * The giant number is the hero. Everything that follows supports or
 * qualifies it. Biased left, NOT 100svh, NO WebGL, NO gradient text,
 * NO CTA pill (typographic link instead).
 */

export default function Hero() {
  return (
    <section
      id="top"
      className="page-shell"
      style={{
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      {/* Eyebrow: short location/role line */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: "var(--space-sm)",
        }}
      >
        Redwood City, CA &nbsp;·&nbsp; Open to remote &amp; hybrid
      </p>

      {/* The giant number */}
      <div
        className="reveal nums-tabular"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "var(--text-stat)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: "var(--color-ink)",
          marginBottom: "var(--space-md)",
        }}
      >
        300+
      </div>

      {/* Qualifier: what the number measures */}
      <p
        style={{
          maxWidth: "44ch",
          fontSize: "var(--text-lg)",
          lineHeight: "var(--lh-snug)",
          color: "var(--color-ink-2)",
          marginBottom: "var(--space-xl)",
        }}
      >
        Consecutive perfect satisfaction scores at Apple&apos;s Genius Bar.
        Three years of hardware and software triage in 15&ndash;30 minute
        windows, communicating root-cause findings to non-technical customers.
        The same discipline a Solutions Engineer&apos;s discovery call
        requires, practiced at retail volume.
      </p>

      {/* Positioning paragraph: what I do now */}
      <p
        className="serif-italic"
        style={{
          maxWidth: "52ch",
          fontSize: "var(--text-xl)",
          lineHeight: 1.35,
          color: "var(--color-neutral)",
          marginBottom: "var(--space-xl)",
        }}
      >
        Now doing pre-sales technical work for infrastructure, AI tooling, and
        B2B SaaS. Same discipline. Different scale.
      </p>

      {/* Typographic CTA + secondary link */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "var(--space-lg)",
          fontSize: "var(--text-md)",
        }}
      >
        <a
          href="https://calendly.com/bretdubois1/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="cta"
        >
          Book a 30-minute call
          <span aria-hidden>&rarr;</span>
        </a>
        <a
          href="https://www.linkedin.com/in/bretdubois/"
          target="_blank"
          rel="noopener noreferrer"
          className="tlink"
        >
          or connect on LinkedIn
        </a>
      </div>
    </section>
  );
}
