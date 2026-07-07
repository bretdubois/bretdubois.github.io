import type { Metadata } from "next";
import Link from "next/link";
import SpecSheet from "@/components/SpecSheet";

export const metadata: Metadata = {
  title: "Benz Collision: a UniFi network redesign",
  description:
    "A network redesign for an auto body shop under real constraints: site survey, topology design, and reusing existing camera cabling to turn an upstairs closet into the network core.",
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
        Benz Collision: a network core in a closet
      </h1>
      <SpecSheet
        items={[
          { key: "Role", value: "Network consultant: survey, hardware selection, topology design, install planning" },
          { key: "Stack", value: "Ubiquiti UniFi · PoE · Comcast Business · Verkada · structured cabling" },
          { key: "Status", value: "Design complete · Phase 1 install planned, 2026" },
          { key: "Budget", value: "~$1,500 hardware ceiling" },
        ]}
      />
      <div className="prose" style={{ maxWidth: "42rem" }}>
      <p className="lead">
        Benz Collision is an auto body shop in Redwood City that needed real Wi-Fi
        across four spaces that behave nothing alike: a front office, an upstairs
        office, a metal-heavy shop floor, and a rear exterior work area. The
        strongest decision on the job came from the walkaround, not the catalog:
        an upstairs utility closet could become the network core, because the
        existing camera cabling already ran through it.
      </p>

      <h2>The problem</h2>
      <p>
        Coverage gaps across rooms with completely different RF behavior: drywall
        offices, an open shop floor full of steel and vehicles that absorb 5 GHz,
        and an outdoor work area with no wired drop nearby. One flat, aging setup
        could not serve all four, and the shop could not stop working while it got
        fixed. This was not a blank-slate install. It was a redesign around live
        internet, live cameras, and cable paths that were only partially
        documented.
      </p>

      <h2>What was already there</h2>
      <ul>
        <li>Comcast Business internet terminating on coax in the main office, into a Comcast gateway that stays put.</li>
        <li>Verkada cameras with existing home-run cabling that had to stay online.</li>
        <li>A UniFi Lite 8 PoE switch in the main office, plus an exterior UniFi switch.</li>
        <li>Partially understood cable paths: some runs documented, some traced by hand during the survey.</li>
      </ul>

      <h2>Constraints</h2>
      <ul>
        <li>
          <strong>An operating business, no real downtime.</strong> Repairs could
          not stall for a network cutover; the work had to be staged around shop
          hours.
        </li>
        <li>
          <strong>Reuse over rewiring.</strong> Pulling new cable through a working
          body shop is expensive and disruptive, so existing runs had to be reused
          wherever it was safe to.
        </li>
        <li>
          <strong>Camera connectivity is non-negotiable.</strong> The Verkada
          cameras had to survive the change, during and after.
        </li>
        <li>~$1,500 hardware ceiling.</li>
      </ul>

      <h2>Architecture decisions</h2>
      <ul>
        <li>
          <strong>The upstairs closet becomes the network core.</strong> Two of the
          existing camera cables pass straight through an upstairs utility closet.
          That made the closet the natural home for the core, a UniFi Dream Machine
          SE: central to the building, out of the work areas, and already holding
          the cabling I needed. Reading that off the site survey is what turned a
          coverage job into a clean redesign.
        </li>
        <li>
          <strong>Reuse the two camera cables instead of pulling new WAN and LAN
          runs.</strong> Both cables get cut and terminated in the closet. Each
          split yields an office-side end and a camera-side end, and all four ends
          get a job:
          <ul>
            <li>Office-side end 1 becomes the <strong>WAN feed</strong>, carrying internet from the Comcast gateway in the main office up to the UDM-SE.</li>
            <li>Office-side end 2 becomes the <strong>LAN return</strong>, carrying the network back down from the UDM-SE to the main-office switch.</li>
            <li>Both camera-side ends plug into the <strong>UDM-SE PoE ports</strong>, keeping the two Verkada cameras online, now powered and switched by the core.</li>
          </ul>
          The result is a full uplink plus two live camera drops with zero new cable
          pulled through the building.
        </li>
        <li>
          <strong>The downstairs Lite 8 becomes a LAN edge switch</strong> for the
          main office, fed by the LAN return, so the existing office drops keep
          working without change.
        </li>
        <li>
          <strong>Wired APs placed for line of sight, not mesh.</strong> The main
          office gets a wall-mounted AP, since the UDM-SE upstairs does not throw
          useful signal down into the office. The upstairs office gets an AP fed
          directly from the closet. The shop floor and rear exterior are covered by
          wired APs positioned for line of sight across the metal, where a wired
          backhaul matters most. Mesh is designed in only as a fallback for the
          hardest exterior corner, never as the primary link: in a steel shop, mesh
          is a coverage patch, not a plan.
        </li>
      </ul>

      <h2>Tradeoffs</h2>
      <ul>
        <li>
          Cutting live camera cables is the risky move, so it gets planned the
          hardest: label both ends before cutting, terminate and test each camera
          drop before moving on, and stage the work so the cameras are down for
          minutes, not the day.
        </li>
        <li>
          Reusing camera runs for WAN and LAN saves a full day of cable pulling and
          keeps the build under the hardware ceiling, at the cost of a more careful
          termination plan. For an operating shop, less disruption is worth more
          than a textbook home-run.
        </li>
        <li>
          Wired APs over a mesh-first design cost a little more cabling effort now
          and buy reliability that survives a floor full of moving steel and
          vehicles.
        </li>
      </ul>

      <h2>Status and deliverables</h2>
      <p>
        Site survey, constraint analysis, topology design, hardware selection, and
        the install plan are complete. Phase 1 deployment is scheduled for 2026.
      </p>
      <ul>
        <li>A labeled network diagram and the cable-termination map: which end lands where in the closet, and why.</li>
        <li>The AP placement plan, with the wired-versus-mesh reasoning written down.</li>
        <li>A short runbook so the shop, or the next technician, can maintain it without calling me.</li>
      </ul>
      <p>
        The point of this one is not "I installed UniFi gear." It is infrastructure
        reasoning under real constraints: read the site, respect what is already
        working, reuse what you can, protect what cannot go down, and leave behind
        something documented enough to outlast you. An undocumented network is a
        permanent dependency on whoever built it, and permanent dependencies are
        bad engineering and worse business.
      </p>
      </div>
    </div>
  );
}
