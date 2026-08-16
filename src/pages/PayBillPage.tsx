import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Download, 
  Lock, 
  ShieldCheck, 
  Phone, 
  User, 
  Calendar, 
  Clock, 
  RotateCw,
  Zap,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_ACCOUNTS } from '../data/ispData';
import { BillRecord } from '../types';

interface PayBillPageProps {
  onNavigate: (page: string) => void;
  onOpenOrderModal: (planId?: string) => void;
}

export const PayBillPage: React.FC<PayBillPageProps> = ({ onNavigate, onOpenOrderModal }) => {
  const [customerIdInput, setCustomerIdInput] = useState('NW209144');
  const [phoneInput, setPhoneInput] = useState('9801987654');
  const [searchError, setSearchError] = useState('');
  
  // Found Bill State
  const [searchedBill, setSearchedBill] = useState<{
    customerId: string;
    customerName: string;
    phone: string;
    planName: string;
    speedMbps: number;
    billingPeriod: string;
    amount: number;
    vatAmount: number;
    totalAmount: number;
    status: 'unpaid' | 'paid' | 'overdue';
    dueDate: string;
    expiryDate: string;
    invoiceNumber: string;
  } | null>({
    customerId: 'NW209144',
    customerName: 'Pooja Gurung',
    phone: '9801987654',
    planName: 'Home Plus Turbo',
    speedMbps: 200,
    billingPeriod: '1 Month Monthly Renewal',
    amount: 1105.31,
    vatAmount: 143.69,
    totalAmount: 1249,
    status: 'unpaid',
    dueDate: '2026-08-20',
    expiryDate: '2026-08-20',
    invoiceNumber: 'NW-INV-2026-09418',
  });

  // Payment method selection & processing
  const [selectedGateway, setSelectedGateway] = useState<'esewa' | 'khalti' | 'connectips' | 'fonepay' | 'card'>('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

  const handleFindBill = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setPaymentSuccess(false);

    const cleanId = customerIdInput.trim().toUpperCase();
    const cleanPhone = phoneInput.trim();

    if (!cleanId) {
      setSearchError('Please enter your Customer ID or Username.');
      return;
    }

    if (!cleanPhone) {
      setSearchError('Please enter your registered mobile number.');
      return;
    }

    // Look up in SAMPLE_ACCOUNTS or generate realistic record
    const account = SAMPLE_ACCOUNTS[cleanId];
    if (account) {
      const unpaidInv = account.paymentHistory.find(p => p.status === 'unpaid');
      if (unpaidInv) {
        setSearchedBill({
          customerId: account.customerId,
          customerName: account.name,
          phone: account.phone,
          planName: account.planName,
          speedMbps: account.speedMbps,
          billingPeriod: unpaidInv.billingPeriod,
          amount: unpaidInv.amount,
          vatAmount: unpaidInv.vatAmount,
          totalAmount: unpaidInv.totalAmount,
          status: 'unpaid',
          dueDate: unpaidInv.dueDate,
          expiryDate: unpaidInv.expiryDate,
          invoiceNumber: unpaidInv.invoiceNumber,
        });
      } else {
        // Active account already paid or due for renewal
        setSearchedBill({
          customerId: account.customerId,
          customerName: account.name,
          phone: account.phone,
          planName: account.planName,
          speedMbps: account.speedMbps,
          billingPeriod: '12 Months Annual Renewal',
          amount: 14158.41,
          vatAmount: 1840.59,
          totalAmount: 15999,
          status: 'unpaid',
          dueDate: account.expiryDate,
          expiryDate: account.expiryDate,
          invoiceNumber: `NW-INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        });
      }
    } else {
      // Dynamic fallback for any custom user ID entered
      setSearchedBill({
        customerId: cleanId,
        customerName: 'NetWave Subscriber',
        phone: cleanPhone,
        planName: 'Home Plus Turbo (200 Mbps)',
        speedMbps: 200,
        billingPeriod: '1 Month Monthly Renewal',
        amount: 1105.31,
        vatAmount: 143.69,
        totalAmount: 1249,
        status: 'unpaid',
        dueDate: '2026-08-25',
        expiryDate: '2026-08-25',
        invoiceNumber: `NW-INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      });
    }
  };

  const handlePayNow = () => {
    if (!searchedBill) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txId = `TXN-NW-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const dateStr = new Date().toLocaleString();

      const txRecord = {
        txId,
        gateway: selectedGateway.toUpperCase(),
        date: dateStr,
        amount: searchedBill.totalAmount,
        invoiceNumber: searchedBill.invoiceNumber,
        customerId: searchedBill.customerId,
        customerName: searchedBill.customerName,
        planName: searchedBill.planName,
        newExpiry: '2027-08-20 (Extended +365 Days)',
      };

      setTransactionDetails(txRecord);
      setPaymentSuccess(true);
      setSearchedBill(prev => prev ? { ...prev, status: 'paid' } : null);

      // Save locally
      try {
        const stored = JSON.parse(localStorage.getItem('netwave_payments') || '[]');
        localStorage.setItem('netwave_payments', JSON.stringify([txRecord, ...stored]));
      } catch (e) {}

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-100">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted Instant Payment Gateway</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          Instant Online Bill Pay & Account Recharge
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Renew Your NetWave Fiber Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Pay your monthly or annual subscription online via eSewa, Khalti, ConnectIPS, or Fonepay with zero surcharge fees.
        </p>
      </div>

      {/* Search Bar / Lookup Card */}
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white flex items-center">
            <Search className="w-4 h-4 text-cyan-400 mr-2" />
            Lookup Subscriber Account
          </h2>
          {/* Quick Demo Pickers */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Quick Test:</span>
            <button
              onClick={() => {
                setCustomerIdInput('NW209144');
                setPhoneInput('9801987654');
              }}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded font-mono cursor-pointer text-[11px]"
            >
              NW209144 (Due Bill)
            </button>
            <button
              onClick={() => {
                setCustomerIdInput('NW104829');
                setPhoneInput('9841234567');
              }}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono cursor-pointer text-[11px]"
            >
              NW104829 (Aayush)
            </button>
          </div>
        </div>

        <form onSubmit={handleFindBill} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Customer ID / Username <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={customerIdInput}
                onChange={(e) => setCustomerIdInput(e.target.value)}
                placeholder="e.g. NW209144"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Registered Mobile Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {searchError && (
            <p className="text-xs text-red-400 flex items-center">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              {searchError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Find Bill</span>
          </button>
        </form>
      </div>

      {/* Bill Results Display Card */}
      {searchedBill && (
        <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {!paymentSuccess ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Official VAT Billing Invoice
                  </span>
                  <h3 className="text-xl font-black text-white">{searchedBill.invoiceNumber}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  searchedBill.status === 'paid'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {searchedBill.status === 'paid' ? 'PAID' : 'PAYMENT DUE'}
                </span>
              </div>

              {/* Bill Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">Customer Name</span>
                  <strong className="text-white text-sm">{searchedBill.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Customer ID</span>
                  <strong className="text-cyan-400 font-mono text-sm">{searchedBill.customerId}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Subscribed Plan</span>
                  <strong className="text-white text-sm">{searchedBill.planName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Billing Period</span>
                  <strong className="text-slate-200">{searchedBill.billingPeriod}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Due / Expiry Date</span>
                  <strong className="text-amber-400 font-mono">{searchedBill.dueDate}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Payment Status</span>
                  <strong className="text-amber-400">{searchedBill.status.toUpperCase()}</strong>
                </div>
              </div>

              {/* Amount Breakdown Table */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Base Subscription Charge</span>
                  <span className="font-mono text-white">NPR {searchedBill.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Govt. 13% Value Added Tax (VAT)</span>
                  <span className="font-mono text-white">NPR {searchedBill.vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-slate-800">
                  <span className="text-sm font-bold text-white">Total Payable Amount</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">
                    NPR {searchedBill.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Gateway Selector */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Instant Payment Partner:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'esewa', label: 'eSewa', color: 'border-emerald-600 bg-emerald-950/40 text-emerald-300' },
                    { id: 'khalti', label: 'Khalti', color: 'border-purple-600 bg-purple-950/40 text-purple-300' },
                    { id: 'connectips', label: 'ConnectIPS', color: 'border-blue-600 bg-blue-950/40 text-blue-300' },
                    { id: 'fonepay', label: 'Fonepay QR', color: 'border-red-600 bg-red-950/40 text-red-300' },
                    { id: 'card', label: 'Debit/Credit', color: 'border-slate-600 bg-slate-800 text-slate-200' },
                  ].map(gw => (
                    <button
                      key={gw.id}
                      type="button"
                      onClick={() => setSelectedGateway(gw.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        selectedGateway === gw.id
                          ? `${gw.color} ring-2 ring-cyan-400 shadow-md`
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {gw.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pay Now Trigger */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Processing eSewa / Nepal Gateway Simulation...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay NPR {searchedBill.totalAmount.toLocaleString()} via {selectedGateway.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Successful Payment Receipt Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-full border border-emerald-800">
                  Payment Successful
                </span>
                <h2 className="text-2xl font-black text-white">Bill Paid & Subscription Renewed!</h2>
                <p className="text-xs text-slate-300">
                  Your NetWave Fiber internet account has been re-authenticated and extended instantly.
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left text-xs font-mono space-y-2.5 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Transaction ID:</span>
                  <strong className="text-cyan-400">{transactionDetails?.txId}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Invoice Number:</span>
                  <strong className="text-white">{transactionDetails?.invoiceNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer ID & Name:</span>
                  <strong className="text-white">{transactionDetails?.customerId} ({transactionDetails?.customerName})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway:</span>
                  <strong className="text-emerald-400">{transactionDetails?.gateway}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <strong className="text-white">{transactionDetails?.date}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <strong className="text-emerald-400 text-sm">NPR {transactionDetails?.amount.toLocaleString()} (Paid in Full)</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Account Validity:</span>
                  <strong className="text-cyan-300">{transactionDetails?.newExpiry}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Receipt</span>
                </button>
                <button
                  onClick={() => onNavigate('selfcare')}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Go to Self-Care Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
