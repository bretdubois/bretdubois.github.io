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
    id: "spothopper",
    company: "SpotHopper",
    role: "Business Development Representative",
    period: "April 2025 – Present",
    location: "San Francisco Bay Area, CA",
    summary:
      "Representing an AI-enabled marketing platform for restaurants, translating complex AI features into outcomes restaurant owners actually care about.",
    challenge:
      "Restaurant owners are skeptical of tech—they're busy, margin-conscious, and burned by past vendor promises. The product is powerful but requires a non-technical buyer to see the ROI quickly.",
    approach:
      "Led with discovery, not features. I listened for the real pain (slow Monday nights, relying on DoorDash, losing regulars) before showing how the platform addressed it. Sharpened my next-step closes to reduce follow-up cycles.",
    outcome:
      "Became a top activity contributor on the team, with qualified conversations consistently converting to booked meetings and contributing to closed-won revenue.",
    metrics: [],
    highlights: [
      "Top team activity contributor",
      "Discovery-led methodology",
      "Consultative close process",
      "AI platform expertise",
    ],
    tags: ["B2B SaaS", "AI Platform", "HubSpot CRM", "Consultative Selling", "Restaurant Tech"],
    accent: "#C2410C",
    logo: "https://logo.clearbit.com/spothopper.com",
  },
  {
    id: "apple",
    company: "Apple",
    role: "Sales Specialist → Technical Specialist → Technical Expert",
    period: "October 2019 – August 2022",
    location: "San Mateo, CA",
    summary:
      "Joined as a Sales Specialist and earned two promotions in under three years—advancing to Technical Specialist, then Technical Expert at the Genius Bar. 300+ perfect NPS scores and $150K+ in enterprise lifetime value from a single referral.",
    challenge:
      "High-volume, high-stakes interactions where every conversation was someone's bad day. The challenge was delivering consistent, outstanding experiences under pressure while spotting business opportunities hidden inside consumer conversations.",
    approach:
      "Started on the floor in sales—which grounded me in customer psychology before I ever touched a diagnostic tool. Earned promotion into technical roles by pairing those instincts with deep device-level expertise. Diagnosed fast, communicated clearly to non-technical users, and stayed present enough to notice when an iPhone repair was actually an enterprise procurement conversation in disguise.",
    outcome:
      "Recognized company-wide for NPS performance. One enterprise referral generated over $150K in lifetime spend. Partnered with iPhone engineering to inform repair documentation and product design feedback. Trained and mentored newer teammates on both support workflows and customer interaction.",
    metrics: [
      { value: "300", label: "Perfect NPS surveys (100/100)", suffix: "+" },
      { value: "150", label: "Lifetime value, one referral", prefix: "$", suffix: "K+" },
    ],
    tags: ["Technical Support", "Enterprise Sales", "Customer Experience", "iOS Ecosystem", "Product Feedback"],
    accent: "#B45309",
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    id: "asurion",
    company: "Asurion",
    role: "Field Tech Sales Expert",
    period: "September 2024 – April 2025",
    location: "San Diego, CA",
    summary:
      "B2C in-home tech consultant for Verizon and AT&T customers—conducting needs-based consultations, delivering device setup and training, handling objections in real time, and managing a structured CRM pipeline across a wide range of device ecosystems.",
    challenge:
      "Showing up at someone's front door to talk about tech and protection plans requires earning trust in the first 60 seconds. Customers are skeptical, busy, and quick to object on price or timing.",
    approach:
      "Led every visit with a genuine needs assessment—listening for pain points before recommending solutions. Handled budget and timing objections by anchoring to real cost-saving value. Used CRM tools to manage structured follow-ups that turned one-time visits into long-term customer relationships. Rounded every consultation with product training and technical demos to build customer confidence.",
    outcome:
      "Consistently exceeded conversion targets and maintained top satisfaction ratings. Ranked among top regional field performers with high close rates driven by consultative selling and technical credibility.",
    metrics: [],
    highlights: [
      "In-home B2C technical consultations",
      "Needs-based protection plan selling",
      "Real-time objection handling",
      "CRM pipeline & follow-up management",
      "Product training & technical demos",
    ],
    tags: ["B2C Field Sales", "Device Onboarding", "Consultative Selling", "CRM", "Verizon · AT&T"],
    accent: "#4D7C0F",
    logo: "https://logo.clearbit.com/asurion.com",
  },
];

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "sales" | "technical" | "education" | "maker";
  logo?: string;
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
    logo: "https://logo.clearbit.com/scouting.org",
  },
  {
    year: "2019",
    title: "Apple Genius Bar",
    company: "Apple · San Mateo, CA",
    description:
      "Joined as Sales Specialist, earned two promotions in under three years to Technical Specialist then Technical Expert. Partnered with iPhone engineering and mentored teammates.",
    type: "sales",
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    year: "2020",
    title: "Network Engineering",
    company: "Independent · Redwood City, CA",
    description:
      "Designing and deploying Ubiquiti UniFi networks—AP placement, switch config, IP cameras, VLAN segmentation, and post-deployment support.",
    type: "technical",
  },
  {
    year: "2021",
    title: "A.S. Computer & Information Science",
    company: "College of San Mateo",
    description:
      "Completed a CS degree while working at Apple—data structures, algorithms, OOP, databases, networking, and operating systems.",
    type: "education",
    logo: "https://logo.clearbit.com/collegeofsanmateo.edu",
  },
  {
    year: "2022",
    title: "Transferred to UC San Diego",
    company: "UC San Diego",
    description:
      "Transferred after finishing the A.S. to pursue Cognitive Science with a specialization in Design & HCI.",
    type: "education",
    logo: "https://logo.clearbit.com/ucsd.edu",
  },
  {
    year: "2024",
    title: "Technical Product Owner",
    company: "Product Management Club · UCSD",
    description:
      "Led the design and marketing overhaul of 'Afterhours,' a food-accessibility platform. Roadmaps, workshops, full lifecycle from research to deployment.",
    type: "sales",
    logo: "https://logo.clearbit.com/ucsd.edu",
  },
  {
    year: "2024",
    title: "B.S. Cognitive Science + HCI",
    company: "UC San Diego",
    description:
      "Graduated with a specialization in Design & Human-Computer Interaction.",
    type: "education",
    logo: "https://logo.clearbit.com/ucsd.edu",
  },
  {
    year: "2025",
    title: "BDR — AI-Era B2B Sales",
    company: "SpotHopper · SF Bay Area, CA",
    description:
      "Bridging AI product complexity with real restaurant owner needs—discovery-led selling, HubSpot CRM, and consultative close.",
    type: "sales",
    logo: "https://logo.clearbit.com/spothopper.com",
  },
];
