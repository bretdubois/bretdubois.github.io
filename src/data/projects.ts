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
];
