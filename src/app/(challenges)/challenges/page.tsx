"use client";

import { useState } from "react";
import Link from "next/link";
import { challenges, executiveSummary } from "@/data/challenges";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { FlowDiagram } from "@/components/challenges/flow-diagram";
import { MetricBar } from "@/components/challenges/metric-bar";
import { BeforeAfter } from "@/components/challenges/before-after";
import { TrendingUp, Radio, Database, RefreshCw, Monitor, Bell } from "lucide-react";

// Step detail copy for the interactive flow highlight
const flowStepDetails = [
  "Polling the NCAA/ESPN API every 10–15 seconds during live games. Score delta check means Firebase only gets a write when the value actually changes — keeps write ops low.",
  "Firebase Realtime Database acts as the central hub — writes from the score processor fan out to all connected clients instantly via persistent WebSocket, with no polling on the client side.",
  "Incoming scores trigger pick validation: each pool member's selections are checked against results, confidence points assigned, upsets flagged, and eliminated brackets marked — all atomically via Cloud Functions.",
  "React state is bound directly to the Firebase listener. The leaderboard reorders in-place with a CSS transition — no page reload, no polling interval.",
  "FCM push notifications fire for key events: upset detected, bracket eliminated, pick locked 5 minutes before tip-off. Opt-in per user and batched to avoid spam during busy rounds.",
];

