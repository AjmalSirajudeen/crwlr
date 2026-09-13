import type { MockVenue } from '../data/mockData';

export type OptimizedStop = {
  order: number;
  venue: MockVenue;
  venue_name: string;
  venue_type: string;
  venue_address: string;
  venue_latitude: number;
  venue_longitude: number;
  venue_price_level: number;
  venue_rating: number;
  venue_image: string;
  suggested_duration: number;
  estimated_arrival: string;
  walking_time: number;
};

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLng / 2);
  const h =
    s1 * s1 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * s2 * s2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function durationFor(type: string) {
  if (type.includes('Restaurant')) return 75;
  if (type.includes('Club')) return 70;
  if (type.includes('Rooftop') || type.includes('Cocktail')) return 50;
  return 45;
}

function parseClock(label: string) {
  const match = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return { hours: 20, minutes: 0 };
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const mer = match[3]?.toUpperCase();
  if (mer === 'PM' && hours < 12) hours += 12;
  if (mer === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

function formatClock(totalMinutes: number) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const mer = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${mer}`;
}

export function optimizeRoute(venues: MockVenue[], startTime: string): OptimizedStop[] {
  if (venues.length === 0) return [];

  const remaining = [...venues];
  const ordered: MockVenue[] = [remaining.shift() as MockVenue];

  while (remaining.length) {
    const last = ordered[ordered.length - 1];
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    remaining.forEach((venue, index) => {
      const distance = haversineKm(last, venue);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    ordered.push(remaining.splice(nearest, 1)[0]);
  }

  const start = parseClock(startTime);
  let cursor = start.hours * 60 + start.minutes;

  return ordered.map((venue, index) => {
    const walking =
      index === 0
        ? 0
        : Math.max(1, Math.round(haversineKm(ordered[index - 1], venue) * 12));
    if (index > 0) cursor += walking;
    const arrival = formatClock(cursor);
    const stay = durationFor(venue.type);
    cursor += stay;

    return {
      order: index + 1,
      venue,
      venue_name: venue.name,
      venue_type: venue.type,
      venue_address: venue.address,
      venue_latitude: venue.lat,
      venue_longitude: venue.lng,
      venue_price_level: venue.priceLevel,
      venue_rating: venue.rating,
      venue_image: venue.image,
      suggested_duration: stay,
      estimated_arrival: arrival,
      walking_time: walking,
    };
  });
}
