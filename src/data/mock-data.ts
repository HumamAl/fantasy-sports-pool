import type {
  Pool,
  PoolMember,
  TournamentTeam,
  BracketMatchup,
  Pick,
  LiveGame,
  ScoringRule,
  ActivityItem,
  PointsOverTime,
  PickAccuracy,
} from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════════
// POOLS
// ═══════════════════════════════════════════════════════════════════════
export const pools: Pool[] = [
  {
    id: "pool-1",
    name: "Office Bracket Bash",
    type: "bracket",
    entryFee: 25,
    totalPrize: 500,
    memberCount: 20,
    maxMembers: 32,
    status: "in-progress",
    createdAt: "2026-03-01",
    commissioner: "Mike R.",
  },
  {
    id: "pool-2",
    name: "Survivor Madness",
    type: "survivor",
    entryFee: 50,
    totalPrize: 800,
    memberCount: 16,
    maxMembers: 20,
    status: "in-progress",
    createdAt: "2026-02-28",
    commissioner: "Sarah T.",
  },
  {
    id: "pool-3",
    name: "Confidence Kings",
    type: "confidence",
    entryFee: 20,
    totalPrize: 400,
    memberCount: 20,
    maxMembers: 20,
    status: "in-progress",
    createdAt: "2026-03-02",
    commissioner: "You",
  },
  {
    id: "pool-4",
    name: "Family Pick 'Em",
    type: "pick-em",
    entryFee: 0,
    totalPrize: 0,
    memberCount: 8,
    maxMembers: 16,
    status: "open",
    createdAt: "2026-03-05",
    commissioner: "Dad",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// POOL MEMBERS / LEADERBOARD
// ═══════════════════════════════════════════════════════════════════════
export const poolMembers: PoolMember[] = [
  { id: "m-1", poolId: "pool-1", name: "Sarah T.", avatar: "ST", rank: 1, previousRank: 2, totalPoints: 142, correctPicks: 24, totalPicks: 32, eliminated: false, joinedAt: "2026-03-02" },
  { id: "m-2", poolId: "pool-1", name: "Mike R.", avatar: "MR", rank: 2, previousRank: 1, totalPoints: 138, correctPicks: 23, totalPicks: 32, eliminated: false, joinedAt: "2026-03-01" },
  { id: "m-3", poolId: "pool-1", name: "You", avatar: "YO", rank: 3, previousRank: 5, totalPoints: 135, correctPicks: 22, totalPicks: 32, eliminated: false, joinedAt: "2026-03-03" },
  { id: "m-4", poolId: "pool-1", name: "Jason K.", avatar: "JK", rank: 4, previousRank: 3, totalPoints: 128, correctPicks: 21, totalPicks: 32, eliminated: false, joinedAt: "2026-03-02" },
  { id: "m-5", poolId: "pool-1", name: "Emily C.", avatar: "EC", rank: 5, previousRank: 4, totalPoints: 125, correctPicks: 20, totalPicks: 32, eliminated: false, joinedAt: "2026-03-04" },
  { id: "m-6", poolId: "pool-1", name: "Dave M.", avatar: "DM", rank: 6, previousRank: 6, totalPoints: 118, correctPicks: 19, totalPicks: 32, eliminated: false, joinedAt: "2026-03-01" },
  { id: "m-7", poolId: "pool-1", name: "Lisa W.", avatar: "LW", rank: 7, previousRank: 8, totalPoints: 112, correctPicks: 18, totalPicks: 32, eliminated: false, joinedAt: "2026-03-03" },
  { id: "m-8", poolId: "pool-1", name: "Chris P.", avatar: "CP", rank: 8, previousRank: 7, totalPoints: 108, correctPicks: 17, totalPicks: 32, eliminated: false, joinedAt: "2026-03-02" },
  { id: "m-9", poolId: "pool-1", name: "Alex B.", avatar: "AB", rank: 9, previousRank: 10, totalPoints: 102, correctPicks: 16, totalPicks: 32, eliminated: false, joinedAt: "2026-03-05" },
  { id: "m-10", poolId: "pool-1", name: "Jen S.", avatar: "JS", rank: 10, previousRank: 9, totalPoints: 98, correctPicks: 15, totalPicks: 32, eliminated: false, joinedAt: "2026-03-04" },
  { id: "m-11", poolId: "pool-1", name: "Tom H.", avatar: "TH", rank: 11, previousRank: 11, totalPoints: 92, correctPicks: 14, totalPicks: 32, eliminated: false, joinedAt: "2026-03-01" },
  { id: "m-12", poolId: "pool-1", name: "Rachel N.", avatar: "RN", rank: 12, previousRank: 14, totalPoints: 88, correctPicks: 13, totalPicks: 32, eliminated: false, joinedAt: "2026-03-02" },
  { id: "m-13", poolId: "pool-1", name: "Brian L.", avatar: "BL", rank: 13, previousRank: 12, totalPoints: 85, correctPicks: 13, totalPicks: 32, eliminated: true, joinedAt: "2026-03-03" },
  { id: "m-14", poolId: "pool-1", name: "Kate V.", avatar: "KV", rank: 14, previousRank: 13, totalPoints: 79, correctPicks: 12, totalPicks: 32, eliminated: false, joinedAt: "2026-03-02" },
  { id: "m-15", poolId: "pool-1", name: "Greg F.", avatar: "GF", rank: 15, previousRank: 15, totalPoints: 72, correctPicks: 11, totalPicks: 32, eliminated: true, joinedAt: "2026-03-05" },
];

// ═══════════════════════════════════════════════════════════════════════
// TOURNAMENT TEAMS (2026 March Madness — fictional bracket)
// ═══════════════════════════════════════════════════════════════════════
export const tournamentTeams: TournamentTeam[] = [
  // East Region
  { id: "t-1", name: "Duke", seed: 1, region: "East", record: "29-3", eliminated: false },
  { id: "t-2", name: "Alabama", seed: 2, region: "East", record: "27-5", eliminated: false },
  { id: "t-3", name: "Baylor", seed: 3, region: "East", record: "25-6", eliminated: false },
  { id: "t-4", name: "Marquette", seed: 4, region: "East", record: "24-7", eliminated: false },
  { id: "t-5", name: "Saint Mary's", seed: 5, region: "East", record: "26-5", eliminated: true },
  { id: "t-6", name: "BYU", seed: 6, region: "East", record: "23-8", eliminated: true },
  { id: "t-7", name: "Clemson", seed: 7, region: "East", record: "22-9", eliminated: true },
  { id: "t-8", name: "Utah State", seed: 8, region: "East", record: "25-7", eliminated: true },

  // West Region
  { id: "t-9", name: "Houston", seed: 1, region: "West", record: "30-2", eliminated: false },
  { id: "t-10", name: "Tennessee", seed: 2, region: "West", record: "26-6", eliminated: false },
  { id: "t-11", name: "Purdue", seed: 3, region: "West", record: "27-5", eliminated: true },
  { id: "t-12", name: "Kansas", seed: 4, region: "West", record: "23-8", eliminated: false },
  { id: "t-13", name: "Gonzaga", seed: 5, region: "West", record: "25-6", eliminated: true },
  { id: "t-14", name: "TCU", seed: 6, region: "West", record: "22-10", eliminated: true },
  { id: "t-15", name: "Dayton", seed: 7, region: "West", record: "24-7", eliminated: true },
  { id: "t-16", name: "McNeese", seed: 8, region: "West", record: "28-3", eliminated: true },

  // South Region
  { id: "t-17", name: "Auburn", seed: 1, region: "South", record: "28-4", eliminated: false },
  { id: "t-18", name: "Iowa State", seed: 2, region: "South", record: "26-5", eliminated: false },
  { id: "t-19", name: "Wisconsin", seed: 3, region: "South", record: "24-7", eliminated: false },
  { id: "t-20", name: "Arizona", seed: 4, region: "South", record: "24-8", eliminated: true },
  { id: "t-21", name: "Michigan State", seed: 5, region: "South", record: "22-9", eliminated: true },
  { id: "t-22", name: "San Diego State", seed: 6, region: "South", record: "25-6", eliminated: true },
  { id: "t-23", name: "Nevada", seed: 7, region: "South", record: "27-4", eliminated: true },
  { id: "t-24", name: "Drake", seed: 8, region: "South", record: "26-5", eliminated: true },

  // Midwest Region
  { id: "t-25", name: "UConn", seed: 1, region: "Midwest", record: "29-3", eliminated: false },
  { id: "t-26", name: "North Carolina", seed: 2, region: "Midwest", record: "26-6", eliminated: false },
  { id: "t-27", name: "Creighton", seed: 3, region: "Midwest", record: "24-7", eliminated: true },
  { id: "t-28", name: "Kentucky", seed: 4, region: "Midwest", record: "23-8", eliminated: false },
  { id: "t-29", name: "Texas", seed: 5, region: "Midwest", record: "22-10", eliminated: true },
  { id: "t-30", name: "Illinois", seed: 6, region: "Midwest", record: "23-9", eliminated: true },
  { id: "t-31", name: "Colorado", seed: 7, region: "Midwest", record: "24-8", eliminated: true },
  { id: "t-32", name: "Grand Canyon", seed: 8, region: "Midwest", record: "27-4", eliminated: true },
];

// ═══════════════════════════════════════════════════════════════════════
// BRACKET MATCHUPS (Sweet 16 stage — keeps demo focused)
// ═══════════════════════════════════════════════════════════════════════
export const bracketMatchups: BracketMatchup[] = [
  // Sweet 16 — East
  { id: "g-1", round: "Sweet 16", region: "East", team1: { teamId: "t-1", score: 78 }, team2: { teamId: "t-4", score: 65 }, winnerId: "t-1", status: "final", gameTime: "2026-03-27T19:00:00Z", network: "CBS" },
  { id: "g-2", round: "Sweet 16", region: "East", team1: { teamId: "t-2", score: 72 }, team2: { teamId: "t-3", score: 68 }, winnerId: "t-2", status: "final", gameTime: "2026-03-27T21:30:00Z", network: "TBS" },

  // Sweet 16 — West
  { id: "g-3", round: "Sweet 16", region: "West", team1: { teamId: "t-9", score: 81 }, team2: { teamId: "t-12", score: 74 }, winnerId: "t-9", status: "final", gameTime: "2026-03-28T19:00:00Z", network: "CBS" },
  { id: "g-4", round: "Sweet 16", region: "West", team1: { teamId: "t-10", score: null }, team2: { teamId: "t-12", score: null }, winnerId: null, status: "live", gameTime: "2026-03-28T21:30:00Z", network: "TBS" },

  // Sweet 16 — South
  { id: "g-5", round: "Sweet 16", region: "South", team1: { teamId: "t-17", score: null }, team2: { teamId: "t-19", score: null }, winnerId: null, status: "upcoming", gameTime: "2026-03-29T14:00:00Z", network: "CBS" },
  { id: "g-6", round: "Sweet 16", region: "South", team1: { teamId: "t-18", score: null }, team2: { teamId: "t-19", score: null }, winnerId: null, status: "upcoming", gameTime: "2026-03-29T16:30:00Z", network: "TNT" },

  // Sweet 16 — Midwest
  { id: "g-7", round: "Sweet 16", region: "Midwest", team1: { teamId: "t-25", score: 85 }, team2: { teamId: "t-28", score: 71 }, winnerId: "t-25", status: "final", gameTime: "2026-03-28T14:00:00Z", network: "TNT" },
  { id: "g-8", round: "Sweet 16", region: "Midwest", team1: { teamId: "t-26", score: null }, team2: { teamId: "t-28", score: null }, winnerId: null, status: "upcoming", gameTime: "2026-03-29T19:00:00Z", network: "TBS" },

  // Elite Eight (upcoming)
  { id: "g-9", round: "Elite Eight", region: "East", team1: { teamId: "t-1", score: null }, team2: { teamId: "t-2", score: null }, winnerId: null, status: "upcoming", gameTime: "2026-03-30T14:00:00Z", network: "CBS" },
  { id: "g-10", round: "Elite Eight", region: "Midwest", team1: { teamId: "t-25", score: null }, team2: { teamId: "t-26", score: null }, winnerId: null, status: "upcoming", gameTime: "2026-03-30T16:30:00Z", network: "TBS" },
];

// ═══════════════════════════════════════════════════════════════════════
// LIVE GAMES (currently in progress or recently completed)
// ═══════════════════════════════════════════════════════════════════════
export const liveGames: LiveGame[] = [
  {
    id: "lg-1",
    matchupId: "g-4",
    team1: { teamId: "t-10", name: "Tennessee", seed: 2, score: 42 },
    team2: { teamId: "t-12", name: "Kansas", seed: 4, score: 38 },
    period: "2nd Half",
    timeRemaining: "12:34",
    status: "live",
    network: "TBS",
    lastPlay: "Tennessee with a 3-pointer from the wing",
  },
  {
    id: "lg-2",
    matchupId: "g-1",
    team1: { teamId: "t-1", name: "Duke", seed: 1, score: 78 },
    team2: { teamId: "t-4", name: "Marquette", seed: 4, score: 65 },
    period: "Final",
    timeRemaining: "0:00",
    status: "final",
    network: "CBS",
  },
  {
    id: "lg-3",
    matchupId: "g-2",
    team1: { teamId: "t-2", name: "Alabama", seed: 2, score: 72 },
    team2: { teamId: "t-3", name: "Baylor", seed: 3, score: 68 },
    period: "Final",
    timeRemaining: "0:00",
    status: "final",
    network: "TBS",
  },
  {
    id: "lg-4",
    matchupId: "g-3",
    team1: { teamId: "t-9", name: "Houston", seed: 1, score: 81 },
    team2: { teamId: "t-12", name: "Kansas", seed: 4, score: 74 },
    period: "Final",
    timeRemaining: "0:00",
    status: "final",
    network: "CBS",
  },
  {
    id: "lg-5",
    matchupId: "g-7",
    team1: { teamId: "t-25", name: "UConn", seed: 1, score: 85 },
    team2: { teamId: "t-28", name: "Kentucky", seed: 4, score: 71 },
    period: "Final",
    timeRemaining: "0:00",
    status: "final",
    network: "TNT",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// USER PICKS (for "My Picks" page)
// ═══════════════════════════════════════════════════════════════════════
export const userPicks: Pick[] = [
  { id: "p-1", memberId: "m-3", matchupId: "g-1", selectedTeamId: "t-1", confidencePoints: 8, correct: true, lockedAt: "2026-03-27T18:00:00Z" },
  { id: "p-2", memberId: "m-3", matchupId: "g-2", selectedTeamId: "t-2", confidencePoints: 6, correct: true, lockedAt: "2026-03-27T20:00:00Z" },
  { id: "p-3", memberId: "m-3", matchupId: "g-3", selectedTeamId: "t-9", confidencePoints: 7, correct: true, lockedAt: "2026-03-28T18:00:00Z" },
  { id: "p-4", memberId: "m-3", matchupId: "g-4", selectedTeamId: "t-10", confidencePoints: 5, correct: null, lockedAt: "2026-03-28T20:00:00Z" },
  { id: "p-5", memberId: "m-3", matchupId: "g-5", selectedTeamId: "t-17", confidencePoints: 4, correct: null, lockedAt: "2026-03-29T12:00:00Z" },
  { id: "p-6", memberId: "m-3", matchupId: "g-6", selectedTeamId: "t-18", confidencePoints: 3, correct: null, lockedAt: "2026-03-29T14:00:00Z" },
  { id: "p-7", memberId: "m-3", matchupId: "g-7", selectedTeamId: "t-25", confidencePoints: 9, correct: true, lockedAt: "2026-03-28T12:00:00Z" },
  { id: "p-8", memberId: "m-3", matchupId: "g-8", selectedTeamId: "t-26", confidencePoints: 2, correct: null, lockedAt: "2026-03-29T17:00:00Z" },
  { id: "p-9", memberId: "m-3", matchupId: "g-9", selectedTeamId: "t-1", confidencePoints: 10, correct: null, lockedAt: "2026-03-30T12:00:00Z" },
  { id: "p-10", memberId: "m-3", matchupId: "g-10", selectedTeamId: "t-25", confidencePoints: 1, correct: null, lockedAt: "2026-03-30T14:00:00Z" },
];

// ═══════════════════════════════════════════════════════════════════════
// SCORING RULES
// ═══════════════════════════════════════════════════════════════════════
export const scoringRules: ScoringRule[] = [
  { round: "First Round", basePoints: 1, upsetBonus: 1, seedMultiplier: false },
  { round: "Second Round", basePoints: 2, upsetBonus: 2, seedMultiplier: false },
  { round: "Sweet 16", basePoints: 4, upsetBonus: 4, seedMultiplier: true },
  { round: "Elite Eight", basePoints: 8, upsetBonus: 6, seedMultiplier: true },
  { round: "Final Four", basePoints: 16, upsetBonus: 10, seedMultiplier: true },
  { round: "Championship", basePoints: 32, upsetBonus: 16, seedMultiplier: true },
];

// ═══════════════════════════════════════════════════════════════════════
// ACTIVITY FEED
// ═══════════════════════════════════════════════════════════════════════
export const activityFeed: ActivityItem[] = [
  { id: "a-1", type: "result", message: "Duke defeats Marquette 78-65 in Sweet 16", timestamp: "2026-03-27T21:45:00Z", teamName: "Duke" },
  { id: "a-2", type: "pick", message: "Sarah T. locked picks for the Elite Eight", timestamp: "2026-03-27T22:00:00Z", memberName: "Sarah T." },
  { id: "a-3", type: "upset", message: "UPSET! #4 Kansas eliminates #1 seed region threat", timestamp: "2026-03-28T20:15:00Z", teamName: "Kansas" },
  { id: "a-4", type: "result", message: "Alabama survives Baylor 72-68 in a thriller", timestamp: "2026-03-27T23:30:00Z", teamName: "Alabama" },
  { id: "a-5", type: "elimination", message: "Brian L. eliminated from Survivor Madness pool", timestamp: "2026-03-28T21:00:00Z", memberName: "Brian L." },
  { id: "a-6", type: "milestone", message: "You moved up 2 spots to #3 in Office Bracket Bash!", timestamp: "2026-03-28T21:15:00Z" },
  { id: "a-7", type: "result", message: "Houston dominates Kansas 81-74, advances to Elite Eight", timestamp: "2026-03-28T21:30:00Z", teamName: "Houston" },
  { id: "a-8", type: "result", message: "UConn rolls past Kentucky 85-71", timestamp: "2026-03-28T16:30:00Z", teamName: "UConn" },
  { id: "a-9", type: "pick", message: "Mike R. just made a bold Elite Eight pick", timestamp: "2026-03-28T22:00:00Z", memberName: "Mike R." },
  { id: "a-10", type: "upset", message: "12 brackets busted after Purdue falls to Kansas!", timestamp: "2026-03-28T19:00:00Z", teamName: "Kansas" },
  { id: "a-11", type: "milestone", message: "Confidence Kings pool has 100% of picks locked for Sweet 16", timestamp: "2026-03-27T18:00:00Z" },
  { id: "a-12", type: "elimination", message: "Greg F. eliminated — picked Purdue to win it all", timestamp: "2026-03-28T19:30:00Z", memberName: "Greg F." },
];

// ═══════════════════════════════════════════════════════════════════════
// CHART DATA — Points Over Time
// ═══════════════════════════════════════════════════════════════════════
export const pointsOverTime: PointsOverTime[] = [
  { round: "R64", player1: 22, player2: 20, player3: 18 },
  { round: "R32", player1: 48, player2: 52, player3: 42 },
  { round: "Sweet 16", player1: 82, player2: 78, player3: 72 },
  { round: "Elite 8", player1: 112, player2: 108, player3: 98 },
  { round: "Final 4", player1: 135, player2: 142, player3: 128 },
  { round: "Final", player1: 0, player2: 0, player3: 0 },
];

// ═══════════════════════════════════════════════════════════════════════
// CHART DATA — Pick Accuracy by Round
// ═══════════════════════════════════════════════════════════════════════
export const pickAccuracyData: PickAccuracy[] = [
  { round: "R64", correct: 24, incorrect: 8, pending: 0 },
  { round: "R32", correct: 11, incorrect: 5, pending: 0 },
  { round: "Sweet 16", correct: 4, incorrect: 1, pending: 3 },
  { round: "Elite 8", correct: 0, incorrect: 0, pending: 4 },
  { round: "Final 4", correct: 0, incorrect: 0, pending: 2 },
  { round: "Final", correct: 0, incorrect: 0, pending: 1 },
];

// ═══════════════════════════════════════════════════════════════════════
// POOL STATS (for dashboard stat cards)
// ═══════════════════════════════════════════════════════════════════════
export const dashboardStats = [
  { label: "Your Rank", value: "#3", change: "+2", trend: "up" as const },
  { label: "Total Points", value: "135", change: "+37", trend: "up" as const },
  { label: "Pick Accuracy", value: "69%", change: "+4%", trend: "up" as const },
  { label: "Active Pools", value: "3", change: "", trend: "neutral" as const },
];

// ═══════════════════════════════════════════════════════════════════════
// UPCOMING DEADLINES
// ═══════════════════════════════════════════════════════════════════════
export const upcomingDeadlines = [
  { round: "Elite Eight Picks", deadline: "2026-03-29T18:00:00Z", status: "open" as const },
  { round: "Final Four Picks", deadline: "2026-04-05T18:00:00Z", status: "upcoming" as const },
  { round: "Championship Pick", deadline: "2026-04-07T20:00:00Z", status: "upcoming" as const },
];
