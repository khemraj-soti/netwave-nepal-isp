import React, { useState } from 'react';
import { 
  UserCheck, 
  Wifi, 
  Tv, 
  CreditCard, 
  RotateCw, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Calendar, 
  AlertCircle, 
  Download, 
  Printer, 
  CheckCircle2, 
  Lock, 
  Plus, 
  RefreshCw,
  Send,
  Zap,
  HelpCircle
} from 'lucide-react';
import { SAMPLE_ACCOUNTS } from '../data/ispData';

interface SelfCarePageProps {
  onOpenQuickPay: () => void;
  onOpenOrderModal: (planId?: string) => void;
  onOpenWaveBot: () => void;
}

export const SelfCarePage: React.FC<SelfCarePageProps> = ({
  onOpenQuickPay,
  onOpenOrderModal,
  onOpenWaveBot,
}) => {
  const [activeAccountId, setActiveAccountId] = useState('NW104829');
  const account = SAMPLE_ACCOUNTS[activeAccountId] || SAMPLE_ACCOUNTS['NW104829'];

  // Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'router' | 'billing' | 'tickets'>('overview');

  // Router Control States
  const [wifiSsid, setWifiSsid] = useState(account.wifiSsid);
  const [wifiPassword, setWifiPassword] = useState('netwave@fast2026');
  const [showPassword, setShowPassword] = useState(false);
  const [wifiSaveSuccess, setWifiSaveSuccess] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootDone, setRebootDone] = useState(false);

  // New Support Ticket State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'Slow Speed' | 'No Internet / Red LOS' | 'WiFi Issue' | 'Billing & Recharge'>('Slow Speed');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);

  const handleSaveWifi = (e: React.FormEvent) => {
    e.preventDefault();
    if (wifiPassword.length < 8) {
      alert('WiFi password must be at least 8 characters.');
      return;
    }
    setWifiSaveSuccess(true);
    setTimeout(() => setWifiSaveSuccess(false), 3000);
  };

  const handleRebootRouter = () => {
    setIsRebooting(true);
    setRebootDone(false);
    setTimeout(() => {
      setIsRebooting(false);
      setRebootDone(true);
      setTimeout(() => setRebootDone(false), 4000);
    }, 2500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim()) {
      alert('Please enter subject and description.');
      return;
    }
    const newTkt = {
      id: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: account.customerId,
      customerName: account.name,
      phone: account.phone,
      subject: ticketSubject,
      category: ticketCategory,
      priority: 'Medium' as const,
      status: 'Open' as const,
      createdAt: 'Just now',
      lastUpdated: 'Just now',
      description: ticketDesc,
      technicianAssigned: 'Support Center Queue',
    };
    account.tickets.unshift(newTkt);
    setTicketCreated(true);
    setTicketSubject('');
    setTicketDesc('');
    setTimeout(() => setTicketCreated(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      {/* 1. Top Customer Profile Strip */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
              {account.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white">{account.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                  Active FTTH
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Customer ID: <strong className="text-cyan-400 font-mono">{account.customerId}</strong> • Mobile: {account.phone} • IP: {account.ipAddress}
              </p>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="flex items-center space-x-2 self-start md:self-auto">
            <span className="text-xs text-slate-400">Switch Demo User:</span>
            <button
              onClick={() => setActiveAccountId('NW104829')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                activeAccountId === 'NW104829'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              Aayush (Active)
            </button>
            <button
              onClick={() => setActiveAccountId('NW209144')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                activeAccountId === 'NW209144'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              Pooja (Due)
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
          {[
            { id: 'overview', label: 'Subscription Overview', icon: Zap },
            { id: 'router', label: 'Remote Router & WiFi Setup', icon: Wifi },
            { id: 'billing', label: 'Invoices & Quick Pay', icon: CreditCard },
            { id: 'tickets', label: 'My Support Tickets', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Plan Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Active Subscription</span>
            <div>
              <h3 className="text-xl font-black text-white">{account.planName}</h3>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-1">
                {account.speedMbps} Mbps <span className="text-xs text-slate-400 font-normal">Symmetric</span>
              </p>
            </div>

            <div className="pt-2 space-y-2 text-xs text-slate-300 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Expiry Date:</span>
                <strong className="text-emerald-400">{account.expiryDate}</strong>
              </div>
              <div className="flex justify-between">
                <span>Days Remaining:</span>
                <strong className="text-cyan-300">{account.daysRemaining} Days</strong>
              </div>
              <div className="flex justify-between">
                <span>Fair Usage:</span>
                <strong className="text-white">{account.dataCapGB}</strong>
              </div>
            </div>

            <button
              onClick={onOpenQuickPay}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-xl transition-colors cursor-pointer"
            >
              Renew / Upgrade Plan
            </button>
          </div>

          {/* Data Consumption Stats */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Data Consumption (This Month)</span>
            <div>
              <p className="text-4xl font-black text-white font-mono">{account.dataUsedGB} <span className="text-sm font-normal text-slate-400">GB</span></p>
              <p className="text-xs text-slate-400 mt-1">Total upload and download traffic</p>
            </div>

            {/* Simulated usage breakdown */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
              <div className="flex justify-between text-slate-300">
                <span>4K Video / NetWave TV:</span>
                <span>240.2 GB (57%)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Gaming & Downloads:</span>
                <span>112.5 GB (27%)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>General Web & Work:</span>
                <span>65.8 GB (16%)</span>
              </div>
            </div>
          </div>

          {/* Connected Hardware & Nodes */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Hardware Terminal Status</span>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Smart Optical ONT</p>
                  <p className="text-[10px] text-slate-400">{account.wifiBand}</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Active WiFi Devices</p>
                  <p className="text-[10px] text-slate-400">{account.connectedDevices} Connected Devices</p>
                </div>
                <span className="text-xs font-bold text-cyan-400 font-mono">{account.connectedDevices} Online</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('router')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Open WiFi & Router Control
            </button>
          </div>
        </div>
      )}

      {/* 3. TAB 2: REMOTE ROUTER & WIFI CONTROL */}
      {activeTab === 'router' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WiFi SSID & Password Form */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="text-lg font-black text-white">Remote WiFi Configuration</h3>
              <p className="text-xs text-slate-400">Update your router's WiFi broadcast name and security key remotely.</p>
            </div>

            <form onSubmit={handleSaveWifi} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WiFi Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WiFi Security Key (WPA2/WPA3)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[11px] text-cyan-400 font-semibold cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {wifiSaveSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WiFi settings pushed to optical ONT successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                Apply Changes to ONT
              </button>
            </form>
          </div>

          {/* Remote Reboot & Devices Manager */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-white">Remote Router Reboot</h3>
                <p className="text-xs text-slate-400">Power-cycle your optical router remotely to refresh laser signal without unplugging.</p>
              </div>

              {rebootDone && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optical router rebooted and re-authenticated with ISP node!</span>
                </div>
              )}

              <button
                onClick={handleRebootRouter}
                disabled={isRebooting}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <RotateCw className={`w-4 h-4 ${isRebooting ? 'animate-spin' : ''}`} />
                <span>{isRebooting ? 'Rebooting ONT (15s)...' : 'Reboot Optical Router Now'}</span>
              </button>
            </div>

            {/* Connected Devices List */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Connected Devices (5 GHz / 2.4 GHz)</h4>
              <div className="space-y-2 text-xs">
                {[
                  { name: "Aayush's MacBook Pro M3", ip: '192.168.1.14', type: 'Laptop' },
                  { name: 'Samsung 4K Smart TV', ip: '192.168.1.22', type: 'Smart TV' },
                  { name: 'iPhone 15 Pro Max', ip: '192.168.1.35', type: 'Mobile' },
                  { name: 'Sony PlayStation 5', ip: '192.168.1.50', type: 'Console' },
                ].map((dev, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{dev.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">IP: {dev.ip} • 5.0 GHz</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-cyan-300">{dev.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: BILLING & INVOICES */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Billing History & Tax Invoices</h3>
              <p className="text-xs text-slate-400">Download officially stamped VAT invoices for company reimbursement.</p>
            </div>
            <button
              onClick={onOpenQuickPay}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
            >
              Recharge Account
            </button>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Invoice No</th>
                  <th className="py-4 px-4">Period / Plan</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Total Amount</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {account.paymentHistory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/40">
                    <td className="py-4 px-6 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                    <td className="py-4 px-4">{inv.billingPeriod}</td>
                    <td className="py-4 px-4 text-slate-400">{inv.dueDate}</td>
                    <td className="py-4 px-4 font-bold text-white">NPR {inv.totalAmount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-semibold cursor-pointer border border-slate-700"
                      >
                        Print PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 4: SUPPORT TICKETS */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Create New Ticket Form */}
          <div className="md:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Raise New Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Issue Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Slow Speed">Slow Speed / Buffer</option>
                  <option value="No Internet / Red LOS">No Internet / Red LOS Blinking</option>
                  <option value="WiFi Issue">WiFi Range / Password</option>
                  <option value="Billing & Recharge">Billing & Recharge</option>
                  <option value="NetWave TV Issue">NetWave TV Set-Top Box</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Brief Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. WiFi signal weak in 2nd floor bedroom"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Describe what lights are glowing on your router or specific details..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              {ticketCreated && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ticket created and queued for field tech dispatch!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black rounded-xl shadow-md cursor-pointer"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>

          {/* Ticket History */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-white">Your Service Complaints & Tickets</h3>
            {account.tickets.length > 0 ? (
              <div className="space-y-3">
                {account.tickets.map((tkt) => (
                  <div key={tkt.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono font-bold text-cyan-400">{tkt.id}</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">{tkt.subject}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tkt.status === 'Resolved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {tkt.status}
                      </span>
                    </div>

                    <p className="text-slate-400">{tkt.description}</p>

                    <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500">
                      <span>Created: {tkt.createdAt}</span>
                      <span className="text-slate-300 font-semibold">{tkt.technicianAssigned}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-xs text-slate-400">
                No active complaints. Your fiber connection is healthy!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
