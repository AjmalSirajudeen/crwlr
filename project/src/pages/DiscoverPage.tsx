import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import FilterBar from '../components/FilterBar';
import VenueCard from '../components/VenueCard';
import { mockVenues, mockUsers } from '../data/mockData';
import Button from '../components/ui/Button';
import { Search, Map, ListFilter } from 'lucide-react';

const DiscoverPage = () => {
  const [user] = useState(mockUsers[0]);
  const [venues] = useState(mockVenues);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters);
    // Would filter venues based on the selected filters
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={handleLogin} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover Places</h1>
            <p className="text-gray-600 mt-1">Find the best spots around you</p>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-2">
            <button 
              className={`p-2 rounded-md border ${
                viewMode === 'grid' 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <ListFilter size={20} />
            </button>
            <button 
              className={`p-2 rounded-md border ${
                viewMode === 'map' 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <VenueCard 
                key={venue.id} 
                venue={venue} 
                onClick={() => console.log('Venue clicked:', venue.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <Map size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">Map view would be displayed here with venue pins</p>
              <p className="text-gray-500 text-sm mt-1">Integrates with Google Maps or Mapbox</p>
              <Button variant="primary" className="mt-3">
                Enable Location
              </Button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DiscoverPage;