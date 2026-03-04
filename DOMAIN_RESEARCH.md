# Domain Knowledge Brief — NCAA March Madness Sports Pool (Hybrid Bracket + Survivor)

## Sub-Domain Classification

**Precise sub-domain**: Online March Madness sports pool platform — hybrid of bracket prediction pool and survivor pool mechanics, targeting casual office/friend groups (8-200 participants). Multi-pool hosting with commissioner controls, live game score integration via sports API, and Firebase realtime standings updates. Designed for the NCAA Division I Men's Basketball Tournament (68-team, 6-round format).

---

## Job Analyst Vocabulary — Confirmed and Extended

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- **Primary record type**: "pick" (not "selection" or "vote") — what a participant submits for each game
- **People roles**: "commissioner" (pool admin, not "manager" or "admin"), "entry" (one submitted bracket or pick sheet, not "participant"), "member" (person in the pool), "contender" (still alive in survivor)
- **Secondary entities**: "bracket" (full prediction grid), "pool" (a group contest), "entry" (one submitted bracket), "round" (tournament stage), "matchup" (a single game), "region" (South/East/West/Midwest), "seed" (team ranking 1-16)

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Points Possible | Max points remaining if all picks correct | count (e.g., 240 pts) |
| Correct Picks | Number of right picks so far | count (e.g., 34/63) |
| Pick Accuracy | % of games picked correctly | % (e.g., 73.2%) |
| Chalk % | % of entries that picked the higher seed | % (e.g., 84%) |
| Bust Rate | % of entries with a bracket-busting miss | % (e.g., 62%) |
| Survivor Alive | # of members still in contention | count (e.g., 14 of 28) |
| Pool Prize Pot | Total entry fees collected | $ (e.g., $325) |
| Entries | Total bracket submissions in pool | count (e.g., 24) |
| Best Possible Rank | Highest leaderboard position achievable | ordinal (e.g., #2) |
| Points Behind Leader | Gap between member and #1 | count (e.g., -18 pts) |

### Status Label Vocabulary

Exact status strings used in this domain — these go directly into data tables, badges, and filter dropdowns.

**Game states**:
- Active states: "Scheduled", "In Progress", "Halftime", "2nd Half"
- Terminal states: "Final", "Final/OT", "Postponed", "Cancelled"

**Pick/entry states**:
- Active: "Locked", "Open", "Pending"
- Result states: "Correct", "Incorrect", "Pushed" (overtime edge case)

**Bracket/survivor member states**:
- "Alive" — still in survivor contention
- "Eliminated" — lost in survivor
- "Busted" — picked team already lost (bracket context)
- "Perfect" — 0 misses so far (rare, shown as badge through early rounds)
- "Max Out" — cannot win the pool mathematically

**Pool states**:
- "Picking Open" — picks can still be submitted
- "Locked" — tournament underway, no more changes
- "In Progress" — tournament active
- "Completed" — tournament finished, winner declared

### Workflow and Action Vocabulary

- **Primary actions**: "Submit Picks", "Lock Bracket", "Make Pick", "Invite Members", "Start Pool", "Declare Winner"
- **Secondary actions**: "Edit Entry", "Copy Bracket", "View Picks", "Compare Brackets", "Export Standings", "Reset Pool"
- **Commissioner actions**: "Manage Entries", "Adjust Scores", "Send Reminder", "Open/Close Picks"

### Sidebar Navigation Candidates

- **My Bracket** (primary pick entry view — not "Dashboard")
- **Leaderboard** (standings with rank, points, alive status)
- **Live Scores** (real-time game score feed with pick outcomes highlighted)
- **Bracket Board** (visual bracket tree for the full tournament)
- **Pool Settings** (commissioner controls — scoring rules, entry fee, payout)
- **Survivor Picks** (round-by-round single pick interface)
- **Pick History** (timeline of all past picks and their results)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

The sports pool space has two distinct visual traditions practitioners recognize. The first is the ESPN/CBS Sports dashboard model — dark navs, white content areas, sport-specific accent colors (tournament orange/blue), dense data tables with rank indicators, and liberal use of team logos. This is what users see on the biggest platforms and associate with "official."

The second tradition is the office pool tool model — OfficePoolStop, RunYourPool, PoolTracker — which skews more utilitarian. These tools prioritize function over visual design: clean tables, color-coded outcome cells (green = correct, red = wrong), countdown timers for pick deadlines, and simple progression indicators (3-of-16 through Sweet Sixteen labels).

A novel hybrid pool platform should blend both: the visual energy of ESPN's bracket challenge (team match cards, pulsing live indicators, score bugs) with the operational clarity of office pool tools (leaderboard ranks, alive/eliminated badges, points tracking). The sweet spot is "sports media meets clean SaaS" — not just a blank spreadsheet with brackets.

Practitioners in this space are used to dark sidebars or top navs with team color accents. March Madness specifically maps to orange and blue (tournament brand colors), though individual pools can use custom colors.

### Real-World Apps Clients Would Recognize as "Premium"

1. **ESPN Tournament Challenge** — The market leader. Uses a dark sidebar navigation, bracket tree visualization on a canvas-like surface, point totals prominently displayed, national rank shown in hero stats at top. Users consider it authoritative. Key patterns: card-style matchup displays, filtering by round, animated point updates when games go final.

2. **CBS Sports Bracket Games** — Notable for its clarity distinction feature: puzzled-outline boxes show the user's pick vs. actual result, eliminating confusion between "who I picked" and "who won." Includes detailed game stat overlays. Color conventions: green wins, red losses, grayed-out eliminated paths.

3. **OfficePoolStop** — The operational gold standard for running your own pool. Key features practitioners love: commissioner dashboard with real-time alive/eliminated tracking, pick popularity charts, color-coded GameDay scoreboard with instant final standings post-game. Design is functional/utilitarian but practitioners trust it because it's reliable and accurate.

### Aesthetic Validation

- **Domain validation**: This is a sports consumer app with social/competitive mechanics — it sits between sports media (high energy, dark accents, team colors) and SaaS productivity (leaderboard tables, commissioner tools, structured data). A dark premium or bold editorial aesthetic fits the "sports app feel" that practitioners expect. SaaS Modern would work if leaning into the platform/tool angle. The key signal is: this is a real-time competitive game with social stakes — it needs energy, not just cleanliness.
- **Recommended direction**: Dark Premium with bold accent (tournament orange or electric blue) — echoes ESPN Tournament Challenge and modern sports betting UI. Dense-to-standard density. High visual contrast for live score states.
- **One adjustment**: Add sport-specific color energy. Pure minimalism reads "wrong" for this domain — sports pools need clear color-coded outcome feedback (green/red win/loss indicators are table stakes for credibility).

### Format Validation

- **Domain validation**: This is a web application (not mobile-only, though mobile responsive). The core experience is bracket viewing, leaderboard tracking, and pick submission — all of which benefit from a sidebar + dashboard layout with multiple feature pages.
- **Format recommendation**: `dashboard-app` — sidebar nav with feature pages for bracket view, leaderboard, live scores, survivor picks, and settings. The sidebar model matches how practitioners use ESPN Tournament Challenge and OfficePoolStop.
- **Format-specific design notes**: The main screen should prioritize the leaderboard/standings as the hero view (most-visited in active pools). The bracket board needs a wide canvas (full-width within content area, horizontal scroll enabled). Live scores need pulsing "LIVE" indicators similar to ESPN's score bugs.

### Density and Layout Expectations

**Standard-to-compact density**. Leaderboard tables are the dominant UI element — practitioners expect dense data rows with rank, name, points, pick accuracy, and alive status all visible without scrolling. The bracket tree view needs maximum horizontal space. Card views work well for individual game matchups in the live scores section.

Mix of view types: leaderboard = table-heavy (like a trading terminal for the pool standings), bracket = tree/canvas visualization, live scores = card-heavy (individual game tiles), survivor = single-action per round.

---

## Entity Names (10+ realistic names)

### Pool Names (Creative, Authentic)
- "Hardwood Heroes Bracket Bash"
- "Bracket Busters Invitational"
- "March Money Madness"
- "The Chalky Pick Classic"
- "Cinderella Chasers Pool"
- "Final Four Frenzy"
- "Upset Alert Challenge"
- "The Commissioner's Cup"
- "Selection Sunday Stakes"
- "Overtime Kings Pool"
- "Office Madness 2025"
- "The Bracket Whisperers"

### Pool Member Names (Demographically Appropriate)
- Marcus Webb
- Tyler Okonkwo
- Jordan Castillo
- Priya Nair
- DeShawn Harmon
- Alyssa Fuentes
- Connor Whitfield
- Lena Park
- Mike Barnett
- Trevon Scott
- Sarah Hoffman
- Darius Ely
- Nate Kowalski
- Regina Cruz

### NCAA Teams Used in Bracket (2025 Tournament — Authentic Teams)

**South Region**: Auburn (1), Michigan State (2), Iowa State (3), Texas A&M (4), Michigan (5), North Carolina (6), Marquette (7), Louisville (8), Creighton (9), New Mexico (10), Ole Miss (11), UC San Diego (12), Yale (13), Lipscomb (14), Bryant (15), Alabama State (16)

**East Region**: Duke (1), Alabama (2), Wisconsin (3), Arizona (4), Oregon (5), BYU (6), Saint Mary's (7), Baylor (8), Mississippi State (9), Vanderbilt (10), VCU (11), Liberty (12), Akron (13), Montana (14), Robert Morris (15), Mount St. Mary's (16)

**West Region**: Florida (1), St. John's (2), Texas Tech (3), Maryland (4), Memphis (5), Missouri (6), Kansas (7), UConn (8), Oklahoma (9), Arkansas (10), Drake (11), Colorado State (12), Grand Canyon (13), UNC Wilmington (14), Omaha (15), Norfolk State (16)

**Midwest Region**: Houston (1), Tennessee (2), Kentucky (3), Purdue (4), Clemson (5), Xavier (6), UCLA (7), Georgia (8), Gonzaga (9), Utah State (10), Illinois (11), McNeese (12), High Point (13), Troy (14), Wofford (15), SIUE (16)

**2025 Champion**: Florida Gators (defeated Houston 65-63)
**2025 Final Four**: Florida, Duke, Houston, Auburn (all #1 seeds — historic)
**2025 Most Outstanding Player**: Walter Clayton Jr. (Florida)

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Pool entry fee | $5 | $10-$25 | $100 | Office pools typically $10-20; friend groups $20-50 |
| Pool size (entries) | 4 | 15-40 | 200+ | Office pools 10-30; public pools 50-200 |
| Prize pot (10-person $20 pool) | $0 | $200 | $400 | Winner-take-all or 60/25/15 split |
| First-round pick accuracy | 52% | 68-72% | 82% | Most people get 60-75% of R1 right |
| Final bracket accuracy (full tournament) | 8% | 35-45% | 78% | Chalk-heavy brackets skew higher |
| Points per correct R1 pick | 1 | 1 | 1 | Standard scoring |
| Points per correct Sweet 16 pick | 4 | 4 | 8 | Doubles each round in standard systems |
| Points per correct champion pick | 32 | 32 | 64 | Often worth 32x first-round pick |
| % of entries busted by Sweet 16 | 30% | 55-65% | 85% | Depends on upset frequency that year |
| Survivor pool alive by Round 2 | 60% | 70-80% | 95% | Depends on chalk vs upset year |
| Confidence point range (64-team pool) | 1 | 1-64 (each unique) | 64 | Each pick gets different confidence value |
| Play-in game start date | Mar 18 | Mar 18-19 | Mar 19 | First Four games precede main bracket |
| Tournament duration (days) | 21 | 21 | 21 | Selection Sunday to Championship night |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Chalk | The favored/higher-seeded team winning as expected | "Chalk pick" = safe, predictable pick; "chalky bracket" = no upsets |
| Cinderella Team | A low-seeded team making an unexpected deep run | "UC San Diego is the Cinderella story of the South region" |
| Bracket Busted | When a key pick (often champion) is eliminated early | "My bracket got busted when Auburn lost in the Elite Eight" |
| First Four | Play-in round of 4 games with 8 teams competing for the final 4 spots | Precedes the main 64-team field; games are often the 16 vs 16 and 11 vs 11 matchups |
| Seeding | The committee's ranking of teams 1-16 in each region | #1 seed plays #16, #8 plays #9 in R1 |
| Selection Sunday | The day (Sunday before tournament) when the full bracket is announced | The biggest single day in the sports pool calendar |
| Pick 'Em | Pool format where participants just pick winners with no confidence weighting | Simplest format, most common for casual pools |
| Confidence Pool | Pool where each pick gets a unique points value (1-63), ranked by confidence | Adds strategy layer; picking the right high-confidence games is key |
| Survivor Pool | Format where one team is picked per round; pick wrong and you're eliminated | Last person standing wins; you can't reuse a team |
| Upset Bonus | Extra points awarded for correctly picking an underdog to win | E.g., +seed differential points for each upset correctly picked |
| Seed Differential Scoring | Points = seed number of winning team (upsets worth more) | A 12-seed win over 5-seed worth 12 points vs 1 point |
| Locked Picks | Once a game's tipoff time passes, picks can no longer be changed | "Picks lock at tip-off" |
| At-Large Bid | Tournament invitation given by committee (not automatic conference champion) | 36 of 68 teams are at-large; conference champions get automatic bids |
| Automatic Qualifier (AQ) | Team that earns a bid by winning their conference tournament | Small conference champions often become #12-16 seeds |
| Bubble Team | Team on the cusp of making/missing the tournament field | "Gonzaga is a bubble team this year" |
| Net Ranking | NCAA's composite metric used for seeding decisions | Replaces old RPI; considers strength of schedule |
| Tipoff | Game start time | "Picks lock at tipoff of each game" |
| Region | One of 4 quadrants of the bracket (South/East/West/Midwest) | Each region produces one Final Four team |
| Final Four | The last 4 teams remaining (one per region), playing in semifinals | The climax of every bracket prediction |

---

## Common Workflows

### Workflow 1: Pool Commissioner Setup
1. Commissioner creates pool and sets rules (scoring type, entry fee, payout structure)
2. Generates a unique invite link/code
3. Shares invite with friends/colleagues
4. Members register and pay entry fee
5. Picks window opens after Selection Sunday bracket release
6. Commissioner sets pick deadline (tipoff of first game)
7. Picks lock; pool goes "In Progress"
8. Commissioner monitors standings, resolves any scoring disputes
9. Tournament ends; commissioner declares winner, distributes prize

### Workflow 2: Member Bracket Submission
1. Member receives invite link; joins pool
2. Opens bracket tool after Selection Sunday
3. Fills in First Round picks (32 games)
4. Advances picks round-by-round (Sweet 16, Elite 8, Final Four, Champion)
5. Sets confidence values if confidence pool (drag-and-drop ranking)
6. Reviews bracket summary (pick distribution, points possible)
7. Submits bracket before deadline
8. Receives confirmation email/notification
9. Watches leaderboard update in real time as games play out

### Workflow 3: Live Game Day Score Tracking
1. Pick deadline passes; games begin
2. Firebase/API pushes live score updates to connected clients
3. Leaderboard updates in real time as games go final
4. Members' picks highlighted green (correct) or red (incorrect)
5. "Points Possible" recalculates after each game result
6. Bracket board shows eliminated teams grayed out, correct picks highlighted
7. Push notifications sent for major upsets (e.g., 12-seed over 5-seed)
8. At end of each round, final standings snapshot is saved
9. Survivor members with losing picks are marked "Eliminated"

---

## Common Edge Cases

1. **Play-in game involvement**: Teams 65-68 must win First Four games to enter main bracket; picks for those slots are technically two games (play-in pick + first round pick)
2. **Overtime games**: Score ties at regulation end; final score can be "Final/OT" — some pools add a tiebreaker for overtime prediction
3. **Postponed/Cancelled games**: Weather or health postponements; commissioners must decide: push picks forward, void game, or use last result
4. **Bracket busted early**: Member whose champion pick loses in Round 1 — must display "Bracket Busted" state while keeping them on leaderboard with current points
5. **Tied leaderboard positions**: Two members with identical points — tiebreaker by total games correct, then by champion pick seed
6. **Survivor pick deadline miss**: Member fails to submit pick before tipoff — some pools auto-eliminate, others allow grace period; must show clear deadline countdown
7. **Multiple entries per member**: Some pools allow buying multiple brackets — leaderboard shows best entry per person OR all entries ranked separately
8. **Perfect bracket through Round 2**: Extremely rare but creates "Perfect Bracket" badge; ESPN historically highlights these nationally
9. **Upset-heavy years vs chalk years**: 2025 had minimal upsets (all #1 seeds in Final Four); 2023 had many 12-seed upsets. Data should include some upset results to avoid sterile mock data.

---

## What Would Impress a Domain Expert

1. **Using exact 2025 tournament teams and results**: If the demo uses Auburn, Duke, Houston, Florida as #1 seeds, and correctly shows Florida winning the 2025 championship 65-63 over Houston — a domain expert immediately recognizes the data as real, not made up. This is the single highest-impact realism signal.

2. **Correct seeding conventions**: #1 plays #16, #2 plays #15, #3 plays #14, #4 plays #13, #5 plays #12, #6 plays #11, #7 plays #10, #8 plays #9. Showing this correctly in mock data and bracket visualizations signals real knowledge.

3. **"Points Possible" as a separate KPI**: Casual developers show "points" only. Experts know the critical metric is "Points Possible" (max achievable if remaining picks are all correct) — it determines whether a member can realistically still win the pool.

4. **Survivor-specific language**: "Alive/Eliminated" states with team reuse restrictions. Showing that a team used in Round 1 cannot be reused in Round 2 is an insider detail most generic implementations miss.

5. **Selection Sunday as the starting gun**: The entire pool revolves around the bracket release on Selection Sunday (third Sunday in March). Pool features should be organized around this event — pre-selection (invite, rules), post-selection (fill bracket), live tournament (scoring), post-tournament (declare winner). A developer who structures the UX around this temporal flow understands the domain deeply.

6. **"Chalk %" statistic on picks**: Advanced pool tools show what % of the pool picked each team. This meta-game (knowing what others picked, and contrarianing strategically) is a sophisticated feature that experienced pool players care about deeply. Showing "84% of entries picked Auburn" next to a pick is an instant credibility signal.

---

## Common Systems & Tools Used

1. **ESPN Tournament Challenge** — Market-leading free bracket game, 24M+ brackets in 2025
2. **CBS Sports Bracket Games** — Second-largest, known for detailed game stats overlay
3. **Yahoo Sports Tourney Pick'em** — Social layer emphasis, forums/comments per game
4. **OfficePoolStop** — DIY pool hosting, commissioner controls, survivor format support
5. **RunYourPool** — Paid pool hosting SaaS ($20-60/year), bracket + survivor + confidence pools
6. **PoolTracker** — Veteran office pool tool, spreadsheet-like but web-based
7. **SportsData.io** — NCAA basketball live scores API (used by developers building custom apps)
8. **Sportradar** — Enterprise sports data API (live stats, game state, real-time push feeds)
9. **BallDontLie API** — Free/freemium basketball stats API popular with indie developers
10. **Firebase Realtime Database / Firestore** — Most common backend for indie sports apps needing realtime leaderboard updates

---

## Geographic / Cultural Considerations

- **US-only cultural event**: March Madness is primarily a US phenomenon. Pool mechanics assume Eastern/Central/Mountain/Pacific time zones — game times must be displayed in local time or with timezone label.
- **Entry fee legality**: Real-money pools occupy a legal gray area in several US states. Platform should position as "optional entry" or "commissioner-managed" to avoid direct gambling classification. A disclaimer in pool settings is standard practice.
- **College team loyalties**: Members often have strong regional/alumni affiliations — a member from the Southeast may have heavy SEC bias in picks. This is a social feature opportunity (show "pick distribution by region" of your pool).
- **Selection Sunday timing**: Always the third Sunday in March. Tournament spans approximately 3 weeks (mid-March to first weekend of April).
- **Time zones for lock times**: "Picks lock at first tipoff" — first games of the main bracket tipoff Thursday at 12:15 PM ET. All 4 time zones must be handled correctly.

---

## Realistic Metric Ranges — Scoring Examples

### Standard Bracket Scoring (1-2-4-8-16-32)
- Round 1 (64 → 32): 1 pt per correct pick × 32 games = 32 pts max
- Round 2 (32 → 16): 2 pts × 16 games = 32 pts max
- Sweet Sixteen (16 → 8): 4 pts × 8 games = 32 pts max
- Elite Eight (8 → 4): 8 pts × 4 games = 32 pts max
- Final Four (4 → 2): 16 pts × 2 games = 32 pts max
- Championship (2 → 1): 32 pts × 1 game = 32 pts max
- **Total possible: 192 points** (in standard system)

### Upset Bonus Scoring (seed differential)
- 12-seed over 5-seed: base + 7 bonus pts
- 15-seed over 2-seed: base + 13 bonus pts
- Cinderella Final Four run by #12 seed: potentially +40-60 bonus points

### Confidence Pool Points (example 10-person pool)
- Each pick assigned 1-63 confidence points (no repeats)
- Highest confidence on most certain pick; lowest on longest shots
- Total possible: sum of 1+2+3...+63 = 2,016 points
- Typical winning score in balanced pool: 900-1,400 points

---

## Data Architect Notes

- **Use real 2025 NCAA teams** for bracket seeding — listed above by region. Florida won the championship; all 4 #1 seeds reached Final Four. Include at least one upset: Arkansas (#10) reached Sweet Sixteen.
- **Bracket entity structure**: Pool → Entries → Picks (one pick per game) → Game results. Relational chain is Pool has many Entries, Entry has many Picks, each Pick references a Game.
- **Game entity fields**: `gameId`, `round` (1-6), `region` (south/east/west/midwest/final-four/championship), `seed1`, `team1`, `score1`, `seed2`, `team2`, `score2`, `status` ("Scheduled" | "In Progress" | "Halftime" | "Final" | "Final/OT"), `winnerId`, `tipoffTime`.
- **Pick entity fields**: `pickId`, `entryId`, `gameId`, `pickedTeamId`, `confidence` (null for pick'em, 1-63 for confidence pool), `result` ("Correct" | "Incorrect" | "Pending").
- **Entry entity fields**: `entryId`, `memberId`, `poolId`, `bracketName`, `totalPoints`, `pointsPossible`, `correctPicks`, `survivorStatus` ("Alive" | "Eliminated"), `rank`, `entryFee`.
- **Status labels to use verbatim**: "Alive", "Eliminated", "Bracket Busted", "Final", "In Progress", "Locked", "Correct", "Incorrect", "Pending"
- **Edge cases to include**:
  - At least 2 entries with "Bracket Busted" state (early champion pick eliminated)
  - 1 entry with perfect score through Round 1
  - 1 entry with "Eliminated" survivor status
  - 1 overtime game in the data (status: "Final/OT")
  - 1 play-in game result
  - At least 1 upset result (lower-seeded team wins)
- **Date patterns**: Tournament starts mid-March. Round 1 is days 1-2, Round 2 days 3-4, Sweet 16 days 8-9, Elite 8 days 10-11, Final Four days 15-16, Championship day 20. For mock data: use relative offsets from a fixed start date, e.g., `new Date('2025-03-20')` as Round 1 day 1.
- **Entry fee amounts**: $10, $15, $20, $25 are the most common for authentic feel.
- **Prize pot calculation**: `entryFee × numberOfEntries`, split 60/25/15 for top 3 in pools of 15+.

---

## Layout Builder Notes

- **Recommended density**: Standard (default token values) — sports apps sit between "power tool" density and "consumer spacious." Don't go compact (too utilitarian) or spacious (loses the score-tracking urgency feeling).
- **Domain-specific visual patterns**:
  - **Color-coded outcome cells**: Green background for correct picks, red for incorrect, neutral/muted for pending. This is table stakes — practitioners will immediately notice if it's missing.
  - **Pulsing "LIVE" indicator**: Red pulsing dot or "LIVE" badge on any in-progress game. This is the #1 visual signal for realtime sports apps.
  - **Rank delta indicators**: Up/down arrows with numbers on leaderboard (e.g., "+3" in green, "-1" in red). Shows rank changes after each round.
  - **Seed badges**: Small numbered badges (1-16) displayed alongside team names everywhere. These should be styled distinctly — #1 seed badge vs #12 seed badge should feel different (gold/silver treatment possible).
  - **Elimination strikethrough**: Eliminated teams in bracket tree should be visually crossed out or grayed — practitioners immediately recognize this pattern.
- **Sidebar width**: Standard (16rem) — nav items are short enough that 14rem would work, but standard matches ESPN/CBS Sports sidebar feel.
- **Color direction**: Deep navy or near-black base with orange accent (tournament energy) OR electric blue accent (ESPN-adjacent). Avoid muted/warm tones — sports apps read as cold-to-neutral.
- **Typography**: Geist or Inter for body; numbers should be tabular (monospaced or tabular-figures) for leaderboard columns to keep alignment clean.

---

## Demo Screen Builder Notes

- **Hero metric for main dashboard**: "Your Current Rank" — displayed large (e.g., "#4 of 24") with "Points" as secondary stat and "Points Behind Leader" as tertiary. This is the first thing every pool member checks.
- **Primary visualization**: **Horizontal bracket tree** — the canonical visualization for this domain. Should be a scrollable/zoomable SVG or canvas element showing the bracket with picks overlaid. Games with results show win/loss highlighting.
- **Secondary visualization**: Leaderboard table with rank delta arrows — 10+ entries visible, sortable by points/picks/alive-status.
- **Domain-specific panel that would impress a practitioner**: **Live Game Feed** — a real-time updating panel showing currently-in-progress games with live scores, pulsing LIVE badges, and the user's pick highlighted for each game. Shows "You picked: Auburn" vs current game score. This is the feature that makes the app feel alive during games.
- **Chart for trends**: Bar chart showing points by round (how many points were gained/lost each tournament round) — practitioners like this retrospective view.
- **Key interactive elements**:
  - Filter leaderboard by "Alive only" toggle for survivor pools
  - Click a matchup on the bracket to see pick distribution (% of pool that picked each team)
  - Toggle between "Your Bracket" and "Best Bracket" views
  - Countdown timer to pick deadline (before tournament) or to next game tipoff (during tournament)

---

## Sources
Research informed by:
- [2025 NCAA Tournament Wikipedia](https://en.wikipedia.org/wiki/2025_NCAA_Division_I_men%27s_basketball_tournament)
- [March Madness Survivor Pool Guide — SportsBookReview](https://www.sportsbookreview.com/picks/ncaa-basketball/march-madness-what-is-survivor-rules-format/)
- [OfficePoolStop Features](https://officepoolstop.com/info/features)
- [PoolGenius Bracket Strategy Guide](https://poolgenius.teamrankings.com/ncaa-bracket-picks/articles/bracket-strategy-guide/)
- [ESPN Tournament Challenge](https://fantasy.espn.com/games/tournament-challenge-bracket-2025/)
- [CBS Sports 2025 Bracket](https://www.cbssports.com/college-basketball/news/march-madness-2025-committee-reveals-official-ncaa-tournament-bracket-seed-list-from-1-68/)
- [SportsSchedulerPro 2025 Bracket](https://sportschedulerpro.com/ncaa-tournament-bracket/2025)
- [Entry Fees & Payout Structures — PrintYourBrackets](https://www.printyourbrackets.com/sample-of-march-madness-bracket-payouts.html)
- [PoolGenius Scoring Systems Analysis](https://poolgenius.teamrankings.com/ncaa-bracket-picks/articles/bracket-pool-scoring-systems-why-they-matter-how-to-exploit-them/)
