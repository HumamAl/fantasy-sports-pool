# Creative Brief — Fantasy Sports Pool

**Project:** Fantasy Sports Pool (Hybrid Survivor/Fantasy League)
**Domain:** Fantasy sports / sports pools / March Madness
**Date:** 2026-03-03

---

## Creative Brief JSON

```json
{
  "aesthetic": "dark-premium",
  "demoFormat": "dashboard-app",
  "domain": "fantasy sports / sports pools",
  "mood": "electric, competitive, high-stakes, real-time",
  "colorDirection": "vibrant emerald green on near-black (oklch(0.62 0.20 145) primary on oklch(0.08 0.02 250) background) — inspired by Sleeper's dark-first interface conventions and DraftKings' association of green with winning/money in sports gaming contexts. Cyan secondary accent (oklch(0.82 0.18 195)) for live/active states, matching Sleeper's aqua treatment for real-time data.",
  "typography": "Geist Sans body, Poppins Bold for display headings and team names — Sleeper uses Poppins for headings and Inter for body; Poppins carries sports energy without feeling gaming-clichéd. Geist Mono for scores, percentages, and pick counts — numeric alignment matters when users scan standings tables.",
  "radiusProfile": "medium (0.75rem cards, 1rem pill badges) — Sleeper and DraftKings both use generous rounding on cards with pill-shaped status badges. Sharp corners feel dated (old PoolGenius/SurvivorGrid utility aesthetic). Maximum rounding on status indicators communicates 'alive' vs 'eliminated' at a glance.",
  "densityProfile": "standard — Sleeper uses moderate density with clear visual separation between picks; not as compressed as a SurvivorGrid data table, not as spacious as a wellness app. Users need to see 16+ bracket entries in a standings view without excessive scrolling. Standard density serves this balance.",
  "motionCharacter": "smooth (200-250ms ease-out) — Sleeper's interface uses subtle scale transforms (1.05x) on card hover and smooth screen transitions. Sports data apps need fluid feel to reinforce 'live' perception. No theatrical delays — when a Firebase update fires, the UI should update quickly and confirm it with a brief transition, not a slow reveal.",
  "formatRationale": "Job describes a web app with Firebase realtime updates tracking picks, standings, and live game scores across a March Madness pool. A sidebar dashboard layout lets the demo show: (1) a main pool dashboard with live standings, (2) a picks management view, (3) a bracket/results view, and (4) a league settings view — exactly the 4 core workflows a pool commissioner or participant needs. This mirrors how Sleeper and DraftKings structure their league management interfaces. A phone frame would be wrong here because Firebase realtime database management and the bracket visualization are inherently web-first experiences.",
  "competitorReferences": [
    "Sleeper (sleeper.com) — deep navy/charcoal dark background (#0a0a1a, #15182d), bright cyan/aqua primary (#00FFF9), glassmorphism card effects with backdrop blur, Poppins headings, Inter body, scale-on-hover card interactions, layered gradient overlays. This is the dominant visual language for modern fantasy sports apps among engaged players.",
    "Splash Sports (splashsports.com) — light mode, clean mobile-first card-based contest design, blue accent (#4d65ff), phone mockup-forward presentation. Shows the alternative consumer-friendly approach; lighter and more approachable but less 'serious' for a custom pool app.",
    "DraftKings Survivor Pool — dark interface available, bold sports identity, green associated with money/winning in sports gaming contexts, bold CTA buttons, prominent standings tables. Sets expectations for what 'premium sports pool UI' means.",
    "SurvivorGrid (survivorgrid.com) — dark background with compact data table for pick grid, functional utility tool with no visual polish. Shows the floor — what a picks interface looks like without design investment. The client wants the ceiling, not this floor.",
    "PoolGenius — light mode, corporate blue (#2171cd), clean cards, generous spacing. Positioned as an analytics/strategy tool rather than a social game platform. Referenced for contrast — the client's product is more game-like than this analytical tool."
  ],
  "brandSignals": null,
  "creativeRationale": "Studied Sleeper's homepage — it uses deep navy backgrounds (#0a0a1a) with bright cyan (#00FFF9) primary accents, Poppins Bold for headings, glassmorphism card treatment, and smooth scale-hover effects. This is the dominant visual standard that serious fantasy players associate with a 'premium modern sports app.' DraftKings and the survivor pool space broadly use dark backgrounds with green (win/money association) or cyan (live/active) accents — never light corporate UIs. The client's hybrid pool app adds realtime Firebase updates, which must feel 'alive' — dark surfaces with luminous accent colors create that perception far better than light UIs. Emerald green was chosen over cyan as primary because this is a competitive pool with real stakes (money/pride), and green signals 'in the money' to sports gaming users; cyan is reserved as a secondary for live/active states. A SaaS Modern light aesthetic would look like PoolGenius — functional but forgettable. Dark Premium makes the demo look like Sleeper built a custom tournament mode."
}
```

---

## Research Notes

### Competitors Studied

