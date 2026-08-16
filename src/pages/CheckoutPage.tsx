import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Clock, 
  ArrowLeft,
  Lock,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FIBER_PLANS } from '../data/ispData';
import { FiberPlan } from '../types';

interface CheckoutPageProps {
  selectedPlanId?: string;
  onNavigate: (page: string) => void;
  onOpenQuickPay: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlanId = 'nw-home-200',
  onNavigate,
  onOpenQuickPay,
}) => {
  const [activePlanId, setActivePlanId] = useState<string>(selectedPlanId);
  const [billingDuration, setBillingDuration] = useState<'monthly' | 'quarterly' | 'semiAnnual' | 'annual'>('annual');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Kathmandu');
  const [installationDate, setInstallationDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [installationTimeSlot, setInstallationTimeSlot] = useState('Morning (9:00 AM - 1:00 PM)');
  const [notes, setNotes] = useState('');

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRequestId, setGeneratedRequestId] = useState('');

  // Find plan details
  const plan: FiberPlan = FIBER_PLANS.find(p => p.id === activePlanId) || FIBER_PLANS[1];

  const durationMonths = billingDuration === 'monthly' ? 1 : billingDuration === 'quarterly' ? 3 : billingDuration === 'semiAnnual' ? 6 : 12;
  const basePrice = plan.prices[billingDuration];
  const vatAmount = Math.round(basePrice * 0.13);
  const installationFee = billingDuration === 'annual' ? 0 : 1000;
  const routerDeposit = 0; // Free on promotion
  const grandTotal = basePrice + vatAmount + installationFee + routerDeposit;

  // Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters';
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      errs.phone = 'Mobile phone number is required';
    } else if (!/^(98|97|96|01)\d{7,8}$/.test(cleanPhone) && cleanPhone.length !== 10) {
      errs.phone = 'Enter a valid 10-digit mobile number (e.g., 98XXXXXXXX)';
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errs.email = 'Enter a valid email address (e.g., name@gmail.com)';
    }

    if (!address.trim()) {
      errs.address = 'Street address / Tole & Ward number is required';
    }

    if (!city) {
      errs.city = 'City selection is required';
    }

    if (!installationDate) {
      errs.installationDate = 'Preferred installation date is required';
    } else {
      const selected = new Date(installationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.installationDate = 'Installation date cannot be in the past';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reqId = `REQ-NW-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedRequestId(reqId);

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('netwave_connection_requests') || '[]');
      const newRequest = {
        requestId: reqId,
        createdAt: new Date().toISOString(),
        planId: plan.id,
        planName: plan.name,
        speedMbps: plan.speedMbps,
        duration: billingDuration,
        grandTotal,
        customer: {
          fullName,
          phone,
          email,
          address,
          city,
          installationDate,
          installationTimeSlot,
          notes,
        },
        status: 'Pending Verification',
      };
      localStorage.setItem('netwave_connection_requests', JSON.stringify([newRequest, ...existing]));
    } catch (e) {
      console.error(e);
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-100">
      {/* Top Breadcrumb / Back button */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => onNavigate('plans')}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Plans & Packages</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official NTA Licensed Fiber ISP • 100% Optical FTTH</span>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Connection Request Form */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Step 2 of 2: Installation Details
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Order High-Speed Fiber Connection
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fill in your location details. Our field technician will survey and install pure optical fiber within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                  <User className="w-4 h-4 text-cyan-400 mr-2" />
                  Subscriber Information
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="e.g. Roshan Sharma"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="98XXXXXXXX"
                        className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                          errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="roshan@example.com"
                        className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Installation Location */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                  <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                  Installation Location & Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      City / District <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="Kathmandu">Kathmandu Metropolitan</option>
                      <option value="Lalitpur">Lalitpur (Pulchowk / Jawalakhel)</option>
                      <option value="Bhaktapur">Bhaktapur / Madhyapur Thimi</option>
                      <option value="Pokhara">Pokhara Metropolitan (Gandaki)</option>
                      <option value="Chitwan">Chitwan (Bharatpur / Narayangarh)</option>
                      <option value="Butwal">Butwal / Bhairahawa (Lumbini)</option>
                      <option value="Biratnagar">Biratnagar Metropolitan (Koshi)</option>
                      <option value="Dharan">Dharan / Itahari (Sunsari)</option>
                      <option value="Nepalgunj">Nepalgunj / Kohalpur (Banke)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Exact Address (Tole / Ward / Landmark) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                      }}
                      placeholder="e.g. Ward-10, New Baneshwor (Near NIC Asia)"
                      className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                        errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                  <Calendar className="w-4 h-4 text-cyan-400 mr-2" />
                  Preferred Installation Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      value={installationDate}
                      onChange={(e) => {
                        setInstallationDate(e.target.value);
                        if (errors.installationDate) setErrors(prev => ({ ...prev, installationDate: '' }));
                      }}
                      className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none cursor-pointer ${
                        errors.installationDate ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                      }`}
                    />
                    {errors.installationDate && <p className="text-[11px] text-red-400 mt-1">{errors.installationDate}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={installationTimeSlot}
                      onChange={(e) => setInstallationTimeSlot(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Notes or Landmark Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. 3rd floor house with white gate, call before arriving"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-6 border-t border-slate-800">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Submit Connection Request</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center">
                  <Lock className="w-3 h-3 mr-1 text-emerald-400" />
                  No advance payment needed now. Pay upon physical installation & speed verification.
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Plan Summary & Price Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Plan Card */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    Selected Package
                  </span>
                  <h2 className="text-xl font-black text-white">{plan.name}</h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {plan.speedMbps} <span className="text-xs text-slate-400">Mbps</span>
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-bold">1:1 Symmetric Fiber</span>
                </div>
              </div>

              {/* Change Plan Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Change Selected Package:
                </label>
                <select
                  value={activePlanId}
                  onChange={(e) => setActivePlanId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {FIBER_PLANS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.speedMbps} Mbps) - NPR {p.prices.annual.toLocaleString()}/yr
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Switcher */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subscription Duration:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'monthly', label: '1 Month', note: 'Standard' },
                    { id: 'quarterly', label: '3 Months', note: 'Save 5%' },
                    { id: 'semiAnnual', label: '6 Months', note: 'Save 10%' },
                    { id: 'annual', label: '12 Months', note: 'Free Setup' },
                  ].map(d => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setBillingDuration(d.id as any)}
                      className={`p-2.5 rounded-xl text-left border cursor-pointer transition-all ${
                        billingDuration === d.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{d.label}</div>
                      <div className="text-[10px] text-cyan-400">{d.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Features list */}
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Included In This Plan:
                </span>
                {plan.features.slice(0, 4).map((f, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Plan Charge ({durationMonths} Month{durationMonths > 1 ? 's' : ''})</span>
                  <span className="font-mono text-white">NPR {basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Govt. 13% VAT</span>
                  <span className="font-mono text-white">NPR {vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Optical ONT Setup & Drop Fiber</span>
                  <span className="font-mono text-emerald-400">
                    {installationFee === 0 ? 'FREE (Promo)' : `NPR ${installationFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Optical Terminal (ONT) Device</span>
                  <span className="font-mono text-emerald-400">Included on Contract</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-slate-800">
                  <span className="text-sm font-bold text-white">Total Amount Due</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-cyan-400 font-mono">
                      NPR {grandTotal.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-slate-400">All Taxes Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Order Confirmed Screen */
        <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-full border border-emerald-800">
              Connection Request Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Thank You, {fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Your fiber installation request has been successfully registered in our central dispatch system.
            </p>
          </div>

          {/* Request ID Display */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Generated Connection Request ID</span>
            <div className="text-2xl font-black text-cyan-400 font-mono tracking-wider">
              {generatedRequestId}
            </div>
          </div>

          {/* Details Summary Table */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left text-xs space-y-2 text-slate-300 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan Selected:</span>
              <strong className="text-white">{plan.name} ({plan.speedMbps} Mbps)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Billing Duration:</span>
              <strong className="text-white">{billingDuration.toUpperCase()} ({durationMonths} Months)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Date:</span>
              <strong className="text-cyan-400">{installationDate} ({installationTimeSlot})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Installation Address:</span>
              <strong className="text-white">{address}, {city}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact Phone:</span>
              <strong className="text-white">{phone}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
              <span className="text-slate-300 font-bold">Total on Installation:</span>
              <strong className="text-emerald-400 font-black">NPR {grandTotal.toLocaleString()}</strong>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer"
            >
              Return to Homepage
            </button>
            <button
              onClick={onOpenQuickPay}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
            >
              Pay or Recharge Existing Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
