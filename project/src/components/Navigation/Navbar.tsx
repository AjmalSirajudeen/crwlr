import React, { useState } from 'react';
import { Menu, X, Map, Users, Compass, Award, User } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

type NavbarProps = {
  user?: {
    name: string;
    avatar?: string;
  } | null;
  onLogin: () => void;
};

const Navbar = ({ user, onLogin }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text text-2xl font-bold">CRWLR</span>
            </div>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
              <Compass size={18} />
              <span>Discover</span>
            </Button>
            <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
              <Map size={18} />
              <span>Crawls</span>
            </Button>
            <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
              <Users size={18} />
              <span>Friends</span>
            </Button>
            <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
              <Award size={18} />
              <span>Leaderboard</span>
            </Button>
          </div>

          {/* User menu or login button */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <span className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={onLogin}>
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">
              <Compass size={18} />
              <span>Discover</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              <Map size={18} />
              <span>Crawls</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              <Users size={18} />
              <span>Friends</span>
            </a>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              <Award size={18} />
              <span>Leaderboard</span>
            </a>
            {user && (
              <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                <User size={18} />
                <span>Profile</span>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;