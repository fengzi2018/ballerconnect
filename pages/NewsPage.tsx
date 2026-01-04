
import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, TrendingUp, Calendar } from 'lucide-react';
import { fetchNBANews } from '../services/geminiService';

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<{content: string, sources: any[]}>({ content: '', sources: [] });
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    setLoading(true);
    const result = await fetchNBANews();
    setNews(result);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">NBA Daily Pulse</h1>
          <p className="text-slate-400 mt-2 flex items-center">
            <TrendingUp size={16} className="mr-2 text-green-500" />
            AI-summarized global basketball updates
          </p>
        </div>
        <button 
          onClick={loadNews}
          disabled={loading}
          className={`p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={24} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-40 bg-slate-900 rounded-3xl"></div>
          <div className="h-80 bg-slate-900 rounded-3xl"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Content */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-2 text-orange-500 mb-6 font-bold text-xs uppercase tracking-widest">
              <Calendar size={14} />
              <span>Report for {new Date().toLocaleDateString()}</span>
            </div>
            <div className="prose prose-invert max-w-none prose-orange">
              {news.content.split('\n').map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed mb-4 text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Sources */}
          {news.sources.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 px-2">Verified Sources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {news.sources.map((source, i) => (
                  <a 
                    key={i}
                    href={source.web?.uri || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800 transition-all group"
                  >
                    <span className="text-sm font-semibold truncate flex-1 mr-4">{source.web?.title || 'NBA News Link'}</span>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-orange-500 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
