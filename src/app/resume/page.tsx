import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Bret DuBois: Solutions Engineering / Sales Engineering / Technical Account Management. Technical sales background, self-hosted infrastructure, networking, and AI tooling.",
  alternates: { canonical: "/resume/" },
};

function Entry({
  title,
  org,
  period,
  children,
}: {
  title: string;
  org: string;
  period: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>
          {title} · <span style={{ fontWeight: 500 }}>{org}</span>
        </h3>
        <span className="meta">{period}</span>
      </div>
      {children}
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="shell prose pt-14 pb-4" style={{ maxWidth: "48rem" }}>
      <div className="no-print mb-6 flex items-baseline justify-between">
        <p className="label" style={{ marginBottom: 0 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            ← home
          </Link>
        </p>
        <PrintButton />
      </div>

      <h1 className="display" style={{ fontSize: "2.25rem" }}>
        Bret DuBois
      </h1>
      <p className="meta" style={{ marginBottom: "1.5rem" }}>
        Redwood City, CA ·{" "}
        <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a> ·{" "}
        <a href="https://www.linkedin.com/in/bretdubois/">linkedin.com/in/bretdubois</a> ·{" "}
        <a href="https://brdubois.com">brdubois.com</a>
      </p>

      <p>
        Technical go-to-market professional: three years at Apple resolving complex
        hardware/software issues at scale (300+ perfect NPS surveys, $150K+ in
        enterprise referrals), a year as a BDR at an AI SaaS company running
        technical discovery, and an independent networking practice. Builds and
        operates his own infrastructure: a multi-service AI agent stack (Docker,
        Python, PostgreSQL, Claude API), a broker-integrated futures trading
        system, and indoor-positioning hardware. CCNA in progress. Targeting
        Solutions Engineering and Technical Account Management roles at AI, cloud,
        and networking companies.
      </p>

      <h2>Experience</h2>

      <Entry
        title="Business Development Representative"
        org="SpotHopper, SF Bay Area"
        period="Apr 2025 – Apr 2026"
      >
        <ul style={{ marginBottom: 0 }}>
          <li>
            Ran technical discovery for an AI marketing platform, translating
            platform architecture into value narratives for non-technical buyers.
          </li>
          <li>
            Prioritized discovery quality over volume: ~50% qualified-to-booked
            conversion; consistently recognized by AEs for high-fit meetings that
            converted.
          </li>
          <li>
            Contributed to the team's highest closed-won revenue month
            (January 2026); director of BD requested I stay upon departure.
          </li>
          <li>
            Left to pursue SE/TAM roles directly: the org hired AEs externally
            with no internal promotion track.
          </li>
        </ul>
      </Entry>

      <Entry
        title="Field Tech Sales Expert"
        org="Asurion, San Diego"
        period="Sep 2024 – Apr 2025"
      >
        <ul style={{ marginBottom: 0 }}>
          <li>
            Delivered on-site technical support and device onboarding for mobile
            and smart-home products; resolved complex configuration and
            connectivity issues in unfamiliar environments.
          </li>
          <li>
            Exceeded sales quotas while maintaining high CSAT; coached new hires on
            troubleshooting workflows and consultative discovery.
          </li>
        </ul>
      </Entry>

      <Entry
        title="Technical Expert (2 promotions)"
        org="Apple, San Mateo"
        period="Oct 2019 – Aug 2022"
      >
        <ul style={{ marginBottom: 0 }}>
          <li>
            Diagnosed and resolved technical issues across iOS, macOS, hardware,
            and device ecosystems at high volume; maintained 300+ perfect Net
            Promoter Score surveys.
          </li>
          <li>
            Identified and referred high-value business customers to enterprise
            AEs, over $150K in verified lifetime revenue from a single referral.
          </li>
          <li>
            Trained and mentored teammates on advanced troubleshooting and customer
            communication.
          </li>
        </ul>
      </Entry>

      <Entry
        title="Independent Network Technician / Consultant"
        org="Redwood City"
        period="2020 – present"
      >
        <ul style={{ marginBottom: 0 }}>
          <li>
            Design, deployment, and support of Ubiquiti UniFi networks (switching,
            APs, PoE, VLANs, remote access) for SMB and residential clients, full
            lifecycle from discovery to documented handoff.
          </li>
        </ul>
      </Entry>

      <h2>Technical projects</h2>
      <ul>
        <li>
          <strong>AI agent + trading automation stack</strong>: production
          multi-service stack on Ubuntu: Telegram-fronted assistant (Python,
          systemd, LLM fallback chain) plus a futures trading system that ingests
          real-time signals and executes through the ProjectX/TopstepX broker API
          with a full risk layer. PostgreSQL state, Docker Compose orchestration,
          paper and live modes.
        </li>
        <li>
          <strong>RoomTag</strong>: Wi-Fi-fingerprint indoor positioning: ESP32-C6
          firmware, self-hosted FastAPI inference server (random forest + ONNX
          neural ensemble), iOS app, Home Assistant integration, OTA firmware
          releases via GitHub Actions.
        </li>
        <li>
          <strong>Home lab & remote access infrastructure</strong>: self-hosted
          Docker services (PostgreSQL, n8n, Open WebUI, CouchDB), Tailscale mesh
          VPN, monitored restic backups, KVM/libvirt VMs running Cisco Modeling
          Labs. Managed entirely via Linux CLI.
        </li>
        <li>
          <strong>Ubiquiti UniFi deployments</strong>: multiple SMB/residential
          installs: switching, APs, PoE, IP cameras, VLAN segmentation, remote
          access. <Link href="/projects/unifi/">Case study.</Link>
        </li>
      </ul>

      <h2>Education</h2>
      <ul>
        <li>
          <strong>B.S. Cognitive Science, Specialization in Design & HCI</strong>: UC San Diego, June 2024. Relevant coursework: data structures &
          algorithms, OOP, databases, networking fundamentals, operating systems.
        </li>
        <li>
          <strong>A.S. Computer & Information Science</strong>: College of San
          Mateo, 2021.
        </li>
      </ul>

      <h2>Certifications & awards</h2>
      <ul>
        <li>CCNA: in progress (self-study + Cisco Modeling Labs).</li>
        <li>AWS Certified Solutions Architect – Associate: in progress.</li>
        <li>Cloud Computing Fundamentals, IBM: 2024.</li>
        <li>Eagle Scout, Boy Scouts of America: 2018.</li>
      </ul>

      <h2>Skills</h2>
      <ul>
        <li>
          <strong>Sales & GTM</strong>: consultative selling, technical discovery,
          value-based solutioning, objection handling, pipeline development, AE
          partnership, CRM.
        </li>
        <li>
          <strong>Technical</strong>: Linux, Docker, Bash, Python (pandas, numpy,
          sklearn), JavaScript/Next.js, SQL, PostgreSQL, REST APIs & webhooks, git,
          n8n, LLM tooling (Claude API, Ollama, prompt engineering).
        </li>
        <li>
          <strong>Networking</strong>: LAN/WAN, switching & routing, Ubiquiti
          UniFi, PoE, VLANs, Tailscale/SSH remote access, Wi-Fi troubleshooting,
          network design & deployment.
        </li>
        <li>
          <strong>Platforms</strong>: macOS, Windows, Linux, iOS, Android,
          Supabase, Docker Compose, KVM/libvirt.
        </li>
      </ul>
    </div>
  );
}
