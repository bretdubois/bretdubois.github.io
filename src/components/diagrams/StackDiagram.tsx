import Reveal from "@/components/Reveal";

/*
 * Hand-drawn SVG map of the OptiPlex stack. Nodes wrapped in <a> are
 * clickable and get hover/focus styles from .diagram-svg rules in
 * globals.css. Coordinates are on a 720-wide grid.
 */
export default function StackDiagram() {
  return (
    <Reveal>
    <figure className="figure">
      <svg
        className="diagram-svg"
        viewBox="0 0 720 480"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Architecture map: Telegram fronts the JARVIS bot, which operates a Dell OptiPlex running Docker services; the box backs up nightly to a NAS via restic and connects to other devices over a Tailscale mesh."
      >
        <defs>
          <marker
            id="arr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#77776d" />
          </marker>
        </defs>

        {/* Telegram */}
        <rect className="node-soft" x="40" y="16" width="120" height="34" rx="4" />
        <text x="100" y="37" fontSize="12" textAnchor="middle">
          Telegram
        </text>
        <line className="edge" pathLength={1} x1="100" y1="50" x2="100" y2="80" markerEnd="url(#arr)" />

        {/* JARVIS */}
        <a href="/projects/jarvis/" aria-label="JARVIS project page">
          <rect className="node" x="40" y="84" width="640" height="58" rx="4" />
          <text x="60" y="107" fontSize="12.5" fontWeight="600">
            JARVIS · Python bot · systemd
          </text>
          <text className="t-muted" x="60" y="127" fontSize="10.5">
            daily brief · container ops · backup alerts · job digest
          </text>
          <text className="t-accent" x="660" y="107" fontSize="10.5" textAnchor="end">
            ↗
          </text>
        </a>
        <line className="edge" pathLength={1} x1="100" y1="142" x2="100" y2="176" markerEnd="url(#arr)" />
        <text className="t-muted" x="112" y="165" fontSize="10.5">
          operates
        </text>

        {/* OptiPlex box */}
        <a href="/projects/homelab/" aria-label="Homelab platform project page">
          <rect className="node" x="40" y="180" width="640" height="176" rx="4" />
          <text x="60" y="205" fontSize="12.5" fontWeight="600">
            Dell OptiPlex · Ubuntu 24.04 · Docker Compose
          </text>
          <text className="t-accent" x="660" y="205" fontSize="10.5" textAnchor="end">
            ↗
          </text>
        </a>

        {/* row 1: shared services */}
        <rect className="node-soft" x="60" y="222" width="110" height="32" rx="3" />
        <text x="115" y="242" fontSize="11" textAnchor="middle">
          postgres
        </text>
        <rect className="node-soft" x="182" y="222" width="90" height="32" rx="3" />
        <text x="227" y="242" fontSize="11" textAnchor="middle">
          n8n
        </text>
        <rect className="node-soft" x="284" y="222" width="130" height="32" rx="3" />
        <text x="349" y="242" fontSize="11" textAnchor="middle">
          open-webui
        </text>
        <rect className="node-soft" x="426" y="222" width="234" height="32" rx="3" />
        <text x="543" y="242" fontSize="11" textAnchor="middle">
          couchdb · Obsidian LiveSync
        </text>

        {/* row 2: project services (clickable) */}
        <a href="/projects/trading-stack/" aria-label="Trading stack project page">
          <rect className="node" x="60" y="266" width="250" height="32" rx="3" />
          <text x="185" y="286" fontSize="11" textAnchor="middle">
            futures-{"{ingest,dash,hook}"} ↗
          </text>
        </a>
        <a href="/projects/roomtag/" aria-label="RoomTag project page">
          <rect className="node" x="322" y="266" width="170" height="32" rx="3" />
          <text x="407" y="286" fontSize="11" textAnchor="middle">
            room-inference ↗
          </text>
        </a>
        <rect className="node-soft" x="504" y="266" width="156" height="32" rx="3" />
        <text x="582" y="286" fontSize="11" textAnchor="middle">
          media stack
        </text>

        {/* row 3: KVM */}
        <rect className="node-soft" x="60" y="310" width="600" height="32" rx="3" />
        <text x="360" y="330" fontSize="11" textAnchor="middle">
          KVM · Cisco Modeling Labs — CCNA lab topologies
        </text>

        {/* branch: backups */}
        <line className="edge" pathLength={1} x1="200" y1="356" x2="200" y2="404" markerEnd="url(#arr)" />
        <text className="t-muted" x="212" y="384" fontSize="10.5">
          restic · nightly · monitored
        </text>
        <rect className="node-soft" x="110" y="408" width="180" height="40" rx="4" />
        <text x="200" y="432" fontSize="11" textAnchor="middle">
          NAS · snapshot repo
        </text>

        {/* branch: mesh */}
        <line className="edge" pathLength={1} x1="520" y1="356" x2="520" y2="404" markerEnd="url(#arr)" />
        <text className="t-muted" x="532" y="384" fontSize="10.5">
          Tailscale mesh
        </text>
        <rect className="node-soft" x="400" y="408" width="240" height="54" rx="4" />
        <text x="520" y="428" fontSize="11" textAnchor="middle">
          MacBook · iPhone · gaming PC
        </text>
        <text className="t-muted" x="520" y="446" fontSize="10" textAnchor="middle">
          (GPU for training + inference)
        </text>

        {/* one unit of traffic doing laps of the stack (hidden under
            prefers-reduced-motion via the .packet CSS rule) */}
        <circle className="packet" r="3">
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            path="M 100 28 L 100 76 M 100 146 L 100 172 M 200 360 L 200 400 M 520 360 L 520 400"
          />
        </circle>
      </svg>
      <figcaption>
        <span className="fig-index">Fig. 01</span>
        The stack as deployed — outlined nodes link to their writeups
      </figcaption>
    </figure>
    </Reveal>
  );
}
