import Link from "next/link";
import Section from "@/components/Section";
import StackDiagram from "@/components/diagrams/StackDiagram";

interface ProjectEntry {
  href: string;
  title: string;
  meta: string;
  description: string;
}

const projects: ProjectEntry[] = [
  {
    href: "/projects/roomtag/",
    title: "RoomTag: indoor positioning from Wi-Fi fingerprints",
    meta: "ESP32-C6 · FastAPI · scikit-learn / PyTorch · ONNX · SwiftUI",
    description:
      "A wearable ESP32 tag scans nearby access points and a self-hosted ML server infers which room you're in, with no cameras, beacons, or GPS. Random-forest and neural models, an inference pipeline with EMA smoothing and Bayesian priors, OTA firmware via GitHub Actions, and an iOS app.",
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
    title: "JARVIS: a deterministic-first personal assistant",
    meta: "Python · systemd · Telegram · Ollama · local LLMs",
    description:
      "A Telegram bot that operates my infrastructure: daily briefs, container control, backup monitoring, location awareness, and a job-search pipeline. Designed so every daily-use command works even when every LLM is unreachable.",
  },
  {
    href: "/projects/homelab/",
    title: "The platform underneath: a homelab run like production",
    meta: "Ubuntu · Docker Compose · restic · Tailscale · KVM",
    description:
      "The always-on box the other projects live on: a dozen composed services, monitored nightly backups with a written retention policy, a mesh VPN, and written operating rules for making changes safely.",
  },
  {
    href: "/projects/unifi/",
    title: "Benz Collision: a network core in a closet",
    meta: "Ubiquiti UniFi · PoE · Comcast Business · Verkada · structured cabling",
    description:
      "A network redesign for a working auto body shop. Site survey, constraint analysis, and topology design that turns an upstairs closet into the core by reusing camera cabling that already ran through it.",
  },
];

const smallerProjects = [
  {
    title: "Beat Saber automapper",
    description:
      "turns a YouTube link into a playable custom map by wrapping an open-source neural mapper, including three upstream bug fixes (audio decode fallback, codec crash, numpy broadcast) to get it working.",
  },
  {
    title: "RelayCRM",
    description:
      "a personal-relationship CRM in Next.js and Supabase with Claude-assisted contact notes.",
  },
  {
    title: "This site",
    description:
      "static Next.js on GitHub Pages, hand-set type, hand-drawn SVG diagrams, no animation framework. Design decisions in the colophon.",
  },
];

