"use client";

import { useState } from "react";

/*
 * Interactive topology for the Benz Collision redesign. Two states:
 *  - "before": the two camera cables run office → closet → cameras, with
 *    the closet a passive passthrough.
 *  - "after": the cables are cut and terminated in the closet, which now
 *    holds the UDM-SE core; the four ends are repurposed as WAN feed,
 *    LAN return, and two PoE camera drops.
 * Hovering or tapping a cable (or its legend chip) traces it through its
 * new roles. Planned design, drawn to the same spec as the site diagrams.
 */

type Mode = "after" | "before";
type Cable = "A" | "B";

interface Seg {
  id: Cable;
  role?: string;
  pts: string;
  arrow?: boolean;
  label?: { text: string; x: number; y: number };
}

const AFTER: Seg[] = [
  { id: "A", role: "WAN", pts: "202,272 250,272 300,214 300,166", arrow: true, label: { text: "WAN feed", x: 258, y: 262 } },
  { id: "A", role: "PoE", pts: "472,74 560,62 596,62", arrow: true, label: { text: "PoE", x: 548, y: 50 } },
  { id: "B", role: "LAN", pts: "340,166 340,238 111,238 111,336", arrow: true, label: { text: "LAN return", x: 232, y: 230 } },
  { id: "B", role: "PoE", pts: "472,132 560,140 596,140", arrow: true, label: { text: "PoE", x: 548, y: 158 } },
];

// gray support links present in the "after" design, not part of the A/B trace
const SUPPORT = ["262,98 150,86", "200,360 226,362", "446,166 446,300 566,338"];

const BEFORE: Seg[] = [
  { id: "A", pts: "596,62 500,62 472,76" },
  { id: "A", pts: "300,166 300,206 236,352 202,360" },
  { id: "B", pts: "596,140 500,140 472,130" },
  { id: "B", pts: "362,166 362,206 252,352 202,360" },
];

function Node({
  x, y, w, h, soft, children,
}: { x: number; y: number; w: number; h: number; soft?: boolean; children: React.ReactNode }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={4} className={soft ? "node-soft" : "node-static"} />
      {children}
    </>
  );
}

