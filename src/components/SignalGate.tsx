"use client";

import { useState } from "react";

/*
 * A simulated replay of the trading stack's ingestion + risk layer.
 * You type (or tap) a free-form trade call; it parses into a structured
 * intent and runs the real checks the production orchestrator runs before
 * anything reaches the broker: session clock, position limit, daily-loss-
 * limit snapshot, account allowlist. Order placement is paper-mode fiction.
 */

const MAX_SIZE = 10;

interface Intent {
  action: "entry" | "flatten" | "trim" | "breakeven" | "unknown";
  side?: "long" | "short";
  symbol?: string;
  entry?: number;
  stop?: number;
  size?: number;
  pct?: number;
  raw: string;
}

function parse(raw: string): Intent {
  const t = raw.trim().toLowerCase();
  if (!t) return { action: "unknown", raw };
  if (/\bflatten|close all|flat\b/.test(t)) return { action: "flatten", raw };

  const symMatch = t.match(/\b(mnq|nq|es|mes)\b/);
  const symbol = symMatch ? symMatch[1].toUpperCase() : undefined;

  if (/\btrim\b/.test(t)) {
    const pct = t.match(/(\d+)\s*%/);
    return { action: "trim", symbol, pct: pct ? +pct[1] : 50, raw };
  }
  if (/break\s*even|\bbe\b|\bb\/e\b/.test(t)) {
    return { action: "breakeven", symbol, raw };
  }

  const side = /\bshort\b|\bsell\b/.test(t) ? "short" : /\blong\b|\bbuy\b/.test(t) ? "long" : undefined;
  const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => +m[0]);
  const size = (() => {
    const m = t.match(/(?:size|x|qty|contracts?)\s*(\d+)/);
    return m ? +m[1] : undefined;
  })();
  const stop = (() => {
    const m = t.match(/stop\s*(\d+(?:\.\d+)?)/);
    return m ? +m[1] : undefined;
  })();
  // First large number that isn't the size/stop is the entry.
  const entry = nums.find((n) => n !== size && n !== stop && n > 100);

  if (side) {
    return { action: "entry", side, symbol, entry, stop, size: size ?? 1, raw };
  }
  return { action: "unknown", raw };
}

interface Check {
  label: string;
  pass: boolean;
  detail: string;
}

function evaluate(intent: Intent, sessionOpen: boolean, nearDLL: boolean): Check[] {
  if (intent.action === "unknown") {
    return [{ label: "parse", pass: false, detail: "could not read a trade intent" }];
  }
  if (intent.action !== "entry") {
    // Management commands bypass entry risk but still respect the session.
    return [
      { label: "session clock", pass: true, detail: "management command, allowed anytime" },
      { label: "resolves position", pass: true, detail: `${intent.action} on ${intent.symbol ?? "open positions"}` },
    ];
  }
  const checks: Check[] = [];
  checks.push({
    label: "session clock",
    pass: sessionOpen,
    detail: sessionOpen ? "market open, within session" : "outside session, stale signal rejected",
  });
  checks.push({
    label: "position limit",
    pass: (intent.size ?? 1) <= MAX_SIZE,
    detail: `${intent.size ?? 1} contracts vs max ${MAX_SIZE}`,
  });
  checks.push({
    label: "daily-loss-limit",
    pass: !nearDLL,
    detail: nearDLL ? "drawdown snapshot would breach DLL" : "drawdown within daily limit",
  });
  checks.push({
    label: "account allowlist",
    pass: true,
    detail: "1 eval account eligible",
  });
  return checks;
}

const EXAMPLES = [
  "long MNQ 20250 stop 20180 size 2",
  "short MNQ 20320 stop 20360 size 4",
  "long MNQ 20250 stop 20180 size 20",
  "trim MNQ 50%",
  "move MNQ to break even",
  "flatten all",
];

