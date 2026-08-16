import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Sparkles, 
  Smartphone, 
  Building, 
  QrCode, 
  Calendar,
  AlertCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_ACCOUNTS } from '../data/ispData';

interface QuickPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickPayModal: React.FC<QuickPayModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('NW104829');
  const [searchedAccount, setSearchedAccount] = useState<any>(SAMPLE_ACCOUNTS['NW104829']);
  const [selectedDuration, setSelectedDuration] = useState<number>(12); // months
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | 'connectips' | 'fonepay' | 'card'>('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    if (SAMPLE_ACCOUNTS[clean]) {
      setSearchedAccount(SAMPLE_ACCOUNTS[clean]);
    } else {
      // Create a simulated account for any entered ID/Phone
      setSearchedAccount({
        customerId: clean || 'NW-GUEST-99',
        name: 'Suman KC',
        phone: query.startsWith('98') ? query : '9841998877',
        username: 'suman_fiber',
        planName: 'Home Plus Turbo (200 Mbps)',
        speedMbps: 200,
        expiryDate: '2026-08-18',
        daysRemaining: 2,
        balanceDue: 1249,
      });
    }
  };

  // Pricing calculations
  const monthlyRate = searchedAccount?.speedMbps === 300 ? 1599 : searchedAccount?.speedMbps === 500 ? 2199 : 1249;
  let totalBase = monthlyRate * selectedDuration;
  if (selectedDuration === 3) totalBase = totalBase * 0.95; // 5% off
  if (selectedDuration === 6) totalBase = totalBase * 0.90; // 10% off
  if (selectedDuration === 12) totalBase = totalBase * 0.82; // 18% off

  const vat = Math.round(totalBase * 0.13);
  const grandTotal = Math.round(totalBase + vat);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const invoiceNo = `NW-TAX-INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newExpiry = new Date();
      newExpiry.setMonth(newExpiry.getMonth() + selectedDuration);

      setReceiptData({
        invoiceNo,
        customerId: searchedAccount.customerId,
        name: searchedAccount.name,
        phone: searchedAccount.phone,
        plan: searchedAccount.planName,
        durationMonths: selectedDuration,
        method: paymentMethod.toUpperCase(),
        amount: totalBase,
        vat,
        grandTotal,
        date: new Date().toLocaleString(),
        validUntil: newExpiry.toISOString().split('T')[0],
      });
      setIsPaidSuccess(true);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  const handleReset = () => {
    setIsPaidSuccess(false);
    setReceiptData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Instant Online Recharge</span>
              <h3 className="text-lg font-black text-white">NetWave Quick Pay & Bill Renewal</h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {!isPaidSuccess ? (
            <>
              {/* Account Lookup Bar */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Enter Customer ID, Registered Mobile, or Username:
                </label>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. NW104829 or 9841234567"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-md flex items-center space-x-1.5"
                  >
                    <span>Lookup</span>
                  </button>
                </form>

                {/* Demo Quick Select Buttons */}
                <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400">
                  <span>Demo Accounts:</span>
                  <button
                    onClick={() => { setQuery('NW104829'); setSearchedAccount(SAMPLE_ACCOUNTS['NW104829']); }}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700 cursor-pointer font-mono"
                  >
                    NW104829 (Active)
                  </button>
                  <button
                    onClick={() => { setQuery('NW209144'); setSearchedAccount(SAMPLE_ACCOUNTS['NW209144']); }}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-slate-700 cursor-pointer font-mono"
                  >
                    NW209144 (Due)
                  </button>
                </div>
              </div>

              {/* Account Details Card */}
              {searchedAccount && (
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-500">Subscriber Name</span>
                      <h4 className="text-sm font-bold text-white">{searchedAccount.name}</h4>
                      <p className="text-xs text-cyan-400 font-mono">ID: {searchedAccount.customerId}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500">Current Expiry</span>
                      <p className="text-xs font-bold text-white flex items-center justify-end">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {searchedAccount.expiryDate}
                      </p>
                      <span className="text-[11px] text-amber-400 font-medium">
                        ({searchedAccount.daysRemaining} days remaining)
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Active Package:</span>
                    <strong className="text-cyan-300">{searchedAccount.planName}</strong>
                  </div>
                </div>
              )}

              {/* Renewal Duration Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Renewal Duration:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { months: 1, label: '1 Month', badge: 'Standard' },
                    { months: 3, label: '3 Months', badge: 'Save 5%' },
                    { months: 6, label: '6 Months', badge: 'Save 10%' },
                    { months: 12, label: '12 Months', badge: 'Save 18% (Best)' },
                  ].map((dur) => (
                    <button
                      key={dur.months}
                      onClick={() => setSelectedDuration(dur.months)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedDuration === dur.months
                          ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-md'
                          : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">{dur.label}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{dur.badge}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Payment Gateway:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setPaymentMethod('esewa')}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'esewa'
                        ? 'bg-emerald-950/60 border-emerald-400 text-white ring-1 ring-emerald-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      eS
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">eSewa Wallet</p>
                      <p className="text-[10px] text-slate-400">Instant Verification</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('khalti')}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'khalti'
                        ? 'bg-purple-950/60 border-purple-400 text-white ring-1 ring-purple-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                      KH
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">Khalti Digital</p>
                      <p className="text-[10px] text-slate-400">Wallet & Points</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('fonepay')}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'fonepay'
                        ? 'bg-red-950/60 border-red-400 text-white ring-1 ring-red-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                      FP
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">Fonepay QR</p>
                      <p className="text-[10px] text-slate-400">Scan via Bank App</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('connectips')}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'connectips'
                        ? 'bg-blue-950/60 border-blue-400 text-white ring-1 ring-blue-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                      cIPS
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">ConnectIPS</p>
                      <p className="text-[10px] text-slate-400">Direct NCHL</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white ring-1 ring-cyan-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-700 text-cyan-400 font-black text-xs flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">Debit / Credit</p>
                      <p className="text-[10px] text-slate-400">Visa / Mastercard</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Plan Subscription ({selectedDuration} Month{selectedDuration > 1 ? 's' : ''}):</span>
                  <span>NPR {Math.round(totalBase).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Govt. 13% VAT:</span>
                  <span>NPR {vat.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
                  <span>Total Amount Due:</span>
                  <span className="text-xl font-black text-emerald-400">NPR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Gateway Transaction...</span>
                  </>
                ) : (
                  <>
                    <span>Pay NPR {grandTotal.toLocaleString()} via {paymentMethod.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            /* SUCCESS INVOICE RECEIPT */
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Payment Successful</span>
                <h3 className="text-xl font-black text-white mt-0.5">NetWave Fiber Account Renewed!</h3>
                <p className="text-xs text-slate-400">Your fiber speed and television services are active with zero downtime.</p>
              </div>

              {/* Official Tax Invoice Container */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <div>
                    <p className="font-bold text-white font-sans text-sm">NETWAVE NEPAL PVT. LTD.</p>
                    <p className="text-slate-500 text-[10px]">PAN/VAT: 609823145 | NTA Lic: ISP-082/83</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-700/60 rounded text-[10px] font-bold">
                      PAID
                    </span>
                    <p className="text-slate-400 text-[10px] mt-1">{receiptData?.invoiceNo}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Customer Name:</span>
                    <strong className="text-white font-sans">{receiptData?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Customer ID:</span>
                    <strong className="text-cyan-300">{receiptData?.customerId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Package:</span>
                    <span className="text-white">{receiptData?.plan}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">New Expiry Date:</span>
                    <span className="text-emerald-400 font-bold">{receiptData?.validUntil}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Payment Method:</span>
                    <span className="text-white">{receiptData?.method} Gateway</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Transaction Time:</span>
                    <span className="text-slate-400">{receiptData?.date}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-2 space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Amount:</span>
                    <span>NPR {Math.round(receiptData?.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>13% VAT:</span>
                    <span>NPR {receiptData?.vat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-slate-800">
                    <span>Total Paid:</span>
                    <span className="text-emerald-400">NPR {receiptData?.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print Tax Invoice</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
