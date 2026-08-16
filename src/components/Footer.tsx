import React from 'react';
import { 
  Wifi, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  Headphones, 
  Tv, 
  Building2, 
  Gauge, 
  HelpCircle,
  CreditCard,
  CheckCircle2,
  Globe2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenOrderModal: (planId?: string) => void;
  onOpenQuickPay: () => void;
  onOpenWaveBot: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenOrderModal,
  onOpenQuickPay,
  onOpenWaveBot,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Wifi className="w-6 h-6 text-white transform -rotate-12" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  NET<span className="text-cyan-400">WAVE</span> <span className="text-xs font-semibold px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded border border-blue-700/50">NEPAL</span>
                </span>
                <p className="text-xs text-slate-400">Pioneering Pure Fiber & 4K IPTV in Nepal</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              NetWave Nepal is one of Nepal’s fastest-growing Class ‘A’ Fiber Internet & IPTV Service Providers, offering symmetric speeds up to 1 Gbps, WiFi 6 smart routers, and low-latency international routing across 40+ districts.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>NetWave Tower, New Baneshwor (Opp. NIC Asia Bank), Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-300">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Helpline: +977-1-4789000 | Support Mobile: 9801234567</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@netwavenepal.com.np | sales@netwavenepal.com.np</span>
              </div>
            </div>

            {/* Regulatory Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Licensed by Nepal Telecommunications Authority (NTA License: ISP-082/83)</span>
            </div>
          </div>

          {/* Col 2: High Speed Plans */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-cyan-400">
              Internet Plans
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-cyan-400 transition-colors text-left">
                  Home Starter (100 Mbps)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-cyan-400 transition-colors text-left flex items-center">
                  <span>Home Plus Turbo (200 Mbps)</span>
                  <span className="ml-2 text-[10px] bg-cyan-900/60 text-cyan-300 px-1.5 py-0.2 rounded font-semibold">Best</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-cyan-400 transition-colors text-left">
                  GigaPlay + 4K TV (300 Mbps)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-cyan-400 transition-colors text-left">
                  Ultra Max 500 Mbps + Mesh
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('enterprise')} className="hover:text-cyan-400 transition-colors text-left">
                  SME Business Pro (300 Mbps)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('enterprise')} className="hover:text-cyan-400 transition-colors text-left">
                  Enterprise 1:1 Leased Line
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Tools */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-cyan-400">
              Services & Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('tv')} className="hover:text-cyan-400 transition-colors text-left flex items-center space-x-1.5">
                  <Tv className="w-3.5 h-3.5 text-slate-500" />
                  <span>NetWave TV 4K Channels</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('speedtest')} className="hover:text-cyan-400 transition-colors text-left flex items-center space-x-1.5">
                  <Gauge className="w-3.5 h-3.5 text-slate-500" />
                  <span>Speed Test Speedometer</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coverage')} className="hover:text-cyan-400 transition-colors text-left flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Coverage & Node Status</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuickPay} className="hover:text-cyan-400 transition-colors text-left flex items-center space-x-1.5 text-emerald-400 font-medium">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Online Recharge & Bill Pay</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('selfcare')} className="hover:text-cyan-400 transition-colors text-left">
                  Customer Self-Care Login
                </button>
              </li>
              <li>
                <button onClick={onOpenWaveBot} className="hover:text-cyan-400 transition-colors text-left text-cyan-300 font-medium">
                  WaveBot AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Regions */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-cyan-400">
              Help & Branches
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-cyan-400 transition-colors text-left">
                  Router Diagnostic (Red LOS Fix)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-cyan-400 transition-colors text-left">
                  Submit Support Ticket
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-cyan-400 transition-colors text-left">
                  Track Complaint Status
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-cyan-400 transition-colors text-left">
                  Kathmandu Flagship Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-cyan-400 transition-colors text-left">
                  Pokhara & Chitwan Centers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-cyan-400 transition-colors text-left">
                  Butwal & Biratnagar Hubs
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Partners & Trusted Gateways in Nepal */}
        <div className="py-8 border-b border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 text-center md:text-left">
              Official Instant Recharge & Digital Payment Partners
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 font-bold text-xs rounded-md">
                eSewa Nepal
              </span>
              <span className="px-3 py-1 bg-purple-950/80 border border-purple-700/60 text-purple-300 font-bold text-xs rounded-md">
                Khalti Digital Wallet
              </span>
              <span className="px-3 py-1 bg-blue-950/80 border border-blue-700/60 text-blue-300 font-bold text-xs rounded-md">
                ConnectIPS (NCHL)
              </span>
              <span className="px-3 py-1 bg-red-950/80 border border-red-700/60 text-red-300 font-bold text-xs rounded-md">
                Fonepay QR
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs rounded-md">
                Visa / MasterCard
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs rounded-md">
                Mobile Banking Nepal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenOrderModal()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Order New Fiber Line
            </button>
            <button
              onClick={onOpenQuickPay}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Pay Existing Bill
            </button>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NetWave Nepal Pvt. Ltd. All rights reserved. Registered with Govt of Nepal, Company Registrar Office.</p>
          <div className="flex items-center space-x-6 text-slate-400">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Fair Usage Policy (FUP)</span>
            <span className="hover:text-white cursor-pointer">Service Level Agreement (SLA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