function Hero() {
  return (
    <section className="shell pt-16 pb-2">
      <p className="label rise" style={{ marginBottom: "1.25rem" }}>
        Solutions engineering · Redwood City, CA
      </p>
      <h1
        className="display rise"
        style={{
          fontSize: "clamp(2.625rem, 6.5vw, 4.75rem)",
          maxWidth: "56rem",
          animationDelay: "0.08s",
        }}
      >
        Technical seller
        <br />
        who <span className="display-italic">builds</span>
        <span className="accent-dot">.</span>
      </h1>

      <div
        className="mt-10 grid gap-10 rise"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))",
          animationDelay: "0.18s",
        }}
      >
        <div className="prose" style={{ maxWidth: "36rem" }}>
          <p className="lead">
            Three years at Apple doing high-volume hardware and software triage:
            two promotions, 300+ perfect satisfaction scores, one intake
            conversation that became a $150K+ enterprise account. A year in B2B
            SaaS running technical discovery for an AI platform. Nights and
            weekends, I build and operate the systems on this page.
          </p>
          <p>
            I'm looking for <strong>Solutions Engineering / Sales Engineering /
            Technical Account Management</strong> roles at AI, networking, and
            cloud companies, the job where explaining a system well matters as
            much as understanding it.
          </p>
        </div>
        <div style={{ maxWidth: "22rem" }}>
          <dl className="fact-card">
            <div className="fact-row">
              <dt className="fact-key">Status</dt>
              <dd className="fact-value">Open to SE / SE-adjacent roles</dd>
            </div>
            <div className="fact-row">
              <dt className="fact-key">Location</dt>
              <dd className="fact-value">SF Bay Area · hybrid or remote</dd>
            </div>
            <div className="fact-row">
              <dt className="fact-key">Focus</dt>
              <dd className="fact-value">AI · networking · cloud infra</dd>
            </div>
            <div className="fact-row">
              <dt className="fact-key">In progress</dt>
              <dd className="fact-value">CCNA · AWS SAA</dd>
            </div>
            <div className="fact-row">
              <dt className="fact-key">Contact</dt>
              <dd className="fact-value">
                <a
                  href="mailto:bretdubois1@gmail.com"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  bretdubois1@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="pb-4">
      <Hero />

      <div className="shell">
        <Section index="01" title="Selected work" id="projects">
          <p>
            The fastest way to know whether I can do the job is to look at what
            I've built. Most of it runs as one system on an always-on box under my
            desk, managed from the Linux CLI and run like production: version-controlled
            compose, secrets kept out of git, monitored nightly backups. Here it is
            as a map; every outlined piece has a writeup.
          </p>
          <StackDiagram />
          <p style={{ marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            The case studies, in the order I'd want you to read them:
          </p>
          <div>
            {projects.map((p, i) => (
              <Link key={p.href} href={p.href} className="project-row">
                <span className="row-index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="row-title">
                    {p.title}
                    <span className="row-arrow" aria-hidden>
                      →
                    </span>
                  </span>
                  <span className="meta" style={{ display: "block", margin: "0.375rem 0" }}>
                    {p.meta}
                  </span>
                  <span
                    style={{
                      display: "block",
                      color: "var(--ink-secondary)",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {p.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <h3>Also built</h3>
          <ul>
            {smallerProjects.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>: {p.description}
              </li>
            ))}
          </ul>
        </Section>

        <Section index="02" title="Work" id="work">
          <p>
            The building is one half. The other half is six years of translating
            between technical systems and the people who buy them: enterprise
            referrals at Apple, technical discovery for an AI platform at SpotHopper,
            in-home consulting at Asurion. That combination is the whole pitch for a
            solutions role.
          </p>
          <ul>
            <li>
              <strong>SpotHopper</strong> · Business Development Rep · Apr 2025 –
              Apr 2026
              <br />
              Technical discovery for an AI marketing platform sold to a skeptical,
              non-technical buyer base. Prioritized discovery quality over call
              volume; contributed to the team's highest closed-won revenue month
              with roughly half of qualified conversations converting to booked
              meetings. Left deliberately to pursue SE/TAM roles: the AE track
              there hired externally.
            </li>
            <li>
              <strong>Asurion</strong> · Field Tech Sales Expert · Sep 2024 – Apr
              2025
              <br />
              In-home technical support and device onboarding: walk in cold, assess
              an unfamiliar environment, fix it, and explain it in plain language.
              Exceeded sales quota while keeping customer satisfaction high.
            </li>
            <li>
              <strong>Apple</strong> · Sales Specialist → Technical Specialist →
              Technical Expert · Oct 2019 – Aug 2022
              <br />
              High-volume diagnostics across iOS, macOS, and hardware. 300+ perfect
              NPS surveys. Spotted an enterprise environment during a routine
              consumer appointment and referred it: $150K+ in verified lifetime
              revenue. Mentored teammates on troubleshooting and customer
              communication.
            </li>
            <li>
              <strong>Independent network consulting</strong> · 2020 – present
              <br />
              Design, deployment, and support of Ubiquiti UniFi networks for SMB
              and residential clients. <Link href="/projects/unifi/">Case study.</Link>
            </li>
          </ul>
        </Section>

        <Section index="03" title="Education & certs" id="education">
          <ul>
            <li>
              <strong>B.S. Cognitive Science, Design & Human-Computer
              Interaction</strong>: UC San Diego, 2024. Coursework included data
              structures & algorithms, databases, networking, and operating
              systems.
            </li>
            <li>
              <strong>A.S. Computer & Information Science</strong>: College of
              San Mateo, 2021, completed while working full-time at Apple.
            </li>
            <li>
              <strong>CCNA</strong>: in progress: self-study plus hands-on labs in
              Cisco Modeling Labs running on my own hypervisor.
            </li>
            <li>
              <strong>AWS Certified Solutions Architect – Associate</strong>: in
              progress.
            </li>
            <li>
              <strong>Eagle Scout</strong>: Boy Scouts of America, 2018.
            </li>
          </ul>
        </Section>

        <Section index="04" title="Contact" id="contact">
          <p>
            Email is fastest:{" "}
            <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a>. Also
            on{" "}
            <a
              href="https://www.linkedin.com/in/bretdubois/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/bretdubois"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . A printable résumé is at <Link href="/resume/">/resume</Link>, and
            the thinking behind this site's design is in the{" "}
            <Link href="/colophon/">colophon</Link>.
          </p>
        </Section>
      </div>
    </div>
  );
}
