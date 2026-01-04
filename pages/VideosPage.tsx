
import React from 'react';
import { Play, Eye, Clock, User, Heart } from 'lucide-react';
import { Video } from '../types';

const MOCK_VIDEOS: Video[] = [
  { id: '1', title: 'Top 10 Ankle Breakers of the Month', thumbnail: 'https://picsum.photos/seed/v1/640/360', duration: '12:45', views: '1.2M', author: 'NBA Official' },
  { id: '2', title: 'How to Perfect Your Shooting Form', thumbnail: 'https://picsum.photos/seed/v2/640/360', duration: '08:20', views: '450K', author: 'Coach Chris' },
  { id: '3', title: 'Streetball Highlights: Shanghai Finals', thumbnail: 'https://picsum.photos/seed/v3/640/360', duration: '15:10', views: '89K', author: 'BallerConnect' },
  { id: '4', title: 'Kobe Bryant: The Mamba Mentality Story', thumbnail: 'https://picsum.photos/seed/v4/640/360', duration: '22:30', views: '5.6M', author: 'Legends HD' },
  { id: '5', title: 'Kyrie Irving Best Handles 2024', thumbnail: 'https://picsum.photos/seed/v5/640/360', duration: '05:45', views: '2.1M', author: 'Hoops TV' },
  { id: '6', title: 'Full Court Run: Pro vs Amateurs', thumbnail: 'https://picsum.photos/seed/v6/640/360', duration: '18:12', views: '150K', author: 'The Lab' },
];

const VideosPage: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Hoop Clips</h1>
        <div className="flex space-x-2">
          {['Trending', 'Training', 'Street', 'NBA', 'Gear'].map(cat => (
            <button key={cat} className="px-4 py-1.5 bg-slate-800 rounded-full text-xs font-bold hover:bg-slate-700 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_VIDEOS.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="aspect-video bg-slate-800 rounded-3xl overflow-hidden relative mb-4 shadow-lg">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                   <Play size={28} className="text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold">
                {video.duration}
              </div>
            </div>
            <div className="space-y-2 px-1">
              <h3 className="font-bold text-lg leading-snug group-hover:text-orange-400 transition-colors">{video.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-wider font-bold">
                <div className="flex items-center">
                  <User size={12} className="mr-1" />
                  <span>{video.author}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Eye size={12} className="mr-1" />
                    <span>{video.views}</span>
                  </div>
                  <Heart size={14} className="hover:text-red-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
