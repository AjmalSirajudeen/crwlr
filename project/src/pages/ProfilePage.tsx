import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navigation/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import ProfileFriendsSection from '../components/ProfileFriendsSection';
import { Camera, Loader2 } from 'lucide-react';

interface Profile {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  level: number;
  points: number;
}

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

const ProfilePage = () => {
  const { user, isDemo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (!user) return;
    if (isDemo) {
      setProfile({
        username: 'riley',
        full_name: 'Riley Chen',
        avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        level: 3,
        points: 120,
      });
      setUsername('riley');
      setFullName('Riley Chen');
      setFriends([
        { friend_id: 'user1', username: 'alex', full_name: 'Alex Johnson', avatar_url: null, level: 4, points: 476 },
        { friend_id: 'user3', username: 'jordan', full_name: 'Jordan Lee', avatar_url: null, level: 5, points: 512 },
      ]);
      setFriendRequests([]);
      setLoading(false);
      return;
    }
    Promise.all([fetchProfile(), fetchFriends(), fetchFriendRequests()]).finally(() => setLoading(false));
  }, [user, isDemo]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setUsername(data.username);
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    }
  };

  const fetchFriends = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_friends', { user_id: user?.id });

      if (error) throw error;
      setFriends(data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
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
      setFriendRequests(data || []);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      setError('Failed to load friend requests');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) throw error;

      setSuccess('Profile updated successfully');
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;
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

  const handleSearchUsers = async (query: string) => {
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
      await fetchFriendRequests();
    } catch (err) {
      console.error('Error sending friend request:', err);
      setError('Failed to send friend request');
    }
  };

  // Mock recent activities (in a real app, this would come from the backend)
  const recentActivities = [
    {
      id: '1',
      type: 'venue_visit' as const,
      friendIds: friends.slice(0, 2).map(f => f.friend_id),
      venueName: 'The Edison',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '2',
      type: 'crawl_join' as const,
      friendIds: friends.slice(1, 4).map(f => f.friend_id),
      crawlName: 'Downtown Pub Crawl',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-ember" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-6">
            {/* Profile header */}
            <div className="bg-ink px-6 py-8">
              <div className="flex items-center">
                <Avatar
                  src={profile?.avatar_url || undefined}
                  alt={profile?.full_name || profile?.username}
                  size="xl"
                  className="ring-4 ring-white/30"
                />
                <div className="ml-6 text-white">
                  <h1 className="text-2xl font-bold">{profile?.full_name || profile?.username}</h1>
                  <div className="mt-1 text-amber-100">
                    Level {profile?.level} • {profile?.points} points
                  </div>
                </div>
              </div>
            </div>

            {/* Profile form */}
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
                    Avatar URL
                  </label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={saving}
                    className="flex items-center"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Friends Section */}
          <ProfileFriendsSection 
            friends={friends}
            friendRequests={friendRequests}
            recentActivities={recentActivities}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
            onSearchUsers={handleSearchUsers}
            onSendRequest={handleSendRequest}
          />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;