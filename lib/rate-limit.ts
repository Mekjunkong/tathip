/**
 * Simple in-memory rate limiter.
 *
 * Limits free users to a fixed number of messages per calendar day.
 * Resets when the date changes.
 *
 * NOTE: This is per-process and resets on redeploy. For production,
 * replace with Redis-backed rate limiting (e.g. Upstash).
 */

const FREE_LIMIT = 3;

interface RateLimitEntry {
  count: number;
  date: string;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
} {
  const today = getTodayString();
  const entry = rateLimitMap.get(identifier);

  if (!entry || entry.date !== today) {
    rateLimitMap.set(identifier, { count: 1, date: today });
    return { allowed: true, remaining: FREE_LIMIT - 1 };
  }

  if (entry.count >= FREE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: FREE_LIMIT - entry.count };
}
