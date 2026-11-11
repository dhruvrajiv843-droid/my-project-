import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import {
  PLANS,
  BillingCycle,
  Currency,
  formatCurrency,
  calculateEffectiveMonthlyRate,
  calculateAnnualSavings
} from '../utils/pricing';

interface PricingSectionProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currency,
  onCurrencyChange,
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [teamSeats, setTeamSeats] = useState<number>(10);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white scroll-mt-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
            Transparent, Predictable Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple plans that scale with your team
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Start with our 14-day free trial on any plan. No credit card required. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Controls Cluster: Currency Switcher + Billing Cycle */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Currency Switcher */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="View pricing in US Dollars"
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('INR')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currency === 'INR'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="View pricing in Indian Rupees"
              >
                INR (₹)
              </button>
            </div>

            {/* Billing Cycle Switcher */}
            <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual billing</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-md">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const price = calculateEffectiveMonthlyRate(plan.id, billingCycle, currency);
            const isPopular = plan.popular;
            const annualCostString = formatCurrency(price * 12, currency);

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between p-8 transition-all duration-200 ${
                  isPopular
                    ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-600/10 lg:-translate-y-2'
                    : 'bg-slate-50/50 border border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs'
                }`}
              >
                {/* Most Popular Flag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 min-h-[40px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mt-6 mb-6 pb-6 border-b border-slate-200/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                        {formatCurrency(price, currency)}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        /user/month
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">
                      {billingCycle === 'annual'
                        ? `Billed annually (${annualCostString}/yr/seat)`
                        : 'Billed monthly, cancel anytime'}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What&apos;s included:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-indigo-600' : 'text-emerald-600'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isPopular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20'
                        : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    14-day free trial · No credit card required
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Team Size Estimator Box */}
        <div className="mt-14 max-w-2xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Estimate your team&apos;s Pro investment
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust seat count to calculate total annual savings ({currency})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-600">Seats:</span>
              <input
                type="range"
                min="3"
                max="50"
                value={teamSeats}
                onChange={(e) => setTeamSeats(Number(e.target.value))}
                className="w-28 sm:w-36 accent-indigo-600"
                aria-label="Number of team seats"
              />
              <span className="text-sm font-mono font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-md min-w-[3rem] text-center">
                {teamSeats}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span>
              Annual estimated: <strong className="text-slate-900 font-mono">
                {formatCurrency(calculateEffectiveMonthlyRate('pro', 'annual', currency) * 12 * teamSeats, currency)}
              </strong>/year
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Annual savings: {formatCurrency(calculateAnnualSavings('pro', teamSeats, currency), currency)}/year
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
