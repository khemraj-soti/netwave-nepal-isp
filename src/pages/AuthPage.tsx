import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Key, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_ACCOUNTS } from '../data/ispData';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: { name: string; customerId: string; email?: string; phone?: string }) => void;
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onNavigate,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login State
  const [loginId, setLoginId] = useState('NW104829');
  const [loginPassword, setLoginPassword] = useState('netwave123');

  // Register State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCustomerId, setRegCustomerId] = useState('');

  // Errors & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const cleanId = loginId.trim().toUpperCase();
    if (!cleanId) {
      setErrors({ loginId: 'Please enter your Customer ID or registered email.' });
      return;
    }
    if (!loginPassword.trim()) {
      setErrors({ loginPassword: 'Password is required.' });
      return;
    }

    // Check against demo accounts or registered accounts
    const existingAccounts = JSON.parse(localStorage.getItem('netwave_registered_users') || '{}');
    const demoAccount = SAMPLE_ACCOUNTS[cleanId];
    const registeredAccount = existingAccounts[cleanId];

    let userToSet = {
      name: 'Aayush Shrestha',
      customerId: cleanId,
      phone: '9841234567',
      email: 'aayush@example.com',
    };

    if (demoAccount) {
      userToSet = {
        name: demoAccount.name,
        customerId: demoAccount.customerId,
        phone: demoAccount.phone,
        email: `${demoAccount.username}@gmail.com`,
      };
    } else if (registeredAccount) {
      userToSet = {
        name: registeredAccount.name,
        customerId: registeredAccount.customerId,
        phone: registeredAccount.phone,
        email: registeredAccount.email,
      };
    } else {
      userToSet = {
        name: cleanId.startsWith('NW') ? `Subscriber ${cleanId}` : cleanId,
        customerId: cleanId.startsWith('NW') ? cleanId : `NW-${Math.floor(100000 + Math.random() * 900000)}`,
        phone: '9800000000',
        email: cleanId.includes('@') ? cleanId : `${cleanId}@gmail.com`,
      };
    }

    localStorage.setItem('netwave_active_user', JSON.stringify(userToSet));
    setAuthSuccessMsg(`Welcome back, ${userToSet.name}! Redirecting...`);
    
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      onLoginSuccess(userToSet);
      onNavigate('selfcare');
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!regName.trim()) errs.regName = 'Full name is required';
    if (!regPhone.trim()) {
      errs.regPhone = 'Mobile number is required';
    } else if (!/^(98|97|96|01)\d{7,8}$/.test(regPhone.trim()) && regPhone.trim().length !== 10) {
      errs.regPhone = 'Enter a valid 10-digit mobile number';
    }

    if (!regEmail.trim()) {
      errs.regEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      errs.regEmail = 'Enter a valid email address';
    }

    if (!regPassword.trim() || regPassword.length < 6) {
      errs.regPassword = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const assignedId = regCustomerId.trim().toUpperCase() || `NW${Math.floor(100000 + Math.random() * 900000)}`;

    const newUser = {
      name: regName,
      phone: regPhone,
      email: regEmail,
      customerId: assignedId,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('netwave_registered_users') || '{}');
      existing[assignedId] = newUser;
      existing[regEmail.toLowerCase()] = newUser;
      localStorage.setItem('netwave_registered_users', JSON.stringify(existing));
      localStorage.setItem('netwave_active_user', JSON.stringify(newUser));
    } catch (e) {}

    setAuthSuccessMsg(`Account created for ${regName}! Customer ID: ${assignedId}`);
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      onLoginSuccess(newUser);
      onNavigate('selfcare');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-100">
      {/* Back button */}
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
          <span>Secure NetWave Self-Care Portal</span>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrors({});
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Customer Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrors({});
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            New Registration
          </button>
        </div>

        {authSuccessMsg && (
          <div className="p-3.5 bg-emerald-950 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{authSuccessMsg}</span>
          </div>
        )}

        {mode === 'login' ? (
          /* Login Form */
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1 text-center pb-2">
              <h2 className="text-xl font-black text-white">Subscriber Self-Care</h2>
              <p className="text-[11px] text-slate-400">
                Log in to control your router, view invoices, change WiFi password, and manage support tickets.
              </p>
            </div>

            {/* Demo Fast Fill Buttons */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Instant Demo Credentials:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginId('NW104829');
                    setLoginPassword('netwave123');
                  }}
                  className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded text-[11px] font-mono border border-slate-700 cursor-pointer"
                >
                  NW104829 (Aayush)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginId('NW209144');
                    setLoginPassword('netwave123');
                  }}
                  className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded text-[11px] font-mono border border-slate-700 cursor-pointer"
                >
                  NW209144 (Pooja)
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Customer ID or Registered Email
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="e.g. NW104829"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              {errors.loginId && <p className="text-[11px] text-red-400 mt-1">{errors.loginId}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => alert('For demo purposes, enter any password e.g. "netwave123"')}
                  className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              {errors.loginPassword && <p className="text-[11px] text-red-400 mt-1">{errors.loginPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2 mt-2"
            >
              <span>Login to Self-Care</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div className="space-y-1 text-center pb-2">
              <h2 className="text-xl font-black text-white">Create Subscriber Profile</h2>
              <p className="text-[11px] text-slate-400">
                Register to link your fiber connection and access online self-service.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Sujan Adhikari"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              {errors.regName && <p className="text-[11px] text-red-400 mt-1">{errors.regName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              {errors.regPhone && <p className="text-[11px] text-red-400 mt-1">{errors.regPhone}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="sujan@gmail.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              {errors.regEmail && <p className="text-[11px] text-red-400 mt-1">{errors.regEmail}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Existing Customer ID (Optional if already connected)
              </label>
              <input
                type="text"
                value={regCustomerId}
                onChange={(e) => setRegCustomerId(e.target.value)}
                placeholder="e.g. NW309821 (Leave blank to generate)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              {errors.regPassword && <p className="text-[11px] text-red-400 mt-1">{errors.regPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2 mt-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
