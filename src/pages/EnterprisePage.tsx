import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Server, 
  Zap, 
  CheckCircle2, 
  Activity, 
  PhoneCall, 
  Mail, 
  Globe2, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnterprisePageProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenWaveBot: () => void;
}

export const EnterprisePage: React.FC<EnterprisePageProps> = ({ onOpenOrderModal, onOpenWaveBot }) => {
  // Quote Calculator State
  const [speed, setSpeed] = useState(500); // Mbps
  const [locationsCount, setLocationsCount] = useState(1);
  const [needPublicIps, setNeedPublicIps] = useState(true);
  const [needBackupLink, setNeedBackupLink] = useState(true);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Kathmandu');
  const [submitted, setSubmitted] = useState(false);

  // Calculated enterprise monthly estimate
  const baseRatePerMbps = speed >= 1000 ? 14 : speed >= 500 ? 18 : 22;
  const rawEst = speed * baseRatePerMbps * locationsCount;
  const ipAddon = needPublicIps ? 2000 : 0;
  const backupAddon = needBackupLink ? rawEst * 0.4 : 0;
  const estimatedMonthlyNpr = Math.round(rawEst + ipAddon + backupAddon);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !phone.trim()) {
      alert('Please fill in Company Name, Contact Person, and Mobile Number.');
      return;
    }
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-wider">
              Mission-Critical Connectivity
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Enterprise 1:1 Dedicated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                Fiber Leased Lines in Nepal
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Engineered for banks, software enterprises, hospitals, and educational institutions. Guaranteed 99.99% uptime SLA, redundant multi-homed BGP routing, and 24/7 dedicated Network Operations Center (NOC) engineers.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#quote-calc"
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Calculate Corporate Quote</span>
              </a>
              <button
                onClick={onOpenWaveBot}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
              >
                Talk to Enterprise Advisor
              </button>
            </div>
          </div>

          {/* SLA Performance Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise SLA Standard</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800/60">
                  99.99% Guaranteed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Contention Ratio</span>
                  <strong className="text-cyan-400 text-sm">1:1 Pure Uncontended</strong>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Mean Time To Restore</span>
                  <strong className="text-emerald-400 text-sm">&lt; 15 Minutes MTTR</strong>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Public IPv4 Pool</span>
                  <strong className="text-white text-sm">/29 Subnet (5 Usable)</strong>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">BGP Peering</span>
                  <strong className="text-white text-sm">Tata + Airtel + NPIX</strong>
                </div>
              </div>

              {/* Simulated MRTG Graph Visual */}
              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Live 24h Bandwidth Flow</span>
                  <span className="text-emerald-400">Steady 500.0 Mbps</span>
                </div>
                <div className="h-16 bg-slate-900 rounded-lg p-2 flex items-end justify-between gap-1 border border-slate-800">
                  {[60, 85, 90, 75, 88, 95, 92, 85, 90, 94, 98, 92, 90, 95, 88, 92, 96, 90].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="w-full bg-cyan-500/80 rounded-t-sm"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Enterprise Solutions Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Enterprise Solutions</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Full-Spectrum Corporate Telecom</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Internet Leased Line (ILL)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated full-duplex fiber internet from 50 Mbps up to 10 Gbps with 1:1 non-shared bandwidth and real-time SNMP/MRTG portal.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Dark Fiber & Metro Ethernet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Point-to-Point and Point-to-Multipoint Layer-2 connectivity between your corporate branches, disaster recovery data centers, and head office.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Cloud Direct Connect</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Low-latency private cross-connects to AWS Mumbai/Singapore, Microsoft Azure, and Google Cloud with sub-40ms round-trip latency.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Quote Calculator & Proposal Form */}
      <div id="quote-calc" className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Interactive Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Custom Bandwidth Configurator</span>
              <h3 className="text-2xl font-black text-white mt-1">Estimate Enterprise Leased Line Cost</h3>
            </div>

            {/* Speed Selector */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Dedicated Bandwidth (1:1 Symmetric):</span>
                <span className="text-base font-black text-cyan-400">{speed} Mbps</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>50 Mbps</span>
                <span>500 Mbps</span>
                <span>1 Gbps</span>
                <span>2 Gbps</span>
              </div>
            </div>

            {/* Branches Selector */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Number of Office Locations in Nepal:</span>
                <span className="text-base font-black text-cyan-400">{locationsCount} Site{locationsCount > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={locationsCount}
                onChange={(e) => setLocationsCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Checkbox Addons */}
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <div className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    checked={needPublicIps}
                    onChange={(e) => setNeedPublicIps(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500"
                  />
                  <span className="text-xs font-semibold text-slate-200">Public Static IPv4 Subnet (/29 Pool)</span>
                </div>
                <span className="text-xs font-bold text-cyan-400">+ NPR 2,000 / mo</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <div className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    checked={needBackupLink}
                    onChange={(e) => setNeedBackupLink(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500"
                  />
                  <span className="text-xs font-semibold text-slate-200">Automatic Optical Failover Redundant Ring</span>
                </div>
                <span className="text-xs font-bold text-cyan-400">High Availability</span>
              </label>
            </div>

            {/* Estimated Quote Box */}
            <div className="bg-gradient-to-r from-blue-950 to-slate-950 p-5 rounded-2xl border border-cyan-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Monthly Fee</span>
                <div className="text-2xl font-black text-cyan-400">
                  NPR {estimatedMonthlyNpr.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ mo + VAT</span>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                Official PAN / VAT Invoice
              </span>
            </div>
          </div>

          {/* Right: Proposal Request Form */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {!submitted ? (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <h4 className="text-base font-bold text-white">Request Official Enterprise SLA Proposal</h4>
                <p className="text-xs text-slate-400">
                  Our corporate solutions architect will prepare a formal technical and commercial quote within 2 business hours.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Himalayan FinTech Pvt. Ltd."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Anil Shrestha (IT Head)"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Corporate Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="it@company.com.np"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Kathmandu">Kathmandu (New Baneshwor / Naxal / Durbarmarg)</option>
                      <option value="Lalitpur">Lalitpur (Jhamsikhel / Pulchowk / Kupondole)</option>
                      <option value="Pokhara">Pokhara Metropolitan</option>
                      <option value="Chitwan">Chitwan (Bharatpur / Narayangarh)</option>
                      <option value="Butwal">Butwal / Bhairahawa</option>
                      <option value="Biratnagar">Biratnagar Metropolitan</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4 fill-slate-950" />
                  <span>Request Custom RFP / Proposal</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Proposal Request Received!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, <strong>{contactPerson}</strong> from <strong>{companyName}</strong>. Our Enterprise Account Manager will reach out to you within 2 business hours.
                </p>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left font-mono">
                  <div>Quoted Speed: {speed} Mbps 1:1 Symmetric</div>
                  <div>Locations: {locationsCount} Site(s) in {city}</div>
                  <div>Estimated Monthly: NPR {estimatedMonthlyNpr.toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
