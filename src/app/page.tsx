import Link from "next/link";

interface ProjectEntry {
  href: string;
  title: string;
  meta: string;
  description: string;
}

const projects: ProjectEntry[] = [
  {
    href: "/projects/roomtag/",
    title: "RoomTag — indoor positioning from Wi-Fi fingerprints",
    meta: "ESP32-C6 · FastAPI · scikit-learn / PyTorch · ONNX · SwiftUI",
    description:
      "A wearable ESP32 tag scans nearby access points and a self-hosted ML server infers which room you're in — no cameras, beacons, or GPS. Random-forest and neural models, an inference pipeline with EMA smoothing and Bayesian priors, OTA firmware via GitHub Actions, and an iOS app.",
  },
  {
    href: "/projects/trading-stack/",
    title: "Automated futures trading stack",
    meta: "Python · PostgreSQL · Docker · broker API · Streamlit",
    description:
      "Three services that ingest real-time trade signals, parse them into structured intents, run them through a risk layer, and place orders through a futures broker API. Runs in paper mode by design. Includes the postmortem of the incident that took it down.",
  },
  {
    href: "/projects/jarvis/",
    title: "JARVIS — a deterministic-first personal assistant",
    meta: "Python · systemd · Telegram · Ollama · local LLMs",
    description:
      "A Telegram bot that operates my infrastructure: daily briefs, container control, backup monitoring, location awareness, and a job-search pipeline. Designed so every daily-use command works even when every LLM is unreachable.",
  },
  {
    href: "/projects/homelab/",
    title: "The platform underneath — a homelab run like production",
    meta: "Ubuntu · Docker Compose · restic · Tailscale · KVM",
    description:
      "The always-on box the other projects live on: a dozen composed services, monitored nightly backups with a written retention policy, a mesh VPN, and written operating rules for making changes safely.",
  },
  {
    href: "/projects/unifi/",
    title: "Client network design — a UniFi case study",
    meta: "Ubiquiti UniFi · VLANs · PoE · site survey",
    description:
      "Independent networking work for paying clients. One engagement in detail: constraints, architecture decisions, tradeoffs, and the documented handoff.",
  },
];

const smallerProjects = [
  {
    title: "Beat Saber automapper",
    description:
      "turns a YouTube link into a playable custom map by wrapping an open-source neural mapper — including three upstream bug fixes (audio decode fallback, codec crash, numpy broadcast) to get it working.",
  },
  {
    title: "RelayCRM",
    description:
      "a personal-relationship CRM in Next.js and Supabase with Claude-assisted contact notes.",
  },
  {
    title: "This site",
    description:
      "static Next.js on GitHub Pages. Deliberately boring: no animation framework, no 3D hero, content in version control.",
  },
];

