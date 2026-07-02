import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automated futures trading stack",
  description:
    "A three-service system that ingests real-time trade signals, applies a risk layer, and places orders through a futures broker API. Runs in paper mode by design.",
  alternates: { canonical: "/projects/trading-stack/" },
};

export default function TradingStackPage() {
  return (
    <div className="page prose pt-14 pb-4">
      <p className="label" style={{ marginBottom: "0.5rem" }}>
        <Link href="/#projects" style={{ textDecoration: "none", color: "inherit" }}>
          ← projects
        </Link>
      </p>
      <h1>Automated futures trading stack</h1>
      <p className="meta" style={{ marginBottom: "1.5rem" }}>
        Python · PostgreSQL · Docker Compose · ProjectX broker API · Streamlit · FastAPI · 2025–2026
      </p>

      <p>
        I trade Micro E-mini Nasdaq futures (MNQ). This system automates the
        mechanical part: it watches a real-time signal feed, parses free-form trade
        calls into structured intents, checks them against a risk layer, and places
        the resulting orders through the ProjectX/TopstepX broker API — then
        manages the position (modifies, trims, break-even stops, cancels) as
        follow-up signals arrive.
      </p>
      <p>
        It runs as three containers alongside the rest of{" "}
        <Link href="/projects/homelab/">my stack</Link>, sharing its PostgreSQL
        instance for state:
      </p>

      <pre className="diagram" aria-label="Trading stack architecture diagram">
{`  signal feed          webhooks
 (Discord poller)         │
        │                 │
 ┌──────▼─────────────────▼──────┐
 │  ingestion service            │   parses text → structured
 │  message handler / parser     │   trade intents
 └──────────────┬────────────────┘
                │
 ┌──────────────▼────────────────┐      ┌───────────────────┐
 │  trade manager (orchestrator) │◀────▶│  PostgreSQL        │
 │  risk checks · account        │      │  positions, orders │
 │  selection · position sizing  │      │  equity history    │
 └──────┬─────────────────┬──────┘      └───────────────────┘
        │                 │
 ┌──────▼──────┐   ┌──────▼──────────┐   ┌──────────────────┐
 │ broker API  │   │ Telegram        │   │ Streamlit        │
 │ (orders)    │   │ (approvals +    │   │ dashboard        │
 └─────────────┘   │  notifications) │   │ (VPN-only)       │
                   └─────────────────┘   └──────────────────┘`}
      </pre>

      <h2>The risk layer is the point</h2>
      <p>
        Anyone can call a REST endpoint that places an order. The engineering is in
        everything that decides whether the order <em>should</em> be placed:
      </p>
      <ul>
        <li>
          <strong>Position limits and dynamic sizing</strong> — contract count is
          computed per-signal from account equity and configured risk, not
          hardcoded.
        </li>
        <li>
          <strong>Account selection with fan-out</strong> — signals can target one
          evaluation account or fan out to several, with an allowlist controlling
          which accounts are eligible.
        </li>
        <li>
          <strong>Daily-loss-limit snapshots</strong> — before acting, the manager
          snapshots account drawdown against the broker's daily loss limit and
          refuses trades that would breach it.
        </li>
        <li>
          <strong>Session awareness</strong> — a session clock models the futures
          trading calendar (nightly resets, weekend closes), so the system doesn't
          act on stale signals outside market hours.
        </li>
        <li>
          <strong>Human-in-the-loop mode</strong> — signals can require explicit
          approval from Telegram before execution, and <code>flatten all</code> /
          per-ticker close/trim/break-even commands are always available manually.
        </li>
      </ul>

      <h2>Incident: the day the stack went down</h2>
      <p>
        In June 2026 the stack stopped trading: the broker API key had been
        invalidated (expired-or-compromised — treated as compromised either way) and
        database state had drifted from reality while services retried. Recovery was
        a proper ops exercise: rotate the credential, audit what the retry loop had
        written, repair position state against the broker's records, and bring the
        services back one at a time. Two changes came out of it — credentials got a
        rotation procedure instead of a "set once" assumption, and startup now
        reconciles local state against the broker before acting on anything.
      </p>

      <h2>Status, honestly</h2>
      <p>
        The stack runs in <strong>paper mode</strong>. That's deliberate: the
        automation is validated against live market data without live capital
        while I finish the account fan-out work and build a longer performance
        record. A system that places real orders is exactly the kind of thing that
        should have to earn its way out of staging.
      </p>
      <p>
        The repo is private because it contains strategy-specific logic, but I'm
        glad to walk through the architecture in detail:{" "}
        <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a>.
      </p>
    </div>
  );
}
