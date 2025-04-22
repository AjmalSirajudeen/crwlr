import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import LeaderboardCard from '../components/LeaderboardCard';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { mockLeaderboard, mockUsers, mockCrawls } from '../data/mockData';
import { Trophy, Award, Calendar, Siren as Fire, TrendingUp } from 'lucide-react';

const LeaderboardPage = () => {
  const [user] = useState(mockUsers[0]);
  const [leaderboardData] = useState(mockLeaderboard);
  
  const handleLogin = () => {
    console.log('Login clicked');
  };

  const userPosition = leaderboardData.find(u => u.isCurrentUser)?.position || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={handleLogin} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">Track your points and ranking</p>
        </div>

        {/* User stats card */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                size="lg"
                className="ring-4 ring-white/30"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center mt-1">
                  <Badge variant="primary" className="bg-white/20 text-white">
                    Rank #{userPosition}
                  </Badge>
                  <span className="ml-3 flex items-center">
                    <Award className="mr-1" size={16} />
                    {user.points} points
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white/90">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Trophy size={16} className="mr-1" />
                  <span className="text-sm font-medium">Crawls Completed</span>
                </div>
                <p className="text-2xl font-bold">12</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm font-medium">Check-ins</span>
                </div>
                <p className="text-2xl font-bold">37</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Fire size={16} className="mr-1" />
                  <span className="text-sm font-medium">Streak</span>
                </div>
                <p className="text-2xl font-bold">3 weeks</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm font-medium">This Month</span>
                </div>
                <p className="text-2xl font-bold">+125 pts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main leaderboard */}
          <div className="lg:col-span-2">
            <LeaderboardCard
              title="Global Leaderboard"
              users={leaderboardData}
              className="h-full"
            />
          </div>
          
          {/* Weekly challenge */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full">
              <div className="p-4 border-b">
                <h3 className="font-bold text-lg flex items-center">
                  <Fire className="mr-2 text-orange-500" />
                  This Week's Challenge
                </h3>
              </div>
              
              <div className="p-4">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-amber-800 mb-1">Party Hopper</h4>
                  <p className="text-amber-700 text-sm mb-2">
                    Complete a crawl with at least 4 venues in one night
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="warning">
                      +100 bonus points
                    </Badge>
                    <span className="text-sm font-medium text-amber-800">3 days left</span>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-700 mb-2">Progress</h4>
                <div className="space-y-3">
                  {mockCrawls.filter(c => c.stops >= 3).slice(0, 3).map((crawl, index) => (
                    <div key={crawl.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700 mr-2">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">{crawl.name}</p>
                          <p className="text-xs text-gray-500">{crawl.date}</p>
                        </div>
                      </div>
                      <span className="text-sm">{crawl.stops} stops</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement badges */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Achievements</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'Early Bird', description: 'Joined during beta', icon: '🐣', unlocked: true },
              { name: 'Social Butterfly', description: '10 crawls with friends', icon: '🦋', unlocked: true },
              { name: 'Night Owl', description: 'Completed a crawl after 2am', icon: '🦉', unlocked: true },
              { name: 'Explorer', description: 'Visited 20 unique venues', icon: '🧭', unlocked: false },
              { name: 'Photographer', description: 'Posted 15 photos', icon: '📸', unlocked: true },
              { name: 'VIP', description: 'Visited an exclusive venue', icon: '🌟', unlocked: false },
              { name: 'Globetrotter', description: 'Crawls in 3 different areas', icon: '🌎', unlocked: true },
              { name: 'Party Starter', description: 'Created 5 crawls', icon: '🎉', unlocked: false },
              { name: 'Local Legend', description: 'Top 10 in an area', icon: '👑', unlocked: false },
              { name: 'Trendsetter', description: 'First to visit a new venue', icon: '🔥', unlocked: true },
            ].map((badge, index) => (
              <div 
                key={index} 
                className={`
                  p-4 rounded-lg text-center
                  ${badge.unlocked 
                    ? 'bg-white shadow-sm' 
                    : 'bg-gray-100 opacity-60'}
                `}
              >
                <div className={`
                  text-3xl mx-auto mb-2
                  ${!badge.unlocked && 'grayscale'}
                `}>
                  {badge.icon}
                </div>
                <h4 className="font-medium text-gray-800 mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
                {!badge.unlocked && (
                  <Badge variant="default" className="mt-2 mx-auto text-xs">
                    Locked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;