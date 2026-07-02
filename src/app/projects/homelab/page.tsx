import type { Metadata } from "next";
import Link from "next/link";
import SpecSheet from "@/components/SpecSheet";

export const metadata: Metadata = {
  title: "The platform underneath — a homelab run like production",
  description:
    "An always-on Ubuntu box with a dozen composed Docker services, monitored nightly backups, a Tailscale mesh, and written operating rules for safe changes.",
  alternates: { canonical: "/projects/homelab/" },
};

export default function HomelabPage() {
  return (
    <div className="shell pt-14 pb-4">
      <p className="label" style={{ marginBottom: "1rem" }}>
        <Link href="/#projects" style={{ textDecoration: "none", color: "inherit" }}>
          ← projects
        </Link>
      </p>
      <h1 className="display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "48rem" }}>
        The platform underneath — a homelab run like production
      </h1>
      <SpecSheet
        items={[
          { key: "Role", value: "Owner-operator" },
          { key: "Stack", value: "Ubuntu · Docker Compose · restic · Tailscale · KVM" },
          { key: "Status", value: "Always on" },
          { key: "Year", value: "2024–present" },
        ]}
      />
      <div className="prose" style={{ maxWidth: "42rem" }}>
      <p>
        Every other project on this site runs on one always-on Dell OptiPlex.
        There's no Kubernetes and no cloud bill — the interesting part isn't scale,
        it's <strong>operational discipline on a machine nobody is paid to
        maintain</strong>. The difference between a homelab and a science project is
        whether it's still working six months after you stopped thinking about it.
      </p>

      <h2>The service fleet</h2>
      <p>
        A single version-controlled Docker Compose file manages the core stack:
        PostgreSQL (shared by n8n and the{" "}
        <Link href="/projects/trading-stack/">trading system</Link>), n8n for
        workflow automation, Open WebUI for LLM chat against local and hosted
        models, CouchDB syncing my Obsidian vault across devices, a media stack,
        and the <Link href="/projects/roomtag/">RoomTag</Link> inference server.
        Alongside Docker, a KVM/libvirt VM runs Cisco Modeling Labs for CCNA lab
        topologies.
      </p>
      <p>Conventions, applied uniformly:</p>
      <ul>
        <li>One directory per service; compose definition and data live together.</li>
        <li>
          Credentials in <code>.env</code> files only — never in compose files,
          never in git.
        </li>
        <li>
          <code>restart: unless-stopped</code> on everything that should survive a
          power cut, and deliberately <em>not</em> on things that shouldn't
          (the Minecraft server doesn't need to outlive a reboot).
        </li>
        <li>
          Nothing exposed to the public internet: remote access is a Tailscale mesh
          spanning the OptiPlex, MacBook, iPhone, and the GPU desktop.
        </li>
      </ul>

      <h2>Backups that are actually checked</h2>
      <p>
        restic snapshots the compose tree, service data, and the Obsidian vault to
        NAS storage nightly, with a keep-daily/weekly/monthly retention policy.
        The part most homelabs skip: <Link href="/projects/jarvis/">JARVIS</Link>{" "}
        runs a daily watchdog that compares the newest snapshot's age against a
        25-hour threshold and pings my phone only if backups have stopped. Backup
        systems fail silently; monitoring is what makes them real.
      </p>

      <h2>Written operating rules</h2>
      <p>
        After enough self-inflicted outages, I wrote down operating rules and keep
        them in the same knowledge base as the infrastructure docs:
      </p>
      <ul>
        <li>
          <strong>Audit first, act second</strong> — verify actual state before
          changing anything; never trust memory of how a service was configured.
        </li>
        <li>
          <strong>Propose before executing</strong> — write out what will change
          before it happens, even when working alone. It catches bad plans while
          they're still cheap.
        </li>
        <li>
          <strong>No unconfirmed restarts</strong> — a restart hides evidence.
          Understand why a service is misbehaving before bouncing it.
        </li>
        <li>
          <strong>Flag surprises</strong> — anything that deviates from documented
          state gets recorded, not quietly fixed.
        </li>
      </ul>
      <p>
        The same discipline extends to supply chain: I dropped one popular
        LLM-gateway dependency from the stack entirely after it shipped a
        compromised release — self-hosted doesn't mean exempt from vendor
        diligence.
      </p>

      <h2>Documentation as infrastructure</h2>
      <p>
        The stack is documented in an Obsidian vault that lives on the stack it
        describes (and is backed up off it): a verified service map, per-project
        notes with session logs, decision records with the reasoning attached, and
        runbooks. When something breaks at 11pm, the answer to "how was this
        configured and why" is a grep away.
      </p>

      <h2>Why it matters for the job I want</h2>
      <p>
        Solutions engineering is explaining systems you understand deeply to people
        who need to trust you quickly. This box is where that understanding comes
        from — networking, containers, databases, backups, VPNs, LLM tooling — not
        as course material but as things I've deployed, broken, monitored, and
        fixed.
      </p>
      </div>
    </div>
  );
}
