import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogosStrip } from './components/LogosStrip';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { ProductShowcase } from './components/ProductShowcase';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { TrialModal } from './components/TrialModal';
import { DemoModal } from './components/DemoModal';
import { LoginModal } from './components/LoginModal';
import { CheckCircle2, X } from 'lucide-react';
import { Currency } from './utils/pricing';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('pro');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenTrial = (planId: string = 'pro') => {
    setSelectedPlanId(planId);
    setIsTrialOpen(true);
  };

  const handleTrialSuccess = (name: string, email: string) => {
    setActiveUser(name || email);
    setToastMessage(`Welcome aboard, ${name || email}! 14-day Pro trial is active.`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const handleLoginSuccess = (email: string) => {
    setActiveUser(email);
    setToastMessage(`Welcome back, ${email}!`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const handleLogout = () => {
    setActiveUser(null);
    setToastMessage('Signed out successfully.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white rounded-md"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* User Session Banner (if signed in) */}
      {activeUser && (
        <div className="bg-indigo-600 text-white text-xs py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span>
              Signed in as <strong>{activeUser}</strong> (Active Workspace Trial)
            </span>
            <button
              onClick={handleLogout}
              className="text-indigo-100 hover:text-white underline font-semibold ml-4"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenTrial={handleOpenTrial}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOpenTrial={() => handleOpenTrial('pro')}
          onOpenDemo={() => setIsDemoOpen(true)}
        />

        {/* 3. Logos Strip */}
        <LogosStrip />

        {/* 4. Features Section */}
        <Features />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Product Showcase */}
        <ProductShowcase onOpenTrial={() => handleOpenTrial('pro')} />

        {/* 7. Pricing Section with Currency Toggle */}
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          onSelectPlan={handleOpenTrial}
        />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. FAQ Section */}
        <FAQ />

        {/* 10. Final Call-to-Action Banner */}
        <CtaBanner
          onOpenTrial={() => handleOpenTrial('pro')}
          onOpenDemo={() => setIsDemoOpen(true)}
        />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Modals */}
      <TrialModal
        isOpen={isTrialOpen}
        currency={currency}
        initialPlanId={selectedPlanId}
        onClose={() => setIsTrialOpen(false)}
        onSuccess={handleTrialSuccess}
      />

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onSwitchToTrial={() => {
          setIsDemoOpen(false);
          handleOpenTrial('pro');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onSwitchToTrial={() => {
          setIsLoginOpen(false);
          handleOpenTrial('pro');
        }}
      />
    </div>
  );
}
