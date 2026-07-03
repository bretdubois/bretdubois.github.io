"use client";

import { useEffect, useState } from "react";

/*
 * A recreation of the RoomTag iOS app's home screen, in a CSS iPhone
 * frame. Labeled as a recreation in the caption; the real app is SwiftUI.
 * The screen cycles rooms on a timer with an iOS-feel transition, and
 * holds still under prefers-reduced-motion. Swap in real screenshots
 * without changing the frame when they exist.
 */

const SCREENS = [
  { room: "Office", conf: 96, probs: [96, 2, 1, 1] },
  { room: "Kitchen", conf: 91, probs: [4, 91, 2, 3] },
  { room: "Living Room", conf: 88, probs: [3, 6, 3, 88] },
  { room: "Bedroom", conf: 93, probs: [2, 2, 93, 3] },
];

const ROOMS = ["Office", "Kitchen", "Bedroom", "Living Room"];

export default function RoomtagPhone() {
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    const id = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 3600);
    return () => clearInterval(id);
  }, []);

  const s = SCREENS[i];

  return (
    <div className="device-wrap">
      <div className="phone" role="img" aria-label={`Recreation of the RoomTag iOS app showing the current room, ${s.room}, at ${s.conf} percent confidence.`}>
        <div className="phone-island" aria-hidden />
        <div className="phone-status" aria-hidden>
          <span>9:41</span>
          <span className="phone-battery" />
        </div>
        <div className="phone-screen">
          <p className="phone-app-title">RoomTag</p>
          <p className="phone-sub">tag: wearable-01 · live</p>

          <div className={animate ? "phone-card phone-card-in" : "phone-card"} key={i}>
            <p className="phone-card-label">You are in</p>
            <p className="phone-room">{s.room}</p>
            <p className="phone-conf">{s.conf}% confident</p>
          </div>

          <div className="phone-list">
            {ROOMS.map((room, ri) => (
              <div key={room} className="phone-row">
                <span>{room}</span>
                <span className="phone-row-track">
                  <span
                    className="phone-row-fill"
                    style={{ width: `${s.probs[ri]}%` }}
                  />
                </span>
              </div>
            ))}
          </div>

          <button type="button" className="phone-btn" tabIndex={-1} aria-hidden>
            Wrong room?
          </button>
        </div>
        <div className="phone-home" aria-hidden />
      </div>
      <p className="meta device-caption">
        UI recreation of the SwiftUI app · live data arrives over WebSocket
      </p>
    </div>
  );
}
