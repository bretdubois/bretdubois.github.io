"use client";

import { useState } from "react";

/*
 * Interactive topology for the Benz Collision redesign.
 *  - "before": the two camera cables run cameras → closet → office switch,
 *    the closet a passive passthrough.
 *  - "after": the cables are cut and terminated in the closet, which now
 *    holds the UDM-SE core; the four ends are repurposed as WAN feed, LAN
 *    return, and two PoE camera drops.
 * Core-and-leaves layout, curved connectors, a packet that flows along
 * the traced cable. Hover or tap a cable (or a legend chip) to trace it.
 * Planned design; drawn to the same spec as the site's other diagrams.
 */

type Mode = "after" | "before";
type Cable = "A" | "B";

interface Wire {
  cable: Cable;
  id: string;
  d: string;
  role?: string;
  label?: { text: string; x: number; y: number };
  arrow?: boolean;
}

const AFTER: Wire[] = [
  { cable: "A", id: "bz-wan", role: "WAN", d: "M130,300 C 130,244 250,214 350,186", arrow: true, label: { text: "WAN feed", x: 236, y: 204 } },
  { cable: "B", id: "bz-lan", role: "LAN", d: "M430,186 C 430,250 372,276 327,300", arrow: true, label: { text: "LAN return", x: 452, y: 248 } },
  { cable: "A", id: "bz-poe1", role: "PoE", d: "M506,104 C 552,98 582,96 604,95", arrow: true, label: { text: "PoE", x: 556, y: 84 } },
  { cable: "B", id: "bz-poe2", role: "PoE", d: "M506,154 C 552,160 582,162 604,163", arrow: true, label: { text: "PoE", x: 556, y: 178 } },
];

const AFTER_SUPPORT = [
  "M300,120 C 262,120 230,124 202,125",
  "M404,331 L 434,331",
  "M470,186 C 560,232 636,262 679,300",
];

const BEFORE: Wire[] = [
  { cable: "A", id: "bz-ba1", d: "M604,95 C 560,100 522,105 506,108" },
  { cable: "A", id: "bz-ba2", d: "M350,186 C 348,250 330,282 315,300" },
  { cable: "B", id: "bz-bb1", d: "M604,163 C 560,158 522,153 506,150" },
  { cable: "B", id: "bz-bb2", d: "M430,186 C 430,252 362,282 337,300" },
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
    </g>
  );
}

interface NodeProps {
  x: number; y: number; w: number; h: number;
  icon: string; title: string; sub?: string; accent?: string; soft?: boolean;
}
function Node({ x, y, w, h, icon, title, sub, accent, soft }: NodeProps) {
  const iconY = accent ? y + 16 : y + h / 2 - 10;
  const tx = x + 44;
  const titleY = sub || accent ? y + (accent ? 30 : h / 2 - 1) : y + h / 2 + 4;
  return (
    <g className="benz-node">
      <rect x={x} y={y} width={w} height={h} rx={7} className={soft ? "node-soft" : "node-static"} />
      <Icon type={icon} x={x + 14} y={iconY} />
      <text x={tx} y={titleY} fontSize="12" fontWeight="600">{title}</text>
      {sub && <text x={tx} y={titleY + 16} className="t-muted" fontSize="10">{sub}</text>}
      {accent && <text x={x + 16} y={y + h - 16} className="t-accent" fontSize="10">{accent}</text>}
    </g>
  );
}

