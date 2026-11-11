import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('trial');

  const faqs: FaqItem[] = [
    {
      id: 'trial',
      question: 'How does the 14-day free trial work?',
      answer:
        'You get complete, unrestricted access to all FlowDesk Pro features for 14 days without entering a credit card. When your trial ends, you can choose a paid subscription or continue on our free tier with basic workspace capabilities.'
    },
    {
      id: 'import',
      question: 'Can I import data from Asana, Trello, or Jira?',
      answer:
        'Yes! FlowDesk provides a 1-click migration wizard that seamlessly maps boards, lists, task descriptions, assignees, deadlines, and attachments from Jira, Trello, Asana, Monday, and CSV files in under 3 minutes.'
    },
    {
      id: 'growth',
      question: 'What happens when my team grows?',
      answer:
        'You can invite new team members at any time with a single email or invite link. Your account will automatically prorate the additional seats for the remaining billing period, keeping pricing seamless and predictable.'
    },
    {
      id: 'security',
      question: 'Is FlowDesk secure and compliant?',
      answer:
        'Security is our highest priority. FlowDesk is SOC2 Type II certified and GDPR compliant. All data is encrypted in transit using TLS 1.3 and at rest with AES-256. Enterprise plans also include custom SAML SSO, audit logging, and IP allowlists.'
    },
    {
      id: 'billing',
      question: 'Can I switch between monthly and annual billing at any time?',
      answer:
        'Yes. You can switch between monthly and annual billing directly from your workspace billing dashboard. Switching to annual billing immediately unlocks a 20% discount applied to your remaining term.'
    }
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
            Got Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Everything you need to know about starting with FlowDesk. Cannot find your answer? Our team is always here to help.
          </p>
        </div>

        {/* 5-Question Accordion */}
        <div className="space-y-4">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-indigo-200 bg-indigo-50/20 shadow-xs'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-indigo-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-indigo-100/40"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
