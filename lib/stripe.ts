/**
 * Stripe configuration and credit package definitions.
 *
 * Requires STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET env vars.
 * Uses lazy initialization to avoid build-time errors when env vars aren't set.
 */

import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" });
  }
  return _stripe;
}

export const CREDIT_PACKAGES = {
  starter: { credits: 10, priceTHB: 5900, priceUSD: 169, name: "Starter 10" },
  popular: { credits: 30, priceTHB: 14900, priceUSD: 429, name: "Popular 30" },
  pro: { credits: 100, priceTHB: 39900, priceUSD: 1149, name: "Pro 100" },
} as const;

export type PackageId = keyof typeof CREDIT_PACKAGES;
