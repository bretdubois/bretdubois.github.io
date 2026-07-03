import type { Metadata } from "next";
import Link from "next/link";
import SpecSheet from "@/components/SpecSheet";
import RoomtagDiagram from "@/components/diagrams/RoomtagDiagram";
import RoomtagSim from "@/components/RoomtagSim";

export const metadata: Metadata = {
  title: "RoomTag: indoor positioning from Wi-Fi fingerprints",
  description:
    "A wearable ESP32 tag plus a self-hosted ML inference server that knows which room you're in. Hardware, firmware, training pipeline, and iOS app.",
  alternates: { canonical: "/projects/roomtag/" },
};

export default function RoomTagPage() {
  return (
    <div className="shell pt-14 pb-4">
      <p className="label" style={{ marginBottom: "1rem" }}>
        <Link href="/#projects" style={{ textDecoration: "none", color: "inherit" }}>
          ← projects
        </Link>
      </p>
      <h1 className="display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "48rem" }}>
        RoomTag: indoor positioning from Wi-Fi fingerprints
      </h1>
      <SpecSheet
        items={[
          { key: "Role", value: "Everything: firmware, server, ML, iOS" },
          { key: "Stack", value: "ESP32-C6 · FastAPI · PyTorch · ONNX · SwiftUI" },
          { key: "Status", value: "Live at home, worn daily" },
          { key: "Year", value: "2026" },
        ]}
      />
      <div className="prose" style={{ maxWidth: "42rem" }}>
      <p>
        RoomTag answers one question continuously: <strong>which room is this tag in
        right now?</strong> No cameras, no BLE beacons, no GPS. A small ESP32-C6 tag
        scans nearby Wi-Fi access points every ~2 seconds and posts the RSSI
        fingerprint to a self-hosted server, which maps it to a room and pushes the
        result to an iOS app over WebSocket, and to Home Assistant, so lights and
        focus modes can follow you around.
      </p>

      <h2>Architecture</h2>
      <RoomtagDiagram />

      <h2>The interesting problem is stability, not accuracy</h2>
      <p>
        A classifier that's right 90% of the time but flickers between rooms every
        few seconds is useless for automations. Most of the design effort went into
        making the <em>committed</em> room boring and stable while keeping room
        changes fast:
      </p>
      <ul>
        <li>
          <strong>Relative RSSI normalization</strong>: the strongest AP in each
          scan becomes 0 dB and everything else is measured against it, which makes
          fingerprints immune to router power changes and long-term RSSI drift.
        </li>
        <li>
          <strong>EMA smoothing over probability vectors</strong> (α = 0.72), snappy
          but stable; a genuine room change commits within one or two scans.
        </li>
        <li>
          <strong>Hysteresis</strong>: a new room needs two consecutive
          high-confidence predictions before it's committed, which eliminates
          doorway flicker.
        </li>
        <li>
          <strong>Time-of-day Bayesian prior</strong>: the historical room
          distribution for the current hour is multiplied in, so borderline cases
          collapse toward where I almost always am at that time.
        </li>
        <li>
          <strong>Markov transition prior</strong>: room-to-room transition
          frequencies weight the prediction when the model wants to switch rooms.
        </li>
      </ul>
      <p>The EMA step, from the live server code:</p>
      <pre>
        <code>{`def update_ema(device_id: str, new_probs: dict) -> dict:
    """Exponential moving average over per-room probability vectors."""
    prev = ema_state.get(device_id, {})
    all_rooms = set(new_probs) | set(prev)
    smoothed = {
        r: EMA_ALPHA * new_probs.get(r, 0.0)
           + (1.0 - EMA_ALPHA) * prev.get(r, 0.0)
        for r in all_rooms
    }
    ema_state[device_id] = smoothed
    return smoothed`}</code>
      </pre>

      <h2>See it settle</h2>
      <p>
        Rather than describe the stability tradeoff, here it is running. Walk the
        tag between rooms and watch the raw classifier (the ticks) jump around
        while the smoothed probability (the bars) stays calm and the committed
        room holds steady. Then turn smoothing and hysteresis off and watch the
        same signal turn into doorway flicker.
      </p>
      <RoomtagSim />

      <h2>Two models, one interface</h2>
      <p>
        The default classifier is a 300-tree random forest with balanced class
        weights: CPU-only, no GPU required, and it reports out-of-bag accuracy for
        free. For better performance I train an attention-weighted MLP ensemble on
        my gaming PC's GPU with heavy augmentation (Gaussian jitter, AP masking,
        RSSI scaling, Mixup) and test-time augmentation, export it to ONNX, and the
        server hot-swaps it in with zero downtime.
      </p>
      <p>
        The system also trains itself: high-confidence prediction streaks accumulate
        silently and retrain the model in the background, and a "wrong room?" button
        in the iOS app relabels the last few fingerprints and retrains immediately.
        Accuracy at home has held at roughly 90%+.
      </p>

      <h2>Shipping it</h2>
      <p>
        Getting it working was half the project; making it deployable was the other
        half. Firmware releases build in GitHub Actions, which compiles the ESP32-C6
        image and attaches OTA assets to the release; the tag updates itself over
        the air. The iOS app fetches firmware through the backend so the release
        repo can stay private. Server, training, and firmware live in one repo with
        an operator runbook.
      </p>

      <h2>Status</h2>
      <p>
        Live at home, worn daily, wired into Home Assistant. The repo is private
        while I scrub deployment-specific configuration out of its history. A
        public release is planned, and I'm happy to walk through the code in the
        meantime: <a href="mailto:bretdubois1@gmail.com">bretdubois1@gmail.com</a>.
      </p>
      </div>
    </div>
  );
}
