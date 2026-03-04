import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers treating a tournament pool like a standard web app — static data refreshed on page load, no real-time sync, no load planning — until game day arrives and the whole thing falls over at tip-off.",
  differentApproach:
    "I'd architect this from day one around Firebase Realtime Database as the live sync backbone, with a tested data pipeline from the sports API, and a stress plan built for the First Round spike — not bolted on afterward.",
  accentWord: "Firebase Realtime Database",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Real-Time Game-Day Data Pipeline",
    description:
      "Live score updates are the heartbeat of the pool — a stale leaderboard kills engagement. The pipeline must flow from the sports API all the way to every participant's screen within a few seconds, including locked-pick validation and push notifications.",
    visualizationType: "flow",
    outcome:
      "Could deliver score and standing updates within 2–3 seconds of official results, keeping every pool participant locked in during the First Round frenzy.",
  },
  {
    id: "challenge-2",
    title: "Tournament-Scale Stress Resilience",
    description:
      "March Madness has exactly one first weekend — there's no second chance. The system needs to survive simultaneous bracket submissions, a flood of concurrent viewers, and thousands of pick-lock writes all happening in the same 30-minute window before tip-off.",
    visualizationType: "metrics",
    outcome:
      "Could handle the First Round submission spike (500+ concurrent users, 1,000+ picks/min) without degraded latency or dropped writes — giving the beta a clean live debut on March 19.",
  },
  {
    id: "challenge-3",
    title: "From Claude Prototype to Deployable Platform",
    description:
      "The Claude prototype proves the concept but carries hard constraints: static/mock data, single-user state, no API integration, and no mobile layout. Bridging that gap by March 15 means a focused upgrade path — not a rewrite — that ships each production capability in priority order.",
    visualizationType: "before-after",
    outcome:
      "Could transform the working prototype into a live-data, multi-user platform deployable by March 15, with enough stability buffer for the March 19–22 stress testing window.",
  },
];
