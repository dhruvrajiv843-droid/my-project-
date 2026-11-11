import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Activity,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProductShowcaseProps {
  onOpenTrial: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenTrial }) => {
  const [collabActiveTab, setCollabActiveTab] = useState<'threads' | 'presence' | 'updates'>('threads');
  const [analyticsActiveTab, setAnalyticsActiveTab] = useState<'timeline' | 'workload' | 'velocity'>('timeline');

  return (
    <section id="showcase" className="py-20 lg:py-28 bg-slate-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Showcase Block 1: Benefit 1 (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Team Alignment</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              Eliminate status meetings with effortless live co-presence
            </h3>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              When work happens in context, decisions happen 3x faster. Team members can comment directly on tasks, leave video memos, and co-edit documents with real-time cursor presence.
            </p>

            {/* Interactive Feature Selector Tabs */}
            <div className="mt-6 w-full space-y-3">
              <button
                type="button"
                onClick={() => setCollabActiveTab('threads')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  collabActiveTab === 'threads'
                    ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${collabActiveTab === 'threads' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Contextual Discussion Threads</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Keep discussions tied to specific deliverables, not buried in Slack channels.</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCollabActiveTab('presence')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  collabActiveTab === 'presence'
                    ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${collabActiveTab === 'presence' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Live Multi-User Cursors</h4>
                    <p className="text-xs text-slate-500 mt-0.5">See exactly who is editing and prevent duplicate work in real time.</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCollabActiveTab('updates')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  collabActiveTab === 'updates'
                    ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${collabActiveTab === 'updates' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Instant Cross-Platform Sync</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Sub-second updates across web, mobile, and desktop applications.</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Proof Metric Pill */}
            <div className="mt-7 flex items-center gap-3 py-2 px-3.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-800">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Teams save an average of 4.2 hours per week on status updates.</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl">
                <img
                  src="/src/assets/images/showcase_team_collab_1794399154688.jpg"
                  alt="FlowDesk live collaboration interface with team chat and task management"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Showcase Block 2: Benefit 2 (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl">
                <img
                  src="/src/assets/images/showcase_analytics_timeline_1794399155373.jpg"
                  alt="FlowDesk project timeline and workload capacity planning dashboard"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Predictable Delivery & Forecasting</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              Gain 360° visibility into project velocity and team bandwidth
            </h3>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              No more guessing when features will ship. Interactive Gantt timelines map dependencies in real time, while intelligent workload balancing protects your engineers from burnout.
            </p>

            {/* Interactive Feature Selector Tabs */}
            <div className="mt-6 w-full space-y-3">
              <button
                type="button"
                onClick={() => setAnalyticsActiveTab('timeline')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  analyticsActiveTab === 'timeline'
                    ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${analyticsActiveTab === 'timeline' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Dynamic Gantt Milestone Mapping</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Auto-adjust dependent tasks when scope shifts or milestones adjust.</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAnalyticsActiveTab('workload')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  analyticsActiveTab === 'workload'
                    ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${analyticsActiveTab === 'workload' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Resource Capacity Heatmaps</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Visualize team member utilization to balance tasks smoothly.</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAnalyticsActiveTab('velocity')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  analyticsActiveTab === 'velocity'
                    ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/10'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${analyticsActiveTab === 'velocity' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Automated Sprint Burn-down</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Real-time velocity tracking that calculates exact cycle times.</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Proof Metric Pill */}
            <div className="mt-7 flex items-center gap-3 py-2 px-3.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-medium text-indigo-900">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>35% increase in on-time delivery across 10,000+ completed sprints.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
