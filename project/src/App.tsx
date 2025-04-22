import React, { useState } from 'react';
import DiscoverPage from './pages/DiscoverPage';
import CrawlsPage from './pages/CrawlsPage';
import CrawlDetailPage from './pages/CrawlDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'discover' | 'crawls' | 'crawl-detail' | 'leaderboard'>('discover');

  const renderPage = () => {
    switch (currentPage) {
      case 'discover':
        return <DiscoverPage />;
      case 'crawls':
        return <CrawlsPage />;
      case 'crawl-detail':
        return <CrawlDetailPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      
      {/* Mobile navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 sm:hidden">
        <div className="flex justify-around">
          <button
            className={`flex flex-col items-center p-2 ${
              currentPage === 'discover' ? 'text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentPage('discover')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            <span className="text-xs mt-1">Discover</span>
          </button>
          
          <button
            className={`flex flex-col items-center p-2 ${
              currentPage === 'crawls' || currentPage === 'crawl-detail' ? 'text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentPage('crawls')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <span className="text-xs mt-1">Crawls</span>
          </button>
          
          <button
            className={`flex flex-col items-center p-2 ${
              currentPage === 'leaderboard' ? 'text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentPage('leaderboard')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span className="text-xs mt-1">Leaderboard</span>
          </button>
          
          <button
            className="flex flex-col items-center p-2 text-gray-500"
            onClick={() => console.log('Profile clicked')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;