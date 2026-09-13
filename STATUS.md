# Status

CRWLR is a prototype. This list is what is actually in the repo today.

## Working enough to demo

- [x] App shell (Vite + React + TypeScript + Tailwind)
- [x] Routes for home, discover, crawls, leaderboard, profile, friends
- [x] Supabase auth (sign up, sign in, protected routes)
- [x] Friend requests and friend list
- [x] Profile edits
- [x] Activity feed with likes
- [x] Bottom navigation

## Still mock or unfinished

- [ ] Discover: venues and filters are mock data (`src/data/mockData.ts`)
- [ ] Map view is a placeholder
- [ ] Live location / nearby venues
- [ ] Real check-ins against a venue API
- [ ] Crawl planning that persists for a group
- [ ] Points, achievements, and a real leaderboard
- [ ] Comments and notifications
- [ ] Tests
- [ ] Production deploy

## Next (when I pick this back up)

1. Replace mock venues with a real place source
2. Persist crawls and check-ins in Supabase
3. Make discover search and filters actually change results
4. Add a short test pass on auth and friends
