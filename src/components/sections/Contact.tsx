/* Hallmark · section: Contact
 * Typographic statement, not a card grid. No aurora-blob radial gradients,
 * no icon tiles, no 2-up grid. One sentence that names what to do, with
 * the actual links exposed inline.
 */

export default function Contact() {
  return (
    <section id="contact" className="page-shell s-wide">
      <div
        style={{
          maxWidth: "60ch",
          borderTop: "var(--rule-fine) solid var(--color-ink)",
          paddingTop: "var(--space-xl)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "var(--space-md)",
          }}
        >
          Get in touch
        </p>

        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-lg)",
            maxWidth: "16ch",
          }}
        >
          The shortest path is a call.
        </h2>

        <p
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--lh-relaxed)",
            color: "var(--color-ink-2)",
            marginBottom: "var(--space-xl)",
          }}
        >
          The fastest way to talk is a 30-minute slot at{" "}
          <a
            href="https://calendly.com/bretdubois1/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="tlink"
          >
            calendly.com/bretdubois1/30min
          </a>
          . If you prefer asynchronous, the professional record lives on{" "}
          <a
            href="https://www.linkedin.com/in/bretdubois/"
            target="_blank"
            rel="noopener noreferrer"
            className="tlink"
          >
            LinkedIn
          </a>
          .
        </p>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            lineHeight: 1.8,
          }}
        >
          Targeting <span style={{ color: "var(--color-ink)" }}>Solutions Engineer</span>,{" "}
          <span style={{ color: "var(--color-ink)" }}>Customer Engineer</span>, and{" "}
          <span style={{ color: "var(--color-ink)" }}>Technical Consultant</span> roles
          at infrastructure, AI tooling, and technical B2B SaaS companies.
          <br />
          Redwood City, California. Open to remote and hybrid.
        </p>
      </div>
    </section>
  );
}
