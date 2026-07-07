"use client";

import { useState } from "react";

/*
 * Interactive topology for the Benz Collision redesign.
 *  - "before": Comcast feeds the office Lite 8; both camera cables run
 *    cameras → closet → Lite 8; a long run from the front office feeds a
 *    rear USW-Flex that powers the Verkada beacon.
 *  - "after": the two camera cables are cut in the closet. One office-side
 *    end carries WAN from the gateway up to the UDM-SE core; the other is
 *    the LAN return down to the Lite 8; both camera-side ends land on the
 *    UDM-SE PoE ports. The rear USW-Flex + beacon stay, the long run is
 *    re-homed to the closet, and a U7 Outdoor AP is added on the USW-Flex.
 * Hover or tap a reused cable (or a legend chip) to trace it. Planned
 * design, drawn to the same spec as the site's other diagrams.
 */

type Mode = "after" | "before";
type Cable = "A" | "B";

interface Wire {
  cable?: Cable;
  id?: string;
  d: string;
  role?: string;
  arrow?: boolean;
  packet?: boolean;
  label?: { text: string; x: number; y: number; dyn?: boolean };
}

const AFTER: Wire[] = [
  { cable: "B", id: "bz-wan", role: "WAN", packet: true, arrow: true, d: "M120,296 C 120,236 300,206 396,178", label: { text: "WAN feed", x: 250, y: 200, dyn: true } },
  { cable: "A", id: "bz-lan", role: "LAN", packet: true, arrow: true, d: "M470,178 C 470,306 236,372 118,372", label: { text: "LAN return", x: 320, y: 300, dyn: true } },
  { cable: "A", id: "bz-poe1", role: "PoE", packet: true, arrow: true, d: "M546,84 C 620,82 660,82 706,82", label: { text: "PoE", x: 632, y: 72, dyn: true } },
  { cable: "B", id: "bz-poe2", role: "PoE", packet: true, arrow: true, d: "M546,150 C 620,150 660,148 706,148", label: { text: "PoE", x: 632, y: 166, dyn: true } },
];

const AFTER_SUPPORT: Wire[] = [
  { d: "M500,178 C 560,250 582,322 596,352", arrow: true, label: { text: "long run · re-homed to closet", x: 556, y: 262 } },
  { d: "M746,352 C 754,340 758,330 762,323", arrow: true },
  { d: "M746,380 C 754,388 758,392 762,395", arrow: true },
];

const BEFORE: Wire[] = [
  { cable: "A", id: "bz-ba1", d: "M706,82 C 640,86 580,88 546,90" },
  { cable: "A", id: "bz-ba2", d: "M420,178 C 420,306 236,372 118,372" },
  { cable: "B", id: "bz-bb1", d: "M706,148 C 640,146 580,142 546,140" },
  { cable: "B", id: "bz-bb2", d: "M480,178 C 480,306 288,372 128,374" },
];

const BEFORE_SUPPORT: Wire[] = [
  { d: "M120,352 L 120,372", arrow: true, label: { text: "internet", x: 150, y: 366 } },
  { d: "M206,400 C 360,430 480,396 596,368", arrow: true, label: { text: "long run to rear", x: 402, y: 430 } },
  { d: "M746,352 C 754,340 758,330 762,323", arrow: true },
];

