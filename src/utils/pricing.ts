export type BillingCycle = 'monthly' | 'annual';
export type Currency = 'USD' | 'INR';

export interface PlanPricing {
  id: string;
  name: string;
  monthlyPrice: Record<Currency, number>;
  annualMonthlyEquivalent: Record<Currency, number>;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export const PLANS: PlanPricing[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: {
      USD: 12,
      INR: 999
    },
    annualMonthlyEquivalent: {
      USD: 9,
      INR: 799
    },
    description: 'Essential collaboration for nimble teams and growing startups.',
    popular: false,
    features: [
      'Up to 10 team members',
      'Unlimited task & Kanban boards',
      '5 GB workspace storage',
      'Basic timeline & calendar view',
      'Slack & Google Drive integration',
      'Standard community support'
    ],
    ctaText: 'Start Free Trial'
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: {
      USD: 28,
      INR: 2499
    },
    annualMonthlyEquivalent: {
      USD: 22,
      INR: 1999
    },
    description: 'Advanced automation, deep analytics, and scaling power for growing teams.',
    popular: true,
    features: [
      'Unlimited team members',
      'Advanced Gantt & dependency tracking',
      'Automated custom workflows (5,000/mo)',
      '100 GB workspace storage',
      'Time tracking & workload capacity planning',
      'Advanced permissions & guest access',
      'Priority 24/7 email & chat support'
    ],
    ctaText: 'Start Free Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: {
      USD: 59,
      INR: 4999
    },
    annualMonthlyEquivalent: {
      USD: 48,
      INR: 3999
    },
    description: 'Enterprise-grade governance, custom security, and dedicated support.',
    popular: false,
    features: [
      'Unlimited workspace storage',
      'Custom SSO (SAML, Okta, Google Workspace)',
      'Unlimited workflow automations',
      'SOC2 Type II compliance reports',
      'Dedicated Customer Success Manager',
      'Custom SLAs (99.99% uptime guarantee)',
      'Audit logs & advanced data retention'
    ],
    ctaText: 'Contact Sales'
  }
];

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

export function calculateEffectiveMonthlyRate(
  planId: string,
  cycle: BillingCycle,
  currency: Currency = 'USD'
): number {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return 0;
  return cycle === 'annual'
    ? plan.annualMonthlyEquivalent[currency]
    : plan.monthlyPrice[currency];
}

export function calculateAnnualCost(
  planId: string,
  seats: number = 1,
  currency: Currency = 'USD'
): number {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return 0;
  return plan.annualMonthlyEquivalent[currency] * 12 * Math.max(1, seats);
}

export function calculateAnnualSavings(
  planId: string,
  seats: number = 1,
  currency: Currency = 'USD'
): number {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return 0;
  const monthlyTotal = plan.monthlyPrice[currency] * 12 * Math.max(1, seats);
  const annualTotal = plan.annualMonthlyEquivalent[currency] * 12 * Math.max(1, seats);
  return monthlyTotal - annualTotal;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  companyName: string;
  teamSize: string;
  planId: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  companyName?: string;
}

export function validateSignupForm(data: Partial<SignupFormData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid work email address.';
  }
  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your team or company name.';
  }
  return errors;
}
