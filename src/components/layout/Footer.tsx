/* Hallmark · footer: Ft4 Dense typographic colophon
 * One large block of editorial credits in monospace, ragged-right.
 * No icons, no link columns, no social row.
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="page-shell s-tight">
      <div
        className="rule"
        style={{
          paddingTop: "var(--space-lg)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          lineHeight: 1.7,
          letterSpacing: "0.02em",
          color: "var(--color-muted)",
          textTransform: "uppercase",
          maxWidth: "62ch",
        }}
      >
        <p>
          <span style={{ color: "var(--color-ink)" }}>Colophon.</span> Set in
          Hanken Grotesk &amp; Newsreader; mono accents in IBM Plex Mono. Built
          with Next.js and Tailwind CSS v4, statically exported to GitHub
          Pages. Design language follows Hallmark · Almanac. Source available
          at{" "}
          <a
            href="https://github.com/bretdubois/bretdubois.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="tlink-quiet"
          >
            github.com/bretdubois/bretdubois.github.io
          </a>
          .
        </p>
        <p style={{ marginTop: "var(--space-md)" }}>
          Bret DuBois, Redwood City, California. Reach out via{" "}
          <a
            href="https://www.linkedin.com/in/bretdubois/"
            target="_blank"
            rel="noopener noreferrer"
            className="tlink-quiet"
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a
            href="https://calendly.com/bretdubois1/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="tlink-quiet"
          >
            Calendly
          </a>
          . MIT licensed. &copy; {year}.
        </p>
      </div>
    </footer>
  );
}
