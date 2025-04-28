import React from 'react';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import { Check, X } from 'lucide-react';

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

interface FriendRequestsProps {
  requests: FriendRequest[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const FriendRequests = ({ requests, onAccept, onReject }: FriendRequestsProps) => {
  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No pending friend requests</p>
        </div>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between"
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
                onClick={() => onAccept(request.id)}
                className="text-green-600"
              >
                <Check size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReject(request.id)}
                className="text-rose-600"
              >
                <X size={18} />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;