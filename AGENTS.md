<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Site conventions (read before changing anything)

- Design is **editorial / print-inspired, light, typographic**: `.shell`
  (64rem) frame with a hanging-label `.section-grid`, prose at a 42rem
  measure. Fraunces = display, Inter = text, JetBrains Mono = apparatus
  (labels, metadata, captions, code) — keep those jobs separate. One accent
  color (`--accent`), used only for meaning. Do NOT reintroduce animation
  libraries (framer-motion, GSAP, Lenis, three.js), marquees, counters, or
  scroll effects. Motion is hand-rolled and must carry information: CSS
  hover/focus transitions, the one-time hero .rise entrance, diagram
  edge-draw on IntersectionObserver (.reveal, gated on html.js so no-JS
  sees everything), the SMIL packet dot, and View Transitions cross-fades
  — all collapsing under prefers-reduced-motion. The JARVIS page terminal
  (JarvisDemo) is a labeled simulation with canned output; keep it honest.
  /colophon documents the rationale — keep it true.
- Diagrams are hand-drawn SVG components in `src/components/diagrams/`,
  styled via `.diagram-svg` CSS vars, with prose `aria-label`s and numbered
  figcaptions. Code excerpts must be real code from the actual projects,
  never invented filler.
- Never publish: phone number, internal/Tailscale IPs, ports, hostnames,
  Telegram bot handles, or home-network topology.
- Facts (dates, employers, metrics) come from the resume master in the
  Obsidian vault (`05-reference/career/resume-master.md`). Keep the /resume
  page in sync with it.