export default function BenzTopology() {
  const [mode, setMode] = useState<Mode>("after");
  const [pinned, setPinned] = useState<Cable | null>(null);
  const [hovered, setHovered] = useState<Cable | null>(null);
  const active = pinned ?? hovered;

  const segStyle = (id: Cable): React.CSSProperties => ({
    stroke: active === id ? "var(--accent)" : "var(--muted)",
    strokeWidth: active === id ? 2 : 1,
    opacity: active && active !== id ? 0.22 : 1,
    fill: "none",
    transition: "stroke 0.15s ease, opacity 0.15s ease, stroke-width 0.15s ease",
  });

  const cables = mode === "after" ? AFTER : BEFORE;

  return (
    <figure className="figure">
      <div className="sim" style={{ overflow: "hidden" }}>
        <div className="sim-head">
          <span>benz collision: topology</span>
          <span>planned design · interactive</span>
        </div>

        <div style={{ background: "var(--paper-raised)", padding: "0.5rem 0.75rem" }}>
          <svg
            className="diagram-svg"
            viewBox="0 0 720 400"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Planned network topology. An upstairs closet holds a UniFi Dream Machine SE as the core. Two existing camera cables are cut and terminated in the closet: their office-side ends become the WAN feed from the Comcast gateway and the LAN return to the main-office Lite 8 switch, and their camera-side ends become PoE drops that keep the two Verkada cameras online. Access points cover the offices, shop floor, and exterior over wired links."
            style={{ minWidth: "40rem" }}
          >
            <defs>
              <marker id="bz-arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--muted)" />
              </marker>
              <marker id="bz-arr-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* floor divider */}
            <line x1="12" y1="214" x2="708" y2="214" stroke="var(--rule)" strokeDasharray="4 4" />
            <text x="14" y="26" className="t-muted" fontSize="10" letterSpacing="0.1em">UPSTAIRS</text>
            <text x="14" y="234" className="t-muted" fontSize="10" letterSpacing="0.1em">DOWNSTAIRS</text>

            {/* ── nodes ── */}
            {/* closet / core */}
            <Node x={262} y={46} w={210} h={120}>
              {mode === "after" ? (
                <>
                  <text x={280} y={74} fontSize="12" fontWeight="600">Upstairs closet · core</text>
                  <text x={280} y={94} className="t-muted" fontSize="10.5">UniFi Dream Machine SE</text>
                  <text x={280} y={150} className="t-accent" fontSize="10">2 camera cables cut + terminated here</text>
                </>
              ) : (
                <>
                  <text x={280} y={98} fontSize="12" fontWeight="600">Upstairs closet</text>
                  <text x={280} y={118} className="t-muted" fontSize="10.5">camera cables pass through</text>
                </>
              )}
            </Node>

            {/* cameras */}
            <Node x={596} y={42} w={104} h={40} soft>
              <text x={648} y={66} fontSize="11" textAnchor="middle">Verkada cam 1</text>
            </Node>
            <Node x={596} y={120} w={104} h={40} soft>
              <text x={648} y={144} fontSize="11" textAnchor="middle">Verkada cam 2</text>
            </Node>

            {/* main office */}
            <Node x={20} y={250} w={182} h={50} soft>
              <text x={36} y={272} fontSize="11" fontWeight="600">Comcast gateway</text>
              <text x={36} y={288} className="t-muted" fontSize="10">main office · coax</text>
            </Node>
            <Node x={20} y={336} w={182} h={52}>
              <text x={36} y={358} fontSize="11" fontWeight="600">UniFi Lite 8</text>
              <text x={36} y={374} className="t-muted" fontSize="10">
                {mode === "after" ? "LAN edge switch" : "main-office switch"}
              </text>
            </Node>

            {/* after-only APs */}
            {mode === "after" && (
              <>
                <Node x={20} y={60} w={132} h={48} soft>
                  <text x={86} y={82} fontSize="10.5" textAnchor="middle">Upstairs</text>
                  <text x={86} y={97} fontSize="10.5" textAnchor="middle">office AP</text>
                </Node>
                <Node x={226} y={342} w={122} h={44} soft>
                  <text x={287} y={368} fontSize="10.5" textAnchor="middle">Office wall AP</text>
                </Node>
                <Node x={468} y={336} w={232} h={52} soft>
                  <text x={584} y={358} fontSize="10.5" textAnchor="middle">Shop + exterior APs</text>
                  <text x={584} y={374} className="t-muted" fontSize="9.5" textAnchor="middle">wired · line of sight</text>
                </Node>
                {SUPPORT.map((pts, i) => (
                  <polyline key={i} points={pts} className="edge" markerEnd="url(#bz-arr)" />
                ))}
              </>
            )}

            {/* ── cables (A/B, interactive) ── */}
            {cables.map((seg, i) => (
              <g
                key={i}
                style={{ cursor: "pointer" }}
                tabIndex={0}
                role="button"
                aria-label={`Cable ${seg.id}${seg.role ? ", " + seg.role : ""}`}
                onMouseEnter={() => setHovered(seg.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(seg.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((p) => (p === seg.id ? null : seg.id))}
              >
                {/* fat invisible hit area */}
                <polyline points={seg.pts} fill="none" stroke="transparent" strokeWidth={14} />
                <polyline
                  points={seg.pts}
                  style={segStyle(seg.id)}
                  markerEnd={seg.arrow ? (active === seg.id ? "url(#bz-arr-a)" : "url(#bz-arr)") : undefined}
                />
              </g>
            ))}

            {/* role labels (after only) */}
            {mode === "after" &&
              AFTER.filter((s) => s.label).map((s, i) => (
                <text
                  key={i}
                  x={s.label!.x}
                  y={s.label!.y}
                  fontSize="10"
                  textAnchor="middle"
                  style={{
                    fill: active === s.id ? "var(--accent)" : "var(--muted)",
                    fontWeight: active === s.id ? 600 : 400,
                    opacity: active && active !== s.id ? 0.22 : 1,
                    transition: "fill 0.15s ease, opacity 0.15s ease",
                  }}
                >
                  {s.label!.text}
                </text>
              ))}

            {mode === "before" && (
              <text x={300} y={250} fontSize="10" textAnchor="middle" className="t-muted">
                original camera runs
              </text>
            )}
          </svg>
        </div>

        <div className="sim-controls">
          <div className="sim-walk">
            <span className="sim-ctrl-label">view</span>
            <button type="button" className={mode === "before" ? "term-chip sim-chip-on" : "term-chip"} onClick={() => setMode("before")} aria-pressed={mode === "before"}>
              before
            </button>
            <button type="button" className={mode === "after" ? "term-chip sim-chip-on" : "term-chip"} onClick={() => setMode("after")} aria-pressed={mode === "after"}>
              after
            </button>
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
              cable A: WAN + camera
            </button>
            <button
              type="button"
              className={active === "B" ? "term-chip sim-chip-on" : "term-chip"}
              onMouseEnter={() => setHovered("B")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === "B" ? null : "B"))}
            >
              cable B: LAN + camera
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
