import type { Metadata } from "next";
import Link from "next/link";
import SpecSheet from "@/components/SpecSheet";

export const metadata: Metadata = {
  title: "Client network design: a UniFi case study",
  description:
    "Independent Ubiquiti UniFi consulting: one engagement in detail, covering constraints, architecture decisions, tradeoffs, and the documented handoff.",
  alternates: { canonical: "/projects/unifi/" },
};

export default function UnifiPage() {
  return (
    <div className="shell pt-14 pb-4">
      <p className="label" style={{ marginBottom: "1rem" }}>
        <Link href="/#projects" style={{ textDecoration: "none", color: "inherit" }}>
          ← projects
        </Link>
      </p>
      <h1 className="display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "48rem" }}>
        Client network design: a UniFi case study
      </h1>
      <SpecSheet
        items={[
          { key: "Role", value: "Consultant: design through handoff" },
          { key: "Stack", value: "Ubiquiti UniFi · VLANs · PoE" },
          { key: "Status", value: "Practice ongoing since 2020" },
          { key: "Budget", value: "$1,200 hardware ceiling" },
        ]}
      />
      <div className="prose" style={{ maxWidth: "42rem" }}>
      <p>
        Since 2020 I've designed, deployed, and supported Ubiquiti UniFi networks
        for SMB and residential clients: discovery, component selection, cabling
        and PoE planning, configuration, remote access, and post-deployment
        support. One engagement in detail, because the reasoning matters more than
        the parts list.
      </p>

      <h2>The problem</h2>
      <p>
        A 3,000 sq ft home office with Wi-Fi dead zones, IP cameras sharing a flat
        network with work machines, and video calls dropping whenever camera
        traffic spiked.
      </p>

      <h2>Constraints</h2>
      <ul>
        <li>No rewiring: had to work with the existing Cat5e runs.</li>
        <li>
          Non-technical client who needed to manage guest Wi-Fi independently
          after handoff.
        </li>
        <li>$1,200 hardware ceiling.</li>
        <li>The ISP modem couldn't be removed (lease agreement).</li>
      </ul>

      <h2>Architecture decisions</h2>
      <ul>
        <li>
          <strong>Gateway behind the ISP modem in double-NAT</strong> rather than
          bridge mode. Bridging was unreliable on this ISP, and an outage during
          cutover was the greater risk for a client who works from home. Double-NAT
          is inelegant; it was also the right call.
        </li>
        <li>
          <strong>24-port managed PoE switch</strong> at the network closet feeding
          APs and cameras over the existing runs.
        </li>
        <li>
          <strong>Three APs placed by RF walkaround</strong>, targeting −65 dBm or
          better everywhere. The controller's auto-placement didn't account for
          concrete partition walls in the office conversion, so placement was
          manual.
        </li>
        <li>
          <strong>Four VLANs</strong>: Main (work and personal), IoT (inter-VLAN
          blocked), Cameras (uplink-only, no LAN access), and Guest
          (client-isolated, rate-limited).
        </li>
      </ul>

      <h2>Tradeoffs</h2>
      <p>
        I specified higher-tier APs that pushed slightly past the hardware budget.
        The client was actively adding smart-home devices, and the cost delta was
        smaller than a return visit to replace underpowered APs within a year.
        Saying "this costs more now so it doesn't cost more later," with the
        reasoning shown, is most of what consulting is.
      </p>

      <h2>Outcome</h2>
      <ul>
        <li>Coverage verified at −65 dBm or better throughout.</li>
        <li>Video-call drops stopped; camera traffic isolated to its own VLAN.</li>
        <li>
          Client manages SSIDs and guest access through the controller without
          support calls.
        </li>
        <li>
          Delivered a three-page runbook: network diagram, VLAN table, how to add a
          device to the right network, and admin recovery procedure.
        </li>
      </ul>
      <p>
        Every deployment ends with documentation like that. An undocumented network
        is a permanent dependency on whoever built it, and permanent dependencies
        are bad engineering and worse business.
      </p>
      </div>
    </div>
  );
}
