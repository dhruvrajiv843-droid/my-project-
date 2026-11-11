import React from 'react';
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial, onOpenDemo }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-50/70 via-white to-white">
      {/* Subtle ambient blur background */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-100/60 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Trust badge kicker */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 mb-6">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Next-Generation Team Collaboration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Where high-performing teams plan, collaborate, and ship faster.
            </h1>

            {/* One-line subheading */}
            <p className="mt-5 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed text-balance">
              Streamline tasks, track sprint milestones in real time, and keep every engineer, designer, and stakeholder in sync.
            </p>

            {/* Two Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onOpenTrial}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 active:bg-slate-100 rounded-xl transition-all shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust and reassurance text */}
            <div className="mt-7 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Trusted by 10,000+ teams</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Decorative backplate glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500/20 to-sky-400/20 rounded-2xl blur-lg -z-10" />

              {/* Main mockup card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60 transition-transform duration-300 hover:scale-[1.01]">
                {/* Browser top-bar chrome */}
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/70 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                  </div>
                  <div className="mx-auto bg-white px-4 py-0.5 rounded-md text-[11px] font-mono text-slate-500 border border-slate-200/60 max-w-[220px] truncate">
                    app.flowdesk.io/workspace/sprint-42
                  </div>
                </div>

                {/* Dashboard Screenshot Mockup */}
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <img
                    src="/src/assets/images/hero_flowdesk_dashboard_1794399154165.jpg"
                    alt="FlowDesk interactive team workspace and Kanban dashboard"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Floating Highlight Card 1 */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-sm">
                  98%
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Sprint Velocity</p>
                  <p className="text-[11px] text-slate-500">Tasks delivered on target</p>
                </div>
              </div>

              {/* Floating Highlight Card 2 */}
              <div className="hidden sm:flex absolute -top-4 -right-2 bg-white/95 backdrop-blur-md border border-slate-200 py-2 px-3 rounded-xl shadow-lg items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-800">Live Team Sync Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
