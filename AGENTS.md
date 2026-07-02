<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Site conventions (read before changing anything)

- Design is deliberately **light, minimal, typographic**: one column
  (`.page`, 42rem), prose-first styling in `globals.css`, Inter + JetBrains
  Mono. Do NOT reintroduce animation libraries (framer-motion, GSAP, Lenis,
  three.js), marquees, counters, or scroll effects.
- Diagrams are plain-text `<pre class="diagram">` box drawings; code excerpts
  must be real code from the actual projects, never invented filler.
- Never publish: phone number, internal/Tailscale IPs, ports, hostnames,
  Telegram bot handles, or home-network topology.
- Facts (dates, employers, metrics) come from the resume master in the
  Obsidian vault (`05-reference/career/resume-master.md`). Keep the /resume
  page in sync with it.
