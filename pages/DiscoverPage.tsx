
import React, { useState } from 'react';
import { MapPin, Filter, UserPlus, Info } from 'lucide-react';
import { Player } from '../types';

const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Zhang Qiang', age: 24, position: 'SG', skillLevel: 'Advanced', distance: '0.8km', avatar: 'https://picsum.photos/seed/p1/100' },
  { id: '2', name: 'Li Ming', age: 26, position: 'C', skillLevel: 'Intermediate', distance: '1.2km', avatar: 'https://picsum.photos/seed/p2/100' },
  { id: '3', name: 'James W.', age: 23, position: 'SF', skillLevel: 'Pro', distance: '2.5km', avatar: 'https://picsum.photos/seed/p3/100' },
  { id: '4', name: 'Chen Hao', age: 25, position: 'PG', skillLevel: 'Advanced', distance: '3.1km', avatar: 'https://picsum.photos/seed/p4/100' },
  { id: '5', name: 'Sun Yu', age: 28, position: 'PF', skillLevel: 'Intermediate', distance: '4.0km', avatar: 'https://picsum.photos/seed/p5/100' },
];

const DiscoverPage: React.FC = () => {
  const [filterAge, setFilterAge] = useState('All');

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold italic uppercase tracking-tighter">Find Teammates</h1>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <MapPin size={14} className="mr-1 text-orange-500" /> 
            Active ballers in Shanghai, Jing'an
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
          >
            <option>Age: All</option>
            <option>18-22</option>
            <option>23-28</option>
            <option>29+</option>
          </select>
          <button className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative aspect-[21/9] bg-slate-800 rounded-3xl overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/shanghai-map/1200/500" 
          alt="Map" 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Featured Court</div>
          <h2 className="text-xl font-bold">Nike Rise Academy Court</h2>
          <p className="text-slate-300 text-sm">4 Players currently waiting for game</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-orange-500 w-4 h-4 rounded-full border-2 border-white"></div>
           </div>
        </div>
      </div>

      {/* Player Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_PLAYERS.map((player) => (
          <div key={player.id} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-orange-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <img src={player.avatar} alt={player.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-800 group-hover:border-orange-500 transition-colors" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-900"></div>
              </div>
              <span className="text-[10px] font-bold bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase">{player.distance}</span>
            </div>
            
            <div className="space-y-1 mb-4">
              <h3 className="font-bold text-lg">{player.name}, {player.age}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-orange-400 font-bold px-2 py-0.5 bg-orange-400/10 rounded">{player.position}</span>
                <span className="text-xs text-slate-400">{player.skillLevel}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-sm flex items-center justify-center space-x-2 transition-colors">
                <UserPlus size={16} />
                <span>Invite</span>
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl text-slate-400 hover:text-white transition-colors">
                <Info size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
