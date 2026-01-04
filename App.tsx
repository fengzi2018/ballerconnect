
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  PlayCircle, 
  Newspaper, 
  ShoppingBag, 
  Camera, 
  MessageSquare, 
  Bell, 
  Search, 
  Menu,
  Trophy,
  MapPin
} from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import VideosPage from './pages/VideosPage';
import NewsPage from './pages/NewsPage';
import GearPage from './pages/GearPage';
import MemoryPage from './pages/MemoryPage';
import ChatPage from './pages/ChatPage';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/discover', icon: <Users size={24} />, label: 'Match' },
    { path: '/videos', icon: <PlayCircle size={24} />, label: 'Videos' },
    { path: '/news', icon: <Newspaper size={24} />, label: 'NBA News' },
    { path: '/gear', icon: <ShoppingBag size={24} />, label: 'Gear' },
    { path: '/memory', icon: <Camera size={24} />, label: 'Moments' },
    { path: '/chat', icon: <MessageSquare size={24} />, label: 'Chat' },
  ];

  return (
    <aside className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50 md:relative md:w-64 md:h-screen md:border-t-0 md:border-r">
      <div className="hidden md:flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-3 text-orange-500">
          <Trophy size={32} strokeWidth={2.5} />
          <span className="text-xl font-extrabold tracking-tight text-white uppercase italic">BallerConnect</span>
        </div>
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path) 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 transition-all ${
              isActive(item.path) ? 'text-orange-500' : 'text-slate-400'
            }`}
          >
            {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const Header = () => (
  <header className="sticky top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between z-40">
    <div className="flex items-center space-x-2 md:hidden">
      <Trophy className="text-orange-500" size={24} />
      <span className="text-lg font-bold tracking-tight">BC</span>
    </div>
    <div className="flex-1 max-w-md mx-4 relative hidden sm:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
      <input 
        type="text" 
        placeholder="Search players, courts, or gear..." 
        className="w-full bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
      />
    </div>
    <div className="flex items-center space-x-4">
      <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
        <Bell size={22} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 border-2 border-slate-800 overflow-hidden cursor-pointer hover:scale-105 transition-transform">
        <img src="https://picsum.photos/seed/user1/100" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/gear" element={<GearPage />} />
              <Route path="/memory" element={<MemoryPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