export default function Home() {
  return (
    <div className="page prose pt-14 pb-4">
      {/* ── Intro ── */}
      <h1>Technical seller who builds.</h1>
      <p className="meta" style={{ marginBottom: "1.5rem" }}>
        Redwood City, CA · open to SF Bay Area + remote
      </p>
      <p>
        I spent three years at Apple doing high-volume hardware and software triage
        (two promotions, 300+ perfect customer-satisfaction scores, one intake
        conversation that turned into a $150K+ enterprise account), then a year in
        B2B SaaS sales running technical discovery for an AI marketing platform.
        Nights and weekends, I build and operate the systems on this page.
      </p>
      <p>
        I'm looking for <strong>Solutions Engineering / Sales Engineering / Technical
        Account Management</strong> roles at AI, networking, and cloud companies —
        the job where explaining a system well matters as much as understanding it.
        CCNA and AWS Solutions Architect Associate in progress.{" "}
        <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a>
      </p>

      {/* ── What I run ── */}
      <h2 id="what-i-run">What I run</h2>
      <p>
        Everything below is live on an always-on Dell OptiPlex under my desk, managed
        entirely from the Linux CLI. It's a homelab, but I run it like production:
        version-controlled compose files, secrets kept out of git, nightly monitored
        backups, and a rule that nothing gets restarted without checking why it's
        misbehaving first.
      </p>
      <pre className="diagram" aria-label="Diagram of the self-hosted infrastructure stack">
{`             Telegram
                │
 ┌──────────────▼─────────────────────────────────────────────┐
 │  JARVIS · Python bot · systemd                             │
 │  daily brief · container ops · backup alerts · job digest  │
 └──────────────┬─────────────────────────────────────────────┘
                │ operates
 ┌──────────────▼─────────────────────────────────────────────┐
 │  Dell OptiPlex · Ubuntu 24.04 · Docker Compose             │
 │                                                            │
 │  postgres · n8n · open-webui · couchdb (Obsidian LiveSync) │
 │  media stack · room-inference · futures-{ingest,dash,hook} │
 │  KVM: Cisco Modeling Labs (CCNA lab topologies)            │
 └───────┬────────────────────────────┬───────────────────────┘
         │ restic → NAS               │ Tailscale mesh
         ▼   (nightly, monitored)     ▼
   snapshot repo             MacBook · iPhone · gaming PC
                                        (GPU for training
                                         and inference)`}
      </pre>

      {/* ── Projects ── */}
      <h2 id="projects">Selected projects</h2>
      <div className="flex flex-col gap-7">
        {projects.map((p) => (
          <div key={p.href}>
            <h3 style={{ marginTop: 0 }}>
              <Link href={p.href}>{p.title}</Link>
            </h3>
            <p className="meta" style={{ marginBottom: "0.375rem" }}>
              {p.meta}
            </p>
            <p style={{ marginBottom: 0 }}>{p.description}</p>
          </div>
        ))}
      </div>

      <h3>Also built</h3>
      <ul>
        {smallerProjects.map((p) => (
          <li key={p.title}>
            <strong>{p.title}</strong> — {p.description}
          </li>
        ))}
      </ul>

      {/* ── Work ── */}
      <h2 id="work">Work</h2>
      <ul>
        <li>
          <strong>SpotHopper</strong> · Business Development Rep · Apr 2025 – Apr 2026
          <br />
          Technical discovery for an AI marketing platform sold to a skeptical,
          non-technical buyer base. Prioritized discovery quality over call volume;
          contributed to the team's highest closed-won revenue month with roughly
          half of qualified conversations converting to booked meetings. Left
          deliberately to pursue SE/TAM roles — the AE track there hired externally.
        </li>
        <li>
          <strong>Asurion</strong> · Field Tech Sales Expert · Sep 2024 – Apr 2025
          <br />
          In-home technical support and device onboarding: walk in cold, assess an
          unfamiliar environment, fix it, and explain it in plain language.
          Exceeded sales quota while keeping customer satisfaction high.
        </li>
        <li>
          <strong>Apple</strong> · Sales Specialist → Technical Specialist →
          Technical Expert · Oct 2019 – Aug 2022
          <br />
          High-volume diagnostics across iOS, macOS, and hardware. 300+ perfect
          NPS surveys. Spotted an enterprise environment during a routine consumer
          appointment and referred it — $150K+ in verified lifetime revenue.
          Mentored teammates on troubleshooting and customer communication.
        </li>
        <li>
          <strong>Independent network consulting</strong> · 2020 – present
          <br />
          Design, deployment, and support of Ubiquiti UniFi networks for SMB and
          residential clients. <Link href="/projects/unifi/">Case study.</Link>
        </li>
      </ul>

      {/* ── Education ── */}
      <h2 id="education">Education & certifications</h2>
      <ul>
        <li>
          <strong>B.S. Cognitive Science, Design & Human-Computer Interaction</strong> —
          UC San Diego, 2024. Coursework included data structures & algorithms,
          databases, networking, and operating systems.
        </li>
        <li>
          <strong>A.S. Computer & Information Science</strong> — College of San
          Mateo, 2021, completed while working full-time at Apple.
        </li>
        <li>
          <strong>CCNA</strong> — in progress: self-study plus hands-on labs in
          Cisco Modeling Labs running on my own hypervisor.
        </li>
        <li>
          <strong>AWS Certified Solutions Architect – Associate</strong> — in progress.
        </li>
        <li>
          <strong>Eagle Scout</strong> — Boy Scouts of America, 2018.
        </li>
      </ul>

      {/* ── Contact ── */}
      <h2 id="contact">Contact</h2>
      <p>
        Email is fastest: <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a>.
        Also on <a href="https://www.linkedin.com/in/bretdubois/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and{" "}
        <a href="https://github.com/bretdubois" target="_blank" rel="noopener noreferrer">GitHub</a>.
        A printable résumé is at <Link href="/resume/">/resume</Link>.
      </p>
    </div>
  );
}
