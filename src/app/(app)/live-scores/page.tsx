"use client";

import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { liveGames, bracketMatchups, tournamentTeams } from "@/data/mock-data";
import type { LiveGame } from "@/lib/types";
import { Radio, Clock, CheckCircle2, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "live" | "final" | "pre-game";

// Synthesize upcoming "pre-game" entries from bracketMatchups not in liveGames
const liveGameMatchupIds = new Set(liveGames.map((g) => g.matchupId));
const upcomingGames: LiveGame[] = bracketMatchups
  .filter(
    (m) => m.status === "upcoming" && !liveGameMatchupIds.has(m.id)
  )
  .map((m) => {
    const t1 = tournamentTeams.find((t) => t.id === m.team1.teamId);
    const t2 = tournamentTeams.find((t) => t.id === m.team2.teamId);
    return {
      id: `upcoming-${m.id}`,
      matchupId: m.id,
      team1: {
        teamId: m.team1.teamId,
        name: t1?.name ?? "TBD",
        seed: t1?.seed ?? 0,
        score: 0,
      },
      team2: {
        teamId: m.team2.teamId,
        name: t2?.name ?? "TBD",
        seed: t2?.seed ?? 0,
        score: 0,
      },
      period: "--",
      timeRemaining: new Date(m.gameTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      status: "pre-game" as const,
      network: m.network,
    };
  });

const allGames: LiveGame[] = [
  ...liveGames.filter((g) => g.status === "live"),
  ...liveGames.filter((g) => g.status === "halftime"),
  ...liveGames.filter((g) => g.status === "final"),
  ...upcomingGames,
];

function GameStatusBadge({ status }: { status: LiveGame["status"] }) {
  if (status === "live") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-[color:var(--success)]">
        <span className="relative inline-flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
        </span>
        LIVE
      </span>
    );
  }
  if (status === "halftime") {
    return (
      <span className="text-xs font-semibold text-[color:var(--warning)]">
        HALFTIME
      </span>
    );
  }
  if (status === "final") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
        <CheckCircle2 className="w-3 h-3" />
        Final
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Clock className="w-3 h-3" />
      Upcoming
    </span>
  );
}

function GameCard({ game }: { game: LiveGame }) {
  const isLive = game.status === "live" || game.status === "halftime";
  const isFinal = game.status === "final";
  const isUpcoming = game.status === "pre-game";

  // Determine winner for final games
  const team1IsWinner =
    isFinal && game.team1.score > game.team2.score;
  const team2IsWinner =
    isFinal && game.team2.score > game.team1.score;

  return (
    <div
      className={cn(
        "aesthetic-card p-4 space-y-4 transition-all",
        isLive &&
          "border-[color:var(--success)]/30 shadow-[0_0_16px_oklch(0.65_0.22_155/0.12)]"
      )}
    >
      {/* Top row: status + network */}
      <div className="flex items-center justify-between">
        <GameStatusBadge status={game.status} />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Tv className="w-3 h-3" />
          {game.network}
        </div>
      </div>

      {/* Score display */}
      <div className="space-y-2">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] font-mono text-muted-foreground w-4 text-right shrink-0">
              {game.team1.seed}
            </span>
            <span
              className={cn(
                "text-sm font-medium truncate",
                isFinal && !team1IsWinner && "text-muted-foreground/60",
                team1IsWinner && "font-bold"
              )}
            >
              {game.team1.name}
            </span>
            {team1IsWinner && (
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--success)] shrink-0" />
            )}
          </div>
          {!isUpcoming && (
            <span
              className={cn(
                "text-xl font-bold font-mono tabular-nums shrink-0",
                isLive && "text-foreground",
                team1IsWinner
                  ? "text-[color:var(--success)]"
                  : isFinal
                  ? "text-muted-foreground/60"
                  : "text-foreground"
              )}
            >
              {game.team1.score}
            </span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] font-mono text-muted-foreground w-4 text-right shrink-0">
              {game.team2.seed}
            </span>
            <span
              className={cn(
                "text-sm font-medium truncate",
                isFinal && !team2IsWinner && "text-muted-foreground/60",
                team2IsWinner && "font-bold"
              )}
            >
              {game.team2.name}
            </span>
            {team2IsWinner && (
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--success)] shrink-0" />
            )}
          </div>
          {!isUpcoming && (
            <span
              className={cn(
                "text-xl font-bold font-mono tabular-nums shrink-0",
                isLive && "text-foreground",
                team2IsWinner
                  ? "text-[color:var(--success)]"
                  : isFinal
                  ? "text-muted-foreground/60"
                  : "text-foreground"
              )}
            >
              {game.team2.score}
            </span>
          )}
        </div>
      </div>

      {/* Game context */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/40 pt-3">
        {isLive && (
          <span className="font-medium">
            {game.period} · {game.timeRemaining} remaining
          </span>
        )}
        {isFinal && <span>Final Score</span>}
        {isUpcoming && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Tip-off {game.timeRemaining}
          </span>
        )}
        {isLive && game.lastPlay && (
          <span className="text-right truncate max-w-[140px] hidden sm:block italic">
            &ldquo;{game.lastPlay}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
}

export default function LiveScoresPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const displayed = useMemo(() => {
    if (statusFilter === "all") return allGames;
    return allGames.filter((g) => g.status === statusFilter);
  }, [statusFilter]);

  const liveCount = allGames.filter((g) => g.status === "live").length;
  const finalCount = allGames.filter((g) => g.status === "final").length;
  const upcomingCount = allGames.filter((g) => g.status === "pre-game").length;

  const filterOptions: { value: StatusFilter; label: string; count: number }[] = [
    { value: "all", label: "All", count: allGames.length },
    { value: "live", label: "Live", count: liveCount },
    { value: "final", label: "Final", count: finalCount },
    { value: "pre-game", label: "Upcoming", count: upcomingCount },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Live Scores" />

      <div className="flex-1 overflow-y-auto p-[var(--content-padding,1.5rem)] space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Live Scores</h1>
            <p className="text-sm text-muted-foreground mt-1">
              2026 March Madness · Sweet 16 &amp; Elite Eight
            </p>
          </div>
          {liveCount > 0 && (
            <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--success)]">
              <Radio className="w-4 h-4" />
              {liveCount} game{liveCount !== 1 ? "s" : ""} in progress
            </div>
          )}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-100",
                statusFilter === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {opt.value === "live" && opt.count > 0 && (
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
                </span>
              )}
              {opt.label}
              <Badge
                variant="outline"
                className={cn(
                  "ml-0.5 px-1 py-0 text-[9px] font-mono border-0 rounded-full",
                  statusFilter === opt.value
                    ? "bg-white/20 text-inherit"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {opt.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Games grid */}
        {displayed.length === 0 ? (
          <div className="aesthetic-card p-12 flex items-center justify-center text-sm text-muted-foreground">
            No {statusFilter === "pre-game" ? "upcoming" : statusFilter} games right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((game, index) => (
              <div
                key={game.id}
                className="animate-fade-up-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationDuration: "200ms",
                }}
              >
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
