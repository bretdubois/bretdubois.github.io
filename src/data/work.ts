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
  },
  {
    id: "apple",
    company: "Apple",
    role: "Technical Expert · Technical Specialist · Sales Specialist",
    period: "October 2019 – August 2022",
    location: "San Mateo, CA",
    summary:
      "Nearly three years at the Genius Bar building a reputation for technical excellence and exceptional human connection—earning 300+ perfect NPS scores and driving $150K+ in enterprise lifetime value.",
    challenge:
      "High-volume, high-stakes customer interactions where every conversation was someone's bad day. The challenge was delivering consistent, outstanding experiences under pressure, and spotting business opportunities inside consumer conversations.",
    approach:
      "Treated every customer interaction as a product experience. I diagnosed fast, communicated clearly to non-technical users, and stayed present enough to notice when someone's iPhone issue was actually an enterprise procurement conversation in disguise.",
    outcome:
      "Recognized company-wide for NPS performance. One enterprise referral generated over $150K in lifetime spend. Partnered with iPhone engineering to inform repair documentation and product design feedback.",
    metrics: [
      { value: "300", label: "Perfect NPS surveys (100/100)", suffix: "+" },
      { value: "150", label: "Lifetime value, one referral", prefix: "$", suffix: "K+" },
    ],
    tags: ["Technical Support", "Enterprise Sales", "Customer Experience", "iOS Ecosystem", "Product Feedback"],
    accent: "#B45309",
  },
  {
    id: "asurion",
    company: "Asurion",
    role: "Field Tech Sales Expert",
    period: "September 2024 – April 2025",
    location: "San Diego, CA",
    summary:
      "In-home tech onboarding and protection plan sales for Verizon and AT&T customers—consistently ranked among top field performers while navigating a wide variety of device ecosystems.",
    challenge:
      "Showing up to someone's home to talk about tech is an intimate, trust-based environment. Customers are often anxious or confused, and objections come fast.",
    approach:
      "Built rapport from the first moment at the door. Used technical knowledge to genuinely help with setup and troubleshooting, which made protection plan conversations feel natural rather than transactional.",
    outcome:
      "Consistently exceeded quota and ranked among top field performers across the region.",
    metrics: [],
    highlights: [
      "Top regional field performer",
      "Exceeded quota consistently",
      "Trust-first sales approach",
      "Multi-ecosystem technical fluency",
    ],
    tags: ["Field Sales", "Device Onboarding", "Smart Home", "Verizon", "AT&T"],
    accent: "#4D7C0F",
  },
];

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "sales" | "technical" | "education" | "maker";
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
  },
  {
    year: "2019",
    title: "Apple Genius Bar",
    company: "Apple · San Mateo",
    description:
      "Joined Apple as a Technical Specialist, quickly advancing to Technical Expert. Partnered with iPhone engineering, mentored teammates, and built a reputation for outstanding customer experiences.",
    type: "sales",
  },
  {
    year: "2020",
    title: "Network Engineering",
    company: "Independent · Redwood City",
    description:
      "Began designing and deploying Ubiquiti UniFi networks for clients—handling everything from AP placement and switch configuration to IP cameras and post-deployment support.",
    type: "technical",
  },
  {
    year: "2021",
    title: "A.S. Computer & Information Science",
    company: "College of San Mateo",
    description:
      "Completed an Associate of Science in Computer & Information Science while working at Apple—covering data structures, algorithms, OOP, databases, networking fundamentals, and operating systems. The formal CS foundation beneath everything.",
    type: "education",
  },
  {
    year: "2022",
    title: "Transferred to UC San Diego",
    company: "UC San Diego",
    description:
      "After finishing the A.S. at College of San Mateo, transferred to UCSD to pursue Cognitive Science with a specialization in Design & HCI—bridging the technical and human sides of design that I'd been living intuitively.",
    type: "education",
  },
  {
    year: "2024",
    title: "Technical Product Owner",
    company: "Product Management Club · UCSD",
    description:
      "Led the design and marketing overhaul of 'Afterhours,' a food-accessibility platform. Managed roadmaps, workshops, and full lifecycle from research to deployment.",
    type: "sales",
  },
  {
    year: "2024",
    title: "B.S. Cognitive Science + HCI",
    company: "UC San Diego",
    description:
      "Graduated with a specialization in Design & Human-Computer Interaction—the academic foundation for the design instincts built throughout my career.",
    type: "education",
  },
  {
    year: "2025",
    title: "AI-Era B2B Sales",
    company: "SpotHopper · SF Bay Area",
    description:
      "Joined SpotHopper as a BDR, bridging AI product complexity with real restaurant owner needs. Applying everything learned about technology, people, and design.",
    type: "sales",
  },
];
