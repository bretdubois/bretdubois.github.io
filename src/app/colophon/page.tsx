import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How this site is designed and built, and why: typography, grid, color, diagrams, accessibility, and the things deliberately left out.",
  alternates: { canonical: "/colophon/" },
};

export default function ColophonPage() {
  return (
    <div className="shell pt-14 pb-4">
      <p className="label" style={{ marginBottom: "1rem" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          ← home
        </Link>
      </p>
      <h1 className="display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "48rem" }}>
        Colophon
      </h1>
      <div className="prose mt-8" style={{ maxWidth: "42rem" }}>
        <p className="lead">
          I studied Design and Human-Computer Interaction at UC San Diego, so
          this page is the design rationale I'd expect from anyone else's
          portfolio: what was chosen, what was rejected, and why.
        </p>

        <h2>The brief</h2>
        <p>
          The audience is a hiring manager or engineer deciding, in about ninety
          seconds, whether I'm worth a phone screen. Everything optimizes for
          that: the home page answers "who is this and what have they actually
          built" before the first scroll, every claim links to a case study, and
          nothing interrupts reading. The design should feel considered, but
          the moment a visual choice competes with the content, the content
          wins.
        </p>

        <h2>Typography</h2>
        <p>
          Three typefaces with strictly separated jobs.{" "}
          <strong>Fraunces</strong>, a variable optical-size serif, does the
          display work; its warmth keeps a very structured page from feeling
          sterile. <strong>Inter</strong> carries body text at a 42rem measure
          (about 75 characters), 1.7 line height. <strong>JetBrains Mono</strong>{" "}
          is reserved for apparatus: section numbers, metadata, figure captions,
          spec sheets, and code. If it's content, it's serif or sans; if it's
          machinery, it's mono. That rule alone produces most of the visual
          hierarchy.
        </p>

        <h2>Grid and apparatus</h2>
        <p>
          The layout borrows from print: a hanging label rail on wide viewports,
          numbered sections, hairline rules, heavier rules at the page frame,
          and figure captions under every diagram. Print conventions carry a
          useful signal: they say <em>edited</em>, the way a lab notebook
          differs from a whiteboard.
        </p>

        <h2>Color</h2>
        <p>
          Warm paper (<code>#fbfaf7</code>), near-black ink, and one accent: an
          ink blue (<code>#2534c9</code>) used only for meaning: interactive
          nodes, section indices, hover states, the period after my name. One
          accent used consistently reads as identity; three accents read as a
          template.
        </p>

        <h2>Diagrams</h2>
        <p>
          The architecture diagrams are hand-drawn SVG on a fixed grid, styled
          with the site's own CSS variables and set in the same mono as the
          captions. On the home page, outlined nodes are real links with hover
          and keyboard-focus states; the diagram <em>is</em> the navigation. The
          network topology on the{" "}
          <Link href="/projects/unifi/">UniFi case study</Link> goes further: a
          before/after toggle morphs the wiring, and you can trace either reused
          cable through its new roles. Each diagram carries an{" "}
          <code>aria-label</code> describing the topology in prose for screen
          readers.
        </p>

        <h2>Motion</h2>
        <p>
          The previous version of this site had a WebGL particle network behind
          the hero, smooth-scroll hijacking, animated counters, and a marquee:
          motion as decoration. The rule now is that{" "}
          <strong>motion must carry information</strong>, and every use here
          passes that test: the architecture diagrams draw their edges when they
          enter the viewport (the topology assembles in reading order), packets
          travel the topology diagrams because data flow is literally what they
          depict, page navigations cross-fade via the View Transitions API so
          moving between case studies feels continuous, and the hero settles in
          once, in under 600 milliseconds, and never moves again.
        </p>
        <p>
          All of it is hand-rolled: CSS keyframes, SVG, and one
          IntersectionObserver; still no animation libraries. Everything
          collapses under <code>prefers-reduced-motion</code>, and visitors
          without JavaScript simply see the finished diagrams.
        </p>
        <h2>Playable demos</h2>
        <p>
          Three project pages carry an interactive simulation you can poke
          instead of just reading about it. The{" "}
          <Link href="/projects/jarvis/">JARVIS page</Link> has a
          terminal that replays the bot's real command surface. The{" "}
          <Link href="/projects/roomtag/">RoomTag page</Link> has a floor plan you
          walk a tag around while a synthesized classifier feeds the real EMA and
          hysteresis logic, so you can toggle the smoothing off and feel the
          doorway-flicker problem the project exists to solve. The{" "}
          <Link href="/projects/trading-stack/">trading page</Link> lets you type a
          trade call and watch it parse and hit the real risk checks.
        </p>
        <p>
          The rule for all three: the <em>data</em> is synthesized and the
          interface says so, but the <em>logic</em> is faithful to what runs in
          production. A demo you can poke at beats a paragraph describing one, and
          simulating it honestly matters more than the trick.
        </p>

        <h2>Accessibility & performance</h2>
        <ul>
          <li>
            Semantic HTML with one <code>h1</code> per page, a skip link, and
            visible focus states on everything interactive.
          </li>
          <li>Text and apparatus colors meet WCAG AA contrast on the paper background.</li>
          <li>
            Static export: no client-side data fetching, fonts subset and
            self-hosted via <code>next/font</code>, zero layout shift from
            loading content.
          </li>
          <li>
            The whole dependency tree is React, Next, and Tailwind. No animation
            or component libraries.
          </li>
        </ul>

        <h2>Stack</h2>
        <p>
          Next.js 16 static export on GitHub Pages, Tailwind CSS v4 plus a small
          hand-written design system, DNS through Cloudflare. Source is{" "}
          <a
            href="https://github.com/bretdubois/bretdubois.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            on GitHub
          </a>
          , including the design rules as repo conventions so the aesthetic
          survives future edits.
        </p>
      </div>
    </div>
  );
}
