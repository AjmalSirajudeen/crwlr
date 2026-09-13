import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import Button from '../components/ui/Button';
import CrawlRouteMap from '../components/CrawlRouteMap';
import { mockVenues } from '../data/mockData';
import { addCrawl } from '../data/crawlStore';
import { optimizeRoute } from '../lib/route';
import { useAuth } from '../contexts/AuthContext';

const VENUE_TYPES = [...new Set(mockVenues.map((v) => v.type))];
const STEPS = ['Details', 'Spots', 'Route'];

const CreateCrawlPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('Friday wander');
  const [date, setDate] = useState('Tonight');
  const [time, setTime] = useState('8:00 PM');
  const [types, setTypes] = useState<string[]>([]);
  const [venueIds, setVenueIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const filteredVenues = useMemo(() => {
    if (types.length === 0) return mockVenues;
    return mockVenues.filter((v) => types.includes(v.type));
  }, [types]);

  const selectedVenues = useMemo(
    () =>
      venueIds
        .map((id) => mockVenues.find((v) => v.id === id))
        .filter(Boolean) as typeof mockVenues,
    [venueIds]
  );

  const route = useMemo(
    () => optimizeRoute(selectedVenues, time),
    [selectedVenues, time]
  );

  const mapStops = route.map((stop, index) => ({
    time: stop.estimated_arrival,
    status: index === 0 ? 'current' : 'upcoming',
    venue: stop.venue,
  }));

  const toggleType = (type: string) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleVenue = (id: string) => {
    setError('');
    setVenueIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const goTo = (next: number) => {
    if (next > 0 && !name.trim()) {
      setError('Give the crawl a name.');
      return;
    }
    if (next > 1 && venueIds.length < 2) {
      setError('Pick at least two spots.');
      return;
    }
    setError('');
    setStep(next);
  };

  const handleSave = () => {
    if (route.length < 2) {
      setError('Pick at least two spots.');
      return;
    }
    const crawl = addCrawl({
      name,
      date,
      time,
      venueIds: route.map((stop) => stop.venue.id),
      creatorId: user?.id,
    });
    navigate(`/crawls/${crawl.id}`);
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-5 pb-36">
        <h1 className="font-display text-3xl text-ink">Create a crawl</h1>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Demo only. Stays in this browser.
        </p>

        <div className="flex items-center gap-2 mb-5">
          {STEPS.map((label, index) => (
            <button
              key={label}
              type="button"
              disabled={index > step}
              onClick={() => goTo(index)}
              className={`flex-1 rounded-full py-2 text-xs sm:text-sm font-medium ${
                index === step
                  ? 'bg-ink text-white'
                  : index < step
                    ? 'bg-ember-light text-ember-dark'
                    : 'bg-gray-200 text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {step === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">When</span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Start</span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Vibes <span className="font-normal text-gray-400">optional</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {VENUE_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      types.includes(type)
                        ? 'bg-ink text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <h2 className="font-semibold text-lg text-gray-900">Pick spots</h2>
                <p className="text-sm text-gray-500">
                  First tap is the start. We line up the walk from there.
                </p>
              </div>
              <span className="text-sm font-medium text-ember">
                {venueIds.length} selected
              </span>
            </div>
            {filteredVenues.length === 0 && (
              <button
                type="button"
                className="text-sm text-ember mb-3"
                onClick={() => setTypes([])}
              >
                No matches. Clear vibes.
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredVenues.map((venue) => {
                const order = venueIds.indexOf(venue.id);
                const selected = order >= 0;
                return (
                  <button
                    key={venue.id}
                    type="button"
                    onClick={() => toggleVenue(venue.id)}
                    className={`flex gap-3 text-left rounded-xl border overflow-hidden ${
                      selected
                        ? 'border-ember bg-ember-light/60'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <img
                      src={venue.image}
                      alt=""
                      className="w-20 h-20 object-cover shrink-0"
                    />
                    <div className="py-2 pr-3 min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium truncate">{venue.name}</span>
                        {selected && (
                          <span className="w-6 h-6 rounded-full bg-ink text-white text-xs flex items-center justify-center shrink-0">
                            {order + 1}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{venue.type}</p>
                      <p className="text-xs text-gray-400">
                        {Array(venue.priceLevel).fill('$').join('')} · {venue.rating}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{name}</h2>
              <p className="text-sm text-gray-500">
                {date} · starts {time}
              </p>
            </div>
            <CrawlRouteMap stops={mapStops} />
            <ol className="bg-white rounded-xl shadow-sm divide-y overflow-hidden">
              {route.map((stop) => (
                <li key={stop.venue.id} className="p-4 flex justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {stop.order}. {stop.venue_name}
                    </p>
                    <p className="text-sm text-gray-500">{stop.venue_type}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{stop.estimated_arrival}</p>
                    {stop.walking_time > 0 && (
                      <p className="text-gray-400">{stop.walking_time} min walk</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </main>

      <div className="fixed left-0 right-0 bottom-16 z-40 border-t border-stone-200 bg-paper/95 backdrop-blur px-4 py-3">
        <div className="max-w-3xl mx-auto">
          {error && <p className="text-rose-600 text-sm mb-2">{error}</p>}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => (step > 0 ? goTo(step - 1) : navigate('/crawls'))}
            >
              {step > 0 ? 'Back' : 'Cancel'}
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="primary" className="flex-1" onClick={() => goTo(step + 1)}>
                {step === 1 ? `Next · ${venueIds.length} spots` : 'Next'}
              </Button>
            ) : (
              <Button variant="primary" className="flex-1" onClick={handleSave}>
                Save crawl
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCrawlPage;
