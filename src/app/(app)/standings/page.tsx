"use client";

import dynamic from "next/dynamic";
import { AppHeader } from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { poolMembers } from "@/data/mock-data";
import type { PoolMember } from "@/lib/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// SSR-safe chart import
const PointsOverTimeChart = dynamic(
  () =>
    import("@/components/standings/points-chart").then(
      (m) => m.PointsOverTimeChart
    ),
  { ssr: false }
);

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[color:var(--warning)]/15 text-[color:var(--warning)] font-bold text-sm font-mono">
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground font-bold text-sm font-mono">
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/60 text-muted-foreground/80 font-bold text-sm font-mono">
        3
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 text-sm font-mono text-muted-foreground/60">
      {rank}
    </span>
  );
}

function RankChange({ member }: { member: PoolMember }) {
  const change = member.previousRank - member.rank; // positive = moved up
  if (change > 0)
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-medium text-[color:var(--success)]">
        <TrendingUp className="w-3 h-3" />+{change}
      </span>
    );
  if (change < 0)
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-medium text-destructive">
        <TrendingDown className="w-3 h-3" />
        {change}
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground/50">
      <Minus className="w-3 h-3" />
    </span>
  );
}

function AccuracyBar({ correct, total }: { correct: number; total: number }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-8 text-right shrink-0">
        {pct}%
      </span>
    </div>
  );
}

export default function StandingsPage() {
  const sorted = [...poolMembers].sort((a, b) => a.rank - b.rank);

  // Top 3 for "you" context
  const youEntry = poolMembers.find((m) => m.name === "You");
  const leader = poolMembers.find((m) => m.rank === 1);
  const pointsBehind = leader && youEntry ? leader.totalPoints - youEntry.totalPoints : 0;

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Standings" />

      <div className="flex-1 overflow-y-auto p-[var(--content-padding,1.5rem)] space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pool Standings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Office Bracket Bash — {poolMembers.length} members
            </p>
          </div>
          {youEntry && (
            <div className="aesthetic-card px-4 py-3 flex items-center gap-3">
              <Trophy className="w-4 h-4 text-[color:var(--warning)]" />
              <div>
                <p className="text-xs text-muted-foreground">Your Rank</p>
                <p className="text-sm font-bold font-mono">
                  #{youEntry.rank}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({pointsBehind > 0 ? `${pointsBehind} pts behind leader` : "leading!"})
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Points over time chart */}
        <div className="aesthetic-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold">Points Race — Top 3</h2>
            <Badge
              variant="outline"
              className="text-[10px] text-muted-foreground border-border/60 ml-auto"
            >
              Through Sweet 16
            </Badge>
          </div>
          <PointsOverTimeChart />
        </div>

        {/* Leaderboard table */}
        <div className="aesthetic-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3 w-12">
                    Rank
                  </th>
                  <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">
                    Member
                  </th>
                  <th className="text-right text-[11px] font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">
                    Correct Picks
                  </th>
                  <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">
                    Accuracy
                  </th>
                  <th className="text-right text-[11px] font-medium text-muted-foreground px-4 py-3">
                    Points
                  </th>
                  <th className="text-center text-[11px] font-medium text-muted-foreground px-3 py-3">
                    Move
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((member) => {
                  const isYou = member.name === "You";
                  return (
                    <tr
                      key={member.id}
                      className={cn(
                        "border-b border-border/30 last:border-0 transition-colors",
                        isYou
                          ? "bg-primary/5"
                          : "hover:bg-[color:var(--surface-hover)]"
                      )}
                    >
                      {/* Rank */}
                      <td className="px-4 py-3">
                        <RankBadge rank={member.rank} />
                      </td>

                      {/* Member */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                              isYou
                                ? "bg-primary/15 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {member.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-sm font-medium truncate",
                                  isYou ? "text-primary" : "text-foreground"
                                )}
                              >
                                {member.name}
                              </span>
                              {isYou && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] border-0 rounded-full text-primary bg-primary/10 px-1.5 py-0"
                                >
                                  You
                                </Badge>
                              )}
                              {member.eliminated && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] border-0 rounded-full text-destructive bg-destructive/10 px-1.5 py-0"
                                >
                                  Eliminated
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Correct picks */}
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className="text-sm font-mono text-foreground">
                          {member.correctPicks}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{member.totalPicks}
                        </span>
                      </td>

                      {/* Accuracy bar */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <AccuracyBar
                          correct={member.correctPicks}
                          total={member.totalPicks}
                        />
                      </td>

                      {/* Total points */}
                      <td className="px-4 py-3 text-right">
                        <span
                          className={cn(
                            "text-sm font-bold font-mono",
                            isYou ? "text-primary" : "text-foreground"
                          )}
                        >
                          {member.totalPoints}
                        </span>
                      </td>

                      {/* Rank change */}
                      <td className="px-3 py-3 text-center">
                        <RankChange member={member} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
