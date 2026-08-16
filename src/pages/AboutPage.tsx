import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Globe2, 
  Award, 
  Users, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Server,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onOpenOrderModal: (planId?: string) => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenOrderModal, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          About NetWave Nepal
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Powering Nepal’s Digital Future with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
            Pure Gigabit Optical Fiber
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Founded with a mission to deliver true symmetric gigabit speeds, zero buffering, and uncompromised customer care across homes, schools, hospitals, and enterprise enterprises throughout Nepal.
        </p>
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-sans">100 Gbps</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Ring Backbone</div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-sans">1,500+</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Optical Nodes</div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl font-black text-blue-400 font-sans">40+</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Districts Connected</div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl font-black text-purple-400 font-sans">99.98%</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Network Uptime SLA</div>
        </div>
      </div>

      {/* 3. Company Story & Regulatory Authority */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Our Story & Standards</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Licensed Class 'A' Internet Service Provider in Nepal
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              NetWave Nepal Pvt. Ltd. is a premier telecommunications provider licensed by the <strong>Nepal Telecommunications Authority (NTA License: ISP-082/83)</strong>. Headquartered at NetWave Tower, New Baneshwor, Kathmandu, our network utilizes next-generation GPON and XGS-PON technology to eliminate copper latency and deliver direct fiber-to-the-home (FTTH).
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike legacy ISPs that rely on asymmetric shared bandwidth, NetWave guarantees 100% symmetric 1:1 download and upload pipelines, ensuring smooth cloud backups, competitive esports gaming, and crystal-clear 4K IPTV broadcasts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero FUP Throttling on Fiber</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WiFi 6 Smart Mesh Routers</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Field Tech Splicing Units</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Singapore/Mumbai Peering</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tier-1 Upstream & Peering Gateways</h3>
            <p className="text-xs text-slate-400">
              NetWave routes international traffic through dual redundant undersea fiber cables with direct cross-connects:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Tata Communications Ltd.</p>
                  <p className="text-[10px] text-slate-500">Tier-1 Global Transit Backbone</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-bold">Sub-32ms Ping</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Bharti Airtel Global</p>
                  <p className="text-[10px] text-slate-500">Direct Chennai & Mumbai Peering</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">Low Latency</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Nepal Internet Exchange (NPIX)</p>
                  <p className="text-[10px] text-slate-500">Direct National Domestic Exchange</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold">&lt; 2ms Ping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Leadership & Core Engineering */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Our Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Dedicated Telecom Pioneers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl mx-auto shadow-md">
              BS
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Bikash Shrestha</h3>
              <p className="text-xs text-cyan-400 font-semibold">Chief Executive Officer (CEO)</p>
            </div>
            <p className="text-xs text-slate-400">
              18+ years leading optical broadband infrastructure rollouts across South Asia.
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-slate-950 font-black text-xl mx-auto shadow-md">
              SA
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Sunil Adhikari</h3>
              <p className="text-xs text-blue-400 font-semibold">Chief Technology Officer (CTO)</p>
            </div>
            <p className="text-xs text-slate-400">
              CCIE & Juniper certified optical network architect managing 100G core routing.
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-xl mx-auto shadow-md">
              PA
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pooja Acharya</h3>
              <p className="text-xs text-emerald-400 font-semibold">Head of Customer Experience</p>
            </div>
            <p className="text-xs text-slate-400">
              Championing 24/7 round-the-clock multilingual subscriber support across Nepal.
            </p>
          </div>
        </div>
      </div>

      {/* 5. CTA Strip */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-12 border border-blue-800/60 shadow-2xl text-center space-y-5">
        <h2 className="text-2xl sm:text-4xl font-black text-white">Ready to Experience True Fiber Internet?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Join thousands of satisfied homes and enterprises across Nepal enjoying 100% symmetric speeds.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onOpenOrderModal()}
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center space-x-2"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Order Fiber Connection</span>
          </button>
          <button
            onClick={() => onNavigate('plans')}
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
          >
            Explore All Packages
          </button>
        </div>
      </div>
    </div>
  );
};
