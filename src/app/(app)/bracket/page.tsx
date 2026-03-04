"use client";

import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bracketMatchups, tournamentTeams } from "@/data/mock-data";
import type { BracketMatchup, TournamentTeam, Region } from "@/lib/types";
import { Radio, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type RegionFilter = Region | "All";

const REGIONS: RegionFilter[] = ["All", "East", "West", "South", "Midwest"];

function getTeam(teamId: string): TournamentTeam | undefined {
  return tournamentTeams.find((t) => t.id === teamId);
}

function MatchupStatusBadge({ status }: { status: BracketMatchup["status"] }) {
  if (status === "live") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-[color:var(--success)]">
        <span className="relative inline-flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
        </span>
        LIVE
      </span>
    );
  }
  if (status === "final") {
    return (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
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

function MatchupCard({ matchup }: { matchup: BracketMatchup }) {
  const team1 = getTeam(matchup.team1.teamId);
  const team2 = getTeam(matchup.team2.teamId);
  const isLive = matchup.status === "live";
  const isFinal = matchup.status === "final";

  return (
    <div
      className={cn(
        "aesthetic-card p-4 space-y-3 transition-all",
        isLive && "border-[color:var(--success)]/30 shadow-[0_0_12px_oklch(0.65_0.22_155/0.15)]"
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground border-border/60 px-1.5 py-0">
            {matchup.round}
          </Badge>
          <span className="text-[10px] text-muted-foreground">{matchup.network}</span>
        </div>
        <MatchupStatusBadge status={matchup.status} />
      </div>

      {/* Team 1 */}
      <div
        className={cn(
          "flex items-center justify-between py-2 px-3 rounded-md",
          matchup.winnerId === matchup.team1.teamId
            ? "bg-[color:var(--success)]/8"
            : "bg-muted/40"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono text-muted-foreground w-5 text-right shrink-0">
            {team1?.seed}
          </span>
          <span
            className={cn(
              "text-sm font-medium truncate",
              matchup.winnerId && matchup.winnerId !== matchup.team1.teamId
                ? "text-muted-foreground/60"
                : "text-foreground"
            )}
          >
            {team1?.name ?? "TBD"}
          </span>
          {team1 && (
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              {team1.record}
            </span>
          )}
        </div>
        <span
          className={cn(
            "text-sm font-mono font-semibold shrink-0",
            matchup.winnerId === matchup.team1.teamId
              ? "text-[color:var(--success)]"
              : isFinal
              ? "text-muted-foreground/60"
              : "text-muted-foreground"
          )}
        >
          {matchup.team1.score ?? (isLive ? "--" : "")}
        </span>
      </div>

      {/* Team 2 */}
      <div
        className={cn(
          "flex items-center justify-between py-2 px-3 rounded-md",
          matchup.winnerId === matchup.team2.teamId
            ? "bg-[color:var(--success)]/8"
            : "bg-muted/40"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono text-muted-foreground w-5 text-right shrink-0">
            {team2?.seed}
          </span>
          <span
            className={cn(
              "text-sm font-medium truncate",
              matchup.winnerId && matchup.winnerId !== matchup.team2.teamId
                ? "text-muted-foreground/60"
                : "text-foreground"
            )}
          >
            {team2?.name ?? "TBD"}
          </span>
          {team2 && (
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              {team2.record}
            </span>
          )}
        </div>
        <span
          className={cn(
            "text-sm font-mono font-semibold shrink-0",
            matchup.winnerId === matchup.team2.teamId
              ? "text-[color:var(--success)]"
              : isFinal
              ? "text-muted-foreground/60"
              : "text-muted-foreground"
          )}
        >
          {matchup.team2.score ?? (isLive ? "--" : "")}
        </span>
      </div>

      {/* Game time */}
      <p className="text-[10px] text-muted-foreground font-mono">
        {new Date(matchup.gameTime).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

export default function BracketPage() {
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("All");

  const displayed = useMemo(() => {
    if (regionFilter === "All") return bracketMatchups;
    return bracketMatchups.filter((m) => m.region === regionFilter);
  }, [regionFilter]);

  const livCount = bracketMatchups.filter((m) => m.status === "live").length;
  const finalCount = bracketMatchups.filter((m) => m.status === "final").length;
  const upcomingCount = bracketMatchups.filter(
    (m) => m.status === "upcoming"
  ).length;

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Tournament Bracket" />

      <div className="flex-1 overflow-y-auto p-[var(--content-padding,1.5rem)] space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tournament Bracket</h1>
            <p className="text-sm text-muted-foreground mt-1">
              2026 March Madness — Sweet 16 &amp; Elite Eight
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {livCount > 0 && (
              <span className="flex items-center gap-1.5 text-[color:var(--success)] font-medium">
                <Radio className="w-3.5 h-3.5" />
                {livCount} Live
              </span>
            )}
            <span className="text-muted-foreground">{finalCount} Final</span>
            <span className="text-muted-foreground">{upcomingCount} Upcoming</span>
          </div>
        </div>

        {/* Region tab filter */}
        <Tabs
          value={regionFilter}
          onValueChange={(v) => setRegionFilter(v as RegionFilter)}
        >
          <TabsList className="h-9">
            {REGIONS.map((r) => (
              <TabsTrigger key={r} value={r} className="text-xs px-3">
                {r}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Result count */}
        <p className="text-sm text-muted-foreground">
          {displayed.length} {displayed.length === 1 ? "matchup" : "matchups"}
          {regionFilter !== "All" && ` in ${regionFilter} Region`}
        </p>

        {/* Matchup grid */}
        {displayed.length === 0 ? (
          <div className="aesthetic-card p-12 flex items-center justify-center text-sm text-muted-foreground">
            No matchups in {regionFilter} Region.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayed.map((matchup, index) => (
              <div
                key={matchup.id}
                className="animate-fade-up-in"
                style={{ animationDelay: `${index * 50}ms`, animationDuration: "200ms" }}
              >
                <MatchupCard matchup={matchup} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
