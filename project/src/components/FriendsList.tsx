import React from 'react';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { UserMinus, MessageSquare } from 'lucide-react';

interface Friend {
  friend_id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  level: number;
  points: number;
}

interface FriendsListProps {
  friends: Friend[];
  onRemoveFriend: (friendId: string) => void;
  onMessage?: (friendId: string) => void;
}

const FriendsList = ({ friends, onRemoveFriend, onMessage }: FriendsListProps) => {
  return (
    <div className="space-y-4">
      {friends.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No friends yet</p>
        </div>
      ) : (
        friends.map((friend) => (
          <div
            key={friend.friend_id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Avatar
                src={friend.avatar_url || undefined}
                alt={friend.full_name || friend.username}
                size="md"
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {friend.full_name || friend.username}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Level {friend.level}</span>
                  <span>•</span>
                  <span>{friend.points} points</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {onMessage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMessage(friend.friend_id)}
                  className="text-gray-600"
                >
                  <MessageSquare size={18} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFriend(friend.friend_id)}
                className="text-rose-600"
              >
                <UserMinus size={18} />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendsList;