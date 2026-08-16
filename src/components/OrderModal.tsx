import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Wifi, 
  Tv, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FIBER_PLANS } from '../data/ispData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialPlanId = 'nw-home-200',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'semiAnnual' | 'annual'>('annual');
  
  // Addons
  const [addMeshNode, setAddMeshNode] = useState(false);
  const [addTvBox, setAddTvBox] = useState(false);
  const [addStaticIp, setAddStaticIp] = useState(false);

  // Address & Personal details
  const [city, setCity] = useState('Kathmandu');
  const [ward, setWard] = useState('New Baneshwor');
  const [streetAddress, setStreetAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [installDate, setInstallDate] = useState('Tomorrow (Preferred Slot)');
  const [notes, setNotes] = useState('');

  // Booking Result
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentPlan = FIBER_PLANS.find(p => p.id === selectedPlanId) || FIBER_PLANS[1];

  // Pricing math
  const basePrice = currentPlan.prices[billingCycle];
  const monthsMultiplier = billingCycle === 'monthly' ? 1 : billingCycle === 'quarterly' ? 3 : billingCycle === 'semiAnnual' ? 6 : 12;
  
  const meshPrice = addMeshNode ? 2500 : 0;
  const tvBoxPrice = addTvBox ? 1500 : 0;
  const staticIpPrice = addStaticIp ? 500 * monthsMultiplier : 0;

  const subTotal = basePrice + meshPrice + tvBoxPrice + staticIpPrice;
  const vatAmount = Math.round(subTotal * 0.13); // Nepal 13% VAT
  const installationFee = billingCycle === 'annual' ? 0 : 1000; // Free on annual
  const routerDeposit = 1000; // Refundable deposit
  const totalPayable = subTotal + vatAmount + installationFee + routerDeposit;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!fullName.trim() || !phone.trim() || !streetAddress.trim()) {
        alert('Please enter your Name, Phone Number, and Street Address to proceed.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Generate booking reference
      const ref = `NW-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(ref);
      setStep(4);
      
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>NetWave FTTH New Connection Booking</span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              {step === 4 ? 'Booking Confirmed!' : 'Get High-Speed Fiber Internet Installed'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1-3) */}
        {step < 4 && (
          <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                1
              </span>
              <span>Select Plan & Cycle</span>
            </div>
            <span className="h-0.5 w-8 bg-slate-800"></span>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                2
              </span>
              <span>Location & Details</span>
            </div>
            <span className="h-0.5 w-8 bg-slate-800"></span>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                3
              </span>
              <span>Review & Confirm</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Plan & Billing Cycle Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  1. Choose Fiber Internet Package:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {FIBER_PLANS.map((plan) => {
                    const isSelected = plan.id === selectedPlanId;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-bold text-white">{plan.name}</span>
                          {plan.badge && (
                            <span className="text-[10px] bg-cyan-500 text-slate-950 font-extrabold px-1.5 py-0.2 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <div className="my-2">
                          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            {plan.speedMbps}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">Mbps FTTH</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{plan.targetAudience}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Duration Switcher */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  2. Choose Subscription Duration:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'monthly', label: '1 Month', discount: 'Standard' },
                    { key: 'quarterly', label: '3 Months', discount: 'Save 5%' },
                    { key: 'semiAnnual', label: '6 Months', discount: 'Save 10%' },
                    { key: 'annual', label: '12 Months (Best)', discount: 'Free Setup + Save 18%' },
                  ].map((cycle) => (
                    <button
                      key={cycle.key}
                      onClick={() => setBillingCycle(cycle.key as any)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        billingCycle === cycle.key
                          ? 'bg-cyan-500/20 border-cyan-400 text-white'
                          : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">{cycle.label}</div>
                      <div className="text-[11px] text-cyan-400 font-medium">{cycle.discount}</div>
                      <div className="text-xs font-extrabold mt-1 text-white">
                        NPR {currentPlan.prices[cycle.key as keyof typeof currentPlan.prices].toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Add-ons */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  3. Optional Hardware & Value Add-ons:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700 hover:border-slate-600 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={addTvBox}
                        onChange={(e) => setAddTvBox(e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                      />
                      <div>
                        <p className="text-xs font-bold text-white flex items-center">
                          <Tv className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                          NetWave TV 4K Android Set-Top Box
                        </p>
                        <p className="text-[11px] text-slate-400">250+ HD Live Channels with 7-Day Catch-up TV</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-300">+ NPR 1,500 (One-time)</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700 hover:border-slate-600 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={addMeshNode}
                        onChange={(e) => setAddMeshNode(e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                      />
                      <div>
                        <p className="text-xs font-bold text-white flex items-center">
                          <Wifi className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                          Extra WiFi 6 Mesh Extender Node
                        </p>
                        <p className="text-[11px] text-slate-400">Eliminate dead zones across multi-story homes</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-300">+ NPR 2,500</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700 hover:border-slate-600 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={addStaticIp}
                        onChange={(e) => setAddStaticIp(e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Public Static IPv4 Address</p>
                        <p className="text-[11px] text-slate-400">Ideal for CCTV DVRs, hosting, and remote office VPNs</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-300">+ NPR 500 / mo</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Address & Customer Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Selected Plan:</span>
                  <p className="text-sm font-black text-cyan-400">{currentPlan.name} ({currentPlan.speedMbps} Mbps FTTH)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Duration:</span>
                  <p className="text-xs font-bold text-white capitalize">{billingCycle} Billing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    City / District *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Kathmandu">Kathmandu Metropolitan</option>
                    <option value="Lalitpur">Lalitpur Metropolitan</option>
                    <option value="Bhaktapur">Bhaktapur / Thimi</option>
                    <option value="Pokhara">Pokhara Metropolitan (Gandaki)</option>
                    <option value="Bharatpur">Bharatpur / Narayangarh (Chitwan)</option>
                    <option value="Butwal">Butwal / Bhairahawa (Lumbini)</option>
                    <option value="Biratnagar">Biratnagar Metropolitan (Koshi)</option>
                    <option value="Dharan">Dharan / Itahari</option>
                    <option value="Nepalgunj">Nepalgunj / Kohalpur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tole / Area / Ward *
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="e.g. Ward 10, New Baneshwor"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Exact Street Address / Landmark / House No. *
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. House #42, Near Krishna Mandir, Opposite Global IME Bank"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Bibek Adhikari"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number (For SMS & Technician Call) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Installation Slot
                  </label>
                  <select
                    value={installDate}
                    onChange={(e) => setInstallDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Today (Express Same-Day within 6 hrs)">Today (Express Same-Day within 6 hrs)</option>
                    <option value="Tomorrow Morning (9:00 AM - 1:00 PM)">Tomorrow Morning (9:00 AM - 1:00 PM)</option>
                    <option value="Tomorrow Afternoon (2:00 PM - 6:00 PM)">Tomorrow Afternoon (2:00 PM - 6:00 PM)</option>
                    <option value="Weekend (Saturday)">Weekend (Saturday)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Special Notes for Technician
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 3rd floor apartment, please bring extra 15m optical drop patch cord"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Review & Financial Summary */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Booking & Connection Summary</h4>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Customer Name:</span>
                    <strong className="text-white">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contact Phone:</span>
                    <strong className="text-white">{phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Installation Location:</span>
                    <strong className="text-white">{ward}, {city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Scheduled Time:</span>
                    <strong className="text-cyan-300">{installDate}</strong>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>{currentPlan.name} ({billingCycle.toUpperCase()}):</span>
                    <span>NPR {basePrice.toLocaleString()}</span>
                  </div>
                  {addTvBox && (
                    <div className="flex justify-between text-slate-300">
                      <span>NetWave TV 4K Android Box:</span>
                      <span>NPR {tvBoxPrice.toLocaleString()}</span>
                    </div>
                  )}
                  {addMeshNode && (
                    <div className="flex justify-between text-slate-300">
                      <span>WiFi 6 Mesh Extender Node:</span>
                      <span>NPR {meshPrice.toLocaleString()}</span>
                    </div>
                  )}
                  {addStaticIp && (
                    <div className="flex justify-between text-slate-300">
                      <span>Static IPv4 Address ({monthsMultiplier} mos):</span>
                      <span>NPR {staticIpPrice.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Government VAT (13%):</span>
                    <span>NPR {vatAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Optical Fiber Installation & Drop Wire:</span>
                    <span className={installationFee === 0 ? 'text-emerald-400 font-bold' : ''}>
                      {installationFee === 0 ? 'FREE (Annual Offer)' : `NPR ${installationFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Smart ONT Optical Router (Refundable Deposit):</span>
                    <span>NPR {routerDeposit.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Estimated Total Payable on Setup:</span>
                    <span className="text-xl font-black text-cyan-400">
                      NPR {totalPayable.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Zero Advance Payment Required Online</p>
                  <p className="text-emerald-400/80 text-[11px]">
                    You only pay after our certified fiber technicians install the ONT optical terminal, test live fiber speed in front of you, and confirm signal levels.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Installation Order Placed!</span>
                <h3 className="text-2xl font-black text-white mt-1">Thank You, {fullName}!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Your fiber installation request has been assigned to the <strong>{city} Field Service Dispatch Center</strong>.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Reference ID:</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Package:</span>
                  <span className="font-bold text-white">{currentPlan.name} ({currentPlan.speedMbps} Mbps)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="text-white">{ward}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Slot:</span>
                  <span className="text-emerald-400 font-bold">{installDate}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-500">Payable on Activation:</span>
                  <span className="font-extrabold text-cyan-300">NPR {totalPayable.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                A confirmation SMS has been dispatched to <strong>{phone}</strong>. Our local area field engineer will call you 30 minutes prior to arrival.
              </p>

              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer"
              >
                Back to NetWave Portal
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 4 && (
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-6 py-2.5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 rounded-lg shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <span>{step === 3 ? 'Confirm & Book Installation' : 'Proceed to Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
