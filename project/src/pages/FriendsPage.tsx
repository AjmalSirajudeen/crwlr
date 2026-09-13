import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navigation/Navbar';
import UserSearch from '../components/UserSearch';
import FriendsList from '../components/FriendsList';
import FriendRequests from '../components/FriendRequests';
import { Users, UserPlus, Clock } from 'lucide-react';

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

const FriendsPage = () => {
  const { user, isDemo } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'add'>('friends');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo) {
      setFriends([
        { friend_id: 'user1', username: 'alex', full_name: 'Alex Johnson', avatar_url: null, level: 4, points: 476 },
        { friend_id: 'user3', username: 'jordan', full_name: 'Jordan Lee', avatar_url: null, level: 5, points: 512 },
        { friend_id: 'user5', username: 'morgan', full_name: 'Morgan Wilson', avatar_url: null, level: 6, points: 644 },
      ]);
      setRequests([]);
      setLoading(false);
      return;
    }
    fetchFriends();
    fetchFriendRequests();
  }, [user, isDemo]);

  const fetchFriends = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_friends', { user_id: user?.id });

      if (error) throw error;
      setFriends(data || []);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to load friends');
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .select(`
          id,
          sender:profiles!friend_requests_sender_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          ),
          created_at
        `)
        .eq('receiver_id', user?.id)
        .eq('status', 'pending');

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching friend requests:', err);
      setError('Failed to load friend requests');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url')
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .neq('id', user?.id)
      .limit(10);

    if (error) throw error;
    return data;
  };

  const handleSendRequest = async (receiverId: string) => {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .insert({
          sender_id: user?.id,
          receiver_id: receiverId,
          status: 'pending'
        });

      if (error) throw error;
      // Refresh the requests list
      await fetchFriendRequests();
    } catch (err) {
      console.error('Error sending friend request:', err);
      setError('Failed to send friend request');
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;
      // Refresh both friends and requests lists
      await Promise.all([fetchFriends(), fetchFriendRequests()]);
    } catch (err) {
      console.error('Error accepting friend request:', err);
      setError('Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId);

      if (error) throw error;
      await fetchFriendRequests();
    } catch (err) {
      console.error('Error rejecting friend request:', err);
      setError('Failed to reject friend request');
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .delete()
        .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user?.id})`);

      if (error) throw error;
      await fetchFriends();
    } catch (err) {
      console.error('Error removing friend:', err);
      setError('Failed to remove friend');
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Friends</h1>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`
                  py-4 px-6 border-b-2 font-medium text-sm
                  ${activeTab === 'friends'
                    ? 'border-ember text-ember'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
                onClick={() => setActiveTab('friends')}
              >
                <Users size={18} className="inline-block mr-2" />
                Friends ({friends.length})
              </button>
              <button
                className={`
                  py-4 px-6 border-b-2 font-medium text-sm
                  ${activeTab === 'requests'
                    ? 'border-ember text-ember'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
                onClick={() => setActiveTab('requests')}
              >
                <Clock size={18} className="inline-block mr-2" />
                Requests ({requests.length})
              </button>
              <button
                className={`
                  py-4 px-6 border-b-2 font-medium text-sm
                  ${activeTab === 'add'
                    ? 'border-ember text-ember'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
                onClick={() => setActiveTab('add')}
              >
                <UserPlus size={18} className="inline-block mr-2" />
                Add Friends
              </button>
            </nav>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ink mx-auto"></div>
              </div>
            ) : (
              <>
                {activeTab === 'friends' && (
                  <FriendsList
                    friends={friends}
                    onRemoveFriend={handleRemoveFriend}
                  />
                )}
                
                {activeTab === 'requests' && (
                  <FriendRequests
                    requests={requests}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                  />
                )}
                
                {activeTab === 'add' && (
                  <UserSearch
                    onSearch={handleSearch}
                    onSendRequest={handleSendRequest}
                    existingFriends={new Set(friends.map(f => f.friend_id))}
                    pendingRequests={new Set(requests.map(r => r.sender.id))}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FriendsPage;