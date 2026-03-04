"use client";

import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { userPicks, bracketMatchups, tournamentTeams } from "@/data/mock-data";
import type { Pick, BracketMatchup, TournamentTeam } from "@/lib/types";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "all" | "pending";

function getMatchup(matchupId: string): BracketMatchup | undefined {
  return bracketMatchups.find((m) => m.id === matchupId);
}

function getTeam(teamId: string): TournamentTeam | undefined {
  return tournamentTeams.find((t) => t.id === teamId);
}

function PickStatusIcon({ correct }: { correct: boolean | null }) {
  if (correct === true)
    return <CheckCircle2 className="w-4 h-4 text-[color:var(--success)] shrink-0" />;
  if (correct === false)
    return <XCircle className="w-4 h-4 text-destructive shrink-0" />;
  return <Clock className="w-4 h-4 text-muted-foreground/60 shrink-0" />;
}

function PickStatusBadge({ correct }: { correct: boolean | null }) {
  if (correct === true)
    return (
      <Badge
        variant="outline"
        className="text-xs border-0 rounded-full text-[color:var(--success)] bg-[color:var(--success)]/10"
      >
        Correct
      </Badge>
    );
  if (correct === false)
    return (
      <Badge
        variant="outline"
        className="text-xs border-0 rounded-full text-destructive bg-destructive/10"
      >
        Incorrect
      </Badge>
    );
  return (
    <Badge
      variant="outline"
      className="text-xs border-0 rounded-full text-muted-foreground bg-muted"
    >
      Pending
    </Badge>
  );
}

function PickRow({ pick }: { pick: Pick }) {
  const matchup = getMatchup(pick.matchupId);
  const selectedTeam = getTeam(pick.selectedTeamId);
  const opposingTeamId =
    matchup?.team1.teamId === pick.selectedTeamId
      ? matchup?.team2.teamId
      : matchup?.team1.teamId;
  const opposingTeam = opposingTeamId ? getTeam(opposingTeamId) : undefined;

  return (
    <div
      className={cn(
        "aesthetic-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all",
        pick.correct === true && "border-[color:var(--success)]/20",
        pick.correct === false && "border-destructive/20"
      )}
    >
      {/* Status icon */}
      <div className="shrink-0">
        <PickStatusIcon correct={pick.correct} />
      </div>

      {/* Matchup info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground">
            {selectedTeam?.name ?? "Unknown"}
          </span>
          {selectedTeam && (
            <span className="text-xs text-muted-foreground font-mono">
              #{selectedTeam.seed}
            </span>
          )}
          <span className="text-xs text-muted-foreground">vs</span>
          <span className="text-xs text-muted-foreground">
            {opposingTeam?.name ?? "TBD"}
            {opposingTeam && (
              <span className="ml-1 font-mono">#{opposingTeam.seed}</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground flex-wrap">
          <span className="font-mono">{matchup?.round ?? "--"}</span>
          <span>·</span>
          <span>{matchup?.region ?? "--"} Region</span>
          <span>·</span>
          <span>{matchup?.network ?? "--"}</span>
        </div>
      </div>

      {/* Confidence points */}
      {pick.confidencePoints !== undefined && (
        <div className="flex flex-col items-start sm:items-end shrink-0">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className="text-lg font-bold font-mono text-foreground leading-tight">
            {pick.confidencePoints}
            <span className="text-xs font-normal text-muted-foreground ml-0.5">pts</span>
          </span>
        </div>
      )}

      {/* Status badge */}
      <div className="shrink-0">
        <PickStatusBadge correct={pick.correct} />
      </div>
    </div>
  );
}

export default function MyPicksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  const displayed = useMemo(() => {
    if (viewMode === "pending") return userPicks.filter((p) => p.correct === null);
    return userPicks;
  }, [viewMode]);

  // Summary stats
  const correct = userPicks.filter((p) => p.correct === true).length;
  const incorrect = userPicks.filter((p) => p.correct === false).length;
  const pending = userPicks.filter((p) => p.correct === null).length;
  const totalConfidence = userPicks.reduce(
    (sum, p) => (p.correct === true ? sum + (p.confidencePoints ?? 0) : sum),
    0
  );
  const accuracy =
    correct + incorrect > 0
      ? Math.round((correct / (correct + incorrect)) * 100)
      : 0;

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="My Picks" />

      <div className="flex-1 overflow-y-auto p-[var(--content-padding,1.5rem)] space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Picks</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your selections with confidence points — Office Bracket Bash
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="aesthetic-card p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
              Correct
            </div>
            <p className="text-2xl font-bold font-mono text-[color:var(--success)]">
              {correct}
            </p>
          </div>
          <div className="aesthetic-card p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <XCircle className="w-3.5 h-3.5 text-destructive" />
              Incorrect
            </div>
            <p className="text-2xl font-bold font-mono text-destructive">
              {incorrect}
            </p>
          </div>
          <div className="aesthetic-card p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Target className="w-3.5 h-3.5 text-primary" />
              Accuracy
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              {accuracy}%
            </p>
          </div>
          <div className="aesthetic-card p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Award className="w-3.5 h-3.5 text-[color:var(--warning)]" />
              Points Earned
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              {totalConfidence}
            </p>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/60">
            <button
              onClick={() => setViewMode("all")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-100",
                viewMode === "all"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Picks ({userPicks.length})
            </button>
            <button
              onClick={() => setViewMode("pending")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-100",
                viewMode === "pending"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Pending Only ({pending})
            </button>
          </div>
          {viewMode === "pending" && pending === 0 && (
            <span className="text-xs text-muted-foreground">
              No pending picks — all results are in.
            </span>
          )}
        </div>

        {/* Confidence leaderboard note */}
        {viewMode === "all" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground aesthetic-card px-3 py-2">
            <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0" />
            Higher confidence on correct picks = more points. Max confidence pick
            earns 10 pts.
          </div>
        )}

        {/* Picks list */}
        {displayed.length === 0 ? (
          <div className="aesthetic-card p-12 flex items-center justify-center text-sm text-muted-foreground">
            No pending picks — check back after upcoming games.
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((pick, index) => (
              <div
                key={pick.id}
                className="animate-fade-up-in"
                style={{
                  animationDelay: `${index * 40}ms`,
                  animationDuration: "200ms",
                }}
              >
                <PickRow pick={pick} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
