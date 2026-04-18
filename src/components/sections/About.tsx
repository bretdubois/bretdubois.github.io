"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, Wifi } from "lucide-react";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animation";
import { RevealLine } from "@/components/ui/TextReveal";
import { timeline, type TimelineItem } from "@/data/work";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C2410C";

/* Logo with graceful fallback to icon */
function OrgLogo({ item }: { item: TimelineItem }) {
  const [failed, setFailed] = useState(false);

  // Icon fallbacks for entries without logos
  const FallbackIcon = item.type === "technical" ? Wifi : Wrench;

  if (item.logo && !failed) {
    return (
      <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
        <img
          src={item.logo}
          alt={item.company}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}25` }}
    >
      <FallbackIcon size={22} style={{ color: ACCENT }} />
    </div>
  );
}

export default function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      gsap.utils.toArray<Element>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
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
            Technical people say I&apos;m too focused on people. Sales people say I&apos;m
            too focused on specs. Both are right—and that intersection is exactly the value.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">

          {/* Vertical line — sits between year and card */}
          <div
            className="absolute top-0 bottom-0 w-px bg-[var(--border)]"
            style={{ left: "calc(5.5rem + 20px)" }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{ background: `linear-gradient(180deg, ${ACCENT}, #B45309)` }}
            />
          </div>

          <div className="flex flex-col">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item flex items-start gap-0 pb-8 last:pb-0"
              >
                {/* ── YEAR — big left anchor ── */}
                <div
                  className="flex-shrink-0 text-right pr-5"
                  style={{ width: "5.5rem" }}
                >
                  <span
                    className="font-display font-bold leading-none block"
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      color: ACCENT,
                      paddingTop: "0.9rem",
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* ── DOT ── */}
                <div
                  className="flex-shrink-0 z-10"
                  style={{ paddingTop: "1.25rem" }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: ACCENT,
                      boxShadow: `0 0 0 3px var(--bg-alt), 0 0 0 4.5px ${ACCENT}`,
                    }}
                  />
                </div>

                {/* ── CARD: logo + content ── */}
                <div className="flex-1 pl-5 min-w-0">
                  <div
                    className="card p-4 md:p-5 flex items-start gap-4 overflow-hidden"
                    style={{ borderTop: `3px solid ${ACCENT}` }}
                  >
                    {/* Logo / icon — clickable if url present */}
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-2xl"
                        tabIndex={-1}
                        aria-hidden
                      >
                        <OrgLogo item={item} />
                      </a>
                    ) : (
                      <OrgLogo item={item} />
                    )}

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider mb-1 transition-colors hover:underline"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.company}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 12"
                            width="9"
                            height="9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                            aria-hidden
                          >
                            <path d="M1 11 10 2M4 2h6v6" />
                          </svg>
                        </a>
                      ) : (
                        <p
                          className="text-xs font-mono font-semibold uppercase tracking-wider mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.company}
                        </p>
                      )}
                      <h3
                        className="font-display font-bold leading-tight mb-2"
                        style={{
                          fontSize: "clamp(1rem, 2vw, 1.2rem)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
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
            <span>🎓 B.S. Cognitive Science + HCI, UCSD &nbsp;·&nbsp; A.S. Computer Science, CSM</span>
            <span>·</span>
            <span>🦅 Eagle Scout</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
