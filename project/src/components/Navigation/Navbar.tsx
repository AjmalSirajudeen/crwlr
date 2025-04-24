import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Map, Users, Compass, Award, User } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';

type NavbarProps = {
  user?: {
    name: string;
    avatar?: string;
  } | null;
  onLogin?: () => void;
};

const Navbar = ({ user, onLogin }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text text-2xl font-bold">CRWLR</span>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
                <Compass size={18} />
                <span>Discover</span>
              </Button>
            </Link>
            <Link to="/crawls">
              <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
                <Map size={18} />
                <span>Crawls</span>
              </Button>
            </Link>
            <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
              <Users size={18} />
              <span>Friends</span>
            </Button>
            <Link to="/leaderboard">
              <Button variant="ghost" className="text-gray-700 p-2 rounded-full flex items-center space-x-1">
                <Award size={18} />
                <span>Leaderboard</span>
              </Button>
            </Link>
          </div>

          {/* User menu or login/signup buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <span className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
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
            <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">
              <Compass size={18} />
              <span>Discover</span>
            </Link>
            <Link to="/crawls" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              <Map size={18} />
              <span>Crawls</span>
            </Link>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              <Users size={18} />
              <span>Friends</span>
            </a>
            <Link to="/leaderboard" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              <Award size={18} />
              <span>Leaderboard</span>
            </Link>
            {user ? (
              <>
                <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                  <User size={18} />
                  <span>Profile</span>
                </a>
                <Button variant="ghost" className="w-full text-left" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;