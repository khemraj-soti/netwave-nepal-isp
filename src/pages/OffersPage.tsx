import React from 'react';
import { 
  Sparkles, 
  Gift, 
  Percent, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Share2, 
  Tv, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface OffersPageProps {
  onOpenOrderModal: (planId?: string) => void;
  onNavigate: (page: string) => void;
  onOpenQuickPay: () => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onOpenOrderModal,
  onNavigate,
  onOpenQuickPay,
}) => {
  const offers = [
    {
      id: 'dashain-tihar',
      badge: 'Festive Mega Deal',
      title: 'Festival Dhamaka 2026: 12 Months + 2 Months Free',
      subtitle: 'Subscribe to any Annual Home or Combo plan and get 2 additional bonus months of pure fiber internet.',
      perks: [
        'Total 14 Months of High-Speed Fiber for the price of 12',
        'Free Dual-Band WiFi 6 Optical Router (Worth NPR 3,500)',
        'Zero Installation Fee + 200m Free Optical Drop Wire',
        'Free 1 Year NetWave TV 4K Set-Top Box activation',
      ],
      planId: 'nw-combo-300',
      validTill: 'Limited Time Seasonal Offer',
      popular: true,
    },
    {
      id: 'dual-band-discount',
      badge: 'Hardware Upgrade',
      title: '50% Off Smart Mesh WiFi Extender Node',
      subtitle: 'Eliminate dead zones in multi-story houses. Add an additional Gigabit Mesh repeater node at half price.',
      perks: [
        'Seamless whole-home roaming on single SSID',
        'Auto-switches to strongest 5GHz signal',
        'Covers up to 3,500 sq. ft across 3 floors',
        'Plug & Play optical auto-configuration',
      ],
      planId: 'nw-combo-500',
      validTill: 'Ongoing Promotion',
      popular: false,
    },
    {
      id: 'referral-bonus',
      badge: 'Refer & Earn',
      title: 'Refer a Neighbor or Friend, Get 1 Month Free',
      subtitle: 'Share your NetWave Customer ID with friends in your neighborhood. When they connect, both get 30 days of free fiber!',
      perks: [
        'Unlimited referrals: refer 12 friends = 1 whole year free',
        'Your friend gets free installation and waiver on router deposit',
        'Instant credit applied to your next billing cycle',
      ],
      planId: 'nw-home-200',
      validTill: 'Active All Year',
      popular: false,
    },
    {
      id: 'sme-startup-bundle',
      badge: 'Business Special',
      title: 'Startup & SME Business Booster (300 Mbps)',
      subtitle: 'Special corporate rate for registered Nepali startups, IT agencies, and clinics with free static IPv4.',
      perks: [
        'Dedicated 300 Mbps symmetric business throughput',
        '1x Free Public Static IPv4 Address for hosting/CCTV/VPN',
        'Priority SLA with 2-Hour field technician dispatch guarantee',
        'Official VAT invoice with PAN credit reconciliation',
      ],
      planId: 'nw-sme-300',
      validTill: 'Valid for New Business Accounts',
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Exclusive Promos & Discounts
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          NetWave Nepal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
            Special Deals & Festive Offers
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Maximize your savings with Nepal’s best fiber internet deals, free router hardware upgrades, and referral rewards.
        </p>
      </div>

      {/* 2. Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 border transition-all ${
              offer.popular
                ? 'bg-gradient-to-br from-blue-950/90 via-slate-900 to-slate-950 border-cyan-400/80 shadow-2xl shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/40 text-xs font-bold uppercase tracking-wider">
                  {offer.badge}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                  {offer.validTill}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">{offer.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{offer.subtitle}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Offer Highlights:
                </span>
                {offer.perks.map((p, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => onNavigate('plans')}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                View Plan Pricing
              </button>

              <button
                onClick={() => onOpenOrderModal(offer.planId)}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Claim This Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Referral Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Subscriber Referral Club</span>
          <h2 className="text-2xl font-black text-white">Already a NetWave Subscriber?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Invite your friends to switch to pure optical fiber. Share your Customer ID (found on your Self-Care dashboard) to enjoy free monthly service credits automatically applied to your account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('selfcare')}
            className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Get My Referral Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
