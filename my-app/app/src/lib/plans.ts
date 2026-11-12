// Single source of truth for plan prices. The checkout API looks prices up
// here by plan id, so a visitor can't change what they are charged.

export type PlanId = "basic" | "pro" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  priceUsd: number;
  features: string[];
  highlighted: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    priceUsd: 9,
    features: ["Access to core features", "Email support", "1GB storage"],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    priceUsd: 29,
    features: [
      "Everything in Basic",
      "Priority support",
      "10GB storage",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    priceUsd: 59,
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Unlimited storage",
      "Advanced analytics",
    ],
    highlighted: false,
  },
];

export function findPlan(id: unknown): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}
