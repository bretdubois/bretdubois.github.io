export interface CaseStudy {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string; prefix?: string; suffix?: string }[];
  highlights?: string[];
  tags: string[];
  accent: string;
  logo?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "apple",
    company: "Apple",
    role: "Sales Specialist → Technical Specialist → Technical Expert",
    period: "October 2019 – August 2022",
    location: "San Mateo, CA",
    summary:
      "Three years at Apple, promoted twice into increasingly technical roles. At the Genius Bar: hardware and software triage across hundreds of devices per month, 300+ perfect NPS scores, and a single customer interaction that surfaced $150K in enterprise lifetime value.",
    challenge:
      "High-volume, high-stakes diagnostic environment. Every appointment was someone's broken workflow. The job was to identify the real issue—not just the symptom—communicate the fix clearly to non-technical users, and recognize when a consumer repair conversation was actually an enterprise one.",
    approach:
      "Started on the sales floor, which trained my instincts for customer communication before I ever ran a diagnostic. Earned promotion to Technical Specialist, then Technical Expert, by pairing systematic hardware and software triage with root-cause explanations that non-technical customers actually understood. Partnered with iPhone engineering on repair documentation and product feedback. Trained and mentored newer technicians on both diagnostic workflows and customer interaction.",
    outcome:
      "300+ consecutive 100/100 NPS surveys. One repair interaction surfaced an enterprise account generating $150K+ in lifetime spend. Contributed to iPhone repair documentation and product feedback cycles. Recognized company-wide for customer satisfaction performance.",
    metrics: [
      { value: "300", label: "Perfect NPS surveys (100/100)", suffix: "+" },
      { value: "150", label: "Lifetime value, one enterprise referral", prefix: "$", suffix: "K+" },
    ],
    tags: ["Technical Diagnostics", "Hardware/Software Triage", "Enterprise Discovery", "iOS Ecosystem", "Customer Communication"],
    accent: "#B45309",
    logo: "/logos/apple.png",
  },
  {
    id: "asurion",
    company: "Asurion",
    role: "Field Technical Consultant",
    period: "September 2024 – April 2025",
    location: "San Diego, CA",
    summary:
      "In-home technical consulting for Verizon and AT&T customers. Each engagement: assess the device ecosystem, diagnose issues, configure and integrate devices, train the customer, and recommend a support plan matched to their actual situation—not a script.",
    challenge:
      "On-site, no prep time. Every customer had a different device mix, different technical literacy, and a different problem. Fast environment assessment, clear communication of findings, and recommendations that fit the customer—not a pre-set pitch.",
    approach:
      "Opened every visit with a structured ecosystem audit: devices present, current configuration, pain points, and usage patterns. Scoped what was resolvable on-site versus what required follow-up. Configured and integrated devices in the field. Delivered training matched to the customer's technical level. Managed a CRM pipeline for customers requiring phased support.",
    outcome:
      "Ranked among top regional performers. High repeat-contact rates from customers who trusted the technical assessment. Turned complex multi-device environments into clearly documented follow-up plans.",
    metrics: [],
    highlights: [
      "On-site ecosystem assessment & device configuration",
      "Multi-device setup, integration, and testing",
      "Real-time technical troubleshooting",
      "Customer training matched to technical literacy",
      "CRM-managed follow-up pipeline",
    ],
    tags: ["Field Technical Consulting", "Ecosystem Assessment", "Configuration & Integration", "Customer Training", "CRM"],
    accent: "#4D7C0F",
    logo: "/logos/asurion.png",
  },
  {
    id: "spothopper",
    company: "SpotHopper",
    role: "Technical Sales, AI Marketing Platform",
    period: "April 2025 – Present",
    location: "San Francisco Bay Area, CA",
    summary:
      "Representing an AI-driven marketing platform to restaurant operators—a non-technical buyer base. The work: understand how the ML features actually function, then translate that into concrete business outcomes the customer cares about.",
    challenge:
      "Restaurant owners are skeptical of tech vendors. They've been burned by overpromised platforms, are margin-conscious, and have no patience for demos that don't speak to their specific situation. Generic feature pitches fail every time.",
    approach:
      "Built deep product knowledge of the AI and ML components—not just feature names, but how the system generates recommendations, manages campaigns, and integrates with POS systems. Led every conversation with discovery: mapping customer-specific operational pain to product-specific capability before proposing a solution. Iterated demo flows based on ICP feedback.",
    outcome:
      "Consistent conversion of discovery conversations to qualified pipeline. Strong technical credibility with both business owners and their operations staff. Recognized as a top activity contributor on the team.",
    metrics: [],
    highlights: [
      "AI/ML product knowledge — mechanisms, not marketing",
      "Discovery-led solution mapping",
      "ICP-specific demo customization",
      "Technical translation for non-technical buyers",
    ],
    tags: ["AI/ML Platform", "Technical Product Knowledge", "Solution Mapping", "B2B SaaS", "HubSpot CRM"],
    accent: "#C2410C",
  },
];

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "sales" | "technical" | "education" | "maker";
  logo?: string;
  url?: string;
}

