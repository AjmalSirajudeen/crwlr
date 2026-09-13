// Mock data for the CRWLR application

export const mockUsers = [
  { 
    id: 'user1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 476,
    preferences: ['Nightlife', 'Cocktails', 'Foodie']
  },
  {
    id: 'user2',
    name: 'Taylor Smith',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 325,
    preferences: ['Live Music', 'Craft Beer', 'Sports']
  },
  {
    id: 'user3',
    name: 'Jordan Lee',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 512,
    preferences: ['Dance', 'Cocktails', 'Rooftop']
  },
  {
    id: 'user4',
    name: 'Casey Rivera',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 189,
    preferences: ['Wine', 'Fine Dining', 'Jazz']
  },
  {
    id: 'user5',
    name: 'Morgan Wilson',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 644,
    preferences: ['Sports Bar', 'Pub Crawl', 'Trivia']
  }
];

export type MockUser = (typeof mockUsers)[number];

export const mockVenues = [
  {
    id: 'venue1',
    name: 'The Edison',
    type: 'Cocktail Bar',
    rating: 4.7,
    priceLevel: 3,
    image: 'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: '123 Harbor St, Downtown',
    distance: '0.3 mi',
    lat: 40.7196,
    lng: -74.0431,
    tags: ['Cocktails', 'Speakeasy', 'Live Music'],
    friendsVisited: [mockUsers[0], mockUsers[2]]
  },
  {
    id: 'venue2',
    name: 'Hopworks',
    type: 'Brewery',
    rating: 4.3,
    priceLevel: 2,
    image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: '456 Craft Ave, Midtown',
    distance: '0.7 mi',
    lat: 40.7268,
    lng: -74.0362,
    tags: ['Craft Beer', 'Gastropub', 'Outdoor Seating'],
    friendsVisited: [mockUsers[1], mockUsers[4]]
  },
  {
    id: 'venue3',
    name: 'Skyline',
    type: 'Rooftop Bar',
    rating: 4.8,
    priceLevel: 3,
    image: 'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: '789 High St, Downtown',
    distance: '0.5 mi',
    lat: 40.7172,
    lng: -74.0338,
    tags: ['Rooftop', 'Cocktails', 'Views'],
    friendsVisited: [mockUsers[2], mockUsers[3], mockUsers[0]]
  },
  {
    id: 'venue4',
    name: 'The Local',
    type: 'Sports Bar',
    rating: 4.1,
    priceLevel: 1,
    image: 'https://images.pexels.com/photos/2219028/pexels-photo-2219028.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: '321 Game St, West End',
    distance: '1.2 mi',
    lat: 40.7148,
    lng: -74.0495,
    tags: ['Sports', 'Beer', 'Wings'],
    friendsVisited: [mockUsers[1], mockUsers[4]]
  },
  {
    id: 'venue5',
    name: 'Pasta Palace',
    type: 'Restaurant',
    rating: 4.5,
    priceLevel: 2,
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: '567 Noodle Dr, East Side',
    distance: '0.9 mi',
    lat: 40.7286,
    lng: -74.0418,
    tags: ['Italian', 'Wine', 'Pasta'],
    friendsVisited: [mockUsers[3]]
  },
  {
    id: 'venue6',
    name: 'Rhythm & Beats',
    type: 'Club',
    rating: 4.2,
    priceLevel: 2,
    image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: '888 Bass Blvd, Downtown',
    distance: '0.4 mi',
    lat: 40.7214,
    lng: -74.0386,
    tags: ['Dancing', 'DJ', 'Nightlife'],
    friendsVisited: [mockUsers[2], mockUsers[0]]
  }
];

export type MockVenue = (typeof mockVenues)[number];

