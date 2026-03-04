import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "I build real-time sports pool platforms — Firebase backend, live game data feeds, and production-ready architecture that holds up when 50 users refresh at tip-off.",
  bio: "Your Claude prototype proves the concept. I'll turn it into a production app with Firebase Realtime DB, live API connections, bracket picks, live scoring, and pool management — deployed and tested before March 15. I'll also be available March 19-22 as live tournament data flows through the system.",
  approach: [
    {
      title: "Understand the Prototype",
      description:
        "Start by mapping your Claude-built prototype — which flows are solid, what data model needs to change for Firebase, and which features are must-haves for the beta. One call, clear scope.",
    },
    {
      title: "Build the Live Foundation",
      description:
        "Firebase Realtime DB setup, authentication, API connections for live game data, pool creation flows — the production backbone that handles real users and real-time score updates.",
    },
    {
      title: "Ship for March 15",
      description:
        "Functional beta with bracket picks, pool standings, live scoring, and commissioner controls — deployed and clickable before tip-off. Not a prototype. A working product.",
    },
    {
      title: "Support Game Day",
      description:
        "Available March 19-22 for real-time monitoring and quick fixes as live tournament data flows through the system. Fast response during the window that matters most.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "Recharts",
      ],
    },
    {
      name: "Backend & Real-Time",
      skills: [
        "Firebase Realtime DB",
        "REST APIs",
        "WebSocket",
        "Node.js",
        "Webhook handling",
      ],
    },
    {
      name: "DevOps",
      skills: [
        "Vercel",
        "GitHub Actions",
        "Performance monitoring",
        "Error tracking",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "sports-vision",
    title: "Sports Vision MVP",
    description:
      "Real-time sports object detection web demo simulating iOS AR/LiDAR scanning — delivered as a browser-based MVP with detection overlays, confidence scores, and accuracy visualization.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    relevance:
      "Sports domain + rapid MVP delivery from concept to deployed product.",
    outcome:
      "AR-style scan UI with detection overlays, confidence scores, and accuracy visualization",
  },
  {
    id: "ebay-monitor",
    title: "eBay Pokemon Monitor",
    description:
      "Real-time eBay listing monitor with webhook-based Discord alerts and price tracking — live API polling, instant alert delivery, and trend visualization.",
    tech: ["Next.js", "TypeScript", "REST API", "WebSocket"],
    relevance:
      "Real-time data monitoring + API integration — same pattern as live game score feeds.",
    outcome: "Live listing monitor with webhook alerts and price trend tracking",
    liveUrl: "https://ebay-pokemon-monitor.vercel.app",
  },
  {
    id: "data-intel",
    title: "Data Intelligence Platform",
    description:
      "Multi-source data analytics dashboard with interactive charts and filterable insights — pulling from multiple live data sources into a unified view.",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance:
      "Live data dashboards + real-time analytics — direct parallel to pool standings and bracket scoring.",
    outcome:
      "Unified analytics dashboard pulling from multiple data sources with interactive charts and filterable insights",
    liveUrl: "https://data-intelligence-platform-sandy.vercel.app",
  },
  {
    id: "payment-monitor",
    title: "PayGuard — Transaction Monitor",
    description:
      "Real-time transaction monitoring with flagging engine, multi-account linking, and alert delivery tracking — live data feeds with instant state updates.",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance:
      "Real-time monitoring + live data feeds — same Firebase-style state management pattern your pool needs.",
    outcome:
      "Compliance monitoring dashboard with real-time transaction flagging and alerts",
    liveUrl: "https://payment-monitor.vercel.app",
  },
];
