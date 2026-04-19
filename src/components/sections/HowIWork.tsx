"use client";

import { motion } from "framer-motion";
import { Search, GitMerge, Terminal, FileText } from "lucide-react";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnose the actual problem",
    description:
      "Customers describe symptoms. I map those to root causes—architecture gaps, workflow breakdowns, integration failures. The real requirement is usually different from the stated one, and surfacing that early is where solutions engineering earns its keep.",
  },
  {
    number: "02",
    icon: GitMerge,
    title: "Architect the fit",
    description:
      "I scope what the product can do, what it can't, and what the integration looks like end-to-end. Tradeoffs documented, not hidden. The right solution isn't always the most technically impressive one—it's the one the customer can actually operate.",
  },
  {
    number: "03",
    icon: Terminal,
    title: "Build and demonstrate",
    description:
      "PoCs, live configurations, and demos scoped to the customer's specific question—not canned walkthroughs. If it needs to be built to be understood, I build it. If it can be shown in the customer's own environment, even better.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Document and hand off clean",
    description:
      "Technical specs, network diagrams, runbooks, and integration notes that make the customer successful without me in the room. A good handoff is part of the solution, not an afterthought.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            How I Work
          </motion.p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold max-w-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            <RevealLine delay={0.1}>
              From requirement to{" "}
              <span className="gradient-text">working solution.</span>
            </RevealLine>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            What I do in every pre-sales and technical engagement—from first call to
            final handoff.
          </motion.p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative flex flex-col gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                style={{ transition: "border-color 0.2s" }}
              >
                {/* Step number — large, muted, top-right */}
                <span
                  className="absolute top-4 right-5 font-mono font-bold select-none"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "var(--border)",
                    letterSpacing: "-0.04em",
                  }}
                  aria-hidden
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent)", opacity: 1 }}
                >
                  <Icon size={20} color="#FAF7F2" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 pr-8">
                  <h3
                    className="font-display font-bold text-lg leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connector line — hidden on last item and on mobile */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-[2.75rem] -right-3 w-6 h-px"
                    style={{ background: "var(--border)" }}
                    aria-hidden
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
