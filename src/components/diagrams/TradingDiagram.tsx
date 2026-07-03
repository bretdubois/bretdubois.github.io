import Reveal from "@/components/Reveal";

export default function TradingDiagram() {
  return (
    <Reveal>
    <figure className="figure">
      <svg
        className="diagram-svg"
        viewBox="0 0 720 420"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Trading stack architecture: a signal feed and webhooks flow into an ingestion service that parses text into structured trade intents; a trade manager applies risk checks and reads and writes PostgreSQL state, then places orders through the broker API, requests approvals over Telegram, and feeds a VPN-only Streamlit dashboard."
      >
        <defs>
          <marker
            id="arr-ts"
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

        {/* sources */}
        <rect className="node-soft" x="60" y="16" width="180" height="46" rx="4" />
        <text x="150" y="36" fontSize="11.5" textAnchor="middle">
          signal feed
        </text>
        <text className="t-muted" x="150" y="53" fontSize="10" textAnchor="middle">
          (Discord poller)
        </text>
        <rect className="node-soft" x="280" y="16" width="130" height="46" rx="4" />
        <text x="345" y="44" fontSize="11.5" textAnchor="middle">
          webhooks
        </text>

        <line className="edge" pathLength={1} x1="150" y1="62" x2="150" y2="106" markerEnd="url(#arr-ts)" />
        <line className="edge" pathLength={1} x1="345" y1="62" x2="345" y2="106" markerEnd="url(#arr-ts)" />

        {/* ingestion */}
        <rect className="node-static" x="60" y="110" width="350" height="56" rx="4" />
        <text x="80" y="133" fontSize="12" fontWeight="600">
          ingestion service
        </text>
        <text className="t-muted" x="80" y="152" fontSize="10.5">
          message handler · parser
        </text>
        <text className="t-muted" x="430" y="142" fontSize="10.5">
          free-form text → structured trade intents
        </text>

        <line className="edge" pathLength={1} x1="235" y1="166" x2="235" y2="210" markerEnd="url(#arr-ts)" />

        {/* trade manager */}
        <rect className="node-static" x="60" y="214" width="350" height="72" rx="4" />
        <text x="80" y="239" fontSize="12" fontWeight="600">
          trade manager (orchestrator)
        </text>
        <text className="t-muted" x="80" y="258" fontSize="10.5">
          risk checks · account selection · dynamic sizing
        </text>
        <text className="t-muted" x="80" y="274" fontSize="10.5">
          daily-loss-limit snapshots · session clock
        </text>

        {/* postgres */}
        <rect className="node-static" x="500" y="214" width="180" height="72" rx="4" />
        <text x="590" y="239" fontSize="12" textAnchor="middle" fontWeight="600">
          PostgreSQL
        </text>
        <text className="t-muted" x="590" y="258" fontSize="10.5" textAnchor="middle">
          positions · orders
        </text>
        <text className="t-muted" x="590" y="274" fontSize="10.5" textAnchor="middle">
          equity history
        </text>
        <line
          className="edge"
          pathLength={1}
          x1="410"
          y1="250"
          x2="496"
          y2="250"
          markerEnd="url(#arr-ts)"
          markerStart="url(#arr-ts)"
        />

        {/* outputs */}
        <line className="edge" pathLength={1} x1="120" y1="286" x2="120" y2="330" markerEnd="url(#arr-ts)" />
        <line className="edge" pathLength={1} x1="310" y1="286" x2="310" y2="330" markerEnd="url(#arr-ts)" />
        <line className="edge" pathLength={1} x1="590" y1="286" x2="590" y2="330" markerEnd="url(#arr-ts)" />

        <rect className="node-static" x="40" y="334" width="160" height="56" rx="4" />
        <text x="120" y="358" fontSize="11.5" textAnchor="middle">
          broker API
        </text>
        <text className="t-muted" x="120" y="376" fontSize="10" textAnchor="middle">
          orders · fills
        </text>

        <rect className="node-static" x="230" y="334" width="160" height="56" rx="4" />
        <text x="310" y="358" fontSize="11.5" textAnchor="middle">
          Telegram
        </text>
        <text className="t-muted" x="310" y="376" fontSize="10" textAnchor="middle">
          approvals · alerts
        </text>

        <rect className="node-static" x="510" y="334" width="160" height="56" rx="4" />
        <text x="590" y="358" fontSize="11.5" textAnchor="middle">
          Streamlit dashboard
        </text>
        <text className="t-muted" x="590" y="376" fontSize="10" textAnchor="middle">
          VPN-only
        </text>
      </svg>
      <figcaption>
        <span className="fig-index">Fig. 01</span>
        Signal to order, with the risk layer in the middle on purpose
      </figcaption>
    </figure>
    </Reveal>
  );
}
