export interface Skill {
  name: string;
  level?: "core" | "proficient" | "familiar";
}

export interface SkillCluster {
  id: string;
  title: string;
  icon: string;
  description: string;
  accent: string;
  skills: Skill[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: "networks",
    title: "Networks & Infrastructure",
    icon: "Wifi",
    description: "Designing, deploying, and operating physical and wireless systems from the ground up.",
    accent: "#15803D",
    skills: [
      { name: "Ubiquiti UniFi (Switch, AP, Gateway)", level: "core" },
      { name: "Network Architecture & Topology Design", level: "core" },
      { name: "VLAN Segmentation & Firewall Rules", level: "core" },
      { name: "RF Fundamentals & Spectrum Analysis", level: "core" },
      { name: "PoE / IP Camera Integration", level: "core" },
      { name: "IoT Edge Integration", level: "proficient" },
      { name: "LoRaWAN / Low-Power WAN", level: "familiar" },
      { name: "BLE / Wi-Fi Protocol Analysis", level: "proficient" },
    ],
  },
  {
    id: "technical-enablement",
    title: "Technical Enablement",
    icon: "Cpu",
    description: "Translating technical complexity into clear value—for customers, stakeholders, and product teams.",
    accent: "#B45309",
    skills: [
      { name: "Technical Requirements Gathering", level: "core" },
      { name: "Solution Architecture & Scoping", level: "core" },
      { name: "Pre-Sales Demo & PoC Delivery", level: "core" },
      { name: "Client Troubleshooting & Diagnostics", level: "core" },
      { name: "Technical Documentation & Runbooks", level: "core" },
      { name: "Systems Integration", level: "proficient" },
      { name: "AI/LLM Tooling (Claude, Ollama, ChatGPT)", level: "proficient" },
      { name: "macOS / Windows / Linux", level: "core" },
    ],
  },
  {
    id: "code",
    title: "Code & Automation",
    icon: "Code2",
    description: "Building scripts, pipelines, and integrations that reduce manual work and connect systems.",
    accent: "#0891B2",
    skills: [
      { name: "Python (pandas, scripting, automation)", level: "proficient" },
      { name: "Bash / Shell Scripting", level: "proficient" },
      { name: "API Integration & Webhooks", level: "proficient" },
      { name: "n8n Workflow Automation", level: "proficient" },
      { name: "JavaScript / TypeScript", level: "proficient" },
      { name: "Git", level: "proficient" },
      { name: "Docker / Containerization", level: "proficient" },
      { name: "SQL (foundational)", level: "familiar" },
    ],
  },
  {
    id: "product",
    title: "Product & Systems Thinking",
    icon: "Layers",
    description: "Structuring ambiguous problems into clear requirements, tradeoffs, and actionable solutions.",
    accent: "#9333EA",
    skills: [
      { name: "Human-Computer Interaction", level: "core" },
      { name: "Technical Roadmap Development", level: "proficient" },
      { name: "Requirements Gathering & Scoping", level: "core" },
      { name: "Stakeholder Communication", level: "core" },
      { name: "Agile / Scrum", level: "proficient" },
      { name: "UX Research & Interaction Design", level: "proficient" },
      { name: "Workshop Facilitation", level: "proficient" },
      { name: "QA & Acceptance Testing", level: "proficient" },
    ],
  },
  {
    id: "sales",
    title: "Customer & Revenue",
    icon: "TrendingUp",
    description: "Customer-facing communication, consultative discovery, and technical sales at B2B SaaS and infrastructure companies.",
    accent: "#C2410C",
    skills: [
      { name: "Discovery & Qualification", level: "core" },
      { name: "Consultative Selling", level: "core" },
      { name: "Objection Handling", level: "core" },
      { name: "Pipeline Management", level: "proficient" },
      { name: "HubSpot CRM", level: "proficient" },
      { name: "Value-Based Positioning", level: "proficient" },
      { name: "Customer Onboarding & Training", level: "core" },
    ],
  },
];
