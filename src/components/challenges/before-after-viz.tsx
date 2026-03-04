"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";

const beforeItems = [
  "Static bracket data (no live scores)",
  "Single-user session only",
  "No sports API connection",
  "No mobile layout",
  "Manual data refresh",
  "No pick-lock enforcement",
];

const afterItems = [
  "Firebase Realtime Database sync",
  "Multi-user pools with leaderboard",
  "Live NCAA / ESPN API feed",
  "Mobile-responsive at all breakpoints",
  "Sub-3s score propagation via WebSocket",
  "Server-enforced pick locks at tip-off",
];

export function BeforeAfterViz() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center gap-1 rounded-lg p-1 w-fit"
        style={{ background: "color-mix(in oklch, var(--muted), transparent 30%)" }}
      >
        <button
          onClick={() => setShowAfter(false)}
          className="px-3 py-1 rounded-md text-xs font-medium transition-all"
          style={{
            background: !showAfter ? "var(--card)" : "transparent",
            color: !showAfter ? "var(--foreground)" : "var(--muted-foreground)",
            boxShadow: !showAfter ? "0 1px 3px color-mix(in oklch, var(--border), transparent 30%)" : "none",
            transitionDuration: "var(--dur-fast)",
            transitionTimingFunction: "var(--ease-snappy)",
          }}
        >
          Claude Prototype
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className="px-3 py-1 rounded-md text-xs font-medium transition-all"
          style={{
            background: showAfter ? "color-mix(in oklch, var(--success) 12%, var(--card))" : "transparent",
            color: showAfter ? "var(--success)" : "var(--muted-foreground)",
            boxShadow: showAfter ? "0 1px 3px color-mix(in oklch, var(--border), transparent 30%)" : "none",
            transitionDuration: "var(--dur-fast)",
            transitionTimingFunction: "var(--ease-snappy)",
          }}
        >
          Production App
        </button>
      </div>

      {/* Panel */}
      <div
        className="rounded-lg border p-4 space-y-2 transition-all"
        style={{
          borderColor: showAfter
            ? "color-mix(in oklch, var(--success) 20%, transparent)"
            : "color-mix(in oklch, var(--destructive) 20%, transparent)",
          background: showAfter
            ? "color-mix(in oklch, var(--success) 6%, transparent)"
            : "color-mix(in oklch, var(--destructive) 5%, transparent)",
          transitionDuration: "var(--dur-normal)",
          transitionTimingFunction: "var(--ease-snappy)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: showAfter ? "var(--success)" : "var(--destructive)" }}
        >
          {showAfter ? "Production App" : "Claude Prototype"}
        </p>
        <ul className="space-y-1.5">
          {(showAfter ? afterItems : beforeItems).map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              {showAfter ? (
                <Check
                  className="h-3.5 w-3.5 mt-0.5 shrink-0"
                  style={{ color: "var(--success)" }}
                />
              ) : (
                <X
                  className="h-3.5 w-3.5 mt-0.5 shrink-0"
                  style={{ color: "var(--destructive)" }}
                />
              )}
              <span style={{ color: "var(--foreground)" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[10px] font-mono text-muted-foreground">
        Toggle to compare — same concept, production-grade implementation
      </p>
    </div>
  );
}