/* ── device glyphs, 20×20, stroke = ink ── */
function Icon({ type, x, y }: { type: string; x: number; y: number }) {
  const s = { fill: "none", stroke: "var(--ink)", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x},${y})`}>
      {type === "cloud" && (
        <>
          <circle cx="10" cy="10" r="7.5" {...s} />
          <path d="M2.5 10 h15 M10 2.5 c3.6 2.2 3.6 12.8 0 15 M10 2.5 c-3.6 2.2 -3.6 12.8 0 15" {...s} />
        </>
      )}
      {type === "router" && (
        <>
          <rect x="2" y="11" width="16" height="7" rx="1.4" {...s} />
          <path d="M6 11 V5 M14 11 V5" {...s} />
          <circle cx="6" cy="4" r="1.1" fill="var(--accent)" stroke="none" />
          <circle cx="14" cy="4" r="1.1" fill="var(--accent)" stroke="none" />
          <path d="M5 15 h2" {...s} />
        </>
      )}
      {type === "switch" && (
        <>
          <rect x="2" y="6.5" width="16" height="9" rx="1.4" {...s} />
          <path d="M4.5 15.5 v1.6 M8 15.5 v1.6 M11.5 15.5 v1.6 M15 15.5 v1.6" {...s} />
          <path d="M4.5 10 h4 M11 10 h4" {...s} />
        </>
      )}
      {type === "camera" && (
        <>
          <rect x="2" y="6" width="12.5" height="9" rx="1.4" {...s} />
          <path d="M14.5 8.5 L18 6.5 V14.5 L14.5 12.5" {...s} />
          <circle cx="7.5" cy="10.5" r="2.1" {...s} />
        </>
      )}
      {type === "ap" && (
        <>
          <path d="M4 11 a6 6 0 0 1 12 0" {...s} />
          <path d="M6.5 12.5 a3.4 3.4 0 0 1 7 0" {...s} />
          <circle cx="10" cy="15" r="1.3" fill="var(--ink)" stroke="none" />
        </>
      )}
      {type === "horn" && (
        <>
          <path d="M3 8 H6 L12 4 V16 L6 12 H3 Z" {...s} />
          <path d="M14.5 7 a4 4 0 0 1 0 6" {...s} />
        </>
      )}
    </g>
  );
}

interface NodeProps {
  x: number; y: number; w: number; h: number;
  icon: string; title: string; sub?: string; accent?: string; soft?: boolean;
}
function Node({ x, y, w, h, icon, title, sub, accent, soft }: NodeProps) {
  const iconY = accent ? y + 16 : y + h / 2 - 10;
  const tx = x + 42;
  const titleY = sub || accent ? y + (accent ? 30 : h / 2 - 1) : y + h / 2 + 4;
  return (
    <g className="benz-node">
      <rect x={x} y={y} width={w} height={h} rx={7} className={soft ? "node-soft" : "node-static"} />
      <Icon type={icon} x={x + 13} y={iconY} />
      <text x={tx} y={titleY} fontSize="12" fontWeight="600">{title}</text>
      {sub && <text x={tx} y={titleY + 15} className="t-muted" fontSize="9.5">{sub}</text>}
      {accent && <text x={x + 15} y={y + h - 15} className="t-accent" fontSize="9.5">{accent}</text>}
    </g>
  );
}

export default function BenzTopology() {
  const [mode, setMode] = useState<Mode>("after");
  const [pinned, setPinned] = useState<Cable | null>(null);
  const [hovered, setHovered] = useState<Cable | null>(null);
  const active = pinned ?? hovered;

  const hero = mode === "after" ? AFTER : BEFORE;
  const support = mode === "after" ? AFTER_SUPPORT : BEFORE_SUPPORT;

  const heroStyle = (cable: Cable, i: number): React.CSSProperties => ({
    stroke: active === cable ? "var(--accent)" : "var(--muted)",
    strokeWidth: active === cable ? 2 : 1.3,
    opacity: active && active !== cable ? 0.16 : 1,
    animationDelay: `${0.06 * i}s`,
  });

  return (
    <figure className="figure">
      <div className="sim" style={{ overflow: "hidden" }}>
        <div className="sim-head">
          <span>benz collision: topology</span>
          <span>planned design · interactive</span>
        </div>

        <div style={{ background: "var(--paper-raised)", padding: "0.5rem 0.5rem 0.25rem", overflowX: "auto" }}>
          <svg
            className="diagram-svg"
            viewBox="0 0 900 452"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Planned network topology. An upstairs closet holds a UniFi Dream Machine SE as the core. Two existing camera cables are cut and terminated in the closet: one office-side end carries WAN from the Comcast gateway, the other is the LAN return to the main-office Lite 8 switch, and both camera-side ends land on the core's PoE ports to keep the Verkada cameras online. A long run feeds a rear USW-Flex switch that powers a Verkada beacon and a new U7 Outdoor access point."
          >
            <defs>
              <marker id="bz-arr" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" fill="var(--muted)" />
              </marker>
              <marker id="bz-arr-a" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
              </marker>
            </defs>

            <line x1="16" y1="248" x2="884" y2="248" stroke="var(--rule)" strokeDasharray="4 5" />
            <text x="18" y="26" className="t-muted" fontSize="9.5" letterSpacing="0.12em">UPSTAIRS</text>
            <text x="18" y="272" className="t-muted" fontSize="9.5" letterSpacing="0.12em">DOWNSTAIRS</text>

            <g key={mode}>
              {/* support wires (plain, gray) */}
              {support.map((w, i) => (
                <g key={`s${i}`}>
                  <path d={w.d} className="benz-wire benz-anim edge" pathLength={1} markerEnd={w.arrow ? "url(#bz-arr)" : undefined} style={{ animationDelay: `${0.34 + 0.05 * i}s` }} />
                  {w.label && <text x={w.label.x} y={w.label.y} fontSize="9.5" textAnchor="middle" className="t-muted">{w.label.text}</text>}
                </g>
              ))}

              {/* hero wires (interactive, traced) */}
              {hero.map((w, i) => (
                <g
                  key={w.id}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Cable ${w.cable}${w.role ? ", " + w.role : ""}`}
                  onMouseEnter={() => setHovered(w.cable!)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(w.cable!)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setPinned((p) => (p === w.cable ? null : w.cable!))}
                >
                  <path d={w.d} fill="none" stroke="transparent" strokeWidth={16} />
                  <path d={w.d} id={w.id} className="benz-wire benz-anim" pathLength={1} style={heroStyle(w.cable!, i)} markerEnd={w.arrow ? (active === w.cable ? "url(#bz-arr-a)" : "url(#bz-arr)") : undefined} />
                  {w.packet && (
                    <circle className="packet" r={active === w.cable ? 3 : 2.2} style={{ fill: active === w.cable ? "var(--accent)" : "var(--muted)", opacity: active && active !== w.cable ? 0.1 : active === w.cable ? 1 : 0.5 }}>
                      <animateMotion dur={`${2.6 + (i % 2) * 0.5}s`} repeatCount="indefinite" begin={`${0.15 * i}s`}>
                        <mpath href={`#${w.id}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              ))}
            </g>

            {/* dynamic role labels */}
            {mode === "after" &&
              AFTER.filter((w) => w.label).map((w) => (
                <text key={w.id} x={w.label!.x} y={w.label!.y} fontSize="9.5" textAnchor="middle"
                  style={{ fill: active === w.cable ? "var(--accent)" : "var(--muted)", fontWeight: active === w.cable ? 600 : 400, opacity: active && active !== w.cable ? 0.16 : 1, transition: "fill 0.15s ease, opacity 0.15s ease" }}>
                  {w.label!.text}
                </text>
              ))}
            {mode === "before" && (
              <text x={296} y={300} fontSize="9.5" textAnchor="middle" className="t-muted">original camera runs</text>
            )}

            {/* ── nodes ── */}
            {mode === "after" ? (
              <Node x={340} y={52} w={206} h={126} icon="router" title="Upstairs closet · core" sub="UniFi Dream Machine SE" accent="2 camera cables cut + terminated here" />
            ) : (
              <Node x={340} y={52} w={206} h={126} icon="router" title="Upstairs closet" sub="camera cables pass through" />
            )}

            <Node x={706} y={58} w={152} h={48} icon="camera" title="Verkada cam 1" soft />
            <Node x={706} y={124} w={152} h={48} icon="camera" title="Verkada cam 2" soft />

            <Node x={34} y={296} w={172} h={56} icon="cloud" title="Comcast gateway" sub="main office · coax" soft />
            <Node x={34} y={372} w={172} h={56} icon="switch" title="UniFi Lite 8" sub={mode === "after" ? "LAN edge switch" : "main-office switch"} />

            {/* rear / exterior cluster */}
            <Node x={596} y={336} w={150} h={56} icon="switch" title="USW-Flex" sub="rear exterior" soft />
            <Node x={762} y={296} w={128} h={50} icon="horn" title="Verkada beacon" soft />
            {mode === "after" && <Node x={762} y={370} w={128} h={50} icon="ap" title="U7 Outdoor" sub="new · WiFi 7" soft />}
          </svg>
        </div>

        <div className="sim-controls">
          <div className="sim-walk">
            <span className="sim-ctrl-label">view</span>
            <button type="button" className={mode === "before" ? "term-chip sim-chip-on" : "term-chip"} onClick={() => setMode("before")} aria-pressed={mode === "before"}>before</button>
            <button type="button" className={mode === "after" ? "term-chip sim-chip-on" : "term-chip"} onClick={() => setMode("after")} aria-pressed={mode === "after"}>after</button>
          </div>
          <div className="sim-toggles">
            <span className="sim-ctrl-label">trace</span>
            <button
              type="button"
              className={active === "A" ? "term-chip sim-chip-on" : "term-chip"}
              onMouseEnter={() => setHovered("A")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === "A" ? null : "A"))}
            >
              cable A: LAN + camera 1
            </button>
            <button
              type="button"
              className={active === "B" ? "term-chip sim-chip-on" : "term-chip"}
              onMouseEnter={() => setHovered("B")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === "B" ? null : "B"))}
            >
              cable B: WAN + camera 2
            </button>
          </div>
        </div>
      </div>
      <figcaption>
        <span className="fig-index">Fig. 01</span>
        Planned topology: toggle before/after, hover either reused cable to trace it
      </figcaption>
    </figure>
  );
}
