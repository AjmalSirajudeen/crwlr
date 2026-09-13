import { mockCrawls, mockCurrentCrawl, mockUsers, mockVenues } from './mockData';

const KEY = 'crwlr_demo_crawls';

export type StoredCrawl = {
  id: string;
  name: string;
  date: string;
  time: string;
  area: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  venueIds: string[];
  creatorId: string;
  participantIds: string[];
};

function seed(): StoredCrawl[] {
  const fromList: StoredCrawl[] = mockCrawls.map((c) => ({
    id: c.id,
    name: c.name,
    date: c.date,
    time: c.time,
    area: c.area,
    status: c.status,
    venueIds: c.venues.map((v) => v.id),
    creatorId: c.creator.id,
    participantIds: c.participants.map((p) => p.id),
  }));
  if (!fromList.some((c) => c.id === mockCurrentCrawl.id)) {
    fromList.push({
      id: mockCurrentCrawl.id,
      name: mockCurrentCrawl.name,
      date: mockCurrentCrawl.date,
      time: mockCurrentCrawl.time,
      area: mockCurrentCrawl.area,
      status: mockCurrentCrawl.status,
      venueIds: mockCurrentCrawl.stops.map((s) => s.venue.id),
      creatorId: mockCurrentCrawl.creator.id,
      participantIds: mockCurrentCrawl.participants.map((p) => p.id),
    });
  }
  return fromList;
}

function read(): StoredCrawl[] {
  try {
    const initial = seed();
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      write(initial);
      return initial;
    }
    const existing = JSON.parse(raw) as StoredCrawl[];
    const missing = initial.filter((s) => !existing.some((e) => e.id === s.id));
    const merged = [...missing, ...existing];
    if (missing.length) write(merged);
    return merged;
  } catch {
    return seed();
  }
}

function write(crawls: StoredCrawl[]) {
  localStorage.setItem(KEY, JSON.stringify(crawls));
}

export function listCrawls(): StoredCrawl[] {
  return read();
}

export function getCrawl(id: string): StoredCrawl | undefined {
  return read().find((c) => c.id === id);
}

export function addCrawl(input: {
  name: string;
  date: string;
  time: string;
  venueIds: string[];
  creatorId?: string;
}): StoredCrawl {
  const venues = input.venueIds
    .map((id) => mockVenues.find((v) => v.id === id))
    .filter(Boolean);
  const creatorId = input.creatorId || mockUsers[0].id;
  const crawl: StoredCrawl = {
    id: `crawl-${Date.now()}`,
    name: input.name.trim() || 'Untitled crawl',
    date: input.date,
    time: input.time,
    area: venues[0]?.address.split(',').pop()?.trim() || 'Harbor District',
    status: 'upcoming',
    venueIds: input.venueIds,
    creatorId,
    participantIds: [creatorId],
  };
  write([crawl, ...read()]);
  return crawl;
}

const DEMO_CREATOR = {
  id: 'demo-user',
  name: 'Riley Chen',
  avatar: mockUsers[0].avatar,
  points: 0,
  preferences: [] as string[],
};

export function personById(id: string) {
  if (id === DEMO_CREATOR.id) return DEMO_CREATOR;
  return mockUsers.find((u) => u.id === id) ?? mockUsers[0];
}

export function toCardCrawl(c: StoredCrawl) {
  const creator = personById(c.creatorId);
  const participants = c.participantIds.map(personById);
  return {
    id: c.id,
    name: c.name,
    date: c.date,
    time: c.time,
    area: c.area,
    stops: c.venueIds.length,
    status: c.status,
    creator,
    participants,
    venues: c.venueIds
      .map((id) => mockVenues.find((v) => v.id === id))
      .filter(Boolean),
  };
}
