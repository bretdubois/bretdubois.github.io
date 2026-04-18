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
    id: "sales",
    title: "Sales & Growth",
    icon: "TrendingUp",
    description: "The consultative, human side—building pipeline, earning trust, and closing.",
    accent: "#C2410C",
    skills: [
      { name: "Outbound Prospecting", level: "core" },
      { name: "Discovery & Qualification", level: "core" },
      { name: "Consultative Selling", level: "core" },
      { name: "Objection Handling", level: "core" },
      { name: "Pipeline Management", level: "core" },
      { name: "HubSpot CRM", level: "proficient" },
      { name: "Cold Calling", level: "core" },
      { name: "AE Partnership", level: "proficient" },
      { name: "Lead Nurturing", level: "proficient" },
    ],
  },
  {
    id: "technical-enablement",
    title: "Technical Enablement",
    icon: "Cpu",
    description: "Translating complex technology into clear value for any audience.",
    accent: "#B45309",
    skills: [
      { name: "Product Onboarding", level: "core" },
      { name: "Technical Documentation", level: "core" },
      { name: "Client Troubleshooting", level: "core" },
      { name: "Systems Integration", level: "proficient" },
      { name: "Prompt Engineering", level: "proficient" },
      { name: "AI Tools (Claude, ChatGPT)", level: "proficient" },
      { name: "macOS / Windows / Linux", level: "core" },
      { name: "iOS / Android Ecosystems", level: "core" },
    ],
  },
  {
    id: "code",
    title: "Code & Data",
    icon: "Code2",
    description: "Building automations, analyzing data, and scripting solutions.",
    accent: "#0891B2",
    skills: [
      { name: "Python (pandas, sklearn)", level: "proficient" },
      { name: "JavaScript / TypeScript", level: "proficient" },
      { name: "Bash Scripting", level: "proficient" },
      { name: "Git", level: "proficient" },
      { name: "SQL (basic)", level: "familiar" },
      { name: "n8n Automation", level: "proficient" },
      { name: "API / Webhooks", level: "proficient" },
      { name: "Ollama / Local LLMs", level: "proficient" },
    ],
  },
  {
    id: "networks",
    title: "Networks & IoT",
    icon: "Wifi",
    description: "Designing physical and wireless systems that actually work in the real world.",
    accent: "#15803D",
    skills: [
      { name: "Ubiquiti UniFi", level: "core" },
      { name: "Network Design & Deployment", level: "core" },
      { name: "RF Fundamentals", level: "core" },
      { name: "LoRaWAN / DePIN", level: "familiar" },
      { name: "IoT Edge Integration", level: "proficient" },
      { name: "Raspberry Pi / Arduino", level: "proficient" },
      { name: "Board-Level Soldering", level: "core" },
      { name: "BLE / Wi-Fi Analysis", level: "proficient" },
    ],
  },
  {
    id: "product",
    title: "Product & Design",
    icon: "Layers",
    description: "Turning ambiguity into structured roadmaps and human-centered outcomes.",
    accent: "#9333EA",
    skills: [
      { name: "Human-Computer Interaction", level: "core" },
      { name: "UX Research & Design", level: "proficient" },
      { name: "Agile / Scrum", level: "proficient" },
      { name: "Technical Roadmaps", level: "proficient" },
      { name: "Workshop Facilitation", level: "proficient" },
      { name: "Market Research", level: "proficient" },
      { name: "QA Testing", level: "proficient" },
      { name: "Stakeholder Communication", level: "core" },
    ],
  },
];
