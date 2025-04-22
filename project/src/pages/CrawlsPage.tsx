import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Button from '../components/ui/Button';
import CrawlCard from '../components/CrawlCard';
import { mockCrawls, mockUsers } from '../data/mockData';
import { Plus, CalendarDays, MapPin, Clock, Calendar } from 'lucide-react';

const CrawlsPage = () => {
  const [user] = useState(mockUsers[0]);
  const [crawls] = useState(mockCrawls);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'created'>('upcoming');

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleCreateCrawl = () => {
    console.log('Create crawl clicked');
  };

  const handleViewCrawl = (id: string) => {
    console.log('View crawl:', id);
  };

  const handleJoinCrawl = (id: string) => {
    console.log('Join crawl:', id);
  };

  // Filter crawls based on active tab
  const filteredCrawls = crawls.filter(crawl => {
    if (activeTab === 'upcoming') {
      return crawl.status === 'upcoming' || crawl.status === 'in-progress';
    } else if (activeTab === 'past') {
      return crawl.status === 'completed';
    } else {
      return crawl.creator.id === user.id;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={handleLogin} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Crawls</h1>
            <p className="text-gray-600 mt-1">Plan and join multi-stop outings</p>
          </div>

          <Button 
            variant="primary" 
            className="mt-4 md:mt-0"
            onClick={handleCreateCrawl}
          >
            <Plus size={18} className="mr-1" />
            Create Crawl
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${activeTab === 'upcoming'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${activeTab === 'past'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
          <button
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${activeTab === 'created'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('created')}
          >
            Created by me
          </button>
        </div>

        {filteredCrawls.length === 0 ? (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <CalendarDays className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No crawls found</h3>
            <p className="text-gray-500 mb-4">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming crawls planned." 
                : activeTab === 'past' 
                  ? "You haven't been on any crawls yet."
                  : "You haven't created any crawls yet."}
            </p>
            <Button variant="primary" onClick={handleCreateCrawl}>
              Create a Crawl
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrawls.map(crawl => (
              <CrawlCard
                key={crawl.id}
                crawl={crawl}
                onView={handleViewCrawl}
                onJoin={activeTab === 'upcoming' ? handleJoinCrawl : undefined}
              />
            ))}
          </div>
        )}

        {activeTab === 'upcoming' && filteredCrawls.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-indigo-800 mb-3">Start a new crawl</h3>
            <p className="text-indigo-700 mb-4">
              Create a custom crawl by choosing venues and inviting friends
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex p-3 bg-white rounded-lg shadow-sm">
                <Calendar className="h-6 w-6 text-indigo-500 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-800">Pick a date</h4>
                  <p className="text-sm text-gray-500">Set when your crawl will happen</p>
                </div>
              </div>
              <div className="flex p-3 bg-white rounded-lg shadow-sm">
                <MapPin className="h-6 w-6 text-indigo-500 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-800">Choose venues</h4>
                  <p className="text-sm text-gray-500">Select your favorite spots</p>
                </div>
              </div>
              <div className="flex p-3 bg-white rounded-lg shadow-sm">
                <Clock className="h-6 w-6 text-indigo-500 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-800">Set timings</h4>
                  <p className="text-sm text-gray-500">Plan your perfect evening</p>
                </div>
              </div>
            </div>
            <Button variant="primary" onClick={handleCreateCrawl}>
              Create New Crawl
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CrawlsPage;