import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { QuickPayModal } from './components/QuickPayModal';
import { WaveBotModal } from './components/WaveBotModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PlansPage } from './pages/PlansPage';
import { NetWaveTVPage } from './pages/NetWaveTVPage';
import { EnterprisePage } from './pages/EnterprisePage';
import { CoveragePage } from './pages/CoveragePage';
import { SpeedTestPage } from './pages/SpeedTestPage';
import { SelfCarePage } from './pages/SelfCarePage';
import { SupportPage } from './pages/SupportPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { PayBillPage } from './pages/PayBillPage';
import { CheckoutPage } from './pages/CheckoutPage';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'nep'>('en');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<string>('nw-home-200');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    customerId: string;
    phone: string;
    plan: string;
  } | null>(null);

  // Modals state
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderModalPlanId, setOrderModalPlanId] = useState<string>('nw-home-200');
  const [quickPayOpen, setQuickPayOpen] = useState<boolean>(false);
  const [waveBotOpen, setWaveBotOpen] = useState<boolean>(false);

  // Load saved user session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('netwave_active_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    }
  }, []);

  // Scroll to top when changing page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavigate = (page: string, meta?: any) => {
    if (page === 'checkout' && meta?.planId) {
      setSelectedPlanForCheckout(meta.planId);
    }
    setActivePage(page);
  };

  const handleOpenOrderModal = (planId?: string) => {
    if (planId) {
      setSelectedPlanForCheckout(planId);
      setOrderModalPlanId(planId);
    }
    // Alternatively can navigate directly to full checkout page or open modal
    setOrderModalOpen(true);
  };

  const handleOpenQuickPay = () => {
    setActivePage('paybill');
  };

  const handleOpenWaveBot = () => {
    setWaveBotOpen(true);
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    setActivePage('selfcare');
  };

  const handleLogout = () => {
    localStorage.removeItem('netwave_active_user');
    setCurrentUser(null);
    setActivePage('home');
  };

  const handleToggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'nep' : 'en');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Global Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenOrderModal={handleOpenOrderModal}
        onOpenQuickPay={handleOpenQuickPay}
        onOpenWaveBot={handleOpenWaveBot}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentLanguage={currentLanguage}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenOrderModal={handleOpenOrderModal}
            onOpenQuickPay={handleOpenQuickPay}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'plans' && (
          <PlansPage
            onOpenOrderModal={handleOpenOrderModal}
            onOpenQuickPay={handleOpenQuickPay}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'tv' && (
          <NetWaveTVPage
            onOpenOrderModal={handleOpenOrderModal}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'enterprise' && (
          <EnterprisePage
            onOpenOrderModal={handleOpenOrderModal}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'coverage' && (
          <CoveragePage
            onOpenOrderModal={handleOpenOrderModal}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'offers' && (
          <OffersPage
            onNavigate={handleNavigate}
            onOpenOrderModal={handleOpenOrderModal}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenOrderModal={handleOpenOrderModal}
          />
        )}

        {activePage === 'faq' && (
          <FaqPage
            onNavigate={handleNavigate}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'speedtest' && (
          <SpeedTestPage
            onOpenOrderModal={handleOpenOrderModal}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'selfcare' && (
          <SelfCarePage
            onOpenQuickPay={handleOpenQuickPay}
            onOpenOrderModal={handleOpenOrderModal}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'support' && (
          <SupportPage
            onOpenWaveBot={handleOpenWaveBot}
            onOpenQuickPay={handleOpenQuickPay}
            onNavigate={handleNavigate}
            onOpenOrderModal={handleOpenOrderModal}
          />
        )}

        {(activePage === 'login' || activePage === 'register') && (
          <AuthPage
            initialMode={activePage === 'register' ? 'register' : 'login'}
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'paybill' && (
          <PayBillPage
            onNavigate={handleNavigate}
            onOpenWaveBot={handleOpenWaveBot}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            initialPlanId={selectedPlanForCheckout}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenOrderModal={handleOpenOrderModal}
        onOpenQuickPay={handleOpenQuickPay}
        onOpenWaveBot={handleOpenWaveBot}
      />

      {/* Interactive Modals */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlanId={orderModalPlanId}
      />

      <QuickPayModal
        isOpen={quickPayOpen}
        onClose={() => setQuickPayOpen(false)}
      />

      <WaveBotModal
        isOpen={waveBotOpen}
        onClose={() => setWaveBotOpen(false)}
        onNavigate={handleNavigate}
        onOpenOrderModal={handleOpenOrderModal}
        onOpenQuickPay={handleOpenQuickPay}
      />
    </div>
  );
}
