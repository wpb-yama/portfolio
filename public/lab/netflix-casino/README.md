# Netflix Casino

## One-liner
A proof-of-concept casino lobby redesign built to look and feel like Netflix -- content discovery, personalisation, parallax hero, and a playable Mines game.

## Status
Active -- Planning

## Audience
Potential employers. Lives at willbooth.dev/netflix-casino-lobby.

## Problem It Solves
Traditional online casino lobbies are visually identical and offer minimal engagement. This prototype demonstrates what a modern, content-first lobby could look like.

---

## Scope

### Lobby & Game Discovery
- **Hero / Screensaver** -- Full-width parallax banner featuring a highlighted game. Auto-rotates between featured games. Smooth parallax scroll effect.
- **Content rows** -- Horizontal scrollable rows in Netflix style. Suggested rows:
  - Featured (hero overflow)
  - Popular Games
  - New Releases
  - Jackpot Games
  - Recommended for You
- **Game cards** -- Thumbnail cards with hover lift/scale effect. Click opens game.
- **Responsive** -- Fully reactive layout for web and mobile.

### Games
- **Mines** (playable) -- 5x5 grid. Player picks a mine count, clicks tiles to reveal gems or mines. Each safe tile increases the multiplier. Cash out any time.
- **All other games** -- "Coming Soon" placeholder thumbnails to populate the lobby with realistic content.

### Deployment
- Built as a Next.js app (or standalone HTML/CSS/JS if faster to prototype).
- Deployed to: `willbooth.dev/netflix-casino-lobby`

---

## Mines Game Spec

| Property | Detail |
|----------|--------|
| Grid | 5x5 (25 tiles) |
| Mine counts | Player selects: 1, 3, 5, 10, or 24 mines |
| Tile states | Hidden, Gem (safe), Mine (game over) |
| Multiplier | Increases with each safe tile revealed |
| Cash out | Player can cash out at any time before hitting a mine |
| Balance | Fake balance for demo purposes (no real money) |
| Visual | Satisfying reveal animation on each tile |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (to deploy on willbooth.dev) |
| Styling | Tailwind CSS or CSS modules |
| Animation | CSS transitions + Framer Motion (parallax, tile reveals) |
| State | React useState/useReducer (Mines game logic) |
| Deployment | Vercel (via willbooth.dev repo) |

---

## Key Dates
None set.

---

## Collaborators
- Eduardo (Head Designer) -- loop in for design feedback on UI/UX
