import React, { useState } from 'react';
import { 
  Wifi, 
  Tv, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  Info,
  Server,
  Layers,
  Award
} from 'lucide-react';
import { FIBER_PLANS } from '../data/ispData';

interface PlansPageProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenQuickPay: () => void;
  onOpenWaveBot: () => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({
  onOpenOrderModal,
  onOpenQuickPay,
  onOpenWaveBot,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'home' | 'combo' | 'sme' | 'enterprise'>('all');
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'semiAnnual' | 'annual'>('annual');

  const filteredPlans = FIBER_PLANS.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Transparent Fiber Plans & Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Superfast Fiber Internet <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
            Tailored For Every Home & Enterprise
          </span>
        </h1>
        <p className="text-base text-slate-300">
          All NetWave Nepal subscriptions include 100% symmetric fiber speed, dual-band smart optical ONT router, and IPv6 DDoS protection.
        </p>

        {/* Duration Switcher */}
        <div className="pt-4 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            {[
              { id: 'monthly', label: '1 Month', note: 'Standard' },
              { id: 'quarterly', label: '3 Months', note: 'Save 5%' },
              { id: 'semiAnnual', label: '6 Months', note: 'Save 10%' },
              { id: 'annual', label: '12 Months (Best Value)', note: 'Save 18% + Free Setup' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDuration(d.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  duration === d.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div>{d.label}</div>
                <div className={`text-[10px] font-normal ${duration === d.id ? 'text-slate-950 font-bold' : 'text-cyan-400'}`}>
                  {d.note}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'home', label: 'Home Fiber' },
            { id: 'combo', label: 'Fiber + NetWave TV 4K' },
            { id: 'sme', label: 'SME Business' },
            { id: 'enterprise', label: 'Enterprise Leased Line' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => {
          const totalCost = plan.prices[duration];
          const monthsCount = duration === 'monthly' ? 1 : duration === 'quarterly' ? 3 : duration === 'semiAnnual' ? 6 : 12;
          const monthlyEffective = Math.round(totalCost / monthsCount);

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-200 border ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-950/80 via-slate-900 to-slate-950 border-cyan-400/90 shadow-2xl shadow-cyan-500/15 ring-1 ring-cyan-400/40'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                    {plan.category.toUpperCase()} PACKAGE
                  </span>
                  <h3 className="text-2xl font-black text-white mt-0.5">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.targetAudience}</p>
                </div>

                {/* Speed Ticker */}
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Speed Guarantee</span>
                      <p className="text-xs text-slate-200 font-semibold">1:1 Symmetric Fiber</p>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-sans">
                    {plan.speedMbps} <span className="text-xs font-bold text-slate-400">Mbps</span>
                  </span>
                </div>

                {/* Price Display */}
                <div>
                  <div className="flex items-baseline">
                    <span className="text-xs font-bold text-slate-400 mr-1.5">NPR</span>
                    <span className="text-4xl font-black text-white font-sans">
                      {monthlyEffective.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5">/ month</span>
                  </div>

                  <p className="text-xs text-cyan-400 mt-1 font-medium">
                    Total: NPR {totalCost.toLocaleString()} ({monthsCount} Month{monthsCount > 1 ? 's' : ''})
                    {duration === 'annual' && ' + FREE Optical Router Setup'}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Specs Box */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 text-[11px] space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Router Hardware:</span>
                    <strong className="text-slate-200">{plan.specs.routerType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>FUP Policy:</span>
                    <strong className="text-emerald-400">{plan.specs.fupLimit}</strong>
                  </div>
                  {plan.specs.tvChannels && (
                    <div className="flex justify-between">
                      <span>Live 4K TV Channels:</span>
                      <strong className="text-cyan-300">{plan.specs.tvChannels}+ Channels</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/60">
                <button
                  onClick={() => onOpenOrderModal(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Book This Package</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table */}
      <div className="space-y-6 pt-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Feature Matrix</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Compare Plan Specifications</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Plan Name</th>
                <th className="py-4 px-4">Speed</th>
                <th className="py-4 px-4">Included Router</th>
                <th className="py-4 px-4">NetWave TV 4K</th>
                <th className="py-4 px-4">Annual Rate (NPR)</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {FIBER_PLANS.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-white flex items-center space-x-2">
                    <span>{plan.name}</span>
                    {plan.popular && (
                      <span className="px-2 py-0.2 bg-cyan-900/60 text-cyan-300 rounded text-[9px] font-extrabold border border-cyan-700/60">
                        Popular
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-black text-cyan-400">{plan.speedMbps} Mbps</td>
                  <td className="py-4 px-4">{plan.specs.routerType}</td>
                  <td className="py-4 px-4">
                    {plan.specs.tvChannels ? (
                      <span className="text-emerald-400 font-semibold">{plan.specs.tvChannels}+ HD/4K Channels</span>
                    ) : (
                      <span className="text-slate-500">Optional Add-on</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-bold text-white">
                    NPR {plan.prices.annual.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onOpenOrderModal(plan.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-bold rounded-lg border border-slate-700 transition-colors cursor-pointer text-xs"
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
