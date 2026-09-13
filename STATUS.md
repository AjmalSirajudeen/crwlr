# Status

CRWLR is a prototype. This list is what is actually in the repo today.

## Phase 1 (done)

- [x] Guest demo: "Try the Harbor District demo" on login (no signup needed)
- [x] Synthetic neighborhood: 6 venues, sample crawls, sample feed
- [x] Discover search + filters actually change the list
- [x] Demo home / profile / friends use sample data instead of empty Supabase calls
- [x] Crawl cards open the crawl detail screen

## Working enough to demo

- [x] App shell (Vite + React + TypeScript + Tailwind)
- [x] Routes for home, discover, crawls, leaderboard, profile, friends
- [x] Supabase auth (sign up, sign in, protected routes)
- [x] Friend requests and friend list
- [x] Profile edits
- [x] Activity feed with likes
- [x] Bottom navigation

## Still mock or unfinished

- [x] Create crawl (demo): 3-step wizard, walking route, save in this browser
- [ ] Check-ins do not persist yet
- [x] Discover map (Leaflet + OpenStreetMap, sample pins)
- [ ] Live location / nearby venues
- [ ] Points, achievements, and a real leaderboard
- [ ] Comments and notifications
- [ ] Tests
- [x] Public demo: https://ajmalsirajudeen.github.io/crwlr/

## Next phases

2. Persist crawls and check-ins (at least in the demo session)
3. Host a public demo URL and put it on the README
