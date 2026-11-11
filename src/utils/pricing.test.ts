import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLANS,
  formatCurrency,
  calculateEffectiveMonthlyRate,
  calculateAnnualCost,
  calculateAnnualSavings,
  validateSignupForm
} from './pricing';

test('PLANS configuration contains 3 expected tiers with Pro as popular', () => {
  assert.equal(PLANS.length, 3);
  const pro = PLANS.find((p) => p.id === 'pro');
  assert.ok(pro);
  assert.equal(pro?.popular, true);
  assert.equal(pro?.monthlyPrice.USD, 28);
  assert.equal(pro?.annualMonthlyEquivalent.USD, 22);
  assert.equal(pro?.monthlyPrice.INR, 2499);
  assert.equal(pro?.annualMonthlyEquivalent.INR, 1999);
});

test('formatCurrency formats USD and INR correctly', () => {
  assert.equal(formatCurrency(28, 'USD'), '$28');
  assert.equal(formatCurrency(2499, 'INR'), '₹2,499');
  assert.equal(formatCurrency(19999, 'INR'), '₹19,999');
});

test('calculateEffectiveMonthlyRate calculates monthly and discounted annual rates for USD and INR', () => {
  assert.equal(calculateEffectiveMonthlyRate('starter', 'monthly', 'USD'), 12);
  assert.equal(calculateEffectiveMonthlyRate('starter', 'annual', 'USD'), 9);
  assert.equal(calculateEffectiveMonthlyRate('starter', 'monthly', 'INR'), 999);
  assert.equal(calculateEffectiveMonthlyRate('starter', 'annual', 'INR'), 799);

  assert.equal(calculateEffectiveMonthlyRate('pro', 'monthly', 'USD'), 28);
  assert.equal(calculateEffectiveMonthlyRate('pro', 'annual', 'USD'), 22);
  assert.equal(calculateEffectiveMonthlyRate('pro', 'monthly', 'INR'), 2499);
  assert.equal(calculateEffectiveMonthlyRate('pro', 'annual', 'INR'), 1999);

  assert.equal(calculateEffectiveMonthlyRate('nonexistent', 'monthly', 'USD'), 0);
});

test('calculateAnnualSavings correctly returns money saved with annual billing for USD and INR', () => {
  // Pro in USD: monthly is $28/mo ($336/yr), annual is $22/mo ($264/yr) -> saving $72/seat/yr
  const savingsUSD = calculateAnnualSavings('pro', 1, 'USD');
  assert.equal(savingsUSD, 72);

  // Pro in INR: monthly is ₹2,499/mo (₹29,988/yr), annual is ₹1,999/mo (₹23,988/yr) -> saving ₹6,000/seat/yr
  const savingsINR = calculateAnnualSavings('pro', 1, 'INR');
  assert.equal(savingsINR, (2499 * 12) - (1999 * 12));
  assert.equal(savingsINR, 6000);

  const savings10SeatsINR = calculateAnnualSavings('pro', 10, 'INR');
  assert.equal(savings10SeatsINR, 60000);
});

test('validateSignupForm validates name, email, and company correctly', () => {
  const invalid = validateSignupForm({
    fullName: '',
    email: 'not-an-email',
    companyName: ''
  });
  assert.ok(invalid.fullName);
  assert.ok(invalid.email);
  assert.ok(invalid.companyName);

  const valid = validateSignupForm({
    fullName: 'Arjun Sharma',
    email: 'arjun@techscale.in',
    companyName: 'TechScale India',
    teamSize: '11-50',
    planId: 'pro'
  });
  assert.equal(Object.keys(valid).length, 0);
});