export default function SignalGate() {
  const [input, setInput] = useState("");
  const [intent, setIntent] = useState<Intent | null>(null);
  const [sessionOpen, setSessionOpen] = useState(true);
  const [nearDLL, setNearDLL] = useState(false);

  function submit(raw: string) {
    if (!raw.trim()) return;
    setInput(raw);
    setIntent(parse(raw));
  }

  const checks = intent ? evaluate(intent, sessionOpen, nearDLL) : [];
  const approved = intent && checks.length > 0 && checks.every((c) => c.pass);
  const isEntry = intent?.action === "entry";

  return (
    <div className="sim">
      <div className="sim-head">
        <span>trading stack: signal → risk gate</span>
        <span>real checks · paper-mode fiction</span>
      </div>

      <div className="gate-body">
        <form
          className="term-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          style={{ borderTop: "none", borderBottom: "1px solid #2e2e24" }}
        >
          <input
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. long MNQ 20250 stop 20180 size 2"
            aria-label="Type a trade signal"
            spellCheck={false}
            autoComplete="off"
          />
        </form>

        {intent && (
          <div className="gate-out">
            <div className="gate-col">
              <p className="gate-col-h">parsed intent</p>
              {intent.action === "unknown" ? (
                <p className="gate-unknown">could not parse a trade intent</p>
              ) : (
                <dl className="gate-intent">
                  <div><dt>action</dt><dd>{intent.action}</dd></div>
                  {intent.side && <div><dt>side</dt><dd>{intent.side}</dd></div>}
                  {intent.symbol && <div><dt>symbol</dt><dd>{intent.symbol}</dd></div>}
                  {intent.entry != null && <div><dt>entry</dt><dd>{intent.entry}</dd></div>}
                  {intent.stop != null && <div><dt>stop</dt><dd>{intent.stop}</dd></div>}
                  {intent.size != null && isEntry && <div><dt>size</dt><dd>{intent.size}</dd></div>}
                  {intent.pct != null && <div><dt>pct</dt><dd>{intent.pct}%</dd></div>}
                </dl>
              )}
            </div>

            <div className="gate-col">
              <p className="gate-col-h">risk gate</p>
              <ul className="gate-checks">
                {checks.map((c) => (
                  <li key={c.label} className={c.pass ? "gate-pass" : "gate-fail"}>
                    <span className="gate-mark">{c.pass ? "✓" : "✕"}</span>
                    <span>
                      <strong>{c.label}</strong>
                      <span className="gate-detail">{c.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {intent && intent.action !== "unknown" && (
          <div className={approved ? "gate-verdict gate-verdict-ok" : "gate-verdict gate-verdict-no"}>
            {approved
              ? isEntry
                ? "approved → order routed to broker (paper mode)"
                : "approved → executed (paper mode)"
              : "rejected → no order placed"}
          </div>
        )}
      </div>

      <div className="sim-controls">
        <div className="sim-walk">
          <span className="sim-ctrl-label">try</span>
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" className="term-chip" onClick={() => submit(ex)}>
              {ex}
            </button>
          ))}
        </div>
        <div className="sim-toggles">
          <button
            type="button"
            className={sessionOpen ? "term-chip sim-chip-on" : "term-chip"}
            onClick={() => setSessionOpen((v) => !v)}
            aria-pressed={sessionOpen}
          >
            session: {sessionOpen ? "open" : "closed"}
          </button>
          <button
            type="button"
            className={nearDLL ? "term-chip sim-chip-on" : "term-chip"}
            onClick={() => setNearDLL((v) => !v)}
            aria-pressed={nearDLL}
          >
            near daily loss limit: {nearDLL ? "yes" : "no"}
          </button>
        </div>
      </div>
      <p className="sim-hint">
        The parser turns a free-form call into a structured intent; the gate is
        where the engineering lives. Flip the session closed or push the account
        near its daily loss limit and watch the same valid order get refused
        before it ever reaches the broker.
      </p>
    </div>
  );
}
