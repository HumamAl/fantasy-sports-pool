"use client";

import { useState } from "react";

interface Metric {
  label: string;
  current: number;
  target: number;
  unit: string;
  status: "success" | "warning";
  note: string;
}

const metrics: Metric[] = [
  {
    label: "Concurrent Users",
    current: 0,
    target: 500,
    unit: "users",
    status: "success",
    note: "Firebase scales automatically — 500 concurrent connections are well within the Spark tier ceiling.",
  },
  {
    label: "Pick Lock Throughput",
    current: 0,
    target: 1000,
    unit: "picks/min",
    status: "success",
    note: "Firestore batch writes with server-side timestamps prevent duplicate picks even during simultaneous submissions.",
  },
  {
    label: "Score Update Latency",
    current: 0,
    target: 3,
    unit: "sec",
    status: "warning",
    note: "Target is sub-3s end-to-end. Achieved with a WebSocket listener + delta-only API polling every 10–15s.",
  },
  {
    label: "DB Write Ops / Hour",
    current: 0,
    target: 10000,
    unit: "ops/hr",
    status: "success",
    note: "Estimated peak during First Round: ~8,000 ops/hr. Firebase free tier allows 600K writes/day — safely within bounds.",
  },
];

function getBarColor(status: "success" | "warning") {
  return status === "success" ? "var(--success)" : "var(--warning)";
}

function formatTarget(m: Metric) {
  if (m.unit === "sec") return `<${m.target}${m.unit}`;
  if (m.target >= 1000) return `${(m.target / 1000).toFixed(0)}K+ ${m.unit}`;
  return `${m.target}+ ${m.unit}`;
}

export function MetricsViz() {
  const [revealed, setRevealed] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
          First Round capacity targets
        </p>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-xs font-medium px-2.5 py-1 rounded-md border transition-all"
          style={{
            borderColor: revealed
              ? "color-mix(in oklch, var(--primary) 40%, transparent)"
              : "color-mix(in oklch, var(--border), transparent 20%)",
            background: revealed
              ? "color-mix(in oklch, var(--primary) 10%, transparent)"
              : "var(--card)",
            color: revealed ? "var(--primary)" : "var(--muted-foreground)",
            transitionDuration: "var(--dur-normal)",
            transitionTimingFunction: "var(--ease-snappy)",
          }}
        >
          {revealed ? "Reset" : "Simulate peak load"}
        </button>
      </div>

      <div className="space-y-3">
        {metrics.map((metric) => {
          const isActive = activeMetric === metric.label;
          const fillPct = revealed ? (metric.unit === "sec" ? 85 : 100) : 0;

          return (
            <div key={metric.label} className="space-y-1">
              <button
                className="w-full flex items-baseline justify-between text-left"
                onClick={() => setActiveMetric(isActive ? null : metric.label)}
              >
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  {metric.label}
                </span>
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: isActive ? getBarColor(metric.status) : "var(--muted-foreground)" }}
                >
                  {formatTarget(metric)}
                </span>
              </button>

              {/* Track */}
              <div
                className="h-2 rounded-full w-full overflow-hidden"
                style={{ background: "color-mix(in oklch, var(--muted), transparent 30%)" }}
              >
                {/* Fill */}
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${fillPct}%`,
                    background: getBarColor(metric.status),
                    transition: `width 600ms var(--ease-snappy)`,
                  }}
                />
              </div>

              {/* Detail tooltip */}
              {isActive && (
                <p
                  className="text-xs px-2 py-1.5 rounded-md border"
                  style={{
                    background: "color-mix(in oklch, var(--muted), transparent 60%)",
                    borderColor: "color-mix(in oklch, var(--border), transparent 30%)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {metric.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!revealed && (
        <p className="text-[10px] text-muted-foreground">
          Press &ldquo;Simulate peak load&rdquo; to see the capacity targets fill
        </p>
      )}
    </div>
  );
}
