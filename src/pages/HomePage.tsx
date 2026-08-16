import React, { useState } from 'react';
import { 
  Wifi, 
  Tv, 
  Zap, 
  ShieldCheck, 
  Gauge, 
  MapPin, 
  CreditCard, 
  Headphones, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Sliders, 
  Radio, 
  Globe2, 
  Server, 
  Award,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import { FIBER_PLANS, COVERAGE_REGIONS } from '../data/ispData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenOrderModal: (planId?: string) => void;
  onOpenQuickPay: () => void;
  onOpenWaveBot: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenOrderModal,
  onOpenQuickPay,
  onOpenWaveBot,
}) => {
  // Billing cycle toggle for homepage featured packages
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Bandwidth / Plan Recommender Calculator States
  const [usersCount, setUsersCount] = useState(4);
  const [has4kStreaming, setHas4kStreaming] = useState(true);
  const [isGaming, setIsGaming] = useState(true);
  const [wantsTv, setWantsTv] = useState(true);

  // Calculate recommended package
  const getRecommendedPlan = () => {
    if (usersCount >= 7 || (has4kStreaming && isGaming && wantsTv && usersCount >= 5)) {
      return FIBER_PLANS.find(p => p.id === 'nw-combo-500') || FIBER_PLANS[3];
    }
    if (wantsTv || usersCount >= 4 || isGaming) {
      return FIBER_PLANS.find(p => p.id === 'nw-combo-300') || FIBER_PLANS[2];
    }
    if (usersCount >= 3 || has4kStreaming) {
      return FIBER_PLANS.find(p => p.id === 'nw-home-200') || FIBER_PLANS[1];
    }
    return FIBER_PLANS.find(p => p.id === 'nw-home-100') || FIBER_PLANS[0];
  };

  const recommendedPlan = getRecommendedPlan();

  // Quick Coverage Search
  const [coverageSearch, setCoverageSearch] = useState('');
  const filteredCoverage = COVERAGE_REGIONS.filter(r => 
    r.city.toLowerCase().includes(coverageSearch.toLowerCase()) || 
    r.district.toLowerCase().includes(coverageSearch.toLowerCase()) ||
    r.areas.some(a => a.toLowerCase().includes(coverageSearch.toLowerCase()))
  );

  return (
    <div className="space-y-20 pb-16 text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Promo Chip */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-inner">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Nepal’s #1 Pure Optical FTTH Network</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold">WiFi 6 Mesh + 4K NetWave TV</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                Experience <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                  Gigabit Fiber Speed
                </span> <br />
                Across Nepal.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Pure symmetric optical fiber up to 1,000 Mbps with ultra-low latency direct peering to Singapore & Mumbai, paired with 250+ Live 4K TV channels.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenOrderModal('nw-combo-300')}
                  className="px-7 py-3.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Get Connected (Free Setup)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('plans')}
                  className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>Explore All Plans</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={onOpenQuickPay}
                  className="px-5 py-3.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 font-bold text-sm rounded-xl border border-emerald-800/60 transition-all cursor-pointer flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Quick Bill Pay</span>
                </button>
              </div>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-white">1 Gbps</p>
                  <p className="text-xs text-slate-400">Peak Fiber Speed</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-cyan-400">&lt; 35ms</p>
                  <p className="text-xs text-slate-400">Singapore Ping</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-400">99.98%</p>
                  <p className="text-xs text-slate-400">Network Uptime</p>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Speed Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-6 border border-slate-700 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Live Speed Benchmark</h3>
                      <p className="text-[10px] text-slate-400">Kathmandu Gateway Node #01</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800/50">
                    Symmetric 1:1
                  </span>
                </div>

                {/* Animated Speed visual */}
                <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 text-center space-y-3">
                  <div className="inline-flex items-center space-x-1.5 text-xs text-cyan-400 font-semibold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/40">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                    <span>Real-Time Optical Throughput</span>
                  </div>

                  <div className="py-2">
                    <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 tracking-tight font-sans">
                      300.8
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Mbps Download & Upload
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="bg-slate-900/90 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Ping</span>
                      <strong className="text-emerald-400 font-mono">2 ms</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Jitter</span>
                      <strong className="text-cyan-400 font-mono">0.4 ms</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Packet Loss</span>
                      <strong className="text-emerald-400 font-mono">0.0%</strong>
                    </div>
                  </div>
                </div>

                {/* Quick actions inside card */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate('speedtest')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>Run Speed Test</span>
                  </button>
                  <button
                    onClick={() => onOpenOrderModal('nw-combo-300')}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Book 300M Plan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FESTIVAL / LIMITED-TIME MEGA OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 p-6 sm:p-8 border border-blue-700/50 shadow-xl overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider inline-block">
                Festive Mega Offer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Get 300 Mbps Fiber + 4K NetWave TV at just NPR 1,333 / month!
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Annual Subscription includes <strong>FREE Dual-Band WiFi 6 ONT Router</strong>, <strong>FREE 4K Android TV Box</strong>, and Zero Installation Cost!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenOrderModal('nw-combo-300')}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Claim Offer Now</span>
              </button>
              <button
                onClick={onOpenWaveBot}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
              >
                Ask WaveBot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED FIBER PACKAGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Transparent Pricing, Zero Hidden Fees</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Most Popular Fiber Packages
            </h2>
          </div>

          {/* Billing Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1 Month
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center space-x-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>12 Months (Save 18%)</span>
              <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-black rounded uppercase">
                Free ONT
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIBER_PLANS.slice(0, 4).map((plan) => {
            const price = plan.prices[billingCycle];
            const monthlyEquivalent = billingCycle === 'annual' ? Math.round(price / 12) : price;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 border ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-950 border-cyan-400/80 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.targetAudience}</p>
                  </div>

                  {/* Speed Badge */}
                  <div className="py-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-300 font-semibold">Speed:</span>
                    </div>
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {plan.speedMbps} Mbps
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2">
                    <div className="flex items-baseline">
                      <span className="text-xs text-slate-400 font-semibold mr-1">NPR</span>
                      <span className="text-3xl font-black text-white font-sans">
                        {monthlyEquivalent.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 ml-1.5">/ mo</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-[11px] text-cyan-400 mt-0.5">
                        Billed annually (NPR {price.toLocaleString()} + Free Setup)
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/60">
                  <button
                    onClick={() => onOpenOrderModal(plan.id)}
                    className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Book Connection</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('plans')}
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm cursor-pointer"
          >
            <span>View All Home, SME & Enterprise Leased Line Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. INTERACTIVE BANDWIDTH & PLAN CALCULATOR QUIZ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sliders className="w-4 h-4" />
                  <span>Bandwidth Recommender</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Find the Perfect Plan for Your Home or Office
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Adjust your household size and online activities to get a tailored speed suggestion.
                </p>
              </div>

              {/* Slider 1: Users */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Connected Users & Smart Devices:</span>
                  <span className="font-black text-cyan-400 text-sm">{usersCount} Devices</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={usersCount}
                  onChange={(e) => setUsersCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1-2 (Solo)</span>
                  <span>4-6 (Family)</span>
                  <span>8+ (Power House)</span>
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setHas4kStreaming(!has4kStreaming)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    has4kStreaming
                      ? 'bg-blue-950/60 border-cyan-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-bold">4K HDR Streaming</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Netflix, YouTube 4K</p>
                </button>

                <button
                  onClick={() => setIsGaming(!isGaming)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isGaming
                      ? 'bg-blue-950/60 border-cyan-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-bold">Online Esports Gaming</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Valorant, Dota 2, PUBG</p>
                </button>

                <button
                  onClick={() => setWantsTv(!wantsTv)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    wantsTv
                      ? 'bg-blue-950/60 border-cyan-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-bold">Live NetWave TV 4K</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">250+ HD Live Channels</p>
                </button>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-blue-950 to-slate-950 p-6 rounded-2xl border border-cyan-500/40 shadow-xl space-y-4">
                <span className="text-[10px] uppercase font-black text-cyan-400 tracking-widest bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800">
                  Recommended Package
                </span>

                <div>
                  <h4 className="text-xl font-black text-white">{recommendedPlan.name}</h4>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {recommendedPlan.speedMbps} Mbps
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Symmetric Optical FTTH</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-slate-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{recommendedPlan.specs.routerType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero Lag for {usersCount} concurrent devices</span>
                  </div>
                  {recommendedPlan.specs.tvChannels && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{recommendedPlan.specs.tvChannels}+ Live 4K/HD TV Channels included</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Annual Plan Rate</span>
                    <p className="text-xl font-black text-white">
                      NPR {recommendedPlan.prices.annual.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenOrderModal(recommendedPlan.id)}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Select & Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE NETWAVE NEPAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Engineering Excellence</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Why Nepal Chooses NetWave Fiber</h2>
          <p className="text-sm text-slate-400">
            Built from the ground up on carrier-grade 10G optical rings with direct cross-border IP transit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Direct International Peering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tier-1 upstream transit via Tata & Airtel through Birgunj and Bhairahawa border gateways. Singapore ping stays under 35ms.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Local Kathmandu CDN Caches</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-country caching nodes for Google, Netflix 4K, Facebook, TikTok, and Akamai ensuring instantaneous video buffer times.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">WiFi 6 Mesh Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation dual-band optical ONTs and Mesh pods eliminate concrete wall dead zones in multi-floor Nepali houses.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">24/7 Field Tech Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Over 200 certified fiber splicers and motorcycle response units in Kathmandu, Pokhara, Chitwan, Butwal & Biratnagar.
            </p>
          </div>
        </div>
      </section>

      {/* 6. NETWAVE 4K TV SHOWCASE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-12 border border-blue-800/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs rounded-md">
                Included with GigaPlay Combos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                NetWave TV 4K <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  250+ Live Channels & Catch-up
                </span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Transform any TV into a smart cinema with our Android 4K Set-top Box. Access Kantipur TV HD, Star Sports HD, Sony Ten HD, HBO HD, plus SonyLIV and Shemaroo.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                  📺 7-Day Catch-up Recording
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                  🎙️ Google Voice Remote
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                  ⚡ 4K Ultra HD HDR
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('tv')}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center space-x-2"
                >
                  <Tv className="w-4 h-4" />
                  <span>Explore Full TV Channel Guide</span>
                </button>
              </div>
            </div>

            {/* Channels Grid Visual */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-3">
              {[
                { name: 'Kantipur HD', tag: 'Nepali', color: 'border-red-500/40' },
                { name: 'Sony Sports HD', tag: 'Live Sports', color: 'border-blue-500/40' },
                { name: 'Star Sports 1', tag: 'Cricket HD', color: 'border-cyan-500/40' },
                { name: 'Galaxy 4K', tag: '4K Ultra', color: 'border-purple-500/40' },
                { name: 'HBO Movies HD', tag: 'Hollywood', color: 'border-amber-500/40' },
                { name: 'Nat Geo 4K', tag: 'Wildlife', color: 'border-emerald-500/40' },
              ].map((ch, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl bg-slate-900/90 border ${ch.color} flex flex-col justify-between items-center text-center h-28 shadow-lg`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">{ch.tag}</span>
                  <p className="text-xs font-black text-white">{ch.name}</p>
                  <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
                    Live Stream
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. COVERAGE QUICK CHECKER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center">
                <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                Check Fiber Availability in Your Locality
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Active in Kathmandu, Lalitpur, Bhaktapur, Pokhara, Chitwan, Butwal, Biratnagar, Dharan & more.
              </p>
            </div>

            <div className="flex w-full sm:w-auto gap-2">
              <input
                type="text"
                value={coverageSearch}
                onChange={(e) => setCoverageSearch(e.target.value)}
                placeholder="Enter Tole / Ward / City..."
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
              />
              <button
                onClick={() => onNavigate('coverage')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl border border-slate-700 cursor-pointer shrink-0"
              >
                View Map
              </button>
            </div>
          </div>

          {coverageSearch && (
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
              {filteredCoverage.length > 0 ? (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-emerald-400 font-bold">Available in:</span>
                  {filteredCoverage.map((r) => (
                    <span key={r.id} className="px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-white">
                      {r.city} ({r.district}) - <strong className="text-cyan-400">{r.availableSpeeds}</strong>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-amber-400">
                  Area expanding rapidly! Click "View Map" to request fiber expansion to your street.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Trusted Across Nepal</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">What Our Subscribers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "We switched to NetWave 300 Mbps in Jhamsikhel. Ping to Singapore Dota 2 servers is consistently 32ms with zero packet loss even during peak evening hours!"
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">
                PK
              </div>
              <div>
                <p className="text-xs font-bold text-white">Prashant Karki</p>
                <p className="text-[10px] text-slate-400">Jhamsikhel, Lalitpur (Esports Gamer)</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Our 25-person software startup in Baneshwor runs entirely on NetWave SME Fiber. Symmetric upload speed makes pushing Docker builds and cloud backups effortless."
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                SM
              </div>
              <div>
                <p className="text-xs font-bold text-white">Srijana Maharjan</p>
                <p className="text-[10px] text-slate-400">CTO, Vertex Tech Nepal</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "NetWave TV with 4K set-top box replaced our old cable TV completely. My parents love the 7-day catch-up feature for Nepali news, and bill payment via eSewa is instant."
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                RB
              </div>
              <div>
                <p className="text-xs font-bold text-white">Roshan Bhandari</p>
                <p className="text-[10px] text-slate-400">Lakeside, Pokhara</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM MOBILE APP BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">NetWave Self-Care Mobile App</h3>
              <p className="text-xs text-slate-400">
                Change WiFi password, reboot router remotely, pay bills via eSewa/Khalti, and monitor data usage on the go.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('selfcare')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
            >
              Open Web Self-Care
            </button>
            <button
              onClick={() => onOpenOrderModal()}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-md"
            >
              Get NetWave Fiber
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
