import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  initials: string;
  avatarBg: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 'sarah',
      name: 'Sarah Lin',
      role: 'VP of Product',
      company: 'Horizon Cloud',
      quote:
        'FlowDesk cut our sprint planning meetings in half. Our engineers and designers actually love using it every day because it stays fast even with 200+ active epics.',
      metric: '50% reduction in planning overhead',
      initials: 'SL',
      avatarBg: 'bg-indigo-600 text-white'
    },
    {
      id: 'marcus',
      name: 'Marcus Vance',
      role: 'Head of Operations',
      company: 'Kinetix Media',
      quote:
        'Managing 30+ concurrent client deliverables was chaotic before FlowDesk. The milestone timeline view and automatic Slack alerts brought complete clarity to our client work.',
      metric: '35% boost in on-time delivery',
      initials: 'MV',
      avatarBg: 'bg-emerald-600 text-white'
    },
    {
      id: 'elena',
      name: 'Elena Rostova',
      role: 'Lead Technical Program Manager',
      company: 'NovaScale',
      quote:
        'The cleanest, most responsive project management tool we have ever deployed. Onboarding new engineers takes five minutes, and workload capacity planning saved us from burnout.',
      metric: '100% team adoption in week 1',
      initials: 'ER',
      avatarBg: 'bg-blue-600 text-white'
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50/70 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
            Real Customer Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by product leaders and builders alike
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            See how forward-thinking product teams use FlowDesk to ship features faster and with less friction.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div>
                {/* Metric highlight */}
                <div className="py-2 px-3 rounded-lg bg-indigo-50/80 border border-indigo-100/60 text-xs font-semibold text-indigo-800 mb-5 inline-block">
                  {item.metric}
                </div>

                {/* Author Info with Photo/Avatar Placeholder */}
                <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm tracking-wider shadow-xs ${item.avatarBg}`}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500">
                      {item.role} · <span className="font-medium text-slate-700">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
