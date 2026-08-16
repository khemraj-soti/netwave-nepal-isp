import React, { useState } from 'react';
import { 
  Tv, 
  Search, 
  Play, 
  Sparkles, 
  Film, 
  Radio, 
  Volume2, 
  Calendar, 
  Mic, 
  Cast, 
  Layers, 
  CheckCircle2, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { TV_CHANNELS } from '../data/ispData';

interface NetWaveTVPageProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenWaveBot: () => void;
}

export const NetWaveTVPage: React.FC<NetWaveTVPageProps> = ({ onOpenOrderModal, onOpenWaveBot }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChannel, setActiveChannel] = useState(TV_CHANNELS[0]);

  const categories = ['All', 'Nepali', 'Sports', 'Movies', 'Entertainment', 'News', 'Infotainment', 'Kids', 'Music'];

  const filteredChannels = TV_CHANNELS.filter(ch => {
    const matchesCat = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase()) || ch.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 p-8 sm:p-12 border border-blue-800/60 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              Next-Gen 4K IPTV & OTT Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              NetWave TV 4K <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                250+ Live Channels & Catch-up
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Experience ultra-sharp 4K and Full HD television over pure optical fiber. Rewind live sports, catch up on missed broadcasts up to 7 days, and stream from top OTT platforms in one box.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onOpenOrderModal('nw-combo-300')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Get GigaPlay 4K TV Combo</span>
              </button>
              <button
                onClick={onOpenWaveBot}
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
              >
                Ask Channel Availability
              </button>
            </div>
          </div>

          {/* Interactive Set-Top Box Simulated Player */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl space-y-3">
              {/* Virtual Screen */}
              <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex flex-col justify-between p-4 bg-gradient-to-br from-blue-900/40 to-slate-950">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 bg-red-600 text-white font-bold rounded text-[10px] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span>LIVE STREAM</span>
                  </span>
                  <span className="px-2 py-0.5 bg-slate-800/90 text-cyan-300 font-mono rounded text-[10px]">
                    {activeChannel.resolution} 60FPS
                  </span>
                </div>

                <div className="text-center py-4 space-y-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 text-cyan-300 font-black flex items-center justify-center mx-auto text-sm shadow-lg">
                    {activeChannel.logoText}
                  </div>
                  <h4 className="text-lg font-black text-white">{activeChannel.name}</h4>
                  <p className="text-[11px] text-slate-400">{activeChannel.category} • {activeChannel.language}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <span>Catch-up TV: Enabled (7 Days)</span>
                  <span className="text-emerald-400 font-bold">Bitrate: 12.4 Mbps Ultra HD</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 text-center">
                Click any channel below to preview simulated broadcast stream
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key 4K Set-Top Box Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">7-Day Catch-up TV</h3>
          <p className="text-xs text-slate-400">
            Never miss news, serials, or cricket matches. Replay any program broadcasted in the past 7 days on demand.
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Mic className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Google Voice Remote</h3>
          <p className="text-xs text-slate-400">
            Search channels, YouTube videos, and launch apps with simple voice commands in English or Nepali.
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Film className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">OTT Bundles Included</h3>
          <p className="text-xs text-slate-400">
            Free premium access to SonyLIV, ShemarooME, and YouTube 4K with no extra separate billing.
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Cast className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Built-in Chromecast</h3>
          <p className="text-xs text-slate-400">
            Wirelessly mirror your smartphone photos, 4K videos, and mobile games directly onto your TV screen.
          </p>
        </div>
      </div>

      {/* 3. Channels Explorer */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">250+ Live Channels Catalog</h2>
            <p className="text-xs text-slate-400">Browse all national, sports, movie, and infotainment channels.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channel or language..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredChannels.map((ch) => {
            const isCurrent = activeChannel.id === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => setActiveChannel(ch)}
                className={`p-4 rounded-xl border flex flex-col justify-between items-center text-center cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-blue-950/70 border-cyan-400 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between w-full text-[9px]">
                  <span className="text-slate-500 uppercase font-bold">{ch.language}</span>
                  <span className={`px-1.5 py-0.2 rounded font-bold ${ch.resolution === '4K' ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-800 text-cyan-300'}`}>
                    {ch.resolution}
                  </span>
                </div>

                <div className="my-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-xs font-black text-cyan-300">
                    {ch.logoText}
                  </div>
                  <p className="text-xs font-bold text-white mt-2 line-clamp-1">{ch.name}</p>
                </div>

                <span className="text-[10px] text-slate-400">{ch.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
