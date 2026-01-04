
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus } from 'lucide-react';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Kobe Fan 24',
    authorAvatar: 'https://picsum.photos/seed/av1/100',
    content: 'Just grabbed these Kobe 4 Protro "Gigi" from Dewu. The detail is insane! Ready for the court this weekend at West Park. Who is in? 🏀🔥',
    image: 'https://picsum.photos/seed/kobe4/800/600',
    timestamp: '2h ago',
    likes: 124,
    comments: 18,
    category: 'Gear'
  },
  {
    id: '2',
    author: 'Dunk Master',
    authorAvatar: 'https://picsum.photos/seed/av2/100',
    content: 'Insane triple-double for Bron tonight. 39 years old and still dominating the league. GOAT debate heating up again! #Lakers #NBA',
    timestamp: '4h ago',
    likes: 89,
    comments: 42,
    category: 'News'
  },
  {
    id: '3',
    author: 'Zhou Wei',
    authorAvatar: 'https://picsum.photos/seed/av3/100',
    content: 'Best run in months today. The level of play in the 25-30 age bracket at the Jing’an courts is getting serious. We need a 5v5 league soon!',
    image: 'https://picsum.photos/seed/court/800/600',
    timestamp: '5h ago',
    likes: 56,
    comments: 12,
    category: 'Moment'
  }
];

const HomePage: React.FC = () => {
  const [posts] = useState<Post[]>(MOCK_POSTS);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Create Post Banner */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden shrink-0">
          <img src="https://picsum.photos/seed/user1/100" alt="Me" />
        </div>
        <button className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-400 text-left px-4 py-2.5 rounded-full text-sm transition-colors">
          Share your game story...
        </button>
        <button className="bg-orange-500 p-2.5 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
          <Plus size={20} className="text-white" />
        </button>
      </div>

      {/* Feed Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Match', 'Gear', 'NBA', 'Moments'].map((tab) => (
          <button 
            key={tab} 
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all ${
              tab === 'All' 
                ? 'bg-white text-slate-950 border-white' 
                : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white hover:text-orange-400 cursor-pointer transition-colors">{post.author}</h3>
                  <div className="flex items-center text-[10px] text-slate-500 uppercase tracking-tighter">
                    <span>{post.timestamp}</span>
                    <span className="mx-1.5">•</span>
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{post.category}</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="px-4 pb-3">
              <p className="text-sm text-slate-200 leading-relaxed">{post.content}</p>
            </div>

            {post.image && (
              <div className="aspect-video w-full bg-slate-800 overflow-hidden border-y border-slate-800">
                <img src={post.image} alt="Post content" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" />
              </div>
            )}

            <div className="p-4 flex items-center justify-between border-t border-slate-800/50">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-1.5 text-slate-400 hover:text-red-500 transition-colors group">
                  <Heart size={20} className="group-active:scale-125 transition-transform" />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-xs font-bold">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1.5 text-slate-400 hover:text-green-400 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
              <button className="text-[10px] font-bold text-orange-500 uppercase hover:underline">View Details</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
