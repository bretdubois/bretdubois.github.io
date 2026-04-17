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
    id: "fpv-drone",
    title: "Custom FPV Drone Builds",
    category: "Hardware / RF Engineering",
    description:
      "Designed, assembled, and tuned custom first-person-view racing and freestyle drones from scratch—selecting components for optimal weight-to-power ratios, tuning flight controllers, and navigating RF complexity.",
    details:
      "Each build involves PCB-level soldering, ESC/FC stack configuration, PID tuning in Betaflight, and frequency selection for 5.8GHz video feeds and UHF long-range control links. I evaluate motors, frames, and props using material science principles to hit target thrust-to-weight ratios.",
    tags: ["RF Engineering", "Betaflight", "PID Tuning", "Soldering", "5.8GHz Video", "UHF", "Control Theory"],
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
    id: "unifi-network",
    title: "Ubiquiti UniFi Network Deployments",
    category: "Networking / Systems",
    description:
      "Full-lifecycle design and deployment of enterprise-grade home and small-business networks using Ubiquiti UniFi—from site surveys and topology planning to configuration, IP cameras, and ongoing support.",
    details:
      "Projects include multi-floor AP placement using signal propagation analysis, VLAN segmentation for IoT device isolation, and integration of PoE switches with IP security cameras. Each deployment includes post-install documentation and client training.",
    tags: ["Ubiquiti UniFi", "VLANs", "PoE", "IP Cameras", "Wi-Fi 6", "Network Security", "Site Survey"],
    highlight: "Multiple client deployments",
    icon: "network",
    accent: "#1D4ED8",
    codeSnippet: {
      language: "json",
      code: `{
  "network_config": {
    "main_vlan": { "id": 1, "name": "Main", "subnet": "192.168.1.0/24" },
    "iot_vlan": { "id": 20, "name": "IoT", "subnet": "10.20.0.0/24",
      "firewall": "block_inter_vlan" },
    "cameras_vlan": { "id": 30, "name": "Cameras",
      "subnet": "10.30.0.0/24", "uplink_only": true }
  }
}`,
    },
  },
  {
    id: "afterhours",
    title: "Afterhours Platform — Design & Marketing Overhaul",
    category: "Product / UX Design",
    description:
      "Led the design and marketing redesign of Afterhours, a food-accessibility platform enabling customers to order surplus meals at a discount after traditional dining hours.",
    details:
      "As Technical Product Owner at the UC San Diego Product Management Club, I spearheaded market research, developed technical roadmaps, facilitated stakeholder workshops, and managed the product lifecycle from ideation through deployment. The redesign improved discoverability and user onboarding flow.",
    tags: ["Product Management", "UX Design", "Market Research", "Stakeholder Management", "Agile", "Food Tech"],
    highlight: "Full lifecycle: research → launch",
    icon: "product",
    accent: "#9333EA",
  },
  {
    id: "ai-automation",
    title: "AI-Driven Workflow Automation",
    category: "Software / AI",
    description:
      "Built personal automation pipelines using n8n, local LLMs (Ollama), and Python to streamline repetitive workflows—from data enrichment and CRM updates to market research aggregation.",
    details:
      "Projects include webhook-triggered pipelines that pull data from multiple sources, run through a local LLM for summarization/classification, and output to spreadsheets or CRM. Uses Python with pandas for data manipulation and Bash scripting for system automation.",
    tags: ["Python", "n8n", "Ollama", "LLM", "Automation", "APIs", "Bash", "pandas"],
    highlight: "Real workflow impact daily",
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
    id: "market-research-tools",
    title: "Market Research & Trading Automation",
    category: "Software / Finance",
    description:
      "Python-based tools for financial market research—pulling price and fundamental data from public APIs, computing momentum signals, and generating structured analysis outputs with minimal manual work.",
    details:
      "Built around pandas, yfinance, and custom Bash schedulers. Scripts handle data ingestion, signal computation, and output to CSVs or local dashboards. Emphasis on automating the repetitive data-gathering layer to spend time on interpretation rather than collection. Tied into broader interest in systematic, data-driven decision frameworks.",
    tags: ["Python", "pandas", "yfinance", "Financial Data", "Bash", "Data Analysis", "Automation"],
    highlight: "Where code meets compound interest",
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
    id: "raspberry-pi",
    title: "Raspberry Pi Home Lab & IoT",
    category: "Hardware / IoT",
    description:
      "Self-hosted home infrastructure on Raspberry Pi—running local LLMs, network monitoring tools, and IoT sensor integrations with Arduino, with experiments in LoRaWAN for long-range low-power communications.",
    details:
      "Containerized stack running Ollama for local AI inference, network health dashboards, and Arduino-based sensor nodes. VLAN-isolated IoT segment ties into the UniFi network infrastructure. LoRaWAN experiments cover protocol fundamentals, gateway configuration, and DePIN-adjacent use cases. Privacy-first, off-cloud by default.",
    tags: ["Raspberry Pi", "Arduino", "Docker", "LoRaWAN", "Linux", "Ollama", "IoT", "Edge Computing"],
    highlight: "Off-cloud, privacy-first home lab",
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
    id: "portfolio-site",
    title: "This Portfolio Website",
    category: "Web / Design Engineering",
    description:
      "Designed and engineered this site from scratch—combining React Three Fiber 3D graphics, GSAP scroll-driven animations, Framer Motion clip-mask reveals, and Lenis smooth scroll into a cohesive, timeless piece.",
    details:
      "Built on Next.js 16 (Turbopack) with Tailwind CSS v4 and a fully custom design system. Features a lerp-follower cursor, word-by-word spring reveals, dual-strip CSS marquee, and a WebGL canvas with a 22-node particle network behind the hero. Deployed as a static export; Cloudflare Pages-ready with a custom domain.",
    tags: ["Next.js 16", "React Three Fiber", "GSAP", "Framer Motion", "Tailwind v4", "TypeScript", "Lenis", "WebGL"],
    highlight: "You're looking at it right now",
    icon: "web",
    accent: "#9333EA",
    links: [
      { label: "View Source", href: "https://github.com/bretdubois/bretdubois.github.io" },
    ],
  },
];
