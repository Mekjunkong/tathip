/**
 * Credit & rate-limit system.
 *
 * - Anonymous users: 3 free messages/day (IP-based, in-memory)
 * - Authenticated free users: 5 free messages/day (DB-backed)
 * - Authenticated with credits: unlimited (1 credit per message)
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";

const FREE_LIMIT_ANON = 3;
const FREE_LIMIT_AUTH = 5;

/** In-memory fallback for anonymous users */
const anonMap = new Map<string, { count: number; date: string }>();

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export interface CreditCheck {
  allowed: boolean;
  remaining: number;
  isAuthenticated: boolean;
  hasCredits: boolean;
}

/** Check if an anonymous user (by IP) can send a message */
export function checkAnonLimit(ip: string): CreditCheck {
  const today = todayStr();
  const entry = anonMap.get(ip);

  if (!entry || entry.date !== today) {
    anonMap.set(ip, { count: 1, date: today });
    return {
      allowed: true,
      remaining: FREE_LIMIT_ANON - 1,
      isAuthenticated: false,
      hasCredits: false,
    };
  }

  if (entry.count >= FREE_LIMIT_ANON) {
    return {
      allowed: false,
      remaining: 0,
      isAuthenticated: false,
      hasCredits: false,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: FREE_LIMIT_ANON - entry.count,
    isAuthenticated: false,
    hasCredits: false,
  };
}

/** Check if an authenticated user can send a message, spend credit if needed */
export async function checkAuthCredit(userId: string): Promise<CreditCheck> {
  const supabase = await createServerSupabaseClient();
  const today = todayStr();

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits, free_readings_today, last_reading_date")
    .eq("id", userId)
    .single();

  if (!profile) {
    return { allowed: false, remaining: 0, isAuthenticated: true, hasCredits: false };
  }

  // Reset daily counter if new day
  const usedToday =
    profile.last_reading_date === today ? profile.free_readings_today : 0;

  // If user has credits, spend one
  if (profile.credits > 0) {
    const { data: success } = await supabase.rpc("spend_credit", {
      p_user_id: userId,
    });
    if (success) {
      return {
        allowed: true,
        remaining: profile.credits - 1,
        isAuthenticated: true,
        hasCredits: true,
      };
    }
  }

  // Otherwise use free daily allowance
  if (usedToday < FREE_LIMIT_AUTH) {
    await supabase
      .from("profiles")
      .update({
        free_readings_today: usedToday + 1,
        last_reading_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    return {
      allowed: true,
      remaining: FREE_LIMIT_AUTH - usedToday - 1,
      isAuthenticated: true,
      hasCredits: false,
    };
  }

  return {
    allowed: false,
    remaining: 0,
    isAuthenticated: true,
    hasCredits: false,
  };
}
