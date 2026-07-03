"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A faithful, simulated replay of the RoomTag inference pipeline.
 * The classifier output is synthesized (canned base probabilities + noise),
 * but the smoothing and commit logic are the real thing: the EMA uses the
 * same α = 0.72 as the production server, and the hysteresis rule requires
 * two consecutive high-confidence predictions of a new room before it
 * commits. Toggle either off to feel the doorway-flicker problem they solve.
 */

const ROOMS = ["Office", "Kitchen", "Bedroom", "Living"] as const;

// 2×2 floor plan on a 300×212 grid
const ROOM_RECT = [
  { x: 6, y: 6, w: 140, h: 96 },
  { x: 154, y: 6, w: 140, h: 96 },
  { x: 6, y: 110, w: 140, h: 96 },
  { x: 154, y: 110, w: 140, h: 96 },
];

const ALPHA = 0.72;
const TICK_MS = 750;

function argmax(a: number[]) {
  let bi = 0;
  for (let i = 1; i < a.length; i++) if (a[i] > a[bi]) bi = i;
  return bi;
}

export default function RoomtagSim() {
  const [trueRoom, setTrueRoom] = useState(1);
  const [raw, setRaw] = useState<number[]>([0.12, 0.58, 0.12, 0.12]);
  const [ema, setEma] = useState<number[]>([0.12, 0.58, 0.12, 0.12]);
  const [committed, setCommitted] = useState(1);
  const [hyst, setHyst] = useState(true);
  const [smooth, setSmooth] = useState(true);
  const [running, setRunning] = useState(true);

  // Latest control values, read inside the interval without restarting it.
  const ctrl = useRef({ trueRoom, smooth, hyst });
  ctrl.current = { trueRoom, smooth, hyst };

  // Mutable sim state that must persist across ticks.
  const sim = useRef({
    ema: [0.12, 0.58, 0.12, 0.12],
    committed: 1,
    pendRoom: -1,
    pendCount: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const s = sim.current;
      const { trueRoom: tr, smooth: sm, hyst: hy } = ctrl.current;

      // Synthesized classifier output: true room favored, everything noisy.
      const noisy = ROOMS.map(
        (_, i) => Math.max(0, (i === tr ? 0.58 : 0.13) + (Math.random() - 0.5) * 0.36)
      );
      const total = noisy.reduce((a, b) => a + b, 0) || 1;
      const rawN = noisy.map((v) => v / total);

      // Real EMA over probability vectors (α = 0.72), or passthrough if off.
      const nextEma = sm
        ? s.ema.map((v, i) => ALPHA * rawN[i] + (1 - ALPHA) * v)
        : rawN.slice();

      const cand = argmax(nextEma);
      let nextCommitted = s.committed;

      if (!hy) {
        nextCommitted = cand;
        s.pendRoom = -1;
        s.pendCount = 0;
      } else if (cand === s.committed) {
        s.pendRoom = -1;
        s.pendCount = 0;
      } else if (cand === s.pendRoom) {
        s.pendCount += 1;
        if (s.pendCount >= 2) {
          nextCommitted = cand;
          s.pendRoom = -1;
          s.pendCount = 0;
        }
      } else {
        s.pendRoom = cand;
        s.pendCount = 1;
      }

      s.ema = nextEma;
      s.committed = nextCommitted;
      setRaw(rawN);
      setEma(nextEma);
      setCommitted(nextCommitted);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  const settled = committed === trueRoom;

  return (
    <div className="sim">
      <div className="sim-head">
        <span>roomtag: live inference</span>
        <span>synthesized signal · real EMA + hysteresis</span>
      </div>

      <div className="sim-body">
        {/* Floor plan */}
        <svg
          className="sim-floor"
          viewBox="0 0 300 212"
          role="img"
          aria-label={`Floor plan. The tag is in the ${ROOMS[trueRoom]}; the model has committed to ${ROOMS[committed]}.`}
        >
          {ROOM_RECT.map((r, i) => (
            <g key={i}>
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={4}
                className={i === committed ? "sim-room sim-room-on" : "sim-room"}
              />
              <text x={r.x + 10} y={r.y + 22} className="sim-room-label">
                {ROOMS[i]}
              </text>
            </g>
          ))}
          {/* the tag, sitting in the true room */}
          <circle
            cx={ROOM_RECT[trueRoom].x + ROOM_RECT[trueRoom].w - 22}
            cy={ROOM_RECT[trueRoom].y + ROOM_RECT[trueRoom].h - 20}
            r={7}
            className="sim-tag"
          />
        </svg>

        {/* Readout + bars */}
        <div className="sim-panel">
          <div className="sim-readout">
            <div>
              <span className="sim-k">tag is in</span>
              <span className="sim-v">{ROOMS[trueRoom]}</span>
            </div>
            <div>
              <span className="sim-k">model says</span>
              <span className="sim-v" style={{ color: settled ? undefined : "var(--accent)" }}>
                {ROOMS[committed]} {settled ? "✓" : "settling…"}
              </span>
            </div>
          </div>

          <div className="sim-bars">
            {ROOMS.map((room, i) => (
              <div key={room} className="sim-bar-row">
                <span className="sim-bar-label">{room}</span>
                <span className="sim-bar-track">
                  <span
                    className="sim-bar-fill"
                    style={{ width: `${Math.round(ema[i] * 100)}%` }}
                  />
                  <span
                    className="sim-bar-raw"
                    style={{ left: `${Math.min(99, Math.round(raw[i] * 100))}%` }}
                    title="raw classifier output"
                  />
                </span>
                <span className="sim-bar-pct">{Math.round(ema[i] * 100)}</span>
              </div>
            ))}
          </div>
          <p className="sim-legend">
            bar = smoothed probability · tick = raw classifier output
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="sim-controls">
        <div className="sim-walk">
          <span className="sim-ctrl-label">walk to</span>
          {ROOMS.map((room, i) => (
            <button
              key={room}
              type="button"
              className={i === trueRoom ? "term-chip sim-chip-on" : "term-chip"}
              onClick={() => setTrueRoom(i)}
            >
              {room}
            </button>
          ))}
        </div>
        <div className="sim-toggles">
          <button
            type="button"
            className={smooth ? "term-chip sim-chip-on" : "term-chip"}
            onClick={() => setSmooth((v) => !v)}
            aria-pressed={smooth}
          >
            EMA smoothing: {smooth ? "on" : "off"}
          </button>
          <button
            type="button"
            className={hyst ? "term-chip sim-chip-on" : "term-chip"}
            onClick={() => setHyst((v) => !v)}
            aria-pressed={hyst}
          >
            hysteresis: {hyst ? "on" : "off"}
          </button>
          <button
            type="button"
            className="term-chip"
            onClick={() => setRunning((v) => !v)}
            aria-pressed={running}
          >
            {running ? "pause" : "run"}
          </button>
        </div>
      </div>
      <p className="sim-hint">
        Turn both off and watch the committed room flicker every time the noisy
        classifier picks a neighbor. Turn them back on: smoothing calms the
        probabilities, hysteresis refuses to commit until a new room wins twice
        in a row. That is the whole reason the system is usable for automations.
      </p>
    </div>
  );
}
