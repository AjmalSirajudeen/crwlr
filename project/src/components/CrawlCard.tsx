import React from 'react';
import Card, { CardContent, CardFooter } from './ui/Card';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

type CrawlCardProps = {
  crawl: {
    id: string;
    name: string;
    date: string;
    time: string;
    area: string;
    stops: number;
    participants: {
      id: string;
      name: string;
      avatar?: string;
    }[];
    creator: {
      id: string;
      name: string;
      avatar?: string;
    };
    status: 'upcoming' | 'in-progress' | 'completed';
  };
  onView: (id: string) => void;
  onJoin?: (id: string) => void;
};

const CrawlCard = ({ crawl, onView, onJoin }: CrawlCardProps) => {
  const statusVariant = {
    'upcoming': 'primary',
    'in-progress': 'success',
    'completed': 'default',
  } as const;

  const statusText = {
    'upcoming': 'Upcoming',
    'in-progress': 'In Progress',
    'completed': 'Completed',
  };

  return (
    <Card className="max-w-md w-full overflow-hidden">
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-24 flex items-end">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="p-4 text-white">
          <Badge 
            variant={statusVariant[crawl.status]} 
            className="mb-2 uppercase text-xs tracking-wide"
          >
            {statusText[crawl.status]}
          </Badge>
          <h3 className="font-bold text-xl">{crawl.name}</h3>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{crawl.date}</span>
            <Clock size={16} className="ml-4 mr-2" />
            <span className="text-sm">{crawl.time}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{crawl.area}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">{crawl.stops} stops</span>
          </div>

          <div className="flex items-center">
            <Users size={16} className="mr-2 text-gray-600" />
            <div className="flex -space-x-2">
              {crawl.participants.slice(0, 4).map(participant => (
                <Avatar
                  key={participant.id}
                  src={participant.avatar}
                  alt={participant.name}
                  size="sm"
                  className="ring-2 ring-white"
                />
              ))}
              {crawl.participants.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-white text-sm text-gray-600">
                  +{crawl.participants.length - 4}
                </div>
              )}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {crawl.participants.length} joined
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <span className="text-sm">Created by:</span>
            <div className="flex items-center ml-2">
              <Avatar
                src={crawl.creator.avatar}
                alt={crawl.creator.name}
                size="xs"
              />
              <span className="ml-1 text-sm font-medium">{crawl.creator.name}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <Button 
          variant="ghost" 
          className="text-indigo-600" 
          onClick={() => onView(crawl.id)}
        >
          View Details
        </Button>
        {onJoin && crawl.status === 'upcoming' && (
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onJoin(crawl.id)}
          >
            Join Crawl
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CrawlCard;