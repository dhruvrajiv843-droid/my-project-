import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PLANS, Currency, formatCurrency, validateSignupForm, ValidationErrors } from '../utils/pricing';

interface TrialModalProps {
  isOpen: boolean;
  currency?: Currency;
  initialPlanId?: string;
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  currency = 'USD',
  initialPlanId = 'pro',
  onClose,
  onSuccess
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlanId);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('11-50');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialPlanId) {
      setSelectedPlan(initialPlanId);
    }
  }, [initialPlanId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignupForm({
      fullName,
      email,
      companyName,
      teamSize,
      planId: selectedPlan
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate instant workspace provisioning
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(fullName, email);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setCompanyName('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 id="trial-modal-title" className="text-2xl font-bold text-slate-900">
              Workspace Created!
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Welcome to FlowDesk, <span className="font-semibold text-slate-900">{fullName}</span>! We’ve sent your setup link to <span className="font-semibold text-slate-900">{email}</span>.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
              <p><strong>Workspace Domain:</strong> {companyName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'team'}.flowdesk.io</p>
              <p><strong>Plan Selected:</strong> FlowDesk {selectedPlan.toUpperCase()} (14-day free trial)</p>
              <p><strong>Seats Available:</strong> {teamSize} teammates</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
            >
              Continue to Workspace
            </button>
          </div>
        ) : (
          <div className="p-7 sm:p-9">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>14-Day Full Access Trial</span>
            </div>
            <h2 id="trial-modal-title" className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Start your free FlowDesk trial
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              No credit card required · Instant setup in 60 seconds
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Plan Choice Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Trial Plan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                        selectedPlan === plan.id
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 ring-1 ring-indigo-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {plan.name} · {formatCurrency(plan.annualMonthlyEquivalent[currency], currency)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="trial-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  id="trial-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label htmlFor="trial-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email Address
                </label>
                <input
                  id="trial-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                    errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Company & Team Size Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="trial-company" className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    id="trial-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Inc."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                      errors.companyName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="trial-size" className="block text-xs font-semibold text-slate-700 mb-1">
                    Team Size
                  </label>
                  <select
                    id="trial-size"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="1-10">1 - 10 people</option>
                    <option value="11-50">11 - 50 people</option>
                    <option value="51-200">51 - 200 people</option>
                    <option value="200+">200+ people</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Provisioning Workspace...</span>
                  ) : (
                    <>
                      <span>Start 14-Day Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SOC2 Type II Certified · 256-bit SSL encryption</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
