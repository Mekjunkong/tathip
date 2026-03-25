/**
 * Creates a Stripe Checkout session for credit purchases.
 *
 * POST /api/checkout { packageId: "starter" | "popular" | "pro" }
 * Returns { url: string } — the Stripe hosted checkout URL.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getStripe, CREDIT_PACKAGES, type PackageId } from "@/lib/stripe";

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { packageId } = (await req.json()) as { packageId: string };

  if (!(packageId in CREDIT_PACKAGES)) {
    return Response.json({ error: "Invalid package" }, { status: 400 });
  }

  const pkg = CREDIT_PACKAGES[packageId as PackageId];
  const origin = req.headers.get("origin") ?? "https://tathip.com";

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    metadata: {
      user_id: user.id,
      package_id: packageId,
      credits: String(pkg.credits),
    },
    line_items: [
      {
        price_data: {
          currency: "thb",
          unit_amount: pkg.priceTHB,
          product_data: {
            name: `TaThip ${pkg.name} Credits`,
            description: `${pkg.credits} fortune reading credits`,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/profile?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=cancelled`,
  });

  return Response.json({ url: session.url });
}
