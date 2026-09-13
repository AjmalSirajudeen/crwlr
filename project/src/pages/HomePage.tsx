import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navigation/Navbar';
import ActivityFeed from '../components/ActivityFeed';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Users, MapPin, Trophy } from 'lucide-react';
import { mockActivities } from '../data/mockData';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user, isDemo } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo) {
      setActivities(mockActivities as any);
      setLoading(false);
      return;
    }
    fetchActivities();
    subscribeToActivities();
  }, [user, isDemo]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          user:profiles!activities_user_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          ),
          likes_count:activity_likes(count),
          liked_by_user:activity_likes!inner(user_id)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToActivities = () => {
    const subscription = supabase
      .channel('activities')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'activities'
      }, () => {
        fetchActivities();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleLike = async (activityId: string) => {
    if (isDemo) {
      setActivities((prev: any[]) =>
        prev.map((a) =>
          a.id === activityId
            ? {
                ...a,
                liked_by_user: !a.liked_by_user,
                likes_count: a.liked_by_user ? a.likes_count - 1 : a.likes_count + 1,
              }
            : a
        )
      );
      return;
    }
    try {
      const { data: existingLike } = await supabase
        .from('activity_likes')
        .select()
        .match({ activity_id: activityId, user_id: user?.id })
        .single();

      if (existingLike) {
        await supabase
          .from('activity_likes')
          .delete()
          .match({ activity_id: activityId, user_id: user?.id });
      } else {
        await supabase
          .from('activity_likes')
          .insert({ activity_id: activityId, user_id: user?.id });
      }

      await fetchActivities();
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleComment = (activityId: string) => {
    console.log('Comment on activity:', activityId);
    // Implement comment functionality
  };

  const handleShare = (activityId: string) => {
    console.log('Share activity:', activityId);
    // Implement share functionality
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-3xl text-ink">Tonight</h1>
        </div>
        {isDemo && (
          <div className="mb-4 rounded-xl border border-ember-light bg-ember-light/50 px-4 py-3 text-sm text-ember-dark">
            Harbor District demo. Synthetic spots and friends. Nothing here is a real check-in.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Quick Actions */}
          <Card className="bg-ink border-ink text-paper p-4">
            <div className="grid grid-cols-3 gap-4">
              <Link to="/discover" className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                <MapPin className="h-6 w-6 mb-2" />
                <span className="text-sm">Check In</span>
              </Link>
              <Link to="/crawls/new" className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">New Crawl</span>
              </Link>
              <Link to="/leaderboard" className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                <Trophy className="h-6 w-6 mb-2" />
                <span className="text-sm">Rewards</span>
              </Link>
            </div>
          </Card>

          {/* Activity Feed */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ink mx-auto"></div>
            </div>
          ) : error ? (
            <Card className="p-4 text-center text-red-600">
              {error}
            </Card>
          ) : activities.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
              <p className="text-gray-500">
                Follow more friends to see their activities here
              </p>
            </Card>
          ) : (
            <ActivityFeed
              activities={activities}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;