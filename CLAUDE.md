# TaThip (ตาทิพย์) — AI Fortune Teller

@AGENTS.md

## Project Overview

AI-powered fortune telling chatbot combining Thai astrology, Tarot, Numerology, and Chinese BaZi. Phase 2 complete: multi-system fortune telling with premium mystical UI.

**Domain:** tathip.com
**Design Spec:** `docs/superpowers/specs/2026-03-21-hora-ai-fortune-teller-design.md`
**Implementation Plan:** `docs/superpowers/plans/2026-03-21-tathip-phase1-mvp.md`

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase (Auth + PostgreSQL + pgvector) |
| AI | AI SDK v6, AI Gateway (anthropic/claude-sonnet-4.6) |
| Astrology | astronomy-engine (pure JS, Lahiri ayanamsa) |
| Language | TypeScript (strict) |
| Deployment | Vercel |

## Architecture

```
User → Chat UI (useChat) → /api/chat (streamText) → AI Gateway (Claude)
                                    ↓ tool calls
                    ┌───────────┬────────┬─────────┬──────────┐
                    ▼           ▼        ▼         ▼          ▼
              Thai Chart    Tarot    Numerology   BaZi    RAG Knowledge
              (astronomy)   (deck)  (calculator) (pillars) (pgvector)
```

- **Thai Astrology:** astronomy-engine (pure JS) with Lahiri ayanamsa. Code in `lib/astrology/thai-chart.ts`.
- **Chinese BaZi:** Four Pillars of Destiny with Five Elements analysis. Code in `lib/astrology/bazi.ts`.
- **Tarot:** 78-card Rider-Waite deck with shuffle, draw, three spread types. Code in `lib/tarot/deck.ts`, types in `types/tarot.ts`.
- **Numerology:** Pythagorean + Thai เลขศาสตร์ systems. Code in `lib/numerology/calculator.ts`.
- **RAG Knowledge Base:** Supabase pgvector with text-embedding-3-small. Code in `lib/ai/rag.ts`.
- **AI Chat:** AI SDK v6 with 5 tools (calculate_birth_chart, draw_tarot, calculate_numerology, calculate_bazi, lookup_knowledge). Code in `app/api/chat/route.ts`.

## Key Conventions

- **AI Gateway model strings:** Always use plain strings like `"anthropic/claude-sonnet-4.6"` — never wrap in provider functions
- **AI SDK v6:** Use `inputSchema` (not `parameters`), `convertToModelMessages()` (async), `toUIMessageStreamResponse()`, `stopWhen: stepCountIs(N)`
- **Next.js 16:** Uses `proxy.ts` (not `middleware.ts`). All request APIs are async (`await cookies()`, etc.)
- **Supabase SSR:** Browser client in `lib/supabase/client.ts`, server client in `lib/supabase/server.ts`
- **astronomy-engine:** Pure JavaScript — no native addons, no `serverExternalPackages` needed
- **Bilingual:** All UI text uses `t(language, key)` from `lib/i18n.ts`. Default language: Thai.
- **Theme:** Dark mystical (deep indigo/purple). oklch color tokens in globals.css.

## Project Structure

```
app/
├── page.tsx                    # Landing page
├── chat/page.tsx               # AI chatbot (main product)
├── auth/{login,signup}/        # Auth pages
├── profile/page.tsx            # User profile + birth data
├── api/chat/route.ts           # AI streaming endpoint
└── api/calculate/birth-chart/  # Birth chart API

components/
├── chat/                       # Chat UI components
└── layout/header.tsx           # Auth-aware header with language toggle

lib/
├── ai/                         # System prompt, tools (5 tools), RAG
├── astrology/                  # Thai chart (swiss-ephemeris.ts, thai-chart.ts), Chinese BaZi (bazi.ts)
├── tarot/                      # Tarot deck operations (deck.ts)
├── numerology/                 # Numerology calculator (calculator.ts)
├── supabase/                   # Browser + server clients
├── i18n.ts                     # Thai/English translations
└── rate-limit.ts               # 3 free messages/day

scripts/                        # Knowledge base ingestion scripts
├── ingest-wikisource.ts        # Thai Wikisource scraper
├── ingest-pdf.ts               # PDF text extraction + embedding
└── seed-knowledge.ts           # Master seed script

supabase/migrations/            # SQL migrations (run manually in Supabase dashboard)
├── 001_profiles.sql
├── 002_readings.sql
└── 003_documents.sql
```

## Setup

```bash
npm install
vercel link                     # Connect to Vercel project
vercel env pull .env.local      # Get AI Gateway OIDC credentials
# Fill in Supabase credentials in .env.local
# Run migrations in Supabase SQL Editor
npm run dev
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run seed         # Run all knowledge ingestion
npm run ingest:wiki  # Ingest Thai Wikisource
npm run ingest:pdf   # Ingest a PDF: npx tsx scripts/ingest-pdf.ts <path> [title] [system]
```

## Phase Status

- [x] Phase 1: MVP — Thai astrology chatbot
- [x] Phase 2: Multi-system expansion (Tarot, Numerology, Chinese BaZi) + UI polish
- [ ] Phase 3: Monetization (credits, Stripe, SEO pages)
- [ ] Phase 4: Premium features (Feng Shui, LINE, Mobile)