export const mockCrawls = [
  {
    id: 'crawl1',
    name: 'Downtown Cocktail Tour',
    date: 'Oct 15, 2025',
    time: '8:00 PM',
    area: 'Downtown',
    stops: 4,
    status: 'upcoming' as const,
    participants: [mockUsers[0], mockUsers[2], mockUsers[3]],
    creator: mockUsers[0],
    venues: [mockVenues[0], mockVenues[2], mockVenues[5]]
  },
  {
    id: 'crawl2',
    name: 'Sports Night Out',
    date: 'Oct 18, 2025',
    time: '7:00 PM',
    area: 'West End',
    stops: 3,
    status: 'upcoming' as const,
    participants: [mockUsers[1], mockUsers[4]],
    creator: mockUsers[4],
    venues: [mockVenues[3], mockVenues[1], mockVenues[0]]
  },
  {
    id: 'crawl3',
    name: 'Friday Night Fever',
    date: 'Oct 10, 2025',
    time: '9:00 PM',
    area: 'Downtown',
    stops: 5,
    status: 'completed' as const,
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3], mockUsers[4]],
    creator: mockUsers[2],
    venues: [mockVenues[5], mockVenues[0], mockVenues[2], mockVenues[4]]
  },
  {
    id: 'crawl4',
    name: 'Date Night Places',
    date: 'Oct 12, 2025',
    time: '6:30 PM',
    area: 'East Side',
    stops: 2,
    status: 'in-progress' as const,
    participants: [mockUsers[3], mockUsers[0]],
    creator: mockUsers[3],
    venues: [mockVenues[4], mockVenues[2]]
  }
];

export const mockLeaderboard = [
  {
    id: 'user5', 
    name: 'Morgan Wilson',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 644,
    position: 1
  },
  {
    id: 'user3',
    name: 'Jordan Lee',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 512,
    position: 2
  },
  {
    id: 'user1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 476,
    position: 3,
    isCurrentUser: true
  },
  {
    id: 'user2',
    name: 'Taylor Smith',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 325,
    position: 4
  },
  {
    id: 'user4',
    name: 'Casey Rivera',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 189,
    position: 5
  }
];

export const mockActivities = [
  {
    id: 'act1',
    type: 'check_in' as const,
    user: {
      id: 'user3',
      username: 'jordan',
      full_name: 'Jordan Lee',
      avatar_url: mockUsers[2].avatar,
    },
    metadata: { venue_name: 'Skyline', venue_id: 'venue3' },
    likes_count: 4,
    comments_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    liked_by_user: false,
  },
  {
    id: 'act2',
    type: 'crawl_created' as const,
    user: {
      id: 'user1',
      username: 'alex',
      full_name: 'Alex Johnson',
      avatar_url: mockUsers[0].avatar,
    },
    metadata: { crawl_name: 'Downtown Cocktail Tour', crawl_id: 'crawl1' },
    likes_count: 6,
    comments_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    liked_by_user: true,
  },
  {
    id: 'act3',
    type: 'crawl_joined' as const,
    user: {
      id: 'demo-user',
      username: 'riley',
      full_name: 'Riley Chen',
      avatar_url: mockUsers[0].avatar,
    },
    metadata: { crawl_name: 'Date Night Places', crawl_id: 'crawl4' },
    likes_count: 2,
    comments_count: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    liked_by_user: false,
  },
];

export const mockCurrentCrawl = {
  id: 'crawl-warrior',
  name: 'Weekend Warrior Tour',
  date: 'Today',
  time: 'Now',
  area: 'Downtown',
  stops: [
    {
      venue: mockVenues[0],
      time: '9:00 PM',
      status: 'completed',
      checkedInUsers: [mockUsers[0], mockUsers[2], mockUsers[3]]
    },
    {
      venue: mockVenues[2],
      time: '10:30 PM',
      status: 'current',
      checkedInUsers: [mockUsers[0], mockUsers[2]]
    },
    {
      venue: mockVenues[5],
      time: '12:00 AM',
      status: 'upcoming',
      checkedInUsers: []
    }
  ],
  participants: [mockUsers[0], mockUsers[2], mockUsers[3]],
  creator: mockUsers[0],
  status: 'in-progress' as const
};