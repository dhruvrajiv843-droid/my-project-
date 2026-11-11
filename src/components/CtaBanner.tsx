import React from 'react';
import { ArrowRight, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenTrial, onOpenDemo }) => {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 overflow-hidden py-16 px-6 sm:px-12 lg:px-16 text-center text-white shadow-2xl">
          {/* Subtle ambient gradients */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Get started in under 60 seconds</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Ready to bring clarity and speed to your team?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Join 10,000+ teams shipping their best work with FlowDesk. Start your 14-day free trial today—no credit card required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenTrial}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Book a 1-on-1 Demo</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>·</span>
                <span>Full access to Pro features</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>·</span>
                <span>Instant team setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
