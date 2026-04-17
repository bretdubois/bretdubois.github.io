"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, TrendingUp, GraduationCap, Wrench } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";
import { timeline, type TimelineItem } from "@/data/work";

gsap.registerPlugin(ScrollTrigger);

const typeConfig: Record<TimelineItem["type"], { icon: typeof Code2; color: string; label: string }> = {
  maker:     { icon: Wrench,       color: "#C2410C", label: "Maker" },
  sales:     { icon: TrendingUp,   color: "#B45309", label: "Sales & GTM" },
  technical: { icon: Code2,        color: "#0891B2", label: "Technical" },
  education: { icon: GraduationCap, color: "#9333EA", label: "Education" },
};

export default function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the vertical timeline line drawing
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      // Animate each timeline item
      gsap.utils.toArray<Element>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-[var(--bg-alt)]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            The Story
          </motion.p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            <RevealLine delay={0.1}>
              A path that doesn&apos;t fit{" "}
              <em className="gradient-text not-italic">one box.</em>
            </RevealLine>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            I never chose between technical and human-centered—I pursued both. Every role
            has added a layer. Here&apos;s how they connect.
          </motion.p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {(Object.entries(typeConfig) as [TimelineItem["type"], typeof typeConfig[keyof typeof typeConfig]][]).map(([type, { icon: Icon, color, label }]) => (
            <motion.div
              key={type}
              variants={fadeUp}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={12} style={{ color }} />
              </div>
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line — centered on md+, left-aligned on mobile */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-[var(--border)]">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{ background: "linear-gradient(180deg, var(--accent), var(--gold))" }}
            />
          </div>

          {/* Items */}
          <div className="flex flex-col gap-8 md:gap-10">
            {timeline.map((item, i) => {
              const { icon: Icon, color } = typeConfig[item.type];
              const isLeft = i % 2 === 0;

              return (
                <div key={i} className="timeline-item relative">

                  {/* ── Mobile layout: all cards flush-left with dot on left line ── */}
                  <div className="flex md:hidden items-start gap-4 pl-12">
                    {/* Dot */}
                    <div
                      className="absolute left-[13px] top-5 w-4 h-4 rounded-full border-2 z-10"
                      style={{ background: color, borderColor: "var(--bg-alt)" }}
                    />
                    {/* Card */}
                    <div className="card p-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: `${color}20` }}
                        >
                          <Icon size={11} style={{ color }} />
                        </div>
                        <span className="text-xs font-semibold font-mono" style={{ color }}>
                          {item.year}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-base mb-0.5" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium mb-2" style={{ color }}>{item.company}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* ── Desktop layout: alternating left/right ── */}
                  <div className={`hidden md:flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`w-[calc(50%-2rem)] ${isLeft ? "text-right pr-6" : "text-left pl-6"}`}>
                      <div className="card p-5 inline-block text-left max-w-sm">
                        <div className="flex items-center gap-2 mb-2" style={isLeft ? { justifyContent: "flex-end" } : {}}>
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: `${color}20` }}
                          >
                            <Icon size={12} style={{ color }} />
                          </div>
                          <span className="text-xs font-semibold font-mono" style={{ color }}>
                            {item.year}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium mb-2" style={{ color }}>{item.company}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-4 h-4 rounded-full border-2 shadow-md"
                        style={{ background: color, borderColor: "var(--bg-alt)" }}
                      />
                    </div>
                    {/* Spacer */}
                    <div className="w-[calc(50%-2rem)]" />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom narrative */}
        <motion.div
          className="mt-20 text-center max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.blockquote
            variants={fadeUp}
            className="font-display text-xl md:text-2xl italic leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            &ldquo;What connects all of it is curiosity—about how things work, and about
            the people who use them.&rdquo;
          </motion.blockquote>
          <motion.div variants={fadeUp} className="mt-4">
            <div className="divider mx-auto" />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3 mt-6 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span>📍 Redwood City, CA</span>
            <span>·</span>
            <span>🎓 B.S. Cognitive Science + HCI · UCSD 2024</span>
            <span>·</span>
            <span>🦅 Eagle Scout</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
