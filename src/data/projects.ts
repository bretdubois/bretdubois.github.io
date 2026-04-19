export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  highlight: string;
  icon: string;
  accent: string;
  codeSnippet?: { language: string; code: string };
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "unifi-network",
    title: "Ubiquiti UniFi Network Deployments",
    category: "Network Architecture / Systems Engineering",
    description:
      "Full-lifecycle network design and deployment for residential and small-business clients. Site survey → topology design → AP placement via signal propagation analysis → VLAN segmentation → PoE integration → IP camera systems → client handoff with runbook documentation.",
    details:
      "Projects ranged from single-floor home networks to multi-floor mixed-use deployments. Every engagement followed the same structure: requirements gathering and site survey, topology proposal, switch and AP configuration, VLAN design (main, IoT, cameras, guest) with inter-VLAN firewall rules, post-install validation testing, and delivery of a client-facing runbook and network diagram. Documentation exported from the controller and kept under version control.",
    tags: ["Ubiquiti UniFi", "Network Architecture", "VLANs", "PoE", "IP Cameras", "Wi-Fi 6", "Site Survey", "Network Security"],
    highlight: "Full lifecycle delivered with documentation",
    icon: "network",
    accent: "#1D4ED8",
    codeSnippet: {
      language: "json",
      code: `{
  "network_config": {
    "main_vlan":    { "id": 1,  "name": "Main",    "subnet": "192.168.1.0/24" },
    "iot_vlan":     { "id": 20, "name": "IoT",     "subnet": "10.20.0.0/24",
                      "firewall": "block_inter_vlan" },
    "cameras_vlan": { "id": 30, "name": "Cameras", "subnet": "10.30.0.0/24",
                      "uplink_only": true },
    "guest_vlan":   { "id": 40, "name": "Guest",   "subnet": "10.40.0.0/24",
                      "client_isolation": true }
  }
}`,
    },
  },
  {
    id: "raspberry-pi",
    title: "Self-Hosted Infrastructure & Edge Computing Lab",
    category: "Infrastructure / Systems Design",
    description:
      "Designed and operate a privacy-first home infrastructure stack on Raspberry Pi: containerized services, real-time network monitoring, local AI inference, and IoT edge integration—all VLAN-isolated and off-cloud by default.",
    details:
      "Stack: Docker Compose orchestrating Ollama (local LLM inference on-device), Netdata (real-time system and network health dashboards), and Arduino-based sensor nodes connected via a lightweight MQTT broker. LoRaWAN gateway experiments covering protocol fundamentals, gateway configuration, and low-power sensor integration for DePIN-adjacent use cases. The lab sits on its own VLAN, isolated from primary network traffic at the firewall layer. Emphasis on auditability, observability, and zero-cloud data paths.",
    tags: ["Raspberry Pi", "Docker", "Linux", "MQTT", "Arduino", "LoRaWAN", "Ollama", "IoT", "Edge Computing", "Network Monitoring"],
    highlight: "End-to-end from sensor to dashboard",
    icon: "pi",
    accent: "#C2410C",
    codeSnippet: {
      language: "bash",
      code: `# docker-compose.yml (excerpt)
services:
  ollama:
    image: ollama/ollama
    ports: ["11434:11434"]
    volumes: ["./models:/root/.ollama"]
    restart: unless-stopped

  netdata:
    image: netdata/netdata
    pid: host
    network_mode: host
    cap_add: [SYS_PTRACE, SYS_ADMIN]
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro`,
    },
  },
  {
    id: "ai-automation",
    title: "AI-Driven Workflow Automation",
    category: "Systems Automation / API Integration",
    description:
      "Built multi-step automation pipelines using n8n, local LLMs, and Python to eliminate repetitive data work—connecting external APIs, running LLM-based classification, and routing structured outputs to CRM and data stores.",
    details:
      "Architecture: webhook triggers → data ingestion from multiple APIs → LLM summarization and classification via Ollama → structured output to spreadsheets or HubSpot CRM. Python handles data transformation (pandas) and system-level scripting via Bash schedulers. Focus was on reducing manual intervention in the data-gathering layer while maintaining auditability of the LLM classification outputs. Webhooks and n8n nodes documented for reproducibility.",
    tags: ["Python", "n8n", "Ollama", "LLM", "API Integration", "Webhooks", "Bash", "pandas", "Automation"],
    highlight: "Real reduction in manual overhead, daily",
    icon: "code",
    accent: "#0891B2",
    codeSnippet: {
      language: "python",
      code: `import ollama
import pandas as pd

def enrich_leads(df: pd.DataFrame) -> pd.DataFrame:
    results = []
    for _, row in df.iterrows():
        prompt = f"Classify this company: {row['company']}"
        response = ollama.generate(
            model="llama3.2",
            prompt=prompt
        )
        results.append(response['response'].strip())
    df['ai_classification'] = results
    return df`,
    },
  },
  {
    id: "fpv-drone",
    title: "Custom FPV Drone Builds",
    category: "Hardware / RF Engineering",
    description:
      "Designed, assembled, and tuned custom first-person-view racing and freestyle drones from scratch—component selection, PCB-level soldering, flight controller configuration, PID tuning, and RF system design across 5.8GHz video and UHF control links.",
    details:
      "Each build involves ESC/FC stack configuration, PID tuning in Betaflight, and frequency selection that balances video latency against control range under RF interference. I evaluate motors, frames, and props using thrust-to-weight analysis to hit specific performance targets. A decade of applied work at the intersection of embedded systems, RF, and real-time control theory.",
    tags: ["RF Engineering", "Betaflight", "PID Tuning", "Embedded Systems", "Soldering", "5.8GHz Video", "UHF", "Control Theory"],
    highlight: "8+ years of continuous builds",
    icon: "drone",
    accent: "#C2410C",
    codeSnippet: {
      language: "yaml",
      code: `# Betaflight CLI dump (simplified)
feature -GPS
feature OSD
set motor_pwm_protocol = DSHOT600
set pid_process_denom = 1
set gyro_lowpass_hz = 120
set dterm_lowpass_hz = 70
set vbat_pid_gain = ON
set throttle_limit_type = SCALE
set throttle_limit_percent = 100`,
    },
  },
  {
    id: "afterhours",
    title: "Afterhours Platform — Technical Product Ownership",
    category: "Product Management / Systems Design",
    description:
      "Technical Product Owner for Afterhours, a food-accessibility platform at the UC San Diego PM Club. Led requirements gathering, technical roadmap development, stakeholder workshops, and full product lifecycle from research through deployment.",
    details:
      "Defined the product backlog, facilitated cross-functional sprint planning, and aligned engineering and design work against user research findings. Rebuilt the information architecture around the core discount-ordering workflow and drove an overhaul of the onboarding flow to reduce drop-off. Delivered handoff documentation to the engineering team and coordinated the production release.",
    tags: ["Product Management", "Technical Roadmap", "Agile / Scrum", "Requirements Gathering", "Stakeholder Management", "UX Research"],
    highlight: "Full lifecycle: research → launch",
    icon: "product",
    accent: "#9333EA",
  },
  {
    id: "market-research-tools",
    title: "Market Research & Data Automation",
    category: "Software / Data Engineering",
    description:
      "Python-based tools for financial data ingestion and analysis—pulling price and fundamental data from public APIs, computing momentum signals, and generating structured analysis outputs with minimal manual work.",
    details:
      "Built around pandas, yfinance, and Bash schedulers. Scripts handle data ingestion, signal computation, and output to CSVs or local dashboards. Emphasis on automating the data-gathering layer to reduce manual collection overhead and focus time on interpretation.",
    tags: ["Python", "pandas", "yfinance", "Data Engineering", "Bash", "Automation", "API Integration"],
    highlight: "Automated what was previously manual",
    icon: "finance",
    accent: "#15803D",
    codeSnippet: {
      language: "python",
      code: `import pandas as pd
import yfinance as yf

def momentum_screen(tickers: list[str], lookback: int = 63) -> pd.DataFrame:
    """Rank tickers by risk-adjusted momentum over lookback days."""
    data = yf.download(tickers, period="1y", auto_adjust=True)["Close"]
    returns = data.pct_change().dropna()
    score = returns.tail(lookback).mean() / returns.tail(lookback).std()
    return score.sort_values(ascending=False).rename("momentum_score")`,
    },
  },
  {
    id: "portfolio-site",
    title: "This Portfolio Website",
    category: "Web / Design Engineering",
    description:
      "Designed and engineered this site from scratch—React Three Fiber 3D graphics, GSAP scroll-driven animations, Framer Motion clip-mask reveals, and Lenis smooth scroll, deployed as a static export to GitHub Pages.",
    details:
      "Built on Next.js 16 (Turbopack) with Tailwind CSS v4 and a fully custom design system. The hero background is a WebGL canvas with a 22-node particle network built in React Three Fiber. Framer Motion handles scroll-triggered reveals and stagger animations. GSAP ScrollTrigger drives the timeline line-draw in the About section. Zero runtime CMS — all content is TypeScript data files.",
    tags: ["Next.js 16", "React Three Fiber", "GSAP", "Framer Motion", "Tailwind v4", "TypeScript", "Lenis", "WebGL"],
    highlight: "You're looking at it right now",
    icon: "web",
    accent: "#9333EA",
    links: [
      { label: "View Source", href: "https://github.com/bretdubois/bretdubois.github.io" },
    ],
  },
];
