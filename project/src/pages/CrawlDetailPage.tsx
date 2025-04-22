import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import CheckInCard from '../components/CheckInCard';
import { mockCurrentCrawl, mockUsers } from '../data/mockData';
import { 
  Share2, 
  Users, 
  MessageSquare, 
  Map as MapIcon, 
  Calendar, 
  Clock,
  Navigation
} from 'lucide-react';

const CrawlDetailPage = () => {
  const [user] = useState(mockUsers[0]);
  const [crawl] = useState(mockCurrentCrawl);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleShareCrawl = () => {
    console.log('Share crawl clicked');
  };

  const handleCheckIn = (venueId: string) => {
    console.log('Check in at venue:', venueId);
  };

  const handlePostPhoto = (venueId: string) => {
    console.log('Post photo at venue:', venueId);
  };

  const tabs = [
    { name: 'Itinerary', icon: <Navigation size={18} /> },
    { name: 'Group', icon: <Users size={18} /> },
    { name: 'Chat', icon: <MessageSquare size={18} /> },
    { name: 'Map', icon: <MapIcon size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={handleLogin} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Crawl header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between relative z-10">
            <div>
              <Badge variant="primary" className="bg-white/20 text-white mb-2">
                In Progress
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{crawl.name}</h1>
              
              <div className="flex flex-wrap items-center text-white/90 mb-4 gap-y-1">
                <div className="flex items-center mr-4">
                  <Calendar size={16} className="mr-1" />
                  <span>{crawl.date}</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock size={16} className="mr-1" />
                  <span>{crawl.time}</span>
                </div>
                <div className="flex items-center">
                  <MapIcon size={16} className="mr-1" />
                  <span>{crawl.area}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {crawl.participants.slice(0, 4).map(participant => (
                    <Avatar
                      key={participant.id}
                      src={participant.avatar}
                      alt={participant.name}
                      size="sm"
                      className="ring-2 ring-indigo-600"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {crawl.participants.length} participants
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleShareCrawl}
              >
                <Share2 size={18} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              className={`
                flex items-center py-3 px-4 border-b-2 font-medium text-sm
                ${activeTabIndex === index
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              onClick={() => setActiveTabIndex(index)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mb-6">
          {/* Itinerary tab */}
          {activeTabIndex === 0 && (
            <div className="space-y-6">
              {crawl.stops.map((stop, index) => (
                <div key={stop.venue.id} className="relative">
                  {/* Timeline connector */}
                  {index < crawl.stops.length - 1 && (
                    <div className="absolute left-6 top-36 bottom-0 w-0.5 bg-indigo-200" />
                  )}
                  
                  <div className="flex items-start">
                    <div className={`
                      flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full mr-4
                      ${stop.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        stop.status === 'current' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-gray-100 text-gray-500'}
                    `}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <p className="text-sm font-medium text-gray-500">{stop.time}</p>
                      </div>
                      
                      <CheckInCard
                        venue={stop.venue}
                        isCurrentStop={stop.status === 'current'}
                        hasCheckedIn={stop.checkedInUsers.some(u => u.id === user.id)}
                        friendsCheckedIn={stop.checkedInUsers.map(u => ({
                          ...u,
                          time: '30m ago'
                        }))}
                        onCheckIn={() => handleCheckIn(stop.venue.id)}
                        onPostPhoto={() => handlePostPhoto(stop.venue.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Group tab */}
          {activeTabIndex === 1 && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="font-medium text-lg mb-4">Participants</h3>
              <div className="space-y-4">
                {crawl.participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar 
                        src={participant.avatar} 
                        alt={participant.name} 
                        size="md" 
                        online={true} 
                      />
                      <div className="ml-3">
                        <div className="font-medium">
                          {participant.name}
                          {participant.id === user.id && (
                            <span className="text-indigo-600 text-sm ml-1">(You)</span>
                          )}
                          {participant.id === crawl.creator.id && (
                            <Badge variant="primary" className="ml-2 text-xs">Creator</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last active: 2m ago
                        </div>
                      </div>
                    </div>
                    <Badge variant="success">Checked In</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat tab */}
          {activeTabIndex === 2 && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden h-[500px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-medium">Crawl Group Chat</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start">
                  <Avatar 
                    src={crawl.participants[0].avatar} 
                    alt={crawl.participants[0].name} 
                    size="sm" 
                  />
                  <div className="ml-2 bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-xs">
                    <p className="text-sm">
                      I just arrived at The Edison! It's getting busy, try to come soon!
                    </p>
                    <span className="text-xs text-gray-500 mt-1">8:45 PM</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Avatar 
                    src={crawl.participants[2].avatar} 
                    alt={crawl.participants[2].name} 
                    size="sm" 
                  />
                  <div className="ml-2 bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-xs">
                    <p className="text-sm">
                      On my way! About 5 minutes out.
                    </p>
                    <span className="text-xs text-gray-500 mt-1">8:47 PM</span>
                  </div>
                </div>
                
                <div className="flex items-start justify-end">
                  <div className="mr-2 bg-indigo-100 rounded-lg rounded-tr-none p-3 max-w-xs">
                    <p className="text-sm">
                      Just checked in! I'm at the bar, ordered some drinks already.
                    </p>
                    <span className="text-xs text-gray-500 mt-1">8:52 PM</span>
                  </div>
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name} 
                    size="sm" 
                  />
                </div>
              </div>
              
              <div className="border-t p-3">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Map tab */}
          {activeTabIndex === 3 && (
            <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <MapIcon size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Map view with crawl route and current locations</p>
                <p className="text-gray-500 text-sm mt-1">Google Maps integration</p>
                <Button variant="primary" className="mt-3">
                  View Directions
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CrawlDetailPage;