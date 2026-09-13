import React from 'react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Avatar from './ui/Avatar';
import { MapPin, Clock, Award, Camera, ThumbsUp } from 'lucide-react';

type CheckInCardProps = {
  venue: {
    id: string;
    name: string;
    address: string;
    image?: string;
  };
  isCurrentStop?: boolean;
  hasCheckedIn?: boolean;
  friendsCheckedIn?: Array<{
    id: string;
    name: string;
    avatar?: string;
    time: string;
  }>;
  onCheckIn: () => void;
  onPostPhoto: () => void;
};

const CheckInCard = ({
  venue,
  isCurrentStop = false,
  hasCheckedIn = false,
  friendsCheckedIn = [],
  onCheckIn,
  onPostPhoto
}: CheckInCardProps) => {
  return (
    <div className={`
      border rounded-xl overflow-hidden transition-all duration-300
      ${isCurrentStop ? 'border-ember shadow-md' : 'border-gray-200'}
    `}>
      <div className="relative h-32">
        <img
          src={venue.image || 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg'}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status badge */}
        <div className="absolute top-2 right-2">
          {isCurrentStop && (
            <Badge variant="primary" className="animate-pulse">Current Stop</Badge>
          )}
          {hasCheckedIn && (
            <Badge variant="success" className="flex items-center">
              <ThumbsUp size={12} className="mr-1" />
              Checked In
            </Badge>
          )}
        </div>
        
        {/* Venue details */}
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-bold text-lg">{venue.name}</h3>
          <div className="flex items-center text-sm">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{venue.address}</span>
          </div>
        </div>
      </div>

      {isCurrentStop && !hasCheckedIn && (
        <div className="p-3 bg-ember-light/60 flex justify-between items-center">
          <div className="flex items-center text-ember-dark">
            <Award size={16} className="mr-1" />
            <span className="text-sm font-medium">+5 points for check-in</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="animate-bounce"
            onClick={onCheckIn}
          >
            Check In
          </Button>
        </div>
      )}

      {hasCheckedIn && (
        <div className="p-3 bg-green-50 flex justify-between items-center">
          <div className="flex items-center text-green-700">
            <Award size={16} className="mr-1" />
            <span className="text-sm font-medium">+3 points for a photo</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={onPostPhoto}
          >
            <Camera size={14} className="mr-1" />
            Post Photo
          </Button>
        </div>
      )}

      {/* Friends activity */}
      {friendsCheckedIn.length > 0 && (
        <div className="px-3 py-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Recent check-ins:</p>
          <div className="space-y-2">
            {friendsCheckedIn.map(friend => (
              <div key={friend.id} className="flex items-center text-sm">
                <Avatar
                  src={friend.avatar}
                  alt={friend.name}
                  size="xs"
                />
                <span className="ml-2 font-medium">{friend.name}</span>
                <div className="ml-auto flex items-center text-gray-400">
                  <Clock size={12} className="mr-1" />
                  <span className="text-xs">{friend.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInCard;