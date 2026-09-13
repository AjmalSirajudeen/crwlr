import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Button from '../components/ui/Button';
import CrawlCard from '../components/CrawlCard';
import { listCrawls, toCardCrawl } from '../data/crawlStore';
import { Plus, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CrawlsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [crawls] = useState(() => listCrawls().map(toCardCrawl));
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'created'>('upcoming');

  const handleCreateCrawl = () => {
    navigate('/crawls/new');
  };

  const handleViewCrawl = (id: string) => {
    navigate(`/crawls/${id}`);
  };

  const filteredCrawls = crawls.filter(crawl => {
    if (activeTab === 'upcoming') {
      return crawl.status === 'upcoming' || crawl.status === 'in-progress';
    } else if (activeTab === 'past') {
      return crawl.status === 'completed';
    } else {
      return crawl.creator.id === user?.id;
    }
  });

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="font-display text-3xl text-ink">Crawls</h1>
            <p className="text-gray-600 mt-1">Your nights, strung together</p>
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
                ? 'border-ink text-ember'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
            <span className="ml-1 text-xs text-gray-400">
              {crawls.filter((c) => c.status === 'upcoming' || c.status === 'in-progress').length}
            </span>
          </button>
          <button
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${activeTab === 'past'
                ? 'border-ink text-ember'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('past')}
          >
            Past
            <span className="ml-1 text-xs text-gray-400">
              {crawls.filter((c) => c.status === 'completed').length}
            </span>
          </button>
          <button
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${activeTab === 'created'
                ? 'border-ink text-ember'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('created')}
          >
            Mine
            <span className="ml-1 text-xs text-gray-400">
              {crawls.filter((c) => c.creator.id === user?.id).length}
            </span>
          </button>
        </div>

        {filteredCrawls.length === 0 ? (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-ember-light flex items-center justify-center mb-4">
              <CalendarDays className="h-6 w-6 text-ember" />
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
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CrawlsPage;