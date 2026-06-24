"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Plug, Compass, ArrowLeftRight, FileCheck2 } from "lucide-react";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";

const bullets = [
  {
    icon: Cpu,
    title: "Diagnostics under pressure, at Apple's scale",
    description:
      "Three years of 15–30 minute triage windows, 300+ perfect satisfaction scores (100/100). Diagnosing root causes on a clock while keeping the customer confident is the same skill an SE discovery call needs, just in a retail frame.",
  },
  {
    icon: Wifi,
    title: "I've deployed real networks end-to-end",
    description:
      "Physical gear, real buildings, real clients: site survey, VLAN segmentation, AP placement, client runbook. Not lab configs. I know what inter-VLAN firewall rules look like and why double-NAT is sometimes the right call.",
  },
  {
    icon: Plug,
    title: "I know what 'can this integrate?' actually means",
    description:
      "I've built the automation myself: webhooks, API ingestion, LLM classification, HubSpot output. When a prospect asks whether a product connects to their stack, I'm not guessing.",
  },
  {
    icon: Compass,
    title: "Discovery before product, every time",
    description:
      "At SpotHopper the first call was never a product screen. It was requirements: their pain, what they'd tried, what a win looks like. Generic demos fail because they skip this.",
  },
  {
    icon: ArrowLeftRight,
    title: "I translate between technical teams and non-technical buyers",
    description:
      "I've explained VLANs to a restaurant owner and firmware to a retired teacher. Bridging 'what the system does' and 'what the customer needs to hear' has been the job at Apple, Asurion, and every deployment.",
  },
  {
    icon: FileCheck2,
    title: "I document clean handoffs",
    description:
      "Every deployment ends with a runbook; every automation is documented. An undocumented solution is just a permanent dependency on me, so documentation became part of the work.",
  },
];

export default function WhySE() {
  return (
    <section id="why-se" className="section-padding bg-[var(--bg-alt)]">
      <div className="container-wide">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 lg:items-start">

          {/* Left: heading */}
          <motion.div
            className="lg:col-span-2 mb-12 lg:mb-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.p variants={fadeUp} className="section-label mb-3">
              The Case
            </motion.p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              <RevealLine delay={0.1}>
                Why I&apos;m a strong{" "}
                <em style={{ color: "var(--accent)" }}>Solutions Engineer.</em>
              </RevealLine>
            </h2>
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Specific evidence. No generic claims.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              The roles below don&apos;t have &ldquo;Solutions Engineer&rdquo; in the title.
              These bullets are why that doesn&apos;t matter.
            </motion.p>
          </motion.div>

          {/* Right: bullets */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {bullets.map((bullet, i) => {
              const Icon = bullet.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "var(--accent)", opacity: 0.95 }}
                  >
                    <Icon size={16} color="#FAF7F2" />
                  </div>
                  <div>
                    <div
                      className="font-display font-bold text-base mb-1 leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {bullet.title}
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {bullet.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
