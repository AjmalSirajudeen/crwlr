# CRWLR

I got tired of the group chat where nobody wants to pick the next bar. This is my attempt at an app for that: find a place, pull friends in, string a few stops into a crawl.

It's a prototype. A lot of it is still fake data. That's fine for now. I wanted something you could click through.

**Live demo:** https://ajmalsirajudeen.github.io/crwlr/

Open it and tap **Try the Harbor District demo**. No account. You get a made-up neighborhood, six venues, some friends, and crawls you can build and save in your browser.

What you can actually do today:
- walk through the demo without signing up
- search and filter the sample spots (there's a map)
- create a crawl, see a walking route, save it
- sign up for real if you want (Supabase auth, friends, profile)

What's not there yet:
- real nearby venues / GPS
- check-ins that persist
- a leaderboard that isn't just filler

I keep a messy checklist in [STATUS.md](STATUS.md).

## Stack

React, TypeScript, Vite, Tailwind, React Router, Supabase.

## Run it locally

You'll need Node and your own Supabase project.

```bash
cd project
cp .env.example .env
# add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

Migrations live in `project/supabase/migrations/`. Don't commit `.env`.

If you try the demo and something feels dumb or useful, I want to know. That's why it's up.
