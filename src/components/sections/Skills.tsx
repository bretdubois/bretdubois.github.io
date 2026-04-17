"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Cpu, Code2, Wifi, Layers, ChevronDown, ChevronUp
} from "lucide-react";
import { staggerContainer, fadeUp, scaleUp, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";
import { skillClusters } from "@/data/skills";

const iconMap: Record<string, typeof TrendingUp> = {
  TrendingUp,
  Cpu,
  Code2,
  Wifi,
  Layers,
};

const levelConfig = {
  core:      { label: "Core", width: "100%",  opacity: 1 },
  proficient:{ label: "Proficient", width: "70%", opacity: 0.85 },
  familiar:  { label: "Familiar", width: "45%", opacity: 0.65 },
};

function SkillClusterCard({
  cluster,
  isOpen,
  onToggle,
}: {
  cluster: typeof skillClusters[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[cluster.icon] || Layers;

  return (
    <motion.div variants={scaleUp} className="card overflow-hidden">
      {/* Header — always visible, clickable */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4 group"
      >
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          style={{ background: `${cluster.accent}20` }}
        >
          <Icon size={20} style={{ color: cluster.accent }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className="font-display font-semibold text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              {cluster.title}
            </h3>
            <span
              className="flex-shrink-0 transition-colors"
              style={{ color: cluster.accent }}
            >
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            {cluster.description}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-xs font-mono" style={{ color: cluster.accent }}>
              {cluster.skills.length} skills
            </span>
            <div className="flex gap-0.5">
              {cluster.skills.slice(0, 5).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: cluster.accent, opacity: 0.6 - i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded skills */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-2 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex flex-col gap-2.5">
                {cluster.skills.map((skill) => {
                  const level = skill.level ?? "proficient";
                  const cfg = levelConfig[level];
                  return (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {skill.name}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: cluster.accent, opacity: 0.75 }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ background: `${cluster.accent}20` }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: cluster.accent, opacity: cfg.opacity }}
                          initial={{ width: 0 }}
                          animate={{ width: cfg.width }}
                          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  const [openId, setOpenId] = useState<string | null>("sales");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="skills" className="section-padding">
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
            Expertise
          </motion.p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold max-w-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            <RevealLine delay={0.1}>
              What I bring{" "}
              <span className="gradient-text">to the table.</span>
            </RevealLine>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Five distinct skill clusters—each one real, each one earned. Click any to
            see what&apos;s inside.
          </motion.p>
        </motion.div>

        {/* Clusters grid */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {skillClusters.map((cluster) => (
            <SkillClusterCard
              key={cluster.id}
              cluster={cluster}
              isOpen={openId === cluster.id}
              onToggle={() => toggle(cluster.id)}
            />
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h3
            variants={fadeUp}
            className="font-display text-2xl font-semibold mb-6 text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Certifications & Credentials
          </motion.h3>
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { name: "Cloud Computing Fundamentals", org: "IBM", year: "2024", status: "Earned" },
              { name: "AWS Solutions Architect – Associate", org: "Amazon", year: "2025", status: "In Progress" },
              { name: "Apple Certified iOS Technician (ACiT)", org: "Apple", year: "2022", status: "Earned" },
              { name: "Eagle Scout", org: "Boy Scouts of America", year: "2018", status: "Earned" },
            ].map((cert) => (
              <motion.div
                key={cert.name}
                variants={scaleUp}
                className="card p-4 text-center max-w-[200px]"
              >
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ color: cert.status === "In Progress" ? "var(--gold)" : "var(--accent)" }}
                >
                  {cert.status === "In Progress" ? "🔄 In Progress" : "✓ " + cert.year}
                </div>
                <div className="font-medium text-sm leading-snug" style={{ color: "var(--text-primary)" }}>
                  {cert.name}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {cert.org}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
