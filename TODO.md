# TaThip — TODO

## Setup (Do Before Chat Works)

- [ ] Create Supabase project at https://supabase.com/dashboard (Singapore region, free tier)
- [ ] Enable pgvector extension: `create extension if not exists vector with schema extensions;`
- [ ] Run SQL migrations in Supabase SQL Editor (in order):
  - [ ] `supabase/migrations/001_profiles.sql`
  - [ ] `supabase/migrations/002_readings.sql`
  - [ ] `supabase/migrations/003_documents.sql`
- [ ] Add Supabase env vars to Vercel:
  - [ ] `vercel env add NEXT_PUBLIC_SUPABASE_URL production`
  - [ ] `vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production`
  - [ ] `vercel env add SUPABASE_SERVICE_ROLE_KEY production`
- [ ] Enable AI Gateway at https://vercel.com/pasuthun-junkongs-projects/tathip/settings → AI Gateway
- [ ] Add OpenAI API key for embeddings: `vercel env add OPENAI_API_KEY production`
- [ ] Pull env vars locally: `vercel env pull .env.local`
- [ ] Seed knowledge base: `npm run seed`
- [ ] Redeploy: `vercel deploy --prod`

## Register Domain

- [ ] Register tathip.com (available as of 2026-03-21)
- [ ] Add custom domain in Vercel: `vercel domains add tathip.com`

## Phase 2: Multi-System Expansion

- [ ] Western astrology calculations + RAG
- [ ] Vedic astrology (VedAstro API integration)
- [ ] Chinese BaZi calculator
- [ ] Tarot card reading (virtual draw + interpretation)
- [ ] Numerology engine (Thai + Western)
- [ ] Progressive depth cross-referencing

## Phase 3: Monetization + Growth

- [ ] Credit system implementation
- [ ] Stripe + PromptPay payment integration
- [ ] SEO pages (daily horoscopes, card meanings)
- [ ] Cron job for daily content generation
- [ ] Reading history + saved readings
- [ ] Lucky Numbers feature (integrate Lotto Stat project)

## Phase 4: Premium Features

- [ ] Feng shui analysis
- [ ] Auspicious timing calculator (ฤกษ์มงคล)
- [ ] Compatibility readings (2-person analysis)
- [ ] Yearly forecast reports (PDF)
- [ ] LINE Mini App integration
- [ ] Mobile app (Expo/React Native)
