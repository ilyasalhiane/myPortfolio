export type SkillLevel = "Core" | "Strong" | "Familiar";

export interface ContactLinks {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  summary: string;
  positioning: string;
  tags: string[];
  statusMessages: string[];
  profileImage: string;
  contact: ContactLinks;
  languages: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
  ownership: string[];
  tech: string[];
  metric?: {
    label: string;
    value: string;
  };
}

export interface EducationItem {
  school: string;
  degree: string;
  dates: string;
  level: string;
  details: string;
  coursework: Record<string, string[]>;
}

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface HighlightItem {
  title: string;
  slug: string;
  company: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  detailed?: boolean;
}

export const profile: Profile = {
  name: "Ilyas Alhiane",
  title: "Full-Stack Software Engineer",
  subtitle: "State Engineer in Computer Science (Ingénieur d'État)",
  summary:
    "I design and ship production-grade web systems where backend reliability, cloud-native delivery, and polished frontend experiences work as one product.",
  positioning:
    "Full-stack engineer building microservices, cloud-ready platforms, and AI-assisted workflows with motion-first, recruiter-readable interfaces.",
  tags: ["TypeScript", "React", "Node/Express", "Docker", "Kubernetes", "Data Visualization", "AI Integration"],
  statusMessages: [
    "Telemetry stream stable // services healthy",
    "Pipeline synced // deployment target ready",
    "UX layer responsive // data channels active",
    "System status: green // recruiter mode online"
  ],
  profileImage:
    "https://media.licdn.com/dms/image/v2/D4E03AQFMQMWyONHZew/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696337189875?e=1773878400&v=beta&t=tZ740Zcm-DxhCcd8DCF64Gwxxw9f1y8DNO--mw0Aqos",
  contact: {
    email: "ilyas.alhiane.dev@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilyas-alhiane",
    github: "https://github.com/ilyasalhiane",
    location: "Morocco"
  },
  languages: ["Arabic (Native)", "English (B2/C1)", "French (B2)", "Spanish (A2)"]
};

export const focusAreas = [
  "Microservices Architecture",
  "Frontend Systems Engineering",
  "Cloud-native DevOps",
  "AI Integration",
  "Data Visualization"
];

export const toolbox = ["TypeScript", "React", "Node/Express", "Docker/Kubernetes", "Jest/Cypress", "MongoDB/MySQL"];

export const experiences: ExperienceItem[] = [
  {
    id: "linkopus",
    company: "Linkopus Consulting",
    role: "Software Developer",
    location: "Rabat",
    start: "Feb 2024",
    end: "Sep 2024",
    highlights: [
      "Designed and delivered Node.js + Express microservices for high-throughput workflows and modular service boundaries.",
      "Integrated AI-assisted matching logic for user-to-service mapping, reducing manual routing effort for operational teams.",
      "Built React + Tailwind interfaces for dense analytics views, improving clarity of decision-critical data.",
      "Containerized services and coordinated Kubernetes deployment flows for resilient rollout and scaling.",
      "Implemented automated quality gates with Jest and Cypress within an Agile/Scrum delivery cadence."
    ],
    ownership: ["Service architecture", "Frontend UI systems", "DevOps deployment", "Testing strategy"],
    tech: ["Node.js", "Express", "React", "Tailwind", "Docker", "Kubernetes", "Jest", "Cypress", "Agile/Scrum"],
    metric: {
      label: "Target Uptime During Peak Usage",
      value: "99.9%"
    }
  },
  {
    id: "nttdata",
    company: "NTTDATA",
    role: "Web Developer",
    location: "Tetouan",
    start: "Jul 2023",
    end: "Oct 2023",
    highlights: [
      "Maintained and extended a Drupal-based management platform used by cross-functional stakeholders.",
      "Developed custom modules to align CMS behavior with business-specific workflows and approval paths.",
      "Implemented and integrated APIs to support cleaner data exchange across internal services.",
      "Contributed to overall platform maintainability by enforcing consistent module structure and release discipline."
    ],
    ownership: ["Custom module development", "API integration", "CMS workflow adaptations"],
    tech: ["Drupal", "PHP", "APIs", "JavaScript"]
  },
  {
    id: "intellcap",
    company: "Intellcap",
    role: "Web Developer",
    location: "Rabat",
    start: "Sep 2022",
    end: "Sep 2022",
    highlights: [
      "Contributed to a real-time auction platform with a strong focus on response consistency under concurrent user activity.",
      "Implemented backend logic in PHP with MySQL-backed transactional flows.",
      "Improved reliability of bid lifecycle handling and state synchronization for time-sensitive interactions.",
      "Collaborated on practical delivery choices balancing performance, simplicity, and maintainability."
    ],
    ownership: ["Backend implementation", "Database logic", "Realtime flow reliability"],
    tech: ["PHP", "MySQL", "JavaScript"]
  }
];

