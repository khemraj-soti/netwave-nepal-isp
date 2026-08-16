import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRANCH_LOCATIONS } from '../data/ispData';

interface ContactPageProps {
  onOpenWaveBot: () => void;
  onOpenOrderModal: (planId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenWaveBot, onOpenOrderModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Customer Support');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full Name is required';
    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^(98|97|96|01)\d{7,8}$/.test(phone.trim()) && phone.trim().length !== 10) {
      errs.phone = 'Enter a valid 10-digit mobile number (e.g. 98XXXXXXXX)';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email address';
    }

    if (!subject.trim()) errs.subject = 'Subject is required';
    if (!message.trim()) errs.message = 'Message description is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const stored = JSON.parse(localStorage.getItem('netwave_inquiries') || '[]');
      const newInquiry = {
        id: `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
        name,
        phone,
        email,
        department,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('netwave_inquiries', JSON.stringify([newInquiry, ...stored]));
    } catch (e) {}

    setIsSubmitted(true);
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
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact NetWave Nepal
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Our customer support, technical network operations center (NOC), and corporate sales teams are available around the clock.
        </p>
      </div>

      {/* 2. Hotlines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-2 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">24/7 Helpline Numbers</h3>
          <p className="text-xs text-slate-400">Toll-free & Direct Customer Support</p>
          <div className="pt-2 font-mono font-bold text-cyan-400 text-sm">
            +977-1-4789000 <br />
            +977-9801234567
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-2 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Official Email Desks</h3>
          <p className="text-xs text-slate-400">Response within 2 hours</p>
          <div className="pt-2 font-mono font-bold text-emerald-400 text-xs">
            support@netwavenepal.com.np <br />
            sales@netwavenepal.com.np
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center space-y-2 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Corporate Headquarters</h3>
          <p className="text-xs text-slate-400">Visit our flagship experience lounge</p>
          <p className="pt-2 text-xs text-slate-200">
            NetWave Tower, New Baneshwor (Opp. NIC Asia Bank), Kathmandu
          </p>
        </div>
      </div>

      {/* 3. Contact Form & Regional Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-black text-white">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-400 mt-1">
              Have an inquiry about corporate connectivity, sponsorship, billing, or technical service? Leave a message below.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder="e.g. Roshan Sharma"
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                    errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="98XXXXXXXX"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="roshan@gmail.com"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="Customer Support">Customer Care & Technical NOC</option>
                  <option value="Enterprise Sales">Enterprise 1:1 Leased Line & SME</option>
                  <option value="Billing & Accounts">Billing, Renewal & VAT Invoices</option>
                  <option value="General Inquiry">General Inquiries & Franchising</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                  }}
                  placeholder="e.g. Corporate Fiber Inquiry for Pokhara Branch"
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                    errors.subject ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                {errors.subject && <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Message / Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                  }}
                  placeholder="Please describe your query or requirement in detail..."
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none ${
                    errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                ></textarea>
                {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-300">
                Thank you, <strong>{name}</strong>. Your message has been routed to our <strong>{department}</strong> team. We will respond to <strong>{email}</strong> or call <strong>{phone}</strong> promptly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Regional Branch Locations */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h2 className="text-xl font-black text-white">Nationwide Service Lounges</h2>
            <p className="text-xs text-slate-400 mt-1">Walk in for instant bill payments, set-top box demo, or fiber connection booking.</p>
          </div>

          <div className="space-y-3">
            {BRANCH_LOCATIONS.map((b) => (
              <div key={b.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-2 text-xs shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-white">{b.city} Experience Center</h3>
                  {b.isHeadOffice && (
                    <span className="px-2 py-0.5 rounded bg-blue-900/80 text-cyan-300 text-[10px] font-bold border border-blue-700">
                      Corporate HQ
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-400">{b.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
