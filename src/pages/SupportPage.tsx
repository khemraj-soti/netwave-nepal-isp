import React, { useState } from 'react';
import { 
  Headphones, 
  PhoneCall, 
  Mail, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  MessageSquare, 
  HelpCircle, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Activity,
  Send,
  Wifi,
  WifiOff,
  Gauge,
  CreditCard,
  PlusCircle,
  UserCheck,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { BRANCH_LOCATIONS, FAQS } from '../data/ispData';

interface SupportPageProps {
  onOpenWaveBot: () => void;
  onOpenQuickPay: () => void;
  onNavigate?: (page: string) => void;
  onOpenOrderModal?: (planId?: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ 
  onOpenWaveBot, 
  onOpenQuickPay,
  onNavigate = (_page: string) => {},
  onOpenOrderModal = (_planId?: string) => {}
}) => {
  // 6 Support Categories
  const [selectedCategory, setSelectedCategory] = useState<string>('internet_down');

  // Router Diagnostician State
  const [activeLedScenario, setActiveLedScenario] = useState<'normal' | 'red_los' | 'pon_off' | 'wifi_off'>('normal');

  // Track Ticket State
  const [trackingId, setTrackingId] = useState('');
  const [trackedResult, setTrackedResult] = useState<any>(null);

  // Expanded FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const supportCategories = [
    {
      id: 'internet_down',
      title: 'Internet Not Working',
      icon: WifiOff,
      color: 'text-red-400',
      bgColor: 'bg-red-950/40 border-red-800/60',
      description: 'Fiber line disconnected, red light on router, or no internet access.',
      troubleshootTitle: 'Troubleshooting: Complete Internet Loss',
      steps: [
        '1. Check your router power adapter: ensure it is securely plugged into an uninterruptible power supply (UPS).',
        '2. Inspect the thin yellow optical fiber patch cable underneath the router. Ensure it has no sharp kinks or crushed bends.',
        '3. Check the PON and LOS lights: A blinking red LOS light means the external fiber line needs technician splicing.',
        '4. Power cycle the optical terminal: Turn off the power switch for 30 seconds, then power on and wait 2 minutes.',
      ],
      quickActionLabel: 'Dispatch Fiber Splicing Unit',
      quickActionType: 'wavebot',
    },
    {
      id: 'slow_internet',
      title: 'Slow Internet',
      icon: Gauge,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-800/60',
      description: 'Speed below plan speed, high gaming latency, or buffering video playback.',
      troubleshootTitle: 'Troubleshooting: Slow Speeds & High Latency',
      steps: [
        '1. Connect to the 5.0 GHz WiFi network (e.g., NetWave_5G) instead of the 2.4 GHz band for maximum wireless throughput.',
        '2. Disconnect heavy background downloads (torrents, large OS updates) or unauthorized devices from your router.',
        '3. Run our official HTML5 Web Speedtest with a LAN cable connected directly to port 1 for accurate symmetric speed audit.',
        '4. Reboot router to clear memory buffer and auto-select cleanest wireless channel frequency.',
      ],
      quickActionLabel: 'Launch Optical Speed Test',
      quickActionType: 'speedtest',
    },
    {
      id: 'router_problems',
      title: 'Router Problems',
      icon: Wifi,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40 border-cyan-800/60',
      description: 'WiFi password change, router rebooting, overheating, or SSID not visible.',
      troubleshootTitle: 'Troubleshooting: Optical Router & WiFi Configuration',
      steps: [
        '1. Change your WiFi SSID Name and Password instantly without router login via our Self-Care Portal.',
        '2. Keep the router at least 3-4 feet elevated from the ground and away from metal objects, mirrors, and microwaves.',
        '3. Press the WLAN button on the side if the 2.4G/5G LED indicator lights are completely off.',
        '4. Do not use a pin to reset unless instructed by NOC; this erases your OLT fiber authentication profile.',
      ],
      quickActionLabel: 'Manage Router in Self-Care',
      quickActionType: 'selfcare',
    },
    {
      id: 'payment_problems',
      title: 'Payment Problems',
      icon: CreditCard,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-800/60',
      description: 'Recharge failed, account not activated after payment, or invoice receipt inquiry.',
      troubleshootTitle: 'Troubleshooting: Billing, Recharge & Invoices',
      steps: [
        '1. If your eSewa/Khalti/ConnectIPS payment went through but your service remains locked, wait 60 seconds and reboot ONT.',
        '2. Verify your transaction ID on the Pay Bill page using your Customer ID to verify automatic settlement.',
        '3. Download your official PAN/VAT invoice receipt directly from the Self-Care portal.',
        '4. Contact our 24/7 billing verification desk with your digital wallet statement screenshot.',
      ],
      quickActionLabel: 'Open Quick Bill Payment',
      quickActionType: 'paybill',
    },
    {
      id: 'new_connection',
      title: 'New Connection',
      icon: PlusCircle,
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/40 border-blue-800/60',
      description: 'Order new fiber connection, check optical coverage, or request shifting.',
      troubleshootTitle: 'Booking & Shifting Your NetWave Connection',
      steps: [
        '1. Check fiber coverage in your municipality/ward (Kathmandu, Lalitpur, Pokhara, Chitwan, Butwal, Biratnagar, etc.).',
        '2. Choose your preferred speed (100 Mbps to 1 Gbps) with optional NetWave TV 4K combo bundle.',
        '3. Free installation and WiFi 6 optical router hardware included on all 12-month annual contracts.',
        '4. Free house shifting available within all NetWave covered optical distribution zones in Nepal.',
      ],
      quickActionLabel: 'Book New Connection',
      quickActionType: 'checkout',
    },
    {
      id: 'account_problems',
      title: 'Account Problems',
      icon: UserCheck,
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/40 border-purple-800/60',
      description: 'Self-Care login issue, forgot customer ID, ownership transfer, or plan upgrade.',
      troubleshootTitle: 'Troubleshooting: Account Credentials & Ownership',
      steps: [
        '1. Your Customer ID is sent via SMS to your registered mobile number upon optical installation.',
        '2. Log in with your Customer ID (e.g., NW104829) or registered mobile number on the Self-Care portal.',
        '3. Upgrade your speed tier in 1-click on your Self-Care dashboard with prorated billing adjustments.',
        '4. For transfer of ownership, submit an inquiry through our Contact page with your Citizenship copy.',
      ],
      quickActionLabel: 'Login to Customer Account',
      quickActionType: 'login',
    },
  ];

  const currentCategoryData = supportCategories.find(c => c.id === selectedCategory) || supportCategories[0];

  const handleCategoryAction = (actionType: string) => {
    if (actionType === 'wavebot') onOpenWaveBot();
    else if (actionType === 'speedtest') onNavigate('speedtest');
    else if (actionType === 'selfcare') onNavigate('selfcare');
    else if (actionType === 'paybill') onOpenQuickPay();
    else if (actionType === 'checkout') onOpenOrderModal();
    else if (actionType === 'login') onNavigate('login');
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    const clean = trackingId.trim().toUpperCase();
    if (clean.includes('99120')) {
      setTrackedResult({
        id: 'TKT-99120',
        customer: 'Aayush Shrestha',
        subject: 'Router upgrade to WiFi 6 Optical Box',
        status: 'Resolved',
        technician: 'Ramesh Thapa (Field Tech ID: 412)',
        notes: 'Technician visited site, replaced optical patch cable, and verified 300 Mbps throughput.',
      });
    } else {
      setTrackedResult({
        id: clean,
        customer: 'Subscriber',
        subject: 'Fiber Line Signal & Inspection',
        status: 'In Progress (Technician En Route)',
        technician: 'Suresh Gurung (Motorcycle Unit #18)',
        notes: 'Technician is dispatched to your local distribution node with optical fusion splicer.',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          24/7 Dedicated Customer Care
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          NetWave Nepal Support & Self-Help Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Click any issue category below for instant step-by-step guidance, router LED troubleshooting, and field technician dispatch.
        </p>
      </div>

      {/* 2. Hotlines Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">24/7 Phone Helpline</h3>
          <p className="text-xs text-slate-400">Toll-free & Direct Customer Support lines</p>
          <div className="pt-2 font-mono font-bold text-cyan-400 text-sm">
            +977-1-4789000 <br />
            +977-9801234567
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">WhatsApp & WaveBot AI</h3>
          <p className="text-xs text-slate-400">Instant answers in Nepali & English</p>
          <div className="pt-2">
            <button
              onClick={onOpenWaveBot}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-md"
            >
              Open WaveBot AI Chat
            </button>
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Email NOC Support</h3>
          <p className="text-xs text-slate-400">For enterprise inquiries & billing issues</p>
          <div className="pt-2 font-mono font-bold text-blue-400 text-xs">
            support@netwavenepal.com.np <br />
            billing@netwavenepal.com.np
          </div>
        </div>
      </div>

      {/* 3. CLICKABLE 6 SUPPORT CATEGORIES */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Interactive Diagnostics</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Select Your Issue Category</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Click a card below to open immediate diagnostic instructions and direct resolution actions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {supportCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? `${cat.bgColor} ring-2 ring-cyan-400 shadow-xl scale-[1.02]`
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center ${cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white leading-tight">{cat.title}</h3>
                </div>
                <span className="text-[10px] text-cyan-400 font-semibold mt-2">
                  {isSelected ? '● Active' : 'Tap to solve →'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Detail Panel */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="px-3 py-0.5 bg-cyan-950 text-cyan-400 rounded-full border border-cyan-800 text-[10px] font-bold uppercase">
                Active Category Solution
              </span>
              <h3 className="text-xl font-black text-white">{currentCategoryData.troubleshootTitle}</h3>
              <p className="text-xs text-slate-400">{currentCategoryData.description}</p>
            </div>

            <button
              onClick={() => handleCategoryAction(currentCategoryData.quickActionType)}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center space-x-2 shrink-0"
            >
              <span>{currentCategoryData.quickActionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCategoryData.steps.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE VISUAL ROUTER LIGHTS DIAGNOSTICIAN */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 shadow-2xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Visual Troubleshooter</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Optical Router (ONT) LED Diagnostic Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Select what you observe on your physical router's front LEDs to see instant diagnostic guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Simulated Physical Router Box */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white font-mono">NETWAVE FIBER SMART ONT AC1200</span>
              <span className="text-[10px] text-slate-500 font-mono">GPON ONU</span>
            </div>

            {/* LED Strip */}
            <div className="grid grid-cols-6 gap-2 text-center">
              {/* 1. POWER */}
              <div className="space-y-2">
                <div className="w-4 h-4 rounded-full mx-auto bg-emerald-400 shadow-md shadow-emerald-400/50"></div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">PWR</span>
              </div>

              {/* 2. PON */}
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto transition-all ${
                  activeLedScenario === 'normal'
                    ? 'bg-emerald-400 shadow-md shadow-emerald-400/50'
                    : activeLedScenario === 'pon_off' || activeLedScenario === 'red_los'
                    ? 'bg-slate-700'
                    : 'bg-emerald-400'
                }`}></div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">PON</span>
              </div>

              {/* 3. LOS */}
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto transition-all ${
                  activeLedScenario === 'red_los'
                    ? 'bg-red-500 animate-ping shadow-lg shadow-red-500/80'
                    : 'bg-slate-800'
                }`}></div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">LOS</span>
              </div>

              {/* 4. LAN */}
              <div className="space-y-2">
                <div className="w-4 h-4 rounded-full mx-auto bg-emerald-400"></div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">LAN</span>
              </div>

              {/* 5. 2.4G */}
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto ${
                  activeLedScenario === 'wifi_off' ? 'bg-slate-800' : 'bg-emerald-400'
                }`}></div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">2.4G</span>
              </div>

              {/* 6. 5G */}
              <div className="space-y-2">
                <div className={`w-4 h-4 rounded-full mx-auto ${
                  activeLedScenario === 'wifi_off' ? 'bg-slate-800' : 'bg-emerald-400'
                }`}></div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">5G</span>
              </div>
            </div>

            {/* Scenario Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800 text-xs">
              <button
                onClick={() => setActiveLedScenario('normal')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                  activeLedScenario === 'normal' ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <strong>Solid Green PON (Normal)</strong>
              </button>
              <button
                onClick={() => setActiveLedScenario('red_los')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                  activeLedScenario === 'red_los' ? 'bg-red-950 border-red-500 text-red-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <strong>Blinking Red LOS Light</strong>
              </button>
              <button
                onClick={() => setActiveLedScenario('pon_off')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                  activeLedScenario === 'pon_off' ? 'bg-amber-950 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <strong>PON Light Off</strong>
              </button>
              <button
                onClick={() => setActiveLedScenario('wifi_off')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                  activeLedScenario === 'wifi_off' ? 'bg-blue-950 border-blue-400 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <strong>WiFi 2.4G/5G Lights Off</strong>
              </button>
            </div>
          </div>

          {/* Diagnostic Result & Solution Box */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            {activeLedScenario === 'normal' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Optical Signal Normal (Healthy)
                </span>
                <h4 className="text-lg font-bold text-white">Laser Power is within -18 to -23 dBm range</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your optical connection to the NetWave OLT distribution node is fully authorized and transmitting data at peak speeds. If any device cannot browse, try forgetting the WiFi network on your phone or rebooting the device.
                </p>
              </div>
            )}

            {activeLedScenario === 'red_los' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" /> Red LOS: Loss of Optical Laser Signal
                </span>
                <h4 className="text-lg font-bold text-white">Fiber Break or Disconnected Optical Drop Patch</h4>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>1. Check the thin yellow fiber cable plugged beneath the router (blue/green SC/APC connector). Ensure it is firmly clicked in and not bent sharply.</p>
                  <p>2. Do not bend optical patch cord under 30mm radius.</p>
                  <p>3. If the drop wire from the utility pole has snapped due to road work or branch, our motorcycle fiber splicing unit can fix it immediately.</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onOpenWaveBot}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md"
                  >
                    Dispatch Emergency Fiber Technician
                  </button>
                </div>
              </div>
            )}

            {activeLedScenario === 'pon_off' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" /> PON Negotiating / Auth Pending
                </span>
                <h4 className="text-lg font-bold text-white">Optical Terminal Not Registered with OLT</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The router is receiving laser light but has not established PPPoE session or GPON serial authentication. Power cycle the router once for 15 seconds. If it fails to turn solid green within 2 minutes, call our NOC hotline.
                </p>
              </div>
            )}

            {activeLedScenario === 'wifi_off' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1.5" /> WiFi Antennas Disabled
                </span>
                <h4 className="text-lg font-bold text-white">WLAN Radio Button Turned Off</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Press and hold the small 'WLAN' or 'WiFi' button on the side of your ONT router for 3 seconds until the 2.4G and 5G green LEDs illuminate.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Track Complaint / Ticket Status */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-xl space-y-6">
        <div className="max-w-xl">
          <h3 className="text-xl font-black text-white">Track Existing Complaint / Support Ticket</h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter your Ticket ID (e.g. <strong className="text-cyan-400 font-mono">TKT-99120</strong>) to view real-time technician dispatch status.
          </p>
        </div>

        <form onSubmit={handleTrackTicket} className="flex gap-2 max-w-lg">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Ticket ID..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {trackedResult && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-xs max-w-lg">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="font-mono font-bold text-cyan-400 text-sm">{trackedResult.id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                {trackedResult.status}
              </span>
            </div>
            <p className="text-white font-bold">{trackedResult.subject}</p>
            <p className="text-slate-400">{trackedResult.notes}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
              <span>Technician: <strong className="text-cyan-300">{trackedResult.technician}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* 6. Branch Office Directory */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Nationwide Presence</span>
          <h2 className="text-2xl font-black text-white mt-1">Regional Branch Offices & Experience Lounges</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCH_LOCATIONS.map((b) => (
            <div key={b.id} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-lg">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-white">{b.city} Center</h3>
                {b.isHeadOffice && (
                  <span className="px-2 py-0.5 rounded bg-blue-900 text-cyan-300 text-[10px] font-bold border border-blue-700">
                    Corporate HQ
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{b.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{b.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Searchable FAQs Accordion */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Got Questions?</span>
          <h2 className="text-2xl font-black text-white mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