export const education: EducationItem[] = [
  {
    school: "EMSI — École Marocaine des Sciences de l'Ingénieur",
    degree: "State Engineer in Computer Science (Master's-equivalent)",
    dates: "2019 – 2024",
    level: "EQF Level 7",
    details:
      "Five-year engineering path covering applied mathematics, AI foundations, software architecture, and full-stack implementation across enterprise and web ecosystems.",
    coursework: {
      Math: ["Algorithms & Data Structures"],
      "CS / AI": ["Machine Learning", "Deep Learning", "Computer Vision Fundamentals", "Python/C++"],
      "Signal & Image Processing": ["Digital Signal Processing", "Image Processing Fundamentals"],
      "Software Engineering": ["Architecture & Design Patterns", "J2EE/.NET/MERN", "Agile Delivery"]
    }
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "Next.js", level: "Strong" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: "Core" },
      { name: "Java", level: "Strong" },
      { name: "Flask / Django", level: "Strong" },
      { name: "REST APIs", level: "Core" }
    ]
  },
  {
    category: "Data / AI",
    items: [
      { name: "Machine Learning", level: "Strong" },
      { name: "Data Processing", level: "Strong" },
      { name: "Data Visualization", level: "Core" },
      { name: "Python", level: "Core" }
    ]
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", level: "Core" },
      { name: "Kubernetes", level: "Strong" },
      { name: "Microservices", level: "Core" },
      { name: "Cloud-native Delivery", level: "Strong" }
    ]
  },
  {
    category: "Engineering Tools",
    items: [
      { name: "Git", level: "Core" },
      { name: "Jest", level: "Strong" },
      { name: "Cypress", level: "Strong" },
      { name: "UML / System Architecture", level: "Strong" }
    ]
  }
];

export const stackCloud = [
  "TypeScript",
  "Java",
  "Python",
  "C++",
  "React",
  "Node.js",
  "Express",
  "Flask",
  "Django",
  "MongoDB",
  "MySQL",
  "Docker",
  "Kubernetes",
  "REST APIs",
  "Microservices",
  "UML"
];

export const highlights: HighlightItem[] = [
  {
    title: "Cloud-native microservices platform (Node/Express)",
    slug: "cloud-native-microservices-platform",
    company: "Linkopus Consulting",
    problem: "Scaling service workflows while keeping APIs maintainable and deployment-safe.",
    approach: "Split core capabilities into focused Node/Express services and containerized each service for orchestrated rollout.",
    result: "Improved maintainability and release reliability under growing feature demand.",
    tech: ["Node.js", "Express", "Docker", "Kubernetes"],
    detailed: true
  },
  {
    title: "AI-assisted matching integration",
    slug: "ai-assisted-matching-integration",
    company: "Linkopus Consulting",
    problem: "Manual user-to-service mapping created operational friction and delayed response times.",
    approach: "Integrated AI-driven matching into service flows and aligned the outputs with product workflows.",
    result: "Improved routing quality and reduced repetitive manual mapping work.",
    tech: ["AI Integration", "Node.js", "APIs"],
    detailed: true
  },
  {
    title: "Data visualization front-end (React + Tailwind)",
    slug: "data-visualization-frontend",
    company: "Linkopus Consulting",
    problem: "Complex operational data was difficult to scan quickly in legacy screens.",
    approach: "Reworked key views using React and Tailwind with clearer hierarchy and reusable UI patterns.",
    result: "Improved dashboard readability and UX for day-to-day monitoring tasks.",
    tech: ["React", "Tailwind", "UI Systems"],
    detailed: true
  },
  {
    title: "Drupal custom modules & APIs",
    slug: "drupal-custom-modules-apis",
    company: "NTTDATA",
    problem: "Off-the-shelf CMS features did not fully support business workflows.",
    approach: "Implemented tailored Drupal modules and API integrations for business-specific flows.",
    result: "Improved maintainability and integration consistency across the platform.",
    tech: ["Drupal", "PHP", "APIs"]
  },
  {
    title: "Real-time auction platform (PHP + MySQL)",
    slug: "real-time-auction-platform",
    company: "Intellcap",
    problem: "Auction interactions required reliable state updates under concurrent bidding.",
    approach: "Built backend logic with transactional MySQL patterns and resilient PHP flow control.",
    result: "Improved platform consistency and user trust in time-sensitive actions.",
    tech: ["PHP", "MySQL", "Realtime Systems"]
  }
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "highlights", label: "Highlights" },
  { id: "contact", label: "Contact" }
];
