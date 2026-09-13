# CRWLR

**Status: work in progress.** Personal prototype for location / social discovery. Not a launched product.

CRWLR is an app sketch for exploring venues and organizing crawls with friends. The current build has a real auth and friends path on Supabase, plus several screens that still run on mock venue data.

## What this project demonstrates

- A product idea taken far enough to click through: auth, profile, friends, activity feed, navigation
- Frontend structure in React (Vite, TypeScript, Tailwind)
- Supabase for auth and some social data
- An honest split between wired features and placeholders (discover / map / gamification)

## What works today

- Sign up / log in
- Home activity feed (likes)
- Friends (search, requests, list)
- Profile
- Crawl and leaderboard **screens** (UI is there; a lot of the content is still mock)

## What does not work yet

- Real nearby venues (Discover uses `project/src/data/mockData.ts`)
- Map
- Live check-ins tied to a place API
- Points / achievements
- Tests and a production deploy

See [STATUS.md](STATUS.md) for the checklist.

## Stack

React, TypeScript, Vite, Tailwind, React Router, Supabase.

## Run it locally

You need Node and a Supabase project.

```bash
cd project
cp .env.example .env
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

SQL for the current schema is under `project/supabase/migrations/`. Apply those in your own Supabase project. Do not commit `.env`.

## Layout

```
crwlr/
├── README.md
├── STATUS.md
└── project/
    ├── src/pages/          # screens
    ├── src/components/
    ├── src/data/mockData.ts
    ├── src/lib/supabase.ts
    └── supabase/migrations/
```

The app lives in `project/` from the first prototype pass. I have not flattened that yet.

## Notes

This sits next to two finished analytics repos (NCAA rankings, Atlanta airport delays). Those are study reimplementations. This one is the product prototype, and it is still open.
