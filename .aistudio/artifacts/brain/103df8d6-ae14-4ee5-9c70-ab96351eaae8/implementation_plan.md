# Interactive USD and INR Currency Toggle for FlowDesk

Enable visitors to dynamically switch between US Dollars ($) and Indian Rupees (₹) across FlowDesk, featuring localized, standard rounded Indian SaaS pricing tiers (₹999, ₹1,999, ₹2,499, and ₹4,999), synchronized billing cycle discounts, and dynamic team seat calculations.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed during the clarification step:
> - **Interactive Currency Toggle**: FlowDesk will feature an interactive switcher supporting both **USD ($)** and **INR (₹)** rather than permanently replacing dollars, giving both international and Indian visitors full clarity.
> - **Localized Indian SaaS Tiers**: Rupee amounts will use market-standard rounded SaaS figures (e.g. ₹999/mo Starter, ₹1,999–₹2,499/mo Pro, ₹3,999–₹4,999/mo Enterprise) rather than raw decimal currency conversions.

- **Confirmed Decision 1**: Interactive `USD ($)` / `INR (₹)` segmented switcher in the Pricing section and accessible in navigation controls.
- **Confirmed Decision 2**: Standard rounded pricing tiers for Indian customers with 20% annual billing discounts.
- **Confirmed Decision 3**: Synchronized updates across all pricing cards, the team seat investment calculator, and the 14-day free trial modal.

---

## 1. Overview & Core Concept

- **What It Does**: Adds a currency toggle that allows users to instantly view and estimate workspace pricing in either US Dollars ($) or Indian Rupees (₹).
- **Target Audience**: Startups, engineering organizations, and remote software teams in India and worldwide evaluating project management tools.
- **Key Value**: Delivers frictionless price transparency and purchasing confidence with culturally familiar, rounded pricing tiers and real-time annual savings in both currencies.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Viewing Pricing in INR**:
   - The user scrolls to the `#pricing` section (or toggles currency in the top bar).
   - In the pricing header, alongside the **Monthly / Annual** switcher, a clean segmented currency control allows switching between **USD ($)** and **INR (₹)**.
   - Selecting **INR (₹)** instantly updates all card amounts with the `₹` symbol, updates the monthly equivalent strings, and updates the annual billing subtext.
2. **Interactive Seat Investment Calculator**:
   - Moving the seat slider calculates total annual workspace expenditure in Indian Rupees (e.g., ₹1,999 × 12 × seats) and highlights the exact Rupee savings achieved by choosing annual billing.
3. **Free Trial & Checkout Modal**:
   - Clicking *"Start Free Trial"* opens the registration modal, pre-populating the selected plan and displaying the chosen currency format (₹ or $) in the workspace summary.

### Pricing Tier Matrix

| Tier | Currency | Monthly Rate | Annual Billing (Monthly Eq.) | Annual Savings / Seat |
| :--- | :--- | :--- | :--- | :--- |
| **Starter** | USD ($) | $12 / mo | $9 / mo | $36 / yr |
| **Starter** | INR (₹) | ₹999 / mo | ₹799 / mo | ₹2,400 / yr |
| **Pro** *(Popular)* | USD ($) | $28 / mo | $22 / mo | $72 / yr |
| **Pro** *(Popular)* | INR (₹) | ₹2,499 / mo | ₹1,999 / mo | ₹6,000 / yr |
| **Enterprise** | USD ($) | $59 / mo | $48 / mo | $132 / yr |
| **Enterprise** | INR (₹) | ₹4,999 / mo | ₹3,999 / mo | ₹12,000 / yr |

### Visual Identity & Theme
- **Controls**: Clean segmented button controls matching FlowDesk's indigo and slate palette.
- **Typography**: Formatted tabular numbers (`tabular-nums`) with clear standard Indian currency notation (`₹` and comma grouping).
- **Zero-Pill Compliance**: Clean typographic separators and unboxed metadata aligned with the frontend design constitution.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Rounded Market Figures vs Exchange Rate Fluctuations**
  - *Chosen Approach*: Standard fixed rounded figures (₹999 / ₹1,999 / ₹2,499).
  - *Why*: Direct conversion ($28 × 87.5 = ₹2,450.70) creates messy, non-standard pricing. In SaaS marketing, psychological round numbers build higher trust.
- **Decision 2: Currency Switcher Placement**
  - *Chosen Approach*: Placed in the Pricing Section header right next to the Monthly/Annual toggle, with an optional compact selector in the top navbar.
  - *Why*: Keeps decision controls grouped contextually right where buyers evaluate costs without cluttering the global viewport.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                          App.tsx                              │
│       State: currency ('USD' | 'INR'), billingCycle, user     │
└───────────────┬───────────────────────────────┬───────────────┘
                │                               │
        ┌───────▼──────────────┐        ┌───────▼──────────────┐
        │      Navbar.tsx      │        │  PricingSection.tsx  │
        │ Currency Switcher    │        │ Currency Toggle      │
        │ Quick Toggle         │        │ Billing Cycle Switch │
        └──────────────────────┘        │ Dynamic Seat Slider  │
                                        └───────┬──────────────┘
                                                │
                                        ┌───────▼──────────────┐
                                        │   TrialModal.tsx     │
                                        │ Currency Synced Card │
                                        └───────┬──────────────┘
                                                │
                                        ┌───────▼──────────────┐
                                        │  src/utils/pricing.ts│
                                        │ - Multi-currency math│
                                        │ - calculateAnnualCost│
                                        │ - calculateSavings   │
                                        │ Unit Tests (pricing) │
                                        └──────────────────────┘
```

### Data Model & Utilities (`src/utils/pricing.ts`)
- Define `type Currency = 'USD' | 'INR'`.
- Add localized price models:
  ```typescript
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
  ```
- Helper functions: `formatCurrency(amount, currency)`, `calculateEffectiveMonthlyRate(planId, cycle, currency)`, `calculateAnnualSavings(planId, seats, currency)`.
- Comprehensive unit test updates in `src/utils/pricing.test.ts` to verify all Rupee calculations and savings formulas.
