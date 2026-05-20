/* Hallmark · section: Expertise
 * Vertical list of clusters. Each cluster is a row: title + one-line
 * description + skills as comma-separated typography. No card grid,
 * no icon tiles, no level bars, no cert cards.
 */

import { skillClusters } from "@/data/skills";

const certs = [
  { name: "Cloud Computing Fundamentals", org: "IBM", year: "2024" },
  { name: "Apple Certified iOS Technician (ACiT)", org: "Apple", year: "2022" },
  { name: "Eagle Scout", org: "Boy Scouts of America", year: "2018" },
];

export default function Skills() {
  return (
    <section id="skills" className="page-shell s-snug">
      <header style={{ marginBottom: "var(--space-xl)", maxWidth: "60ch" }}>
        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-sm)",
          }}
        >
          What I bring.
        </h2>
        <p
          style={{
            fontSize: "var(--text-md)",
            color: "var(--color-muted)",
          }}
        >
          Five clusters. Networks first, customer-facing last. Each name
          below is a specific named capability, not a buzzword group.
        </p>
      </header>

      <dl style={{ margin: 0, borderTop: "var(--rule-fine) solid var(--color-ink)" }}>
        {skillClusters.map((cluster) => (
          <div
            key={cluster.id}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2.4fr)",
              gap: "var(--space-lg)",
              paddingTop: "var(--space-md)",
              paddingBottom: "var(--space-md)",
              borderBottom: "var(--rule-hair) solid var(--color-rule)",
              alignItems: "baseline",
            }}
            className="skill-row"
          >
            <dt>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-md)",
                  color: "var(--color-ink)",
                  letterSpacing: "var(--tracking-tight)",
                  marginBottom: "var(--space-3xs)",
                }}
              >
                {cluster.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-muted)",
                  lineHeight: "var(--lh-snug)",
                  maxWidth: "32ch",
                }}
              >
                {cluster.description}
              </p>
            </dt>
            <dd
              style={{
                margin: 0,
                color: "var(--color-ink-2)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--lh-relaxed)",
              }}
            >
              {cluster.skills.map((skill, i) => (
                <span key={skill.name}>
                  <span
                    style={{
                      fontWeight: skill.level === "core" ? 500 : 400,
                      color:
                        skill.level === "core"
                          ? "var(--color-ink)"
                          : skill.level === "familiar"
                          ? "var(--color-muted)"
                          : "var(--color-ink-2)",
                    }}
                  >
                    {skill.name}
                  </span>
                  {i < cluster.skills.length - 1 && (
                    <span style={{ color: "var(--color-rule-2)" }}> &middot; </span>
                  )}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      {/* Legend */}
      <p
        style={{
          marginTop: "var(--space-md)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.02em",
          color: "var(--color-muted)",
        }}
      >
        <span style={{ color: "var(--color-ink)", fontWeight: 500 }}>Bold</span> = core
        &nbsp;·&nbsp; default weight = proficient &nbsp;·&nbsp; muted = familiar
      </p>

      {/* Certifications: inline list, not cards */}
      <div style={{ marginTop: "var(--space-2xl)", maxWidth: "62ch" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "var(--space-sm)",
          }}
        >
          Certifications &amp; credentials
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {certs.map((cert) => (
            <li
              key={cert.name}
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                alignItems: "baseline",
                fontSize: "var(--text-base)",
                color: "var(--color-ink-2)",
                paddingTop: "var(--space-2xs)",
                paddingBottom: "var(--space-2xs)",
              }}
            >
              <span
                className="nums-tabular"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-muted)",
                  minWidth: "3rem",
                }}
              >
                {cert.year}
              </span>
              <span>
                <span style={{ color: "var(--color-ink)" }}>{cert.name}</span>
                <span style={{ color: "var(--color-muted)" }}> &middot; {cert.org}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skill-row {
            grid-template-columns: 1fr !important;
            gap: var(--space-sm) !important;
          }
        }
      `}</style>
    </section>
  );
}
