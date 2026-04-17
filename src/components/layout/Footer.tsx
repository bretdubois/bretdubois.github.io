"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

import { fadeUp, viewportConfig } from "@/lib/animation";

const links = [
  { icon: Mail, label: "bretdubois1@gmail.com", href: "mailto:bretdubois1@gmail.com" },
  {
    icon: LinkedInIcon,
    label: "linkedin.com/in/bretdubois",
    href: "https://www.linkedin.com/in/bret-dubois/",
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
