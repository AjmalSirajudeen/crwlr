import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import Avatar from './ui/Avatar';

interface User {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface UserSearchProps {
  onSearch: (query: string) => Promise<User[]>;
  onSendRequest: (userId: string) => Promise<void>;
  existingFriends?: Set<string>;
  pendingRequests?: Set<string>;
}

const UserSearch = ({ onSearch, onSendRequest, existingFriends, pendingRequests }: UserSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await onSearch(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to search users');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search users by name or username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-10"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Search size={20} />
        </button>
      </div>

      {error && (
        <div className="text-rose-600 text-sm">{error}</div>
      )}

      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ink mx-auto"></div>
          </div>
        ) : (
          results.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Avatar
                  src={user.avatar_url || undefined}
                  alt={user.full_name || user.username}
                  size="md"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {user.full_name || user.username}
                  </h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>

              <Button
                variant={existingFriends?.has(user.id) ? 'ghost' : 'primary'}
                size="sm"
                disabled={
                  existingFriends?.has(user.id) ||
                  pendingRequests?.has(user.id)
                }
                onClick={() => onSendRequest(user.id)}
              >
                {existingFriends?.has(user.id) ? (
                  'Friends'
                ) : pendingRequests?.has(user.id) ? (
                  'Request Sent'
                ) : (
                  <>
                    <UserPlus size={16} className="mr-1" />
                    Add Friend
                  </>
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserSearch;