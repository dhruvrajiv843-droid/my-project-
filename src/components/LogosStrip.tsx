import React from 'react';

export const LogosStrip: React.FC = () => {
  const partners = [
    {
      name: 'ACME CORP',
      icon: (
        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 2 22 22 22" />
        </svg>
      ),
      label: 'ACME'
    },
    {
      name: 'VERTEX AI',
      icon: (
        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m16 12-4-4-4 4" />
          <path d="M12 16V8" />
        </svg>
      ),
      label: 'VERTEX'
    },
    {
      name: 'KINETIX',
      icon: (
        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="m8 17 4-4 4 4" />
        </svg>
      ),
      label: 'KINETIX'
    },
    {
      name: 'HYPERION',
      icon: (
        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m9 9 6 6" />
          <path d="m15 9-6 6" />
        </svg>
      ),
      label: 'HYPERION'
    },
    {
      name: 'NOVASCALE',
      icon: (
        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
      label: 'NOVASCALE'
    },
    {
      name: 'LUMINA',
      icon: (
        <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      label: 'LUMINA'
    }
  ];

  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-8">
          Trusted by fast-moving teams at world-class companies
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-100/60"
              title={partner.name}
            >
              <div className="shrink-0">{partner.icon}</div>
              <span className="font-extrabold tracking-wider text-sm font-sans text-slate-700">
                {partner.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
