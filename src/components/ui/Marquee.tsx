"use client";

const ITEMS = [
  "Solutions Engineering",
  "Network Architecture",
  "API Integration",
  "Technical Advisory",
  "Pre-Sales Engineering",
  "Infrastructure Design",
  "Systems Automation",
  "Customer Engineering",
  "Ubiquiti UniFi",
  "Python · Bash",
  "AI Workflows",
  "B2B SaaS",
  "VLAN & Segmentation",
  "PoC Delivery",
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
