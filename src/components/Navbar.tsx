import React, { useState, useEffect } from 'react';
import { Layers, Menu, X, ArrowRight } from 'lucide-react';
import { Currency } from '../utils/pricing';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenTrial: (planId?: string) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  onOpenTrial,
  onOpenLogin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-slate-900 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1 shrink-0"
            aria-label="FlowDesk Home"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              FlowDesk
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-indigo-600 transition-colors whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md py-1 px-1.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Currency Toggle */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Header Currency Switcher */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/80 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-2 py-1 rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Set currency to USD"
              >
                $ USD
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('INR')}
                className={`px-2 py-1 rounded-md transition-all ${
                  currency === 'INR'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Set currency to INR"
              >
                ₹ INR
              </button>
            </div>

            <button
              onClick={onOpenLogin}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-2.5 py-2 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Log in
            </button>
            <button
              onClick={() => onOpenTrial('pro')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-xs hover:shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile quick currency pill */}
            <button
              type="button"
              onClick={() => onCurrencyChange(currency === 'USD' ? 'INR' : 'USD')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
              aria-label={`Switch currency (currently ${currency})`}
            >
              {currency === 'USD' ? '$ USD' : '₹ INR'}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Currency Selector */}
            <div className="py-2 px-3 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="text-xs font-semibold text-slate-500">Currency</span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => onCurrencyChange('USD')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    currency === 'USD' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                  }`}
                >
                  $ USD
                </button>
                <button
                  type="button"
                  onClick={() => onCurrencyChange('INR')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    currency === 'INR' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                  }`}
                >
                  ₹ INR
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full text-center py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTrial('pro');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
