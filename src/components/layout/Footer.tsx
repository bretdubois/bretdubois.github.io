"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp, viewportConfig } from "@/lib/animation";

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const links = [
  {
    icon: LinkedInIcon,
    label: "linkedin.com/in/bretdubois",
    href: "https://www.linkedin.com/in/bretdubois/",
  },
  {
    icon: GitHubIcon,
    label: "github.com/bretdubois",
    href: "https://github.com/bretdubois",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <motion.div
            className="flex flex-col gap-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xs font-display">
                BD
              </div>
              <span className="font-display font-semibold text-[var(--text-primary)]">
                Bret DuBois
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <MapPin size={13} />
              <span>Redwood City, CA</span>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} Bret DuBois. All rights reserved.</span>
          <span className="font-mono">
            Next.js · TypeScript · Tailwind · Framer Motion · R3F · GSAP
          </span>
        </div>
      </div>
    </footer>
  );
}