| Product | Mode | Primary Color | Key Visual Pattern |
|---|---|---|---|
| Sleeper | Dark | Cyan (#00FFF9) | Glassmorphism, Poppins headings, navy base |
| DraftKings | Dark default | Green/Gold | Bold sports identity, green = winning |
| Underdog Fantasy | Dark | Yellow | Clean dark with bold accent |
| Splash Sports | Light | Blue (#4d65ff) | Mobile-first, clean cards, consumer-friendly |
| PoolGenius | Light | Blue (#2171cd) | Corporate, data-focused, analytics tool |
| SurvivorGrid | Dark | Functional | Utility table, no design investment |

### Domain Visual Conventions

- **Dark-first** is the industry standard for engaged fantasy/pool players. Every top competitor defaults dark.
- **Vivid accents on dark backgrounds** — green, cyan, gold. Never muted or pastel accents.
- **Real-time data signals** — pulsing dots, live score tickers, animated counters — communicate platform sophistication.
- **Card-based picks UI** — each team/game is a selectable card with clear state: available / selected / eliminated.
- **Standings tables** are dense but scannable — players track their position obsessively.
- **March Madness brackets** have their own structural convention: tree visualization, left-to-right round progression.

### Key Design Decisions

1. **Emerald green primary** — In the sports gaming space, green = "in the money," "winning," "active" (DraftKings checkout buttons are green; green states in ESPN Fantasy = positive). For a competitive pool with real stakes, green is the semantic choice. OKLCH: `oklch(0.62 0.20 145)`.

2. **Cyan secondary accent** — Sleeper's primary is cyan. Using it as secondary for live/realtime indicators (Firebase update pulses, live score badges) nods to the dominant platform in the space. OKLCH: `oklch(0.82 0.18 195)`.

3. **Near-black background with navy tint** — Sleeper uses `#0a0a1a` to `#15182d`. Not pure black — tinted dark surfaces feel warmer and more premium. OKLCH background: `oklch(0.08 0.02 250)`.

4. **Poppins for headings** — Import from Google Fonts. Sleeper uses Poppins for team names and section headers. It has sports energy without the cartoon feel of heavier display fonts. Override only the heading scale; body stays Geist Sans.

5. **Dashboard-app format** — Shows 4 nav items: Pool Standings, My Picks, Bracket Results, League Settings. Each maps to a real workflow the client needs.

### Typography Override

```
Heading: 'Poppins', sans-serif (weights: 600, 700, 800) — import from Google Fonts
Body: Geist Sans (default, already in template)
Data: Geist Mono (scores, pick %, win odds)
```

Import string for `layout.tsx`:
```tsx
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-heading' });
```

### Color Token Targets

```css
--primary: oklch(0.62 0.20 145);        /* Emerald green */
--primary-h: 145;
--accent: oklch(0.82 0.18 195);         /* Cyan — live/active states */
--background: oklch(0.08 0.02 250);     /* Near-black navy tint */
--sidebar-bg: oklch(0.10 0.025 250);    /* Slightly lighter than bg */
--card: oklch(0.12 0.02 250);           /* Card surface */
--section-dark: oklch(0.06 0.02 250);   /* Darkest surface for hero areas */
--success: oklch(0.65 0.18 145);        /* Green (same family as primary) */
--warning: oklch(0.75 0.18 85);         /* Amber for at-risk picks */
--chart-1: oklch(0.62 0.20 145);        /* Emerald */
--chart-2: oklch(0.82 0.18 195);        /* Cyan */
--chart-3: oklch(0.75 0.18 85);         /* Amber */
--chart-4: oklch(0.65 0.18 320);        /* Purple */
--chart-5: oklch(0.72 0.18 30);         /* Orange */
```

### Density Tokens

```css
--content-padding: 1.5rem;    /* Standard */
--card-padding: 1.25rem;      /* Slightly tighter for data-rich cards */
--sidebar-width: 16rem;       /* Standard */
--header-height: 3.5rem;      /* Standard */
--radius: 0.75rem;            /* Medium */
```

### Motion Tokens

```css
transition-duration: 200ms;
transition-timing-function: ease-out;
/* Hover scale on picks cards: transform scale(1.02) 150ms */
/* Live data pulse animation: 2s infinite */
```

---

## Sidebar Nav Items (Suggested)

| Nav Item | Route | Icon | Description |
|---|---|---|---|
| Pool Standings | `/` | Trophy | Live leaderboard with entries, picks, and points |
| My Picks | `/picks` | Target/Crosshair | Survivor pick selection per round |
| Bracket Results | `/bracket` | GitBranch | NCAA bracket with game outcomes |
| League Settings | `/settings` | Settings | Pool configuration, scoring rules |

---

## Key UI Patterns for This Domain

1. **Pick state cards** — Team card with 3 states: `available` (default), `selected` (green border + checkmark), `eliminated` (gray + strikethrough). Animated transition between states.

2. **Live standings table** — Entries ranked by points, with indicator for "still alive" vs "eliminated." Row highlight for current user's entry. Animated rank change indicator.

3. **Realtime update indicator** — Pulsing cyan dot + "Live" badge in header. Firebase subscription simulated with `setInterval` updating mock data.

4. **Bracket visualization** — Left-to-right tree structure, teams advance visually. Use a compact 2-column approach showing Regional and Final Four stages.

5. **Pool stats bar** — "64 entries · 47 alive · 12 picks locked · 3 games in progress" — the first thing a pool participant looks for.