export const timeline: TimelineItem[] = [
  {
    year: "2016",
    title: "Started Building FPV Drones",
    company: "Independent",
    description:
      "Began designing and flying custom first-person-view drones—learning electrical engineering, RF fundamentals, and control theory through hands-on builds.",
    type: "maker",
  },
  {
    year: "2018",
    title: "Eagle Scout",
    company: "Boy Scouts of America",
    description:
      "Earned the highest rank in Scouting, completing a community leadership project and developing skills in planning, teamwork, and accountability.",
    type: "education",
    logo: "/logos/bsa.png",
    url: "https://www.scouting.org/programs/scouts-bsa/",
  },
  {
    year: "2019",
    title: "Apple Genius Bar — Technical Expert",
    company: "Apple · San Mateo, CA",
    description:
      "Joined as Sales Specialist, earned two promotions in under three years to Technical Specialist then Technical Expert. Hardware/software diagnostics, partnered with iPhone engineering, mentored teammates.",
    type: "technical",
    logo: "/logos/apple.png",
    url: "https://www.apple.com/retail/genius-bar/",
  },
  {
    year: "2020",
    title: "Network Engineering",
    company: "Independent · Redwood City, CA",
    description:
      "Designing and deploying Ubiquiti UniFi networks—site surveys, AP placement, switch config, VLAN segmentation, IP cameras, and post-deployment client documentation.",
    type: "technical",
    url: "https://ui.com/",
  },
  {
    year: "2021",
    title: "A.S. Computer & Information Science",
    company: "College of San Mateo",
    description:
      "Completed a CS degree while working at Apple—data structures, algorithms, OOP, databases, networking, and operating systems.",
    type: "education",
    logo: "/logos/csm.png",
    url: "https://collegeofsanmateo.edu/",
  },
  {
    year: "2022",
    title: "Transferred to UC San Diego",
    company: "UC San Diego",
    description:
      "Transferred after finishing the A.S. to pursue Cognitive Science with a specialization in Design & Human-Computer Interaction.",
    type: "education",
    url: "https://ucsd.edu/",
  },
  {
    year: "2024",
    title: "Technical Product Owner",
    company: "Product Management Club · UCSD",
    description:
      "Led the design and technical overhaul of Afterhours, a food-accessibility platform. Requirements gathering, technical roadmaps, stakeholder workshops, full lifecycle from research to deployment.",
    type: "technical",
    url: "https://www.instagram.com/pmcatucsd/",
  },
  {
    year: "2024",
    title: "B.S. Cognitive Science + HCI",
    company: "UC San Diego",
    description:
      "Graduated with a specialization in Design & Human-Computer Interaction — systems thinking, user research, and interaction design at the intersection of technology and people.",
    type: "education",
    url: "https://cogsci.ucsd.edu/undergraduates/major/design-interaction.html",
  },
  {
    year: "2025",
    title: "Technical Sales — AI Marketing Platform",
    company: "SpotHopper · SF Bay Area, CA",
    description:
      "Translating AI/ML product capability into concrete outcomes for non-technical buyers. Discovery-led solution mapping, deep product knowledge, and ICP-specific demo delivery.",
    type: "sales",
    url: "https://www.spothopperapp.com/",
  },
];
