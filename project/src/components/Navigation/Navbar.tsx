import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Compass, Award, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/crawls', icon: Map, label: 'Crawls' },
    { path: '/leaderboard', icon: Award, label: 'Rewards' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-ink text-stone-400 border-t border-stone-800 z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2.5 px-3 ${
                  active ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.25 : 1.75} />
                <span className="text-[10px] mt-1 tracking-wide uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
