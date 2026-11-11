import React, { useState } from 'react';
import {
  Kanban,
  Users2,
  GitBranch,
  Cpu,
  BarChart3,
  ShieldCheck,
  Check
} from 'lucide-react';

interface FeatureItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  detail: string;
  tags: string[];
}

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const features: FeatureItem[] = [
    {
      id: 'kanban',
      icon: Kanban,
      title: 'Kanban & Sprint Boards',
      shortDesc: 'Organize complex sprint cycles with custom columns, WIP limits, and rapid task prioritization.',
      detail: 'Drag-and-drop tasks across custom workflows. Set swimlanes by assignee or priority, and trigger automatic column updates without manual checking.',
      tags: ['Workflows', 'Agile']
    },
    {
      id: 'collaboration',
      icon: Users2,
      title: 'Real-Time Team Sync',
      shortDesc: 'Collaborate live with multi-user cursor presence, instant @mentions, and inline comment threads.',
      detail: 'See who is editing in real time. Eliminate conflicting updates with seamless document and board co-presence across desktop and mobile.',
      tags: ['Teamwork', 'Communication']
    },
    {
      id: 'timelines',
      icon: GitBranch,
      title: 'Gantt & Milestones',
      shortDesc: 'Visualize cross-team dependencies and critical project paths to prevent deadline slippage.',
      detail: 'Map dependencies between deliverables. Auto-shift cascading tasks when dates change, and forecast delivery timelines with 95% accuracy.',
      tags: ['Planning', 'Forecasting']
    },
    {
      id: 'automation',
      icon: Cpu,
      title: 'Automated Workflows',
      shortDesc: 'Automate recurring handoffs and status changes with simple, no-code trigger rules.',
      detail: 'Build multi-step automation recipes: when a pull request merges or QA approves, automatically update tickets and notify the Slack channel.',
      tags: ['No-Code', 'Productivity']
    },
    {
      id: 'capacity',
      icon: BarChart3,
      title: 'Team Workload & Capacity',
      shortDesc: 'Balance team member bandwidth to prevent burnout and spot capacity bottlenecks early.',
      detail: 'Gain a bird’s-eye view of who has room to take on work and who is over-allocated, balancing hours and story points across sprints.',
      tags: ['Analytics', 'Resource Mgmt']
    },
    {
      id: 'security',
      icon: ShieldCheck,
      title: 'Enterprise Security',
      shortDesc: 'Bank-level encryption, SOC2 Type II compliance, and granular role-based access controls.',
      detail: 'Keep your proprietary data protected with SAML single sign-on, comprehensive audit logs, custom session policies, and IP whitelisting.',
      tags: ['Security', 'Compliance']
    }
  ];

  const filteredFeatures =
    activeTab === 'all'
      ? features
      : features.filter((f) => f.tags.some((t) => t.toLowerCase().includes(activeTab.toLowerCase())));

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
            Built for Modern High-Velocity Teams
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything your team needs to ship on time
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Replace fragmented spreadsheets, disconnected chat threads, and bloated legacy trackers with one intuitive collaboration hub.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/80 shadow-xs max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Features
            </button>
            <button
              onClick={() => setActiveTab('agile')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'agile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Agile & Sprints
            </button>
            <button
              onClick={() => setActiveTab('teamwork')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'teamwork'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Collaboration
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'security'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Security
            </button>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Icon wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.shortDesc}
                  </p>

                  {/* Detail Bullet */}
                  <p className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-normal flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature.detail}</span>
                  </p>
                </div>

                {/* Metadata tags */}
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                  {feature.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {idx < feature.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
