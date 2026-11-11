import React, { useState } from 'react';
import { UserCheck, LayoutTemplate, Sparkles, CheckCircle2 } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      number: '01',
      title: 'Sign up in 60 seconds',
      description: 'Create your secure account, invite teammates with a simple link, and designate workspace permissions without IT friction.',
      icon: UserCheck,
      highlights: [
        'No credit card required for 14-day trial',
        'Single sign-on via Google Workspace or Microsoft',
        'Automatic team invite links with customizable roles'
      ]
    },
    {
      number: '02',
      title: 'Set up your workspace',
      description: 'Import existing projects from Jira, Trello, or Asana in 1-click, or choose from 40+ pre-built agile and marketing templates.',
      icon: LayoutTemplate,
      highlights: [
        '1-click data migration with zero data loss',
        'Ready-made templates for Engineering, Product & Design',
        'Custom columns, tags, and automated sprint rules'
      ]
    },
    {
      number: '03',
      title: 'Start collaborating & shipping',
      description: 'Assign tasks, track sprint velocity on interactive boards, and hold async standups with full context and visibility.',
      icon: Sparkles,
      highlights: [
        'Live cursor co-presence and instant notifications',
        'Automated progress digests sent to Slack or email',
        'Deep velocity analytics to measure cycle time'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white scroll-mt-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
            Simple 3-Step Setup
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How FlowDesk transforms your workflow
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Get your whole team up and running in under five minutes. No complex training or lengthy setup calls needed.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle horizontal connector on desktop */}
          <div
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 -z-0"
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 bg-white rounded-2xl p-7 border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 shadow-md ring-2 ring-indigo-600/10'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 font-mono">
                    {step.number}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Key Highlights */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                  {step.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
