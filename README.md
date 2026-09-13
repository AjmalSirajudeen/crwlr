# CRWLR 🗺️🍻

*The night out, but it feels like a quest.*

A little obsession of mine: what if going out felt more like a shared hunt than a group chat full of “idk where do you want to go?”

CRWLR is a location / social discovery app I’m building for people who like to wander. Find a spot. Pull friends in. String a few places into a crawl. Leave a trail so the next night is easier than the last.

This is early (on purpose). You can already sign in, add friends, and poke around the feed. A lot of the “what’s near me” magic is still on the stove. I’m putting it out here because I want people to get the vibe, click around, and tell me what would actually make them open it on a Friday. 🌙

## The bet 🎯

Most nightlife apps are either maps or reviews. I care about the in-between:

- 🚶 the route you invent with people you like
- 📍 the check-in that is really a “you had to be there”
- 🏆 the quiet scoreboard that makes exploring a city feel like a game you are writing yourselves

By day I’m an operator and a builder. CRWLR is the side of me that wants to ship something people actually pass around.

## What’s already fun to click ✨

- 🔐 sign up / log in
- 🏠 a home feed you can like
- 👋 friends: search, request, accept
- 👤 profile
- 🍻 crawl + leaderboard screens (the look is there; the live city underneath is still coming)

## Still cooking 🍳

- 📌 real nearby venues (Discover is on mock data for now… I know, I know)
- 🗺️ a map that does more than sit there looking pretty
- ✅ check-ins tied to real places
- 🎖️ points, badges, a leaderboard that means something
- ✨ the kind of polish you only get after strangers use it

If you like watching the sausage get made, the checklist is in [STATUS.md](STATUS.md).

## Stack 🛠️

React · TypeScript · Vite · Tailwind · React Router · Supabase

Fast enough to prototype. Serious enough to grow.

## Run it 🚀

Node plus your own Supabase project.

```bash
cd project
cp .env.example .env
# drop in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

Migrations are in `project/supabase/migrations/`. Keep `.env` off git. Your secrets, your night.

If you try it and it sparks something (a venue you’d want in here, a crawl that got messy, a feature you’d actually use), I want to hear it. That’s the whole point of putting an unfinished product on the internet. 🧃
