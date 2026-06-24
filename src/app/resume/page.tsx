import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Calendar, ExternalLink } from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";
import { caseStudies, timeline } from "@/data/work";
import { projects } from "@/data/projects";
import { skillClusters } from "@/data/skills";

export const metadata: Metadata = {
  title: "Résumé · Bret DuBois · Solutions Engineer",
  description:
    "Résumé of Bret DuBois. Solutions Engineer / Customer Engineer / Technical Consultant. Technical sales, infrastructure, automation, and AI tooling.",
  alternates: { canonical: "/resume" },
};

// Reverse-chronological order for experience
const EXPERIENCE_ORDER = ["spothopper", "asurion", "apple"];
const experience = EXPERIENCE_ORDER.map(
  (id) => caseStudies.find((c) => c.id === id)!
).filter(Boolean);

// Earlier roles pulled from the timeline (not in the case studies)
const earlierRoles = [
  timeline.find((t) => t.title === "Technical Product Owner"),
  timeline.find((t) => t.title === "Network Engineering"),
].filter(Boolean) as NonNullable<(typeof timeline)[number]>[];

const education = [
  {
    degree: "B.S. Cognitive Science, Specialization in Design & Human-Computer Interaction",
    school: "University of California, San Diego",
    year: "2024",
  },
  {
    degree: "A.S. Computer & Information Science",
    school: "College of San Mateo",
    year: "2021",
  },
];

const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", year: "In Progress" },
  { name: "CCNA (Cisco Certified Network Associate)", year: "In Progress" },
  { name: "Cloud Computing Fundamentals, IBM", year: "2024" },
  { name: "Apple Certified iOS Technician (ACiT)", year: "2022" },
  { name: "Eagle Scout · Order of the Arrow, Boy Scouts of America", year: "2018" },
];

// Selected projects to feature on the résumé
const FEATURED_PROJECTS = [
  "ai-automation",
  "raspberry-pi",
  "unifi-network",
  "market-research-tools",
];
const featuredProjects = FEATURED_PROJECTS.map(
  (id) => projects.find((p) => p.id === id)!
).filter(Boolean);

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-3">{children}</p>;
}

export default function ResumePage() {
  return (
    <div className="resume-page min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* ── Top utility bar (hidden in print) ───────────── */}
      <div className="no-print sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="container-wide flex items-center justify-between h-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
          <PrintButton />
        </div>
      </div>

      <main className="container-wide max-w-4xl py-12 md:py-16">
        {/* ── Header ─────────────────────────────────────── */}
        <header className="resume-keeptogether">
          <h1
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Bret DuBois
          </h1>
          <p
            className="mt-2 font-display text-lg md:text-xl italic"
            style={{ color: "var(--accent)" }}
          >
            Solutions Engineer · Customer Engineer · Technical Consultant
          </p>

          <div
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} style={{ color: "var(--accent)" }} />
              Redwood City, CA · Open to remote &amp; hybrid
            </span>
            <a
              href="https://www.linkedin.com/in/bretdubois/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <ExternalLink size={14} style={{ color: "var(--accent)" }} />
              linkedin.com/in/bretdubois
            </a>
            <a
              href="https://calendly.com/bretdubois1/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <Calendar size={14} style={{ color: "var(--accent)" }} />
              Book a 30-min chat
            </a>
            <a
              href="mailto:bretdubois1@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <Mail size={14} style={{ color: "var(--accent)" }} />
              bretdubois1@gmail.com
            </a>
          </div>
        </header>

        <div className="resume-divider my-8" />

        {/* ── Summary ────────────────────────────────────── */}
        <section className="resume-keeptogether">
          <SectionLabel>Summary</SectionLabel>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Technical sales professional who builds the systems I sell against: a
            self-hosted AI/LLM and automation stack, network infrastructure, and data
            pipelines on my own hardware. I translate that depth into outcomes
            non-technical buyers can adopt and trust. Background spans enterprise (Apple),
            field technical consulting, and B2B SaaS, on a Cognitive Science /
            Human-Computer Interaction foundation. The core of Solutions Engineering,
            understanding a technical product deeply and translating it into customer
            value, has been the throughline of every role I&apos;ve had.
          </p>
        </section>

        <div className="resume-divider my-8" />

        {/* ── Experience ─────────────────────────────────── */}
        <section>
          <SectionLabel>Experience</SectionLabel>
          <div className="flex flex-col gap-5">
            {experience.map((job) => (
              <article key={job.id} className="resume-entry card resume-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3
                    className="font-display text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {job.company}
                    <span style={{ color: "var(--accent)" }}> · {job.role}</span>
                  </h3>
                  <span
                    className="font-mono text-xs whitespace-nowrap"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {job.period}
                  </span>
                </div>
                <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {job.location}
                </p>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {job.summary}
                </p>

                {job.metrics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs"
                        style={{ background: "var(--bg-alt)", color: "var(--text-secondary)" }}
                      >
                        <span className="font-mono font-semibold" style={{ color: "var(--accent)" }}>
                          {m.prefix ?? ""}
                          {m.value}
                          {m.suffix ?? ""}
                        </span>
                        {m.label}
                      </span>
                    ))}
                  </div>
                )}

                {job.highlights && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-sm leading-snug"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span style={{ color: "var(--accent)" }} className="mt-1 flex-shrink-0">
                          ▸
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Earlier roles, compact */}
          {earlierRoles.length > 0 && (
            <div className="mt-5 resume-entry card resume-card p-5">
              <h3
                className="font-display text-base font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Earlier
              </h3>
              <div className="flex flex-col gap-3">
                {earlierRoles.map((r) => (
                  <div key={r.title} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <div className="min-w-0">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {r.title}
                      </span>
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {" "}
                        · {r.company}
                      </span>
                    </div>
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      {r.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="resume-divider my-8" />

        {/* ── Selected projects ──────────────────────────── */}
        <section>
          <SectionLabel>Selected Projects</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <article key={p.id} className="resume-entry card resume-card p-4">
                <h3
                  className="font-display text-base font-semibold leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.title}
                </h3>
                <p className="font-mono text-[0.7rem] mt-1" style={{ color: "var(--accent)" }}>
                  {p.category}
                </p>
                <p className="mt-2 text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="resume-divider my-8" />

        {/* ── Skills ─────────────────────────────────────── */}
        <section className="resume-keeptogether">
          <SectionLabel>Skills</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillClusters.map((cluster) => (
              <div key={cluster.id} className="resume-entry">
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: cluster.accent }}
                >
                  {cluster.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.skills.map((s) => (
                    <span key={s.name} className="tag">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="resume-divider my-8" />

        {/* ── Education + Certifications ──────────────────── */}
        <section className="resume-keeptogether grid gap-8 md:grid-cols-2">
          <div>
            <SectionLabel>Education</SectionLabel>
            <div className="flex flex-col gap-4">
              {education.map((e) => (
                <div key={e.degree}>
                  <p className="text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
                    {e.degree}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {e.school} · {e.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Certifications &amp; Awards</SectionLabel>
            <ul className="flex flex-col gap-2">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>{c.name}</span>
                  <span
                    className="font-mono text-xs whitespace-nowrap"
                    style={{ color: c.year === "In Progress" ? "var(--gold)" : "var(--accent)" }}
                  >
                    {c.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Footer note ────────────────────────────────── */}
        <div className="mt-12 text-center">
          <div className="divider mx-auto" />
          <p
            className="mt-5 font-mono text-xs uppercase no-print"
            style={{ color: "var(--text-muted)", letterSpacing: "0.18em" }}
          >
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              bretdubois.github.io
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
