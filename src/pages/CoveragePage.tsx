import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Activity, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Zap, 
  Building, 
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COVERAGE_REGIONS } from '../data/ispData';

interface CoveragePageProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenWaveBot: () => void;
}

export const CoveragePage: React.FC<CoveragePageProps> = ({ onOpenOrderModal, onOpenWaveBot }) => {
  const [search, setSearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All');
  
  // Specific Location Availability Checker
  const [checkLocationInput, setCheckLocationInput] = useState('Baneshwor');
  const [checkResult, setCheckResult] = useState<{
    available: boolean;
    location: string;
    details?: string;
    speeds?: string;
  } | null>({
    available: true,
    location: 'Baneshwor, Kathmandu',
    details: '98% Optical Grid Density • 420+ Live Nodes',
    speeds: 'Up to 1 Gbps Symmetric Fiber + WiFi 6 Available',
  });

  // Area Request form
  const [areaRequestName, setAreaRequestName] = useState('');
  const [areaRequestPhone, setAreaRequestPhone] = useState('');
  const [areaRequestLocation, setAreaRequestLocation] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const provinces = ['All', 'Bagmati Province', 'Gandaki Province', 'Lumbini Province', 'Koshi Province'];

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkLocationInput.trim()) return;

    const term = checkLocationInput.trim().toLowerCase();
    
    // Check in all areas
    const matchedRegion = COVERAGE_REGIONS.find(r => 
      r.city.toLowerCase().includes(term) ||
      r.district.toLowerCase().includes(term) ||
      r.areas.some(a => a.toLowerCase().includes(term))
    );

    if (matchedRegion) {
      setCheckResult({
        available: true,
        location: checkLocationInput,
        details: `${matchedRegion.city} (${matchedRegion.province}) • ${matchedRegion.coveragePercentage}% Grid Coverage`,
        speeds: matchedRegion.availableSpeeds,
      });
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    } else {
      setCheckResult({
        available: false,
        location: checkLocationInput,
      });
    }
  };

  const filteredRegions = COVERAGE_REGIONS.filter((region) => {
    const matchesProv = selectedProvince === 'All' || region.province === selectedProvince;
    const matchesSearch = 
      region.city.toLowerCase().includes(search.toLowerCase()) ||
      region.district.toLowerCase().includes(search.toLowerCase()) ||
      region.areas.some(a => a.toLowerCase().includes(search.toLowerCase()));
    return matchesProv && matchesSearch;
  });

  const handleRequestExpansion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaRequestLocation.trim() || !areaRequestPhone.trim()) {
      alert('Please provide your street location and contact phone.');
      return;
    }
    setRequestSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Network Reach & Live Infrastructure
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          NetWave Fiber Coverage Across Nepal
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Our high-density pure FTTH network spans over 1,500+ active optical distribution nodes across 40+ districts in Nepal with 99.98% network reliability.
        </p>
      </div>

      {/* 2. Interactive Instant Availability Search Box */}
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-white">Check Fiber Availability at Your Address</h2>
          <p className="text-xs text-slate-400">
            Type your city, neighborhood, or ward to check optical coverage instantly.
          </p>
        </div>

        <form onSubmit={handleCheckAvailability} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={checkLocationInput}
              onChange={(e) => setCheckLocationInput(e.target.value)}
              placeholder="e.g. Baneshwor, Pulchowk, Lakeside Pokhara, Narayangarh..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center space-x-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Check Availability</span>
          </button>
        </form>

        {/* Check Result Feedback Box */}
        {checkResult && (
          <div className="pt-2">
            {checkResult.available ? (
              <div className="bg-emerald-950/60 border border-emerald-500/60 p-5 rounded-2xl space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-white">
                        NetWave Nepal is available in this area.
                      </h3>
                      <p className="text-xs text-emerald-300 mt-0.5">
                        Location: <strong className="text-white">{checkResult.location}</strong> ({checkResult.details})
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-1 bg-emerald-900 text-emerald-300 text-[10px] font-bold rounded-full">
                    Ready to Connect
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-emerald-800/60 text-xs">
                  <span className="text-slate-300">{checkResult.speeds}</span>
                  <button
                    onClick={() => onOpenOrderModal()}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer flex items-center space-x-1.5 shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Book Connection Now</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-950/60 border border-red-500/60 p-5 rounded-2xl space-y-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      We're not currently available in this area.
                    </h3>
                    <p className="text-xs text-red-300 mt-0.5">
                      Location "{checkResult.location}" is not yet within our active optical distribution ring.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-red-900/60 space-y-2">
                  <p className="text-xs text-slate-300">
                    Want optical fiber brought to your neighborhood? Submit a priority expansion request below:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="Your mobile number (98XXXXXXXX)"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 flex-1"
                    />
                    <button
                      onClick={() => alert(`Expansion request submitted for ${checkResult.location}! Our planning team will notify you.`)}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer"
                    >
                      Request Fiber Expansion
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Live Optical Nodes Health Status Bar */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <h3 className="text-sm font-bold text-white">Live Regional Fiber Ring Status</h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Overall Network Health: 99.98% Normal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { node: 'Kathmandu Core Ring (Baneshwor)', status: 'Operational', uptime: '100.0%', ping: '1.8 ms' },
            { node: 'Lalitpur South Ring (Pulchowk)', status: 'Operational', uptime: '99.99%', ping: '2.1 ms' },
            { node: 'Pokhara Lakeside Optical Node', status: 'Operational', uptime: '99.95%', ping: '4.2 ms' },
            { node: 'Chitwan Central Hub (Bharatpur)', status: 'Operational', uptime: '99.98%', ping: '3.6 ms' },
            { node: 'Butwal Highway Ring (Traffic Chowk)', status: 'Operational', uptime: '99.92%', ping: '5.1 ms' },
            { node: 'Biratnagar Koshi Hub (Main Road)', status: 'Operational', uptime: '99.90%', ping: '5.8 ms' },
            { node: 'Dharan / Sunsari Sub-Hub', status: 'Operational', uptime: '99.94%', ping: '6.2 ms' },
            { node: 'Bhairahawa Border Gateway (Tata Link)', status: 'Operational', uptime: '100.0%', ping: '3.1 ms' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <strong className="text-white truncate" title={item.node}>{item.node}</strong>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-1"></span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Uptime: <strong className="text-emerald-400">{item.uptime}</strong></span>
                <span>Latency: <strong className="text-cyan-400">{item.ping}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Search & Province Filter */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Tole (e.g. Baneshwor, Lakeside, Narayangarh)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Province Filter */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {provinces.map((prov) => (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedProvince === prov
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegions.map((region) => (
            <div
              key={region.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    {region.province}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {region.status === 'active' ? 'Active FTTH' : 'Expanding'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{region.city}</h3>
                  <p className="text-xs text-slate-400">District: {region.district}</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Optical Grid Coverage</span>
                    <strong className="text-cyan-400">{region.coveragePercentage}%</strong>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                      style={{ width: `${region.coveragePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Covered Toles / Areas list */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Covered Toles & Wards:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {region.areas.map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-950 rounded-md border border-slate-800 text-[11px] text-slate-300"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-cyan-300 font-semibold">{region.availableSpeeds}</span>
                <button
                  onClick={() => onOpenOrderModal()}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Book Line
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Request Expansion to Your Locality */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-10 border border-blue-800/60 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="px-3 py-1 bg-cyan-950 text-cyan-400 font-bold text-xs rounded-md border border-cyan-800">
              Community Fiber Expansion
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Can't Find Your Tole or Ward?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We expand hundreds of meters of optical drop cables every week. Tell us your neighborhood, and our fiber planning team will prioritize your street's distribution box.
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {!requestSent ? (
              <form onSubmit={handleRequestExpansion} className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">Request Fiber Line to Your Street</h4>
                <div>
                  <input
                    type="text"
                    value={areaRequestLocation}
                    onChange={(e) => setAreaRequestLocation(e.target.value)}
                    placeholder="Enter your exact Tole, Ward, and Landmark..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={areaRequestName}
                    onChange={(e) => setAreaRequestName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="tel"
                    value={areaRequestPhone}
                    onChange={(e) => setAreaRequestPhone(e.target.value)}
                    placeholder="Mobile 98XXXXXXXX"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Area Request</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-2">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Area Expansion Request Logged!</h4>
                <p className="text-xs text-slate-400">
                  Our network planning engineer will survey optical power levels at <strong>{areaRequestLocation}</strong> and update you on <strong>{areaRequestPhone}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
