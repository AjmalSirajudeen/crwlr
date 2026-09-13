import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import FilterBar from '../components/FilterBar';
import VenueCard from '../components/VenueCard';
import { mockVenues } from '../data/mockData';
import VenueMap from '../components/VenueMap';
import { Search, Map, ListFilter } from 'lucide-react';

const DiscoverPage = () => {
  const [venues] = useState(mockVenues);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    area?: string;
    type?: string[];
    price?: number[];
    tags?: string[];
  }>({});

  const handleFilterChange = (next: typeof filters) => {
    setFilters(next);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const visibleVenues = venues.filter((venue) => {
    const q = searchQuery.trim().toLowerCase();
    const hay = `${venue.name} ${venue.type} ${venue.address} ${venue.tags.join(' ')}`.toLowerCase();
    if (q && !hay.includes(q)) return false;
    if (filters.area && !venue.address.toLowerCase().includes(filters.area.toLowerCase())) return false;
    if (filters.type?.length && !filters.type.some((t) => venue.type.toLowerCase().includes(t.toLowerCase()))) {
      return false;
    }
    if (filters.price?.length && !filters.price.includes(venue.priceLevel)) return false;
    if (filters.tags?.length && !filters.tags.some((tag) => venue.tags.includes(tag))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 rounded-lg border border-ember-light bg-ember-light/60 px-4 py-3 text-sm text-ember-dark">
          Synthetic sample: six made-up spots pinned on a real map (Harbor District stand-in). Search and filters work on this list.
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="font-display text-3xl text-ink">Out tonight</h1>
            <p className="text-stone-500 mt-1">Harbor District sample spots</p>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-2">
            <button 
              className={`p-2 rounded-md border ${
                viewMode === 'grid' 
                  ? 'bg-ember-light/60 border-ember-light text-ember-dark' 
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <ListFilter size={20} />
            </button>
            <button 
              className={`p-2 rounded-md border ${
                viewMode === 'map' 
                  ? 'bg-ember-light/60 border-ember-light text-ember-dark' 
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
              onClick={() => setViewMode('map')}
            >
              <Map size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for venues, cuisine, or vibes..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-ember focus:border-ember"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleVenues.map((venue) => (
              <VenueCard 
                key={venue.id} 
                venue={venue} 
                onClick={() => console.log('Venue clicked:', venue.id)} 
              />
            ))}
            {visibleVenues.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-8">
                Nothing in the sample matches that search.
              </p>
            )}
          </div>
        ) : (
          visibleVenues.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nothing in the sample matches that search.
            </p>
          ) : (
            <VenueMap venues={visibleVenues} />
          )
        )}

      </main>
    </div>
  );
};

export default DiscoverPage;