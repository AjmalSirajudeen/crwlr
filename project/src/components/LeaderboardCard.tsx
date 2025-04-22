import React from 'react';
import Card, { CardHeader, CardContent } from './ui/Card';
import Avatar from './ui/Avatar';
import { Crown, Trophy, Award } from 'lucide-react';

type LeaderboardCardProps = {
  title: string;
  users: Array<{
    id: string;
    name: string;
    avatar?: string;
    points: number;
    position: number;
    isCurrentUser?: boolean;
  }>;
  className?: string;
};

const LeaderboardCard = ({ title, users, className }: LeaderboardCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          <Trophy className="mr-2 text-amber-500" size={20} />
          {title}
        </h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {users.map((user) => (
            <div 
              key={user.id}
              className={`
                flex items-center justify-between p-3
                ${user.isCurrentUser ? 'bg-indigo-50' : ''}
              `}
            >
              <div className="flex items-center">
                <div className="w-8 flex justify-center">
                  {user.position === 1 && (
                    <Crown className="text-yellow-500" size={20} />
                  )}
                  {user.position === 2 && (
                    <Crown className="text-gray-400" size={20} />
                  )}
                  {user.position === 3 && (
                    <Crown className="text-amber-700" size={20} />
                  )}
                  {user.position > 3 && (
                    <span className="text-gray-500 font-medium">
                      {user.position}
                    </span>
                  )}
                </div>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="sm"
                  className="ml-2"
                />
                <span className={`
                  ml-2 font-medium
                  ${user.isCurrentUser ? 'text-indigo-700' : 'text-gray-700'}
                `}>
                  {user.name} {user.isCurrentUser && '(You)'}
                </span>
              </div>
              <div className="flex items-center">
                <Award className="text-indigo-500 mr-1" size={16} />
                <span className="font-bold">
                  {user.points.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;