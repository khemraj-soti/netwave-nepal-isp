import React, { useState } from 'react';
import { 
  Wifi, 
  Tv, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Gauge, 
  UserCheck, 
  CreditCard, 
  Headphones, 
  Building2, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  Zap,
  Globe,
  Tag,
  Info,
  HelpCircle,
  Mail,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenOrderModal: (planId?: string) => void;
  onOpenQuickPay: () => void;
  onOpenWaveBot: () => void;
  currentUser?: { name: string; customerId: string } | null;
  onLogout?: () => void;
  currentLanguage?: 'en' | 'nep';
  onToggleLanguage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenOrderModal,
  onOpenQuickPay,
  onOpenWaveBot,
  currentUser = null,
  onLogout = () => {},
  currentLanguage = 'en',
  onToggleLanguage = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: currentLanguage === 'nep' ? 'गृहपृष्ठ' : 'Home' },
    { id: 'plans', label: currentLanguage === 'nep' ? 'इन्टरनेट योजनाहरू' : 'Internet Plans' },
    { 
      id: 'services', 
      label: currentLanguage === 'nep' ? 'सेवाहरू' : 'Services',
      isDropdown: true,
      subItems: [
        { id: 'tv', label: 'NetWave TV 4K', icon: Tv, desc: '250+ HD Live Channels & OTT' },
        { id: 'enterprise', label: 'Enterprise Leased Line', icon: Building2, desc: '1:1 Dedicated 99.99% SLA' },
        { id: 'speedtest', label: 'Speed Test Tool', icon: Gauge, desc: 'HTML5 Optical Speedometer' },
      ]
    },
    { id: 'coverage', label: currentLanguage === 'nep' ? 'कभरेज' : 'Coverage' },
    { id: 'offers', label: currentLanguage === 'nep' ? 'अफरहरू' : 'Offers', badge: '50% Off' },
    { id: 'about', label: currentLanguage === 'nep' ? 'हाम्रोबारे' : 'About Us' },
    { id: 'faq', label: currentLanguage === 'nep' ? 'प्रश्नोत्तर' : 'FAQ' },
    { id: 'support', label: currentLanguage === 'nep' ? 'सपोर्ट' : 'Support' },
    { id: 'contact', label: currentLanguage === 'nep' ? 'सम्पर्क' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900 text-xs py-1.5 px-4 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              {currentLanguage === 'nep' 
                ? 'नेपालभर अप्टिकल फाइबर ९९.९८% सुचारु' 
                : 'All Nepal Fiber Rings 99.98% Operational'}
            </span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <span className="hidden md:inline-flex items-center text-slate-300">
              <PhoneCall className="w-3 h-3 mr-1 text-cyan-400" />
              24/7 Helpline: <strong className="ml-1 text-white">+977-1-4789000 / 9801234567</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            {/* WaveBot AI Chat trigger */}
            <button
              onClick={onOpenWaveBot}
              className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-blue-600/60 hover:bg-blue-600 text-cyan-200 transition-colors cursor-pointer text-xs font-semibold shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>WaveBot AI Assistant</span>
            </button>
            <span className="hidden sm:inline text-slate-500">|</span>

            {/* Language Selector (EN / NEP) */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              title="Toggle English and Nepali Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-white">
                {currentLanguage === 'nep' ? 'नेपाली (NEP)' : 'English (EN)'}
              </span>
              <span className="text-[10px] text-cyan-400 px-1 py-0.2 bg-slate-900 rounded font-mono">
                {currentLanguage === 'nep' ? 'EN' : 'नेपा'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo - Returns to Home */}
          <div 
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <Wifi className="w-6 h-6 text-white transform -rotate-12" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  NET<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">WAVE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  Nepal
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider">Next-Gen Pure Optical FTTH</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((item) => {
              if (item.isDropdown) {
                const isSubActive = ['tv', 'enterprise', 'speedtest'].includes(activePage);
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
                        isSubActive ? 'text-cyan-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Services Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-fadeIn">
                        {item.subItems?.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                onNavigate(sub.id);
                                setServicesDropdownOpen(false);
                              }}
                              className="w-full p-2 rounded-xl text-left hover:bg-slate-800 flex items-start space-x-2.5 transition-colors cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-lg bg-cyan-950/80 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-800/40">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white">{sub.label}</p>
                                <p className="text-[10px] text-slate-400">{sub.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-2.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center space-x-1 cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 bg-slate-800/80 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 bg-gradient-to-r from-red-500 to-amber-500 text-[9px] font-bold text-white rounded-full uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Auth State */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Quick Pay Bill Button */}
            <button
              onClick={onOpenQuickPay}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quick Pay</span>
            </button>

            {/* Get Connected Button */}
            <button
              onClick={() => onOpenOrderModal()}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Zap className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
              <span>Get Connected</span>
            </button>

            {/* Login / User Session */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-cyan-500/40 text-xs text-cyan-300 font-bold hover:bg-slate-700 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate max-w-[100px]">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 border-b border-slate-800 text-[11px]">
                      <p className="text-slate-400">Customer ID</p>
                      <p className="font-mono font-bold text-white">{currentUser.customerId}</p>
                    </div>
                    <button
                      onClick={() => { onNavigate('selfcare'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 rounded-xl flex items-center space-x-2"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Self-Care Portal</span>
                    </button>
                    <button
                      onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-400 hover:bg-slate-800 rounded-xl flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-xs">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-2.5 py-1.5 text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Login
                </button>
                <span className="text-slate-600">/</span>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-2.5 py-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenQuickPay}
              className="px-2.5 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-lg"
            >
              Pay Bill
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Top Quick Actions */}
          <div className="grid grid-cols-2 gap-2 py-1">
            <button
              onClick={() => { onOpenOrderModal(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Get Connected</span>
            </button>
            <button
              onClick={() => { onOpenQuickPay(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 bg-slate-800 text-emerald-400 font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center space-x-1 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Quick Pay Bill</span>
            </button>
          </div>

          {/* User Status in Mobile */}
          {currentUser ? (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Logged in as:</span>
                <strong className="text-white font-semibold">{currentUser.name} ({currentUser.customerId})</strong>
              </div>
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="px-2 py-1 bg-red-950 text-red-300 rounded border border-red-800 text-[10px] font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                className="py-2 text-center bg-slate-800 text-slate-200 font-bold rounded-xl border border-slate-700"
              >
                Customer Login
              </button>
              <button
                onClick={() => { onNavigate('register'); setMobileMenuOpen(false); }}
                className="py-2 text-center bg-cyan-950 text-cyan-300 font-bold rounded-xl border border-cyan-800"
              >
                Register
              </button>
            </div>
          )}

          {/* Navigation Links list */}
          <div className="divide-y divide-slate-800/80 pt-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'plans', label: 'Internet Plans' },
              { id: 'tv', label: 'NetWave TV 4K Channels' },
              { id: 'enterprise', label: 'Enterprise Leased Line & SME' },
              { id: 'coverage', label: 'Coverage & Fiber Status' },
              { id: 'offers', label: 'Festive Offers & Deals' },
              { id: 'about', label: 'About NetWave Nepal' },
              { id: 'faq', label: 'Frequently Asked Questions (FAQ)' },
              { id: 'support', label: 'Support & LED Diagnostics' },
              { id: 'contact', label: 'Contact Us & Branches' },
              { id: 'selfcare', label: 'Customer Self-Care Dashboard' },
              { id: 'speedtest', label: 'Speedometer Speed Test' },
            ].map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between py-2.5 px-2 text-xs font-semibold rounded-md text-left ${
                    isActive ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Helpline: +977-1-4789000 / 9801234567
            </p>
            <p className="text-slate-400">Head Office: NetWave Tower, New Baneshwor, Kathmandu</p>
          </div>
        </div>
      )}
    </header>
  );
};
