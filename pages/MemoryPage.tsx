
import React, { useState } from 'react';
import { Wand2, Download, Image as ImageIcon, History, AlertCircle } from 'lucide-react';
import { generateGameMemory } from '../services/geminiService';

const MemoryPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const img = await generateGameMemory(prompt);
      setGeneratedImage(img);
    } catch (err) {
      setError("Failed to generate your memory. Check if you've provided a valid description!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Game Memories</h1>
        <p className="text-slate-400 text-lg">Turn your epic streetball moments into cinematic artwork using AI.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Input */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-500">Describe the play</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A tall player wearing a red jersey doing a massive 360 dunk under a street lamp at night."
              className="w-full h-40 bg-slate-800 border-none rounded-2xl p-4 text-sm resize-none focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className={`w-full py-4 rounded-2xl font-black uppercase italic tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${
                loading 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-orange-500/20 active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Visualizing...</span>
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  <span>Generate Memory</span>
                </>
              )}
            </button>
            {error && (
              <div className="flex items-start space-x-2 text-red-400 text-xs mt-2 bg-red-400/10 p-3 rounded-xl">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="bg-slate-900/40 p-5 rounded-3xl border border-dashed border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center">
              <History size={14} className="mr-2" /> Previous Memories
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square rounded-xl bg-slate-800 overflow-hidden opacity-50 grayscale cursor-pointer hover:grayscale-0 transition-all">
                  <img src={`https://picsum.photos/seed/mem${i}/200`} alt="Prev" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Display */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-slate-900 rounded-[2.5rem] border-2 border-slate-800 flex items-center justify-center overflow-hidden relative shadow-2xl group min-h-[400px]">
            {generatedImage ? (
              <>
                <img src={generatedImage} alt="Generated memory" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-8 right-8 flex space-x-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 text-white transition-colors">
                    <Download size={24} />
                  </button>
                  <button className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 text-white transition-colors">
                    <History size={24} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-12 max-w-xs">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                  <ImageIcon size={40} />
                </div>
                <h2 className="text-xl font-bold mb-2">Ready to Render</h2>
                <p className="text-slate-500 text-sm">Enter your play description on the left to create a masterpiece.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryPage;
