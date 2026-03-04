import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ── Pool & Members ───────────────────────────────────────────────
export interface Pool {
  id: string;
  name: string;
  type: "bracket" | "survivor" | "confidence" | "pick-em";
  entryFee: number;
  totalPrize: number;
  memberCount: number;
  maxMembers: number;
  status: "open" | "locked" | "in-progress" | "completed";
  createdAt: string;
  commissioner: string;
}

export interface PoolMember {
  id: string;
  poolId: string;
  name: string;
  avatar: string;
  rank: number;
  previousRank: number;
  totalPoints: number;
  correctPicks: number;
  totalPicks: number;
  eliminated: boolean;
  joinedAt: string;
}

// ── Tournament & Bracket ─────────────────────────────────────────
export type Region = "East" | "West" | "South" | "Midwest";
export type Round = "First Round" | "Second Round" | "Sweet 16" | "Elite Eight" | "Final Four" | "Championship";

export interface TournamentTeam {
  id: string;
  name: string;
  seed: number;
  region: Region;
  record: string;
  eliminated: boolean;
  logo?: string;
}

export interface BracketMatchup {
  id: string;
  round: Round;
  region: Region | "Final Four";
  team1: { teamId: string; score: number | null };
  team2: { teamId: string; score: number | null };
  winnerId: string | null;
  status: "upcoming" | "live" | "final";
  gameTime: string;
  network: string;
}

// ── Picks ────────────────────────────────────────────────────────
export interface Pick {
  id: string;
  memberId: string;
  matchupId: string;
  selectedTeamId: string;
  confidencePoints?: number;
  correct: boolean | null;
  lockedAt: string;
}

// ── Live Scores ──────────────────────────────────────────────────
export interface LiveGame {
  id: string;
  matchupId: string;
  team1: { teamId: string; name: string; seed: number; score: number };
  team2: { teamId: string; name: string; seed: number; score: number };
  period: string;
  timeRemaining: string;
  status: "pre-game" | "live" | "halftime" | "final";
  network: string;
  lastPlay?: string;
}

// ── Scoring ──────────────────────────────────────────────────────
export interface ScoringRule {
  round: Round;
  basePoints: number;
  upsetBonus: number;
  seedMultiplier: boolean;
}

// ── Activity Feed ────────────────────────────────────────────────
export interface ActivityItem {
  id: string;
  type: "pick" | "result" | "upset" | "elimination" | "milestone";
  message: string;
  timestamp: string;
  memberName?: string;
  teamName?: string;
}

// ── Stats ────────────────────────────────────────────────────────
export interface PoolStats {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
}

// ── Chart Data ───────────────────────────────────────────────────
export interface PointsOverTime {
  round: string;
  player1: number;
  player2: number;
  player3: number;
}

export interface PickAccuracy {
  round: string;
  correct: number;
  incorrect: number;
  pending: number;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// Screen definition for frame-based demo formats
export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// Conversion element variant types
export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";