export default function BenzTopology() {
  const [mode, setMode] = useState<Mode>("after");
  const [pinned, setPinned] = useState<Cable | null>(null);
  const [hovered, setHovered] = useState<Cable | null>(null);
  const active = pinned ?? hovered;

  const wires = mode === "after" ? AFTER : BEFORE;

  const wireStyle = (cable: Cable, i: number): React.CSSProperties => ({
    stroke: active === cable ? "var(--accent)" : "var(--muted)",
    strokeWidth: active === cable ? 2 : 1.3,
    opacity: active && active !== cable ? 0.18 : 1,
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
            viewBox="0 0 780 460"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Planned network topology. An upstairs closet holds a UniFi Dream Machine SE as the core. Two existing camera cables are cut and terminated in the closet: their office-side ends become the WAN feed from the Comcast gateway and the LAN return to the main-office Lite 8 switch, and their camera-side ends become PoE drops that keep the two Verkada cameras online. Access points cover the offices, shop floor, and exterior over wired links."
          >
            <defs>
              <marker id="bz-arr" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" fill="var(--muted)" />
              </marker>
              <marker id="bz-arr-a" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* floor divider */}
            <line x1="16" y1="216" x2="764" y2="216" stroke="var(--rule)" strokeDasharray="4 5" />
            <text x="18" y="26" className="t-muted" fontSize="9.5" letterSpacing="0.12em">UPSTAIRS</text>
            <text x="18" y="240" className="t-muted" fontSize="9.5" letterSpacing="0.12em">DOWNSTAIRS</text>

            {/* wires (draw + trace), keyed by mode so the draw-in replays on toggle */}
            <g key={mode}>
              {mode === "after" &&
                AFTER_SUPPORT.map((d, i) => (
                  <path key={i} d={d} className="benz-wire benz-anim edge" pathLength={1} markerEnd="url(#bz-arr)" style={{ animationDelay: `${0.3 + 0.05 * i}s` }} />
                ))}

              {wires.map((w, i) => (
                <g
                  key={w.id}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Cable ${w.cable}${w.role ? ", " + w.role : ""}`}
                  onMouseEnter={() => setHovered(w.cable)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(w.cable)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setPinned((p) => (p === w.cable ? null : w.cable))}
                >
                  <path d={w.d} fill="none" stroke="transparent" strokeWidth={16} />
                  <path
                    d={w.d}
                    className="benz-wire benz-anim"
                    pathLength={1}
                    style={wireStyle(w.cable, i)}
                    markerEnd={w.arrow ? (active === w.cable ? "url(#bz-arr-a)" : "url(#bz-arr)") : undefined}
                  />
                  {/* flowing packet: subtle at rest, bright when traced */}
                  <circle
                    className="packet"
                    r={active === w.cable ? 3 : 2.2}
                    style={{ fill: active === w.cable ? "var(--accent)" : "var(--muted)", opacity: active && active !== w.cable ? 0.12 : active === w.cable ? 1 : 0.5 }}
                  >
                    <animateMotion dur={`${2.6 + (i % 2) * 0.5}s`} repeatCount="indefinite" begin={`${0.15 * i}s`}>
                      <mpath href={`#${w.id}`} />
                    </animateMotion>
                  </circle>
                  <path id={w.id} d={w.d} fill="none" stroke="none" />
                </g>
              ))}
            </g>

            {/* role / trace labels */}
            {mode === "after" &&
              AFTER.filter((w) => w.label).map((w) => (
                <text
                  key={w.id}
                  x={w.label!.x}
                  y={w.label!.y}
                  fontSize="10"
                  textAnchor="middle"
                  style={{
                    fill: active === w.cable ? "var(--accent)" : "var(--muted)",
                    fontWeight: active === w.cable ? 600 : 400,
                    opacity: active && active !== w.cable ? 0.18 : 1,
                    transition: "fill 0.15s ease, opacity 0.15s ease",
                  }}
                >
                  {w.label!.text}
                </text>
              ))}
            {mode === "before" && (
              <text x={250} y={250} fontSize="10" textAnchor="middle" className="t-muted">
                original camera runs
              </text>
            )}

            {/* ── nodes ── */}
            {/* core / closet */}
            {mode === "after" ? (
              <Node x={300} y={62} w={206} h={124} icon="router" title="Upstairs closet · core" sub="UniFi Dream Machine SE" accent="2 camera cables cut + terminated here" />
            ) : (
              <Node x={300} y={62} w={206} h={124} icon="router" title="Upstairs closet" sub="camera cables pass through" />
            )}

            {/* cameras */}
            <Node x={604} y={70} w={140} h={50} icon="camera" title="Verkada cam 1" soft />
            <Node x={604} y={138} w={140} h={50} icon="camera" title="Verkada cam 2" soft />

            {/* downstairs row */}
            <Node x={44} y={300} w={172} h={62} icon="cloud" title="Comcast gateway" sub="main office · coax" soft />
            <Node x={246} y={300} w={158} h={62} icon="switch" title="UniFi Lite 8" sub={mode === "after" ? "LAN edge switch" : "main-office switch"} />
            {mode === "after" && <Node x={434} y={300} w={150} h={62} icon="ap" title="Office wall AP" soft />}
            {mode === "after" && <Node x={604} y={300} w={150} h={62} icon="ap" title="Shop + exterior APs" sub="wired · line of sight" soft />}
            {mode === "after" && <Node x={44} y={96} w={158} h={58} icon="ap" title="Upstairs office AP" soft />}
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
              cable A: WAN + camera 1
            </button>
            <button
              type="button"
              className={active === "B" ? "term-chip sim-chip-on" : "term-chip"}
              onMouseEnter={() => setHovered("B")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === "B" ? null : "B"))}
            >
              cable B: LAN + camera 2
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
