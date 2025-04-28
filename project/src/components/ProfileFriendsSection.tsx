import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './ui/Avatar';
import Card, { CardHeader, CardContent } from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { Users, ArrowRight, UserPlus, Clock, Search, Check, X } from 'lucide-react';

interface Friend {
  friend_id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  level: number;
  points: number;
}

interface FriendRequest {
  id: string;
  sender: {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  created_at: string;
}

interface Activity {
  id: string;
  type: 'venue_visit' | 'crawl_join';
  friendIds: string[];
  venueName?: string;
  crawlName?: string;
  timestamp: string;
}

interface ProfileFriendsSectionProps {
  friends: Friend[];
  friendRequests: FriendRequest[];
  recentActivities?: Activity[];
  onAcceptRequest: (requestId: string) => Promise<void>;
  onRejectRequest: (requestId: string) => Promise<void>;
  onSearchUsers: (query: string) => Promise<any[]>;
  onSendRequest: (userId: string) => Promise<void>;
}

const ProfileFriendsSection = ({
  friends,
  friendRequests,
  recentActivities = [],
  onAcceptRequest,
  onRejectRequest,
  onSearchUsers,
  onSendRequest
}: ProfileFriendsSectionProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'add'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get friend lookup map for activities
  const friendMap = new Map(friends.map(f => [f.friend_id, f]));
  const existingFriendIds = new Set(friends.map(f => f.friend_id));
  const pendingRequestIds = new Set(friendRequests.map(r => r.sender.id));

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setError(null);

    try {
      const results = await onSearchUsers(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search users');
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Friends Overview Card */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-semibold">Friends</h2>
            </div>
            <Link 
              to="/friends" 
              className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="flex border-b">
            <button
              className={`
                py-2 px-4 border-b-2 font-medium text-sm
                ${activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`
                py-2 px-4 border-b-2 font-medium text-sm flex items-center
                ${activeTab === 'requests'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
              onClick={() => setActiveTab('requests')}
            >
              Requests
              {friendRequests.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
                  {friendRequests.length}
                </span>
              )}
            </button>
            <button
              className={`
                py-2 px-4 border-b-2 font-medium text-sm
                ${activeTab === 'add'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
              onClick={() => setActiveTab('add')}
            >
              Add Friends
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {activeTab === 'overview' && (
            <div>
              <div className="mb-4">
                <p className="text-gray-600">
                  {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
                </p>
              </div>
              
              {/* Friend Avatars Grid */}
              <div className="grid grid-cols-6 gap-2">
                {friends.slice(0, 6).map((friend) => (
                  <Avatar
                    key={friend.friend_id}
                    src={friend.avatar_url || undefined}
                    alt={friend.full_name || friend.username}
                    size="lg"
                    className="ring-2 ring-white hover:ring-indigo-500 transition-all cursor-pointer"
                  />
                ))}
              </div>

              {/* Recent Activities */}
              {recentActivities.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium text-gray-900">Recent Activities</h3>
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex -space-x-2">
                        {activity.friendIds.slice(0, 3).map((friendId) => {
                          const friend = friendMap.get(friendId);
                          return friend ? (
                            <Avatar
                              key={friendId}
                              src={friend.avatar_url || undefined}
                              alt={friend.full_name || friend.username}
                              size="sm"
                              className="ring-2 ring-white"
                            />
                          ) : null;
                        })}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {activity.type === 'venue_visit' ? (
                            <>Visited <span className="font-medium">{activity.venueName}</span></>
                          ) : (
                            <>Joined crawl <span className="font-medium">{activity.crawlName}</span></>
                          )}
                          {' with '}
                          {activity.friendIds.slice(0, 2).map((friendId, idx) => {
                            const friend = friendMap.get(friendId);
                            return friend ? (
                              <span key={friendId}>
                                {idx > 0 && ' and '}
                                <span className="font-medium">
                                  {friend.full_name || friend.username}
                                </span>
                              </span>
                            ) : null;
                          })}
                          {activity.friendIds.length > 2 && ` and ${activity.friendIds.length - 2} others`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {friendRequests.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No pending friend requests</p>
                </div>
              ) : (
                friendRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar
                        src={request.sender.avatar_url || undefined}
                        alt={request.sender.full_name || request.sender.username}
                        size="md"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {request.sender.full_name || request.sender.username}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Sent {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAcceptRequest(request.id)}
                        className="text-green-600"
                      >
                        <Check size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRejectRequest(request.id)}
                        className="text-rose-600"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'add' && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search users by name or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search size={20} />
                </button>
              </div>

              {error && (
                <div className="text-rose-600 text-sm">{error}</div>
              )}

              <div className="space-y-2">
                {searching ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                  </div>
                ) : (
                  searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar
                          src={user.avatar_url || undefined}
                          alt={user.full_name || user.username}
                          size="md"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {user.full_name || user.username}
                          </h3>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                      </div>

                      <Button
                        variant={existingFriendIds.has(user.id) ? 'ghost' : 'primary'}
                        size="sm"
                        disabled={existingFriendIds.has(user.id) || pendingRequestIds.has(user.id)}
                        onClick={() => onSendRequest(user.id)}
                      >
                        {existingFriendIds.has(user.id) ? (
                          'Friends'
                        ) : pendingRequestIds.has(user.id) ? (
                          'Request Sent'
                        ) : (
                          <>
                            <UserPlus size={16} className="mr-1" />
                            Add Friend
                          </>
                        )}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileFriendsSection;