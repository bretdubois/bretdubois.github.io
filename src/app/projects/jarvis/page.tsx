import type { Metadata } from "next";
import Link from "next/link";
import SpecSheet from "@/components/SpecSheet";

export const metadata: Metadata = {
  title: "JARVIS — a deterministic-first personal assistant",
  description:
    "A Telegram bot that operates my infrastructure: daily briefs, container control, backup monitoring, and a job-search pipeline. Every daily-use command works even when every LLM is unreachable.",
  alternates: { canonical: "/projects/jarvis/" },
};

export default function JarvisPage() {
  return (
    <div className="shell pt-14 pb-4">
      <p className="label" style={{ marginBottom: "1rem" }}>
        <Link href="/#projects" style={{ textDecoration: "none", color: "inherit" }}>
          ← projects
        </Link>
      </p>
      <h1 className="display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "48rem" }}>
        JARVIS — a deterministic-first personal assistant
      </h1>
      <SpecSheet
        items={[
          { key: "Role", value: "Design, build, and daily use" },
          { key: "Stack", value: "Python · systemd · Telegram · Ollama" },
          { key: "Status", value: "Running continuously" },
          { key: "Year", value: "2026" },
        ]}
      />
      <div className="prose" style={{ maxWidth: "42rem" }}>
      <p>
        JARVIS is the Telegram bot I actually talk to every day. It fronts{" "}
        <Link href="/projects/homelab/">the OptiPlex stack</Link>: morning briefs,
        Docker container control, backup monitoring, location-aware routines, and a
        job-search pipeline. It's a single Python service under systemd — about
        2,200 lines, no framework — because a personal assistant is an operational
        tool first and a chat toy second.
      </p>

      <h2>Design principle: deterministic utility first, LLM second</h2>
      <p>
        The first version leaned on an agent framework and an LLM for everything.
        It was impressive when it worked and useless when it didn't — the model
        endpoint being down meant I couldn't restart a container from my phone.
        The rewrite inverted the hierarchy: <strong>every command I need daily is
        plain deterministic code</strong> — <code>/status</code>,{" "}
        <code>/containers</code>, <code>/restart n8n</code>, <code>/backup last</code> —
        and the LLM is an enhancement layered on top for open-ended questions,
        with graceful degradation when no model is reachable:
      </p>
      <pre>
        <code>{`def pick_ollama() -> tuple[str, str] | None:
    """
    Returns (url, model) for the best available Ollama endpoint.
    Prefers the gaming PC (GPU) when online, falls back to local CPU.
    Returns None if neither is reachable.
    """
    for url, model, label in [
        (OLLAMA_URL_REMOTE, OLLAMA_MODEL_REMOTE, "gaming PC"),
        (OLLAMA_URL,        OLLAMA_MODEL,        "local"),
    ]:
        try:
            urllib.request.urlopen(f"{url}/api/tags", timeout=3)
            log.info(f"Ollama: using {label} ({url}, model={model})")
            return url, model
        except Exception:
            log.debug(f"Ollama: {label} unreachable ({url})")
    return None`}</code>
      </pre>
      <p>
        The GPU box is a gaming PC that isn't always on, so model selection is a
        health-checked fallback chain rather than a config value. If both endpoints
        are down, every operational command still works.
      </p>

      <h2>What it does all day</h2>
      <ul>
        <li>
          <strong>Ops</strong> — container list/start/stop/restart with alias
          resolution, log tailing, host CPU/RAM/disk status, and service
          reachability checks, all from my phone.
        </li>
        <li>
          <strong>Backup watchdog</strong> — a daily check compares the newest
          restic snapshot's age against a 25-hour threshold and alerts on Telegram
          only when something is wrong. Silence means healthy.
        </li>
        <li>
          <strong>Daily brief</strong> — one <code>/today</code> command returns a
          market snapshot, career prompts, project nudges, and infrastructure
          status.
        </li>
        <li>
          <strong>Job-search pipeline</strong> — a weekday-morning digest of new
          SE/TAM openings matched to my targets, and on-demand resume tailoring:
          I paste a job description, and it rewrites the right resume variant from
          a version-controlled master in my Obsidian vault, saving a per-application
          copy to the tracker.
        </li>
        <li>
          <strong>Presence & routines</strong> — geofences fed by an iPhone
          Shortcut, manual check-ins as ground truth, and an adaptive routine brief
          that learns corrections from a <code>/learn</code> command.
        </li>
        <li>
          <strong>Knowledge capture</strong> — <code>/log</code> appends straight
          into the Obsidian vault inbox, which syncs across devices via CouchDB
          LiveSync.
        </li>
      </ul>

      <h2>Lessons that stuck</h2>
      <ul>
        <li>
          <strong>Alert only on deviation.</strong> An early watchdog messaged me on
          every check. It trained me to ignore it within a week, so I removed it and
          rebuilt alerts to fire only when action is needed.
        </li>
        <li>
          <strong>Reliability beats capability.</strong> The deterministic rewrite
          made JARVIS strictly less clever and dramatically more useful.
        </li>
        <li>
          <strong>Own the data layer.</strong> Everything JARVIS knows lives in
          plain-text Markdown in the vault — greppable, diffable, and portable to
          whatever the next iteration is.
        </li>
      </ul>

      <h2>Status</h2>
      <p>
        Running continuously as a systemd service. The code is personal by nature
        (it knows my routines and my infrastructure), so it stays private — but the
        architecture is easy to talk through:{" "}
        <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a>.
      </p>
      </div>
    </div>
  );
}
