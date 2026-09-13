import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import CheckInCard from '../components/CheckInCard';
import { mockCurrentCrawl, mockUsers, mockVenues } from '../data/mockData';
import CrawlRouteMap from '../components/CrawlRouteMap';
import { getCrawl, personById } from '../data/crawlStore';
import { optimizeRoute } from '../lib/route';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Share2, 
  Users, 
  MessageSquare, 
  Map as MapIcon, 
  Calendar, 
  Clock,
  Navigation
} from 'lucide-react';

type DemoUser = (typeof mockUsers)[number];

type ChatMessage = {
  id: string;
  from: DemoUser;
  text: string;
  time: string;
  mine: boolean;
};

function seedChat(user: DemoUser, participants: DemoUser[], firstStopName?: string): ChatMessage[] {
  const others = participants.filter((p) => p.id !== user.id);
  const first = firstStopName ?? 'the first stop';
  const messages: ChatMessage[] = [];

  if (others[0]) {
    messages.push({
      id: 'seed-1',
      from: others[0],
      text: `I just arrived at ${first}! It's getting busy, try to come soon!`,
      time: '8:45 PM',
      mine: false,
    });
  }
  if (others[1]) {
    messages.push({
      id: 'seed-2',
      from: others[1],
      text: 'On my way! About 5 minutes out.',
      time: '8:47 PM',
      mine: false,
    });
  }
  if (others.length > 0) {
    messages.push({
      id: 'seed-3',
      from: user,
      text: "Just checked in! I'm at the bar, ordered some drinks already.",
      time: '8:52 PM',
      mine: true,
    });
  }

  return messages;
}

function CrawlChat({
  user,
  participants,
  firstStopName,
}: {
  user: DemoUser;
  participants: DemoUser[];
  firstStopName?: string;
}) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    seedChat(user, participants, firstStopName)
  );

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: user,
        text,
        time: 'Now',
        mine: true,
      },
    ]);
    setDraft('');
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden h-[500px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Crawl Group Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            Demo chat for this crawl. Type below to add a message in this browser.
          </p>
        )}
        {messages.map((message) =>
          message.mine ? (
            <div key={message.id} className="flex items-start justify-end">
              <div className="mr-2 bg-ember-light rounded-lg rounded-tr-none p-3 max-w-xs">
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-gray-500 mt-1">{message.time}</span>
              </div>
              <Avatar src={message.from.avatar} alt={message.from.name} size="sm" />
            </div>
          ) : (
            <div key={message.id} className="flex items-start">
              <Avatar src={message.from.avatar} alt={message.from.name} size="sm" />
              <div className="ml-2 bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-xs">
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-gray-500 mt-1">{message.time}</span>
              </div>
            </div>
          )
        )}
      </div>

      <div className="border-t p-3">
        <div className="flex">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ember"
          />
          <button
            type="button"
            onClick={handleSend}
            className="bg-ink text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const CrawlDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const user = personById(authUser?.id ?? mockUsers[0].id);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const stored = id ? getCrawl(id) : undefined;
  const planned = stored
    ? optimizeRoute(
        stored.venueIds
          .map((vid) => mockVenues.find((v) => v.id === vid))
          .filter(Boolean) as typeof mockVenues,
        stored.time
      )
    : [];
  const crawl = stored
    ? {
        ...stored,
        participants: stored.participantIds.map(personById),
        creator: personById(stored.creatorId),
        stops: stored.venueIds
          .map((vid, index) => {
            const venue = mockVenues.find((v) => v.id === vid);
            if (!venue) return null;
            const warrior =
              stored.id === mockCurrentCrawl.id
                ? mockCurrentCrawl.stops.find((s) => s.venue.id === vid)
                : undefined;
            return {
              venue,
              time:
                warrior?.time ??
                planned[index]?.estimated_arrival ??
                (index === 0 ? stored.time : 'Later'),
              status:
                warrior?.status ??
                (index === 0 ? 'current' : 'upcoming'),
              checkedInUsers: warrior?.checkedInUsers ?? [],
            };
          })
          .filter(Boolean) as typeof mockCurrentCrawl.stops,
      }
    : mockCurrentCrawl;

  if (id && !stored && id !== mockCurrentCrawl.id) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-600 mb-4">That crawl is not in this demo.</p>
          <Button variant="primary" onClick={() => navigate('/crawls')}>
            Back to crawls
          </Button>
        </main>
      </div>
    );
  }
  
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
    <div className="min-h-screen bg-paper">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Crawl header */}
        <div className="bg-ink rounded-xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between relative z-10">
            <div>
              <Badge variant="primary" className="bg-white/20 text-white mb-2">
                {crawl.status === 'in-progress'
                  ? 'In Progress'
                  : crawl.status === 'completed'
                    ? 'Done'
                    : 'Upcoming'}
              </Badge>
              <h1 className="font-display text-3xl mb-2">{crawl.name}</h1>
              
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
                      className="ring-2 ring-ink"
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
                  ? 'border-ink text-ember'
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
              <div>
                <h3 className="font-medium text-lg mb-3">Route</h3>
                <CrawlRouteMap stops={crawl.stops} />
                <p className="text-sm text-gray-500 mt-2">
                  {crawl.stops.map((s, i) => `${i + 1} ${s.venue.name}`).join(' → ')}
                </p>
              </div>
              {crawl.stops.map((stop, index) => (
                <div key={stop.venue.id} className="relative">
                  {/* Timeline connector */}
                  {index < crawl.stops.length - 1 && (
                    <div className="absolute left-6 top-36 bottom-0 w-0.5 bg-ember-light" />
                  )}
                  
                  <div className="flex items-start">
                    <div className={`
                      flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full mr-4
                      ${stop.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        stop.status === 'current' ? 'bg-ember-light text-ember-dark' :
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
                            <span className="text-ember text-sm ml-1">(You)</span>
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
            <CrawlChat
              user={user}
              participants={crawl.participants}
              firstStopName={crawl.stops[0]?.venue.name}
            />
          )}

          {/* Map tab */}
          {activeTabIndex === 3 && (
            <div>
              <CrawlRouteMap stops={crawl.stops} />
              <p className="text-sm text-gray-500 mt-2">
                Numbered stops in order. Green = done, ember = now, gray = up next.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CrawlDetailPage;