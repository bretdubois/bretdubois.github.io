"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { RevealLine } from "@/components/ui/TextReveal";

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { staggerContainer, fadeUp, scaleUp, viewportConfig } from "@/lib/animation";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "bretdubois1@gmail.com",
    href: "mailto:bretdubois1@gmail.com",
    cta: "Send an email",
    accent: "#C2410C",
    description: "Best for professional inquiries",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/bret-dubois",
    href: "https://www.linkedin.com/in/bret-dubois/",
    cta: "Connect",
    accent: "#0077B5",
    description: "Let's connect professionally",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(650) 400-0490",
    href: "tel:+16504000490",
    cta: "Call or text",
    accent: "#15803D",
    description: "Available for quick conversations",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[var(--bg-alt)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #C2410C 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-32 -left-24 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #D97706 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Let&apos;s Connect
          </motion.p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            <RevealLine delay={0.1}>
              I&apos;d love to{" "}
              <em className="gradient-text not-italic">talk.</em>
            </RevealLine>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl mx-auto text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Whether you&apos;re a recruiter with a role that needs a hybrid thinker, an
            engineer who wants to trade notes on drones and networks, or a designer who
            appreciates a portfolio that practices what it preaches—I&apos;m always up for
            a good conversation.
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <MapPin size={14} />
              <span>Based in Redwood City, CA · Open to remote &amp; hybrid roles</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          className="grid gap-5 md:grid-cols-3 max-w-3xl mx-auto mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={scaleUp}
                className="card p-6 flex flex-col gap-3 group"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${method.accent}18` }}
                >
                  <Icon size={20} style={{ color: method.accent }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {method.label}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {method.description}
                  </div>
                </div>
                <div className="font-mono text-xs break-all" style={{ color: method.accent }}>
                  {method.value}
                </div>
                <div
                  className="flex items-center gap-1 text-sm font-medium mt-auto transition-gap"
                  style={{ color: method.accent }}
                >
                  {method.cta}
                  <ExternalLink size={12} className="opacity-70" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          className="text-center max-w-lg mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <div className="divider mx-auto mb-6" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="font-display italic text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            &ldquo;The best technology disappears—what remains is the outcome it enabled
            and the trust it built.&rdquo;
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            — Bret DuBois · Redwood City, CA
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
