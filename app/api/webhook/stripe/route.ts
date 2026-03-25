/**
 * Stripe webhook handler.
 *
 * On checkout.session.completed, adds credits to the user's profile.
 * Uses the service role key to bypass RLS for credit insertion.
 */

import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    const credits = parseInt(session.metadata?.credits ?? "0", 10);

    if (!userId || credits <= 0) {
      return Response.json({ error: "Invalid metadata" }, { status: 400 });
    }

    // Add credits atomically
    const supabaseAdmin = getSupabaseAdmin();

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    const currentCredits = profile?.credits ?? 0;
    const newBalance = currentCredits + credits;

    await supabaseAdmin
      .from("profiles")
      .update({ credits: newBalance, updated_at: new Date().toISOString() })
      .eq("id", userId);

    // Log transaction
    await supabaseAdmin.from("credit_transactions").insert({
      user_id: userId,
      amount: credits,
      reason: "purchase",
      stripe_session_id: session.id,
      balance_after: newBalance,
    });
  }

  return Response.json({ received: true });
}
