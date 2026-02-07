# Forehand Learn & Tournaments (PWA)

A production-ready Next.js App Router PWA (TypeScript + React + Tailwind) for tournament management and optional Feynman-style in-app learning. Client-first: UI and learning session state persisted to IndexedDB/localStorage; service worker for offline and installability.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Get Started** or **Go to Home** to explore.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Architecture

- **Single repo**: Next.js App Router, TypeScript, Tailwind. No external APIs required by default.
- **Core product**: Onboarding, org creation (3-step wizard), tournament/event builder, participant and fixture management, live scoring, player flows, checkout, profile, notifications.
- **Learning**: Feynman-style loop (explain → analogy → confusions → refinement → assessment → snapshot). Sessions stored in localStorage; can be opened from relevant screens (e.g. “Teach me bracket seeding” on BracketView).
- **PWA**: `public/manifest.json`, `public/sw.js`, offline fallback at `public/offline.html`. Service worker registered in `ClientInit` on mount. IndexedDB + localStorage used for drafts, score logs, and offline queue.

## Folder structure

```
/app
  /(auth)          # splash, finalize profile
  /home            # Explore / Live Feed / My Space
  /tournaments     # list, [id], create
  /org             # create, [orgId] dashboard
  /match/[matchId] # live scoring UI
  /learn/[topic]   # Feynman learning step
  /profile, /settings
/components        # Layout, TopNav, BottomNav, Tabs, Cards, Wizards, Match, Bracket, ParticipantList, NotificationsSlideOver, Learning
/lib               # storage, pwa, validators
/styles            # tokens.css (light/dark)
/types             # models.ts
/public            # manifest.json, sw.js, offline.html, icons/
```

## Testing offline scoring

1. Run `npm run build && npm run start`.
2. In DevTools → Application → Service Workers, register `/sw.js` (or rely on automatic registration).
3. In Application → Storage, use IndexedDB `forehand-pwa` and localStorage keys `forehand:*` for drafts and learning.
4. Score events append via `lib/storage.ts` (`appendScoreLog`, `pushOfflineQueue`). On reconnect, sync the offline queue (implementation-specific).

## Learning sessions

- Go to `/learn/bracket-seeding` (or any topic slug). Enter a simple explanation and analogy, then **Save & Next**.
- Progress is saved in localStorage under `learning:{topic}`. No server required.

## PWA icons

Add your own icons for installability:

- `public/icons/icon-192.png` (192×192)
- `public/icons/icon-512.png` (512×512)

If missing, the app still runs; install prompt may not show or use a default icon.

## Theme

Design tokens in `styles/tokens.css`: `--color-primary` (#FF7A1A), light/dark surfaces. Toggle dark by adding class `dark` to `<html>` (e.g. from settings).

## Constraints

- No external APIs by default; optional server/LLM can be added later.
- Minimal dependencies; small utilities and browser APIs preferred.
- Touch targets ≥ 44×44 dp; live score regions use `aria-live` where relevant.
