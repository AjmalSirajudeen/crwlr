import React from 'react';
import Card, { CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Avatar from './ui/Avatar';
import { Heart, Star, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

type VenueCardProps = {
  venue: {
    id: string;
    name: string;
    type: string;
    rating: number;
    priceLevel: 1 | 2 | 3;
    image: string;
    address: string;
    distance?: string;
    friendsVisited?: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
    tags?: string[];
  };
  compact?: boolean;
  className?: string;
  onClick?: () => void;
};

const VenueCard = ({ venue, compact = false, className, onClick }: VenueCardProps) => {
  const renderPriceLevel = (level: number) => {
    return Array(level).fill('$').join('');
  };

  return (
    <Card
      hoverEffect
      className={cn(
        'w-full overflow-hidden flex flex-col',
        compact ? 'max-w-[250px]' : 'max-w-md',
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className={cn(
            'w-full object-cover',
            compact ? 'h-32' : 'h-48'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3 w-full">
          <div className="flex justify-between items-end">
            <div>
              <Badge variant="primary" className="mb-1">
                {venue.type}
              </Badge>
              {venue.distance && (
                <Badge variant="default" className="ml-1 mb-1">
                  {venue.distance}
                </Badge>
              )}
              <h3 className="text-white font-bold truncate">{venue.name}</h3>
            </div>
            <button className="text-white p-1 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Heart size={compact ? 16 : 20} />
            </button>
          </div>
        </div>
      </div>

      <CardContent className={compact ? 'p-3' : 'p-4'}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-1" size={compact ? 16 : 18} />
            <span className="font-medium">{venue.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-sm">
            {renderPriceLevel(venue.priceLevel)}
          </span>
        </div>

        <p className="text-gray-500 text-sm mt-1 truncate">{venue.address}</p>

        {venue.tags && !compact && (
          <div className="mt-2 flex flex-wrap gap-1">
            {venue.tags.map((tag) => (
              <Badge key={tag} variant="default" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {venue.friendsVisited && venue.friendsVisited.length > 0 && (
        <CardFooter className={cn(
          'flex items-center bg-indigo-50/60',
          compact ? 'p-2' : 'py-2 px-4'
        )}>
          <div className="flex -space-x-2 mr-2">
            {venue.friendsVisited.slice(0, 3).map((friend) => (
              <Avatar
                key={friend.id}
                src={friend.avatar}
                alt={friend.name}
                size="xs"
                className="ring-2 ring-white"
              />
            ))}
          </div>
          <span className="text-xs text-indigo-700">
            {venue.friendsVisited.length === 1
              ? '1 friend visited'
              : `${venue.friendsVisited.length} friends visited`}
          </span>
          <ChevronRight className="text-indigo-400 ml-auto" size={16} />
        </CardFooter>
      )}
    </Card>
  );
};

export default VenueCard;