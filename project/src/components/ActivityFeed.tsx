import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Avatar from './ui/Avatar';
import Card from './ui/Card';
import Button from './ui/Button';
import {
  MapPin,
  Users,
  Trophy,
  Heart,
  MessageSquare,
  Share2,
  Camera
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'check_in' | 'crawl_created' | 'crawl_joined' | 'friend_added' | 'venue_rated' | 'photo_posted' | 'achievement_earned';
  user: {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  metadata: {
    venue_name?: string;
    venue_id?: string;
    crawl_name?: string;
    crawl_id?: string;
    friend_name?: string;
    friend_id?: string;
    achievement_name?: string;
    photo_url?: string;
    rating?: number;
  };
  likes_count: number;
  comments_count: number;
  created_at: string;
  liked_by_user: boolean;
}

interface ActivityFeedProps {
  activities: Activity[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
  onShare: (activityId: string) => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onLike,
  onComment,
  onShare
}) => {
  const renderActivityContent = (activity: Activity) => {
    const { type, metadata, user } = activity;

    switch (type) {
      case 'check_in':
        return (
          <div>
            <p className="mb-2">
              <span className="font-medium">{user.full_name || user.username}</span>
              {' checked in at '}
              <span className="font-medium text-indigo-600">{metadata.venue_name}</span>
            </p>
            {metadata.photo_url && (
              <img
                src={metadata.photo_url}
                alt="Check-in"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
        );

      case 'crawl_created':
        return (
          <div>
            <p>
              <span className="font-medium">{user.full_name || user.username}</span>
              {' created a new crawl: '}
              <span className="font-medium text-indigo-600">{metadata.crawl_name}</span>
            </p>
          </div>
        );

      case 'crawl_joined':
        return (
          <div>
            <p>
              <span className="font-medium">{user.full_name || user.username}</span>
              {' joined the crawl '}
              <span className="font-medium text-indigo-600">{metadata.crawl_name}</span>
            </p>
          </div>
        );

      case 'friend_added':
        return (
          <div>
            <p>
              <span className="font-medium">{user.full_name || user.username}</span>
              {' became friends with '}
              <span className="font-medium text-indigo-600">{metadata.friend_name}</span>
            </p>
          </div>
        );

      case 'venue_rated':
        return (
          <div>
            <p>
              <span className="font-medium">{user.full_name || user.username}</span>
              {' rated '}
              <span className="font-medium text-indigo-600">{metadata.venue_name}</span>
              {' '}
              <span className="text-yellow-500">{'★'.repeat(metadata.rating || 0)}</span>
            </p>
          </div>
        );

      case 'photo_posted':
        return (
          <div>
            <p className="mb-2">
              <span className="font-medium">{user.full_name || user.username}</span>
              {' posted a photo at '}
              <span className="font-medium text-indigo-600">{metadata.venue_name}</span>
            </p>
            <img
              src={metadata.photo_url}
              alt="Posted photo"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        );

      case 'achievement_earned':
        return (
          <div>
            <p>
              <span className="font-medium">{user.full_name || user.username}</span>
              {' earned the achievement '}
              <span className="font-medium text-indigo-600">{metadata.achievement_name}</span>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'check_in':
        return <MapPin className="text-green-500" />;
      case 'crawl_created':
      case 'crawl_joined':
        return <Users className="text-indigo-500" />;
      case 'friend_added':
        return <Users className="text-blue-500" />;
      case 'venue_rated':
        return <Trophy className="text-yellow-500" />;
      case 'photo_posted':
        return <Camera className="text-rose-500" />;
      case 'achievement_earned':
        return <Trophy className="text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden">
          <div className="p-4">
            {/* Activity header */}
            <div className="flex items-center mb-4">
              <Avatar
                src={activity.user.avatar_url || undefined}
                alt={activity.user.full_name || activity.user.username}
                size="md"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium">{activity.user.full_name || activity.user.username}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  {getActivityIcon(activity.type)}
                  <span className="ml-1">
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                  </span>
                </p>
              </div>
            </div>

            {/* Activity content */}
            {renderActivityContent(activity)}

            {/* Activity actions */}
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike(activity.id)}
                  className={activity.liked_by_user ? 'text-rose-600' : 'text-gray-600'}
                >
                  <Heart
                    size={18}
                    className={activity.liked_by_user ? 'fill-current' : ''}
                  />
                  <span className="ml-1">{activity.likes_count}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onComment(activity.id)}
                  className="text-gray-600"
                >
                  <MessageSquare size={18} />
                  <span className="ml-1">{activity.comments_count}</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(activity.id)}
                className="text-gray-600"
              >
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ActivityFeed;