export default function ChallengesPage() {
  const [activeStep, setActiveStep] = useState(1);

  const flowSteps = [
    { label: "Sports API", description: "ESPN/NCAA feed", icon: Radio },
    { label: "Firebase Sync", description: "Realtime DB write", icon: Database, highlight: true },
    { label: "Score Engine", description: "Pick validation", icon: RefreshCw, highlight: true },
    { label: "Live UI", description: "<3s to screen", icon: Monitor },
    { label: "Push Alert", description: "Upset / elimination", icon: Bell },
  ];

  // Render differentApproach with accentWord highlighted in primary color
  const renderDifferentApproach = () => {
    const { differentApproach, accentWord } = executiveSummary;
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">

        {/* ── Page heading ──────────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the real technical problems in this project
          </p>
        </div>

        {/* ── Executive summary — dark hero banner ──────────────────── */}
        <div
          className="relative overflow-hidden rounded-lg p-6 md:p-8"
          style={{
            background: "oklch(0.08 0.02 var(--primary-h, 155))",
            backgroundImage:
              "radial-gradient(ellipse at 25% 60%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 65%)",
          }}
        >
          <p className="text-sm md:text-base leading-relaxed text-white/50">
            {executiveSummary.commonApproach}
          </p>
          <hr className="my-4 border-white/10" />
          <p className="text-base md:text-lg leading-relaxed font-medium text-white/90">
            {renderDifferentApproach()}
          </p>
          <p className="text-xs text-white/40 mt-4">
            <Link
              href="/"
              className="hover:text-white/65 transition-colors underline underline-offset-2"
            >
              Back to the live demo
            </Link>
          </p>
        </div>

        {/* ── Challenge cards ───────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Challenge 1 — Real-Time Data Pipeline (interactive flow) */}
          <ChallengeCard
            title={`01  ${challenges[0].title}`}
            description={challenges[0].description}
          >
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                Live update path — tap a step to inspect
              </p>
              <FlowDiagram steps={flowSteps} activeStep={activeStep} />
              <div className="flex gap-1 flex-wrap">
                {flowSteps.map((step, i) => (
                  <button
                    key={step.label}
                    onClick={() => setActiveStep(i)}
                    className="px-2 py-1 text-[10px] rounded border transition-colors"
                    style={{
                      background:
                        activeStep === i
                          ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                          : "transparent",
                      borderColor:
                        activeStep === i
                          ? "color-mix(in oklch, var(--primary) 35%, transparent)"
                          : "color-mix(in oklch, var(--border), transparent 20%)",
                      color:
                        activeStep === i ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
              <div
                className="rounded-md px-3 py-2 text-xs border"
                style={{
                  background: "color-mix(in oklch, var(--primary) 6%, transparent)",
                  borderColor: "color-mix(in oklch, var(--primary) 18%, transparent)",
                  color: "var(--foreground)",
                  minHeight: "2.5rem",
                }}
              >
                {flowStepDetails[activeStep]}
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--success)" }}
                />
                <span className="text-[10px] font-mono text-muted-foreground">
                  Target: &lt;3s end-to-end latency on game day
                </span>
              </div>
            </div>
            {/* Outcome statement */}
            <div
              className="flex items-start gap-2 rounded-md px-3 py-2"
              style={{
                backgroundColor: "color-mix(in oklch, var(--success) 7%, transparent)",
                borderColor: "color-mix(in oklch, var(--success) 18%, transparent)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--success)" }}>
                {challenges[0].outcome}
              </p>
            </div>
          </ChallengeCard>

          {/* Challenge 2 — Stress Resilience (metric bars) */}
          <ChallengeCard
            title={`02  ${challenges[1].title}`}
            description={challenges[1].description}
          >
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                First Round capacity targets
              </p>
              <MetricBar label="Concurrent Users (target: 500+)" value={500} max={600} unit="+" color="green" />
              <MetricBar label="Pick Lock Throughput (1,000+ per minute)" value={1000} max={1200} unit="/min" color="green" />
              <MetricBar label="Score Update Latency (target: <3s)" value={3} max={10} unit="s" color="yellow" />
              <MetricBar label="Database Write Ops (10K+/hr at peak)" value={10000} max={12000} unit="/hr" color="blue" />
            </div>
            {/* Outcome statement */}
            <div
              className="flex items-start gap-2 rounded-md px-3 py-2"
              style={{
                backgroundColor: "color-mix(in oklch, var(--success) 7%, transparent)",
                borderColor: "color-mix(in oklch, var(--success) 18%, transparent)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--success)" }}>
                {challenges[1].outcome}
              </p>
            </div>
          </ChallengeCard>

          {/* Challenge 3 — Prototype to Production (before/after toggle) */}
          <ChallengeCard
            title={`03  ${challenges[2].title}`}
            description={challenges[2].description}
          >
            <BeforeAfter
              before={{
                label: "Claude Prototype",
                items: [
                  "Static/mock data — no live scores",
                  "Single-user session only",
                  "No sports API connection",
                  "Desktop-only layout",
                  "No pick-lock enforcement",
                ],
              }}
              after={{
                label: "Production Platform",
                items: [
                  "Firebase Realtime Database sync",
                  "Multi-user pools with leaderboard",
                  "Live NCAA/ESPN API feed",
                  "Mobile-responsive at all breakpoints",
                  "Server-enforced pick locks at tip-off",
                ],
              }}
            />
            {/* Outcome statement */}
            <div
              className="flex items-start gap-2 rounded-md px-3 py-2"
              style={{
                backgroundColor: "color-mix(in oklch, var(--success) 7%, transparent)",
                borderColor: "color-mix(in oklch, var(--success) 18%, transparent)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--success)" }}>
                {challenges[2].outcome}
              </p>
            </div>
          </ChallengeCard>

        </div>

        {/* ── CTA Closer ────────────────────────────────────────────── */}
        <section
          className="p-6 rounded-lg border"
          style={{
            borderColor: "color-mix(in oklch, var(--primary) 18%, transparent)",
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 6%, var(--card)), var(--card))",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold mb-1">
                Ready to walk through the build plan?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                I&apos;ve mapped the March 15 deadline, the API setup, and the First Round stress
                window. Happy to go deeper on any of this in a quick call.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/proposal"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                See the proposal &rarr;
              </Link>
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                style={{
                  background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                  borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
                  color: "var(--primary)",
                }}
              >
                Reply on Upwork to start
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
