
import React, { useState } from 'react';
import { ShoppingCart, Star, MessageSquare, ExternalLink, Search, Sparkles } from 'lucide-react';
import { getGearAdvice } from '../services/geminiService';

const MOCK_GEAR = [
  { id: '1', name: 'Kobe 4 Protro "Gigi"', brand: 'Nike', price: '¥1899', rating: 4.9, image: 'https://picsum.photos/seed/shoe1/400/400', dewuLink: '#' },
  { id: '2', name: 'LeBron 21 "Akoya"', brand: 'Nike', price: '¥1199', rating: 4.7, image: 'https://picsum.photos/seed/shoe2/400/400', dewuLink: '#' },
  { id: '3', name: 'Curry 11 "Future"', brand: 'Under Armour', price: '¥1299', rating: 4.8, image: 'https://picsum.photos/seed/shoe3/400/400', dewuLink: '#' },
  { id: '4', name: 'GT Cut 3', brand: 'Nike', price: '¥1399', rating: 4.6, image: 'https://picsum.photos/seed/shoe4/400/400', dewuLink: '#' },
];

const GearPage: React.FC = () => {
  const [shoeName, setShoeName] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    if (!shoeName) return;
    setLoading(true);
    const res = await getGearAdvice(shoeName);
    setAdvice(res);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-tight tracking-tighter">Gear Locker</h1>
          <p className="text-slate-400">Authentic reviews, buying guides, and community picks.</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 max-w-md w-full">
          <input 
            type="text" 
            placeholder="Ask AI about any shoe (e.g. Kobe 4 sizing)..."
            value={shoeName}
            onChange={(e) => setShoeName(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 px-4 text-sm"
          />
          <button 
            onClick={fetchAdvice}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 p-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Sparkles size={20} className="text-white" />}
          </button>
        </div>
      </div>

      {advice && (
        <div className="bg-slate-900 border-2 border-orange-500/30 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-2 text-orange-500 font-bold mb-4">
            <Sparkles size={18} />
            <span className="uppercase text-xs tracking-widest">AI Performance Insight</span>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
            {advice.split('\n').map((l, i) => <p key={i} className="mb-2">{l}</p>)}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center uppercase tracking-wider">
          <ShoppingCart size={20} className="mr-2 text-orange-500" />
          Trending on Dewu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_GEAR.map((item) => (
            <div key={item.id} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden group hover:border-orange-500/50 transition-all flex flex-col">
              <div className="aspect-square bg-slate-800 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-white">{item.rating}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">{item.brand}</span>
                  <span className="text-orange-500 font-black tracking-tight">{item.price}</span>
                </div>
                <h3 className="font-bold text-lg mb-4 line-clamp-1">{item.name}</h3>
                
                <div className="mt-auto space-y-2">
                  <a 
                    href={item.dewuLink}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs uppercase py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>Buy on Dewu</span>
                    <ExternalLink size={14} />
                  </a>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-3 rounded-xl transition-colors">
                    Discussion
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GearPage;
