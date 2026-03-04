"use client";

import { useState } from "react";
import { Wifi, Database, Cpu, Monitor, Bell, ArrowRight, ChevronRight } from "lucide-react";

interface FlowStep {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  highlight?: boolean;
}

const steps: FlowStep[] = [
  {
    id: "api",
    label: "Sports API",
    sublabel: "ESPN / NCAA feed",
    icon: Wifi,
  },
  {
    id: "firebase",
    label: "Firebase RT DB",
    sublabel: "WebSocket sync",
    icon: Database,
    highlight: true,
  },
  {
    id: "processing",
    label: "Score Engine",
    sublabel: "Pick validation + points",
    icon: Cpu,
    highlight: true,
  },
  {
    id: "ui",
    label: "Live UI",
    sublabel: "Leaderboard update",
    icon: Monitor,
  },
  {
    id: "push",
    label: "Push Alert",
    sublabel: "Upset / elimination",
    icon: Bell,
  },
];

export function FlowViz() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
        Live update path — tap a step to inspect
      </p>

      {/* Desktop: horizontal row */}
      <div className="hidden sm:flex items-center gap-1 flex-wrap">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <div key={step.id} className="flex items-center gap-1">
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all"
                style={{
                  borderColor: isActive
                    ? "var(--primary)"
                    : step.highlight
                    ? "color-mix(in oklch, var(--primary) 30%, transparent)"
                    : "color-mix(in oklch, var(--border), transparent 20%)",
                  background: isActive
                    ? "color-mix(in oklch, var(--primary) 14%, transparent)"
                    : step.highlight
                    ? "color-mix(in oklch, var(--primary) 7%, transparent)"
                    : "var(--card)",
                  transitionDuration: "var(--dur-normal)",
                  transitionTimingFunction: "var(--ease-snappy)",
                }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{
                    color: isActive || step.highlight ? "var(--primary)" : "var(--muted-foreground)",
                  }}
                />
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: isActive ? "var(--primary)" : "var(--foreground)" }}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {step.sublabel}
                </span>
              </button>
              {i < steps.length - 1 && (
                <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/50" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex sm:hidden flex-col gap-1">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-all"
                style={{
                  borderColor: isActive
                    ? "var(--primary)"
                    : step.highlight
                    ? "color-mix(in oklch, var(--primary) 30%, transparent)"
                    : "color-mix(in oklch, var(--border), transparent 20%)",
                  background: isActive
                    ? "color-mix(in oklch, var(--primary) 14%, transparent)"
                    : step.highlight
                    ? "color-mix(in oklch, var(--primary) 7%, transparent)"
                    : "var(--card)",
                  transitionDuration: "var(--dur-normal)",
                  transitionTimingFunction: "var(--ease-snappy)",
                }}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: isActive || step.highlight ? "var(--primary)" : "var(--muted-foreground)" }}
                />
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: isActive ? "var(--primary)" : "var(--foreground)" }}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{step.sublabel}</p>
                </div>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/40 rotate-90" />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel — appears when a step is active */}
      {activeStep && (
        <div
          className="rounded-lg px-3 py-2 text-xs border transition-all"
          style={{
            background: "color-mix(in oklch, var(--primary) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
            color: "var(--foreground)",
          }}
        >
          {activeStep === "api" && (
            <span>
              Polling the NCAA/ESPN feed every <strong>10–15 seconds</strong> on game days. Score delta triggers a Firebase write only when the value changes — avoids unnecessary write ops.
            </span>
          )}
          {activeStep === "firebase" && (
            <span>
              Firebase Realtime Database pushes updates to all connected clients via <strong>persistent WebSocket</strong>. No polling on the client side — the UI reacts to data events.
            </span>
          )}
          {activeStep === "processing" && (
            <span>
              A server-side Cloud Function evaluates each active pick against the score result, assigns confidence points, flags upsets, and marks eliminated brackets — all atomically.
            </span>
          )}
          {activeStep === "ui" && (
            <span>
              React state binds directly to the Firebase listener. Leaderboard reorders in-place with a <strong>CSS transition</strong> — no full page reload or polling interval required.
            </span>
          )}
          {activeStep === "push" && (
            <span>
              FCM push notifications fire for key events: upset detected, bracket eliminated, pick locked 5 minutes before tip-off. Opt-in per user, batched to avoid spam during busy rounds.
            </span>
          )}
        </div>
      )}

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
  );
}
