"use client";

const ITEMS = [
  "Technical Sales",
  "B2B SaaS",
  "IoT & Networks",
  "HCI Design",
  "FPV Drones",
  "Python",
  "AI Workflows",
  "Ubiquiti UniFi",
  "Cognitive Science",
  "Eagle Scout",
  "Consultative Selling",
  "TypeScript",
  "Prompt Engineering",
  "React Three Fiber",
];

function Strip({ reverse = false }: { reverse?: boolean }) {
  // Triple the items so the seamless loop is very smooth
  const track = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track flex items-center ${reverse ? "marquee-right" : "marquee-left"}`}
        aria-hidden
      >
        {track.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden>
      <Strip />
      <Strip reverse />
    </div>
  );
}
