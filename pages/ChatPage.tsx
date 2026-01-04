
import React, { useState } from 'react';
import { Send, Image as ImageIcon, Smile, Phone, Video, MoreVertical, Search } from 'lucide-react';

const MOCK_CHATS = [
  { id: '1', name: 'Zhang Qiang', lastMsg: 'See you at the court in 20 mins!', time: '10:42 AM', unread: 2, avatar: 'https://picsum.photos/seed/av1/100' },
  { id: '2', name: 'Elite Ballers Group', lastMsg: 'Li Ming: Who wants a 5v5 run?', time: '9:15 AM', unread: 0, avatar: 'https://picsum.photos/seed/av8/100' },
  { id: '3', name: 'Kobe Fan 24', lastMsg: 'The soles are very grippy.', time: 'Yesterday', unread: 0, avatar: 'https://picsum.photos/seed/av3/100' },
  { id: '4', name: 'System Notice', lastMsg: 'Your memory has been generated!', time: 'Yesterday', unread: 0, avatar: 'https://picsum.photos/seed/av9/100' },
];

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
  const [msg, setMsg] = useState('');

  return (
    <div className="flex h-full overflow-hidden bg-slate-950">
      {/* Sidebar: Chat List */}
      <div className="w-full md:w-80 flex flex-col border-r border-slate-900 bg-slate-950/50">
        <div className="p-6 border-b border-slate-900">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-slate-900 border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CHATS.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center p-4 cursor-pointer transition-colors ${selectedChat.id === chat.id ? 'bg-slate-900 border-l-4 border-orange-500' : 'hover:bg-slate-900/50'}`}
            >
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full mr-4 border-2 border-slate-800" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                  <span className="text-[10px] text-slate-500 font-bold">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400 truncate pr-4">{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <span className="bg-orange-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Chat View */}
      <div className="hidden md:flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-900 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center">
            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-3 border-2 border-slate-800" />
            <div>
              <h3 className="font-bold text-sm">{selectedChat.name}</h3>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active now</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><Phone size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><Video size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex justify-center">
            <span className="bg-slate-900 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase">Today</span>
          </div>
          
          <div className="flex items-start max-w-[80%]">
            <img src={selectedChat.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-3 mt-1" />
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-sm leading-relaxed">
              Yo! Are you coming to the 5v5 later at the Riverside court? We need one more guard.
            </div>
          </div>

          <div className="flex items-start flex-row-reverse max-w-[80%] ml-auto">
            <div className="bg-orange-600 rounded-2xl p-4 text-white text-sm leading-relaxed shadow-lg shadow-orange-600/10">
              Definitely! I just got my new Kobe 4s ready. Should be there by 6 PM.
            </div>
          </div>

          <div className="flex items-start max-w-[80%]">
            <img src={selectedChat.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-3 mt-1" />
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-sm leading-relaxed">
              Nice! Can't wait to see them. See you then 🏀
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-900">
          <div className="flex items-center space-x-3 max-w-5xl mx-auto">
            <button className="text-slate-500 hover:text-white transition-colors"><ImageIcon size={22} /></button>
            <button className="text-slate-500 hover:text-white transition-colors"><Smile size={22} /></button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-slate-800 border-none rounded-2xl py-3 px-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 p-3 rounded-full text-white shadow-lg shadow-orange-500/20 active:scale-90 transition-all">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
