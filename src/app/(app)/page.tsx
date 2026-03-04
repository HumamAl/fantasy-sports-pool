"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { AppHeader } from "@/components/layout/app-header";
import { DemoBanner } from "@/components/layout/conversion-elements";
import {
  dashboardStats,
  liveGames,
  activityFeed,
  upcomingDeadlines,
  pools,
  poolMembers,
} from "@/data/mock-data";
import type { Pool } from "@/lib/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Tv,
  Clock,
  Zap,
  Trophy,
  Target,
  Users,
  AlertTriangle,
  Star,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter hook
// ─────────────────────────────────────────────────────────────────────────────
function useCountUp(targetRaw: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * targetRaw));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(targetRaw);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetRaw, duration]);

  return { count, ref };
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  index: number;
}

function StatCard({ label, value, change, trend, index }: StatCardProps) {
  // Parse raw numeric target from value string
  const rawNum = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const { count, ref } = useCountUp(rawNum);

  // Format displayed value to match original format
  function formatCount(n: number): string {
    if (value.startsWith("#")) return `#${n}`;
    if (value.endsWith("%")) return `${n}%`;
    return `${n}`;
  }

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div
      ref={ref}
      className="aesthetic-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
      }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="text-3xl font-bold font-mono tabular-nums mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {formatCount(count)}
      </p>
      {change && (
        <div className={cn("flex items-center gap-1 mt-1.5 text-xs", trendColor)}>
          <TrendIcon className="w-3 h-3" />
          <span>{change} vs last round</span>
        </div>
      )}
      {!change && (
        <p className="text-xs text-muted-foreground mt-1.5">pools running now</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live score ticker dot
// ─────────────────────────────────────────────────────────────────────────────
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Activity icon helper
// ─────────────────────────────────────────────────────────────────────────────
function activityIcon(type: string) {
  switch (type) {
    case "result":     return <Trophy className="w-3.5 h-3.5 text-primary" />;
    case "upset":      return <AlertTriangle className="w-3.5 h-3.5 text-warning" />;
    case "elimination":return <Target className="w-3.5 h-3.5 text-destructive" />;
    case "milestone":  return <Star className="w-3.5 h-3.5 text-success" />;
    default:           return <Zap className="w-3.5 h-3.5 text-muted-foreground" />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Relative time formatter
// ─────────────────────────────────────────────────────────────────────────────
function relativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Deadline countdown
// ─────────────────────────────────────────────────────────────────────────────
function countdownLabel(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Closed";
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h left`;
  const days = Math.floor(hrs / 24);
  return `${days}d left`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pool status badge
// ─────────────────────────────────────────────────────────────────────────────
function poolStatusBadge(status: Pool["status"]) {
  switch (status) {
    case "in-progress":
      return (
        <Badge className="text-[10px] px-1.5 py-0 bg-success/15 text-success border-success/30">
          Live
        </Badge>
      );
    case "open":
      return (
        <Badge className="text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-primary/30">
          Open
        </Badge>
      );
    case "locked":
      return (
        <Badge className="text-[10px] px-1.5 py-0 bg-warning/15 text-warning border-warning/30">
          Locked
        </Badge>
      );
    case "completed":
      return (
        <Badge className="text-[10px] px-1.5 py-0 bg-muted text-muted-foreground">
          Final
        </Badge>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Pool type label
// ─────────────────────────────────────────────────────────────────────────────
function poolTypeLabel(type: Pool["type"]): string {
  const map: Record<Pool["type"], string> = {
    "bracket": "Bracket",
    "survivor": "Survivor",
    "confidence": "Confidence",
    "pick-em": "Pick 'Em",
  };
  return map[type];
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PoolHubPage() {
  const [selectedPool, setSelectedPool] = useState<string>("all");

  // Filter activity feed by pool (approximated by membership name mentions)
  const filteredActivity = useMemo(() => {
    if (selectedPool === "all") return activityFeed;
    const pool = pools.find((p) => p.id === selectedPool);
    if (!pool) return activityFeed;
    // Show only activity items whose message mentions a member in the selected pool
    const memberNames = poolMembers
      .filter((m) => m.poolId === selectedPool)
      .map((m) => m.name);
    return activityFeed.filter(
      (a) =>
        !a.memberName ||
        memberNames.includes(a.memberName) ||
        a.type === "result" ||
        a.type === "upset"
    );
  }, [selectedPool]);

  // User rank in selected pool context
  const userMember = poolMembers.find((m) => m.name === "You");

  const liveGame = liveGames.find((g) => g.status === "live");
  const recentGames = liveGames.filter((g) => g.status === "final").slice(0, 3);

  return (
    <div className="flex flex-col min-h-full">
      <AppHeader title="Pool Hub" />

      <div className="flex-1 space-y-6" style={{ padding: "var(--content-padding)" }}>

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">March Madness Hub</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Sweet 16 · 3 pools active · {liveGame ? "1 game live now" : "No live games"}
            </p>
          </div>
          {/* Pool filter selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">Viewing:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedPool("all")}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md border transition-colors",
                  selectedPool === "all"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:bg-[color:var(--surface-hover)]"
                )}
              >
                All Pools
              </button>
              {pools.filter(p => p.status !== "open").map((pool) => (
                <button
                  key={pool.id}
                  onClick={() => setSelectedPool(pool.id)}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-md border transition-colors hidden md:block",
                    selectedPool === pool.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:bg-[color:var(--surface-hover)]"
                  )}
                >
                  {pool.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stat Cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              index={i}
            />
          ))}
        </div>

        {/* ── Live Games + Upcoming Deadlines ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Live & Recent Games — 2/3 width */}
          <div className="lg:col-span-2 space-y-3">

            {/* Live game card */}
            {liveGame && (
              <div
                className="aesthetic-card animate-fade-up-in"
                style={{ padding: "var(--card-padding)", animationDelay: "200ms", animationDuration: "150ms" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <LiveDot />
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wider">
                    Live Now
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                    <Tv className="w-3 h-3" />
                    {liveGame.network}
                  </span>
                </div>

                {/* Score display */}
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-sm font-semibold">{liveGame.team1.name}</p>
                    <p className="text-xs text-muted-foreground">#{liveGame.team1.seed} seed</p>
                    <p className="text-4xl font-bold font-mono mt-2 text-primary">
                      {liveGame.team1.score}
                    </p>
                  </div>

                  <div className="px-4 text-center">
                    <p className="text-xs font-medium text-muted-foreground">{liveGame.period}</p>
                    <p className="text-lg font-bold font-mono mt-1">{liveGame.timeRemaining}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Sweet 16 · West</p>
                  </div>

                  <div className="text-center flex-1">
                    <p className="text-sm font-semibold">{liveGame.team2.name}</p>
                    <p className="text-xs text-muted-foreground">#{liveGame.team2.seed} seed</p>
                    <p className="text-4xl font-bold font-mono mt-2">
                      {liveGame.team2.score}
                    </p>
                  </div>
                </div>

                {liveGame.lastPlay && (
                  <div className="mt-4 pt-3 border-t border-border/40">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Last play: </span>
                      {liveGame.lastPlay}
                    </p>
                  </div>
                )}

                {/* Your pick indicator */}
                {userMember && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      <Target className="w-3 h-3" />
                      Your pick: {liveGame.team1.name} (#{liveGame.team1.seed})
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Recently completed games */}
            <div
              className="aesthetic-card animate-fade-up-in"
              style={{ padding: "var(--card-padding)", animationDelay: "250ms", animationDuration: "150ms" }}
            >
              <h2 className="text-sm font-semibold mb-3">Recent Results</h2>
              <div className="space-y-2">
                {recentGames.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between py-2 border-b border-border/30 last:border-0 aesthetic-hover rounded px-1"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs text-muted-foreground shrink-0 w-8 text-right font-mono font-medium">
                        {game.team1.score}
                      </span>
                      <span className="text-xs font-medium truncate">{game.team1.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground mx-3 shrink-0">Final</span>
                    <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                      <span className="text-xs font-medium truncate text-right">{game.team2.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0 w-8 font-mono font-medium">
                        {game.team2.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines — 1/3 width */}
          <div className="space-y-3">
            <div
              className="aesthetic-card animate-fade-up-in"
              style={{ padding: "var(--card-padding)", animationDelay: "300ms", animationDuration: "150ms" }}
            >
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Pick Deadlines
              </h2>
              <div className="space-y-3">
                {upcomingDeadlines.map((dl, i) => {
                  const countdown = countdownLabel(dl.deadline);
                  const isOpen = dl.status === "open";
                  const isUrgent = countdown.includes("h") && isOpen;
                  return (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium">{dl.round}</p>
                        <p className={cn(
                          "text-[11px] mt-0.5",
                          isUrgent ? "text-warning font-medium" : "text-muted-foreground"
                        )}>
                          {countdown}
                        </p>
                      </div>
                      <Badge className={cn(
                        "text-[10px] px-1.5 py-0 shrink-0",
                        isOpen
                          ? "bg-success/15 text-success border-success/30"
                          : "bg-muted text-muted-foreground border-border/40"
                      )}>
                        {isOpen ? "Open" : "Upcoming"}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                <button className="w-full text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1">
                  Submit Elite Eight Picks
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pool Overview + Activity Feed ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* My Active Pools */}
          <div
            className="aesthetic-card animate-fade-up-in"
            style={{ padding: "var(--card-padding)", animationDelay: "350ms", animationDuration: "150ms" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                My Pools
              </h2>
              <span className="text-xs text-muted-foreground">{pools.length} total</span>
            </div>
            <div className="space-y-2">
              {pools.map((pool) => {
                // Find the user's rank in this pool if available
                const myEntry = poolMembers.find(
                  (m) => m.poolId === pool.id && m.name === "You"
                );
                return (
                  <div
                    key={pool.id}
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-md border border-border/40 aesthetic-hover cursor-pointer",
                      selectedPool === pool.id && "border-primary/30 bg-primary/5"
                    )}
                    onClick={() => setSelectedPool(pool.id)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium truncate">{pool.name}</p>
                        {poolStatusBadge(pool.status)}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {poolTypeLabel(pool.type)} · {pool.memberCount}/{pool.maxMembers} members
                        {pool.entryFee > 0 && ` · $${pool.entryFee} entry`}
                      </p>
                    </div>
                    {myEntry && (
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-xs font-bold font-mono text-primary">#{myEntry.rank}</p>
                        {myEntry.previousRank !== myEntry.rank && (
                          <p className={cn(
                            "text-[10px]",
                            myEntry.rank < myEntry.previousRank ? "text-success" : "text-destructive"
                          )}>
                            {myEntry.rank < myEntry.previousRank ? "↑" : "↓"}
                            {Math.abs(myEntry.previousRank - myEntry.rank)}
                          </p>
                        )}
                      </div>
                    )}
                    {!myEntry && pool.totalPrize > 0 && (
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-xs font-medium text-success">${pool.totalPrize}</p>
                        <p className="text-[10px] text-muted-foreground">prize</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Feed */}
          <div
            className="aesthetic-card animate-fade-up-in"
            style={{ padding: "var(--card-padding)", animationDelay: "400ms", animationDuration: "150ms" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Pool Activity
              </h2>
              <span className="text-xs text-muted-foreground">
                {selectedPool === "all" ? "All pools" : pools.find(p => p.id === selectedPool)?.name.split(" ")[0]}
              </span>
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 py-2 border-b border-border/25 last:border-0 aesthetic-hover rounded px-1"
                >
                  <div className="mt-0.5 shrink-0">{activityIcon(item.type)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-snug">{item.message}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                    {relativeTime(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Leaderboard Snapshot ────────────────────────────────── */}
        <div
          className="aesthetic-card animate-fade-up-in"
          style={{ padding: "var(--card-padding)", animationDelay: "450ms", animationDuration: "150ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              Office Bracket Bash — Leaderboard
            </h2>
            <a
              href="/leaderboard"
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Full standings <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-2 pr-3 text-muted-foreground font-medium w-8">Rank</th>
                  <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Entrant</th>
                  <th className="text-right py-2 pr-3 text-muted-foreground font-medium">Points</th>
                  <th className="text-right py-2 pr-3 text-muted-foreground font-medium hidden sm:table-cell">Correct Picks</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Move</th>
                </tr>
              </thead>
              <tbody>
                {poolMembers.slice(0, 8).map((member) => {
                  const isYou = member.name === "You";
                  const moved = member.previousRank - member.rank;
                  return (
                    <tr
                      key={member.id}
                      className={cn(
                        "border-b border-border/20 last:border-0 aesthetic-hover",
                        isYou && "bg-primary/5"
                      )}
                    >
                      <td className="py-2 pr-3 font-mono font-bold text-muted-foreground">
                        {member.rank <= 3 ? (
                          <span className={cn(
                            "font-bold",
                            member.rank === 1 ? "text-warning" :
                            member.rank === 2 ? "text-muted-foreground" :
                            "text-success"
                          )}>
                            #{member.rank}
                          </span>
                        ) : (
                          <span>#{member.rank}</span>
                        )}
                      </td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[9px] font-bold shrink-0">
                            {member.avatar}
                          </span>
                          <span className={cn("font-medium", isYou && "text-primary")}>
                            {member.name}
                          </span>
                          {isYou && (
                            <Badge className="text-[9px] px-1 py-0 bg-primary/15 text-primary border-primary/30">
                              You
                            </Badge>
                          )}
                          {member.eliminated && (
                            <Badge className="text-[9px] px-1 py-0 bg-destructive/15 text-destructive border-destructive/30">
                              Eliminated
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-right font-mono font-bold">
                        {member.totalPoints}
                      </td>
                      <td className="py-2 pr-3 text-right text-muted-foreground hidden sm:table-cell">
                        {member.correctPicks}/{member.totalPicks}
                      </td>
                      <td className="py-2 text-right">
                        {moved > 0 ? (
                          <span className="text-success font-medium">↑{moved}</span>
                        ) : moved < 0 ? (
                          <span className="text-destructive font-medium">↓{Math.abs(moved)}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Demo Banner ─────────────────────────────────────────── */}
        <DemoBanner />
      </div>
    </div>
  );
}
