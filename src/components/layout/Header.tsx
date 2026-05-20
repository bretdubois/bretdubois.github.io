"use client";

import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

/* Hallmark · nav: N6 Newspaper masthead
 * Centered wordmark · issue/date line above · inline link row below ·
 * double rule below the whole thing. No sticky-blur, no CTA pill.
 */

const navLinks = [
  { label: "How I Work", href: "#how-i-work" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function formatIssueDate(): string {
  const d = new Date();
  return d
    .toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase()
    .replace(/,/g, "");
}

export default function Header() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  const [issueDate, setIssueDate] = useState<string>("");

  // Set issue date only on client to avoid hydration mismatch
  useEffect(() => {
    setIssueDate(formatIssueDate());
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  return (
    <header className="page-shell" style={{ paddingTop: "var(--space-md)" }}>
      {/* Issue / date line */}
      <div
        className="rule-double nums-tabular"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "var(--space-md)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--color-muted)",
        }}
      >
        <span>Vol. I &nbsp;·&nbsp; No. 26 &nbsp;·&nbsp; A Portfolio in Long Form</span>
        <span style={{ display: "flex", alignItems: "baseline", gap: "var(--space-sm)" }}>
          <span>{issueDate || " "}</span>
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.25rem",
              height: "1.25rem",
              background: "transparent",
              border: "none",
              color: "var(--color-muted)",
              cursor: "pointer",
              padding: 0,
              transition: "color var(--dur-short) var(--ease-out)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
          >
            {dark ? <Sun size={13} aria-hidden /> : <Moon size={13} aria-hidden />}
          </button>
        </span>
      </div>

      {/* Centered wordmark */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "var(--space-lg)",
          paddingBottom: "var(--space-sm)",
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            letterSpacing: "var(--tracking-display)",
            color: "var(--color-ink)",
            lineHeight: 1,
          }}
        >
          Bret DuBois
        </a>
        <div
          className="serif-italic"
          style={{
            marginTop: "var(--space-2xs)",
            fontSize: "var(--text-sm)",
            color: "var(--color-muted)",
          }}
        >
          A working record, not a marketing site.
        </div>
      </div>

      {/* Inline link row */}
      <nav
        aria-label="Sections"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--space-md)",
          paddingBottom: "var(--space-xs)",
          borderBottom: "var(--rule-fine) solid var(--color-ink)",
          borderTop: "var(--rule-hair) solid var(--color-rule)",
          paddingTop: "var(--space-2xs)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="tlink-quiet"
            style={{ whiteSpace: "nowrap" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
