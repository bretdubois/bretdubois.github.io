"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A simulated replay of the real JARVIS command surface. Output is
 * canned (and says so); the point is to show what a deterministic-first
 * ops bot feels like without exposing the machine that runs my house.
 */

const RESPONSES: Record<string, string[]> = {
  help: [
    "deterministic ops commands (simulated here, real on my server):",
    "  /status        host CPU / RAM / disk / uptime",
    "  /containers    docker container list",
    "  /backup last   restic snapshot freshness",
    "  /brain         which LLM endpoint is active",
    "  /restart n8n   restart a container by alias",
    "the real bot has ~30 commands; these work with every LLM offline.",
  ],
  "/status": [
    "cpu 7% · ram 9.8/15.6 GB · disk 61% · up 41 days",
    "tailscale: ok · gpu box: reachable · services: healthy",
  ],
  "/containers": [
    "postgres            Up 3 weeks",
    "n8n                 Up 3 weeks",
    "open-webui          Up 3 weeks",
    "couchdb             Up 3 weeks",
    "futures-ingestion   Up 6 days",
    "futures-dashboard   Up 6 days",
    "futures-webhook     Up 6 days",
    "room-inference      Up 12 days",
  ],
  "/backup last": [
    "last snapshot: 03:00 today · repo healthy",
    "retention: 7 daily / 4 weekly / 6 monthly",
    "watchdog: silent, alerts only fire past the 25-hour threshold",
  ],
  "/brain": [
    "primary: gaming PC (GPU), reachable, selected",
    "fallback: local CPU, standing by",
    "if both are down, every command above still works.",
  ],
  "/restart n8n": [
    "n8n: restarting… done (2.1 s)",
    "(simulated; the real one doesn't ask twice either)",
  ],
};

const CHIPS = ["help", "/status", "/containers", "/backup last", "/brain", "/restart n8n"];

interface Line {
  kind: "user" | "sys";
  text: string;
}

export default function JarvisDemo() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "JARVIS ready. Type a command or tap one below, try `help`." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd || busy) return;
    setInput("");
    setLines((prev) => [...prev, { kind: "user", text: raw.trim() }]);
    const response = RESPONSES[cmd] ?? [
      `unknown command: ${cmd}`,
      "try `help` for the list this demo understands.",
    ];
    setBusy(true);
    response.forEach((text, i) => {
      timers.current.push(
        setTimeout(() => {
          setLines((prev) => [...prev, { kind: "sys", text }]);
          if (i === response.length - 1) setBusy(false);
        }, 140 * (i + 1))
      );
    });
  }

  return (
    <div>
      <div className="term">
        <div className="term-head">
          <span>jarvis: simulated replay</span>
          <span>canned output · real command surface</span>
        </div>
        <div ref={bodyRef} className="term-body" role="log" aria-live="polite">
          {lines.map((line, i) => (
            <div key={i} className={line.kind === "user" ? "term-line-user" : "term-line-sys"}>
              {line.text}
            </div>
          ))}
        </div>
        <form
          className="term-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
        >
          <input
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a command…"
            aria-label="Type a JARVIS command"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
      <div className="term-chips">
        {CHIPS.map((chip) => (
          <button key={chip} type="button" className="term-chip" onClick={() => run(chip)}>
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
