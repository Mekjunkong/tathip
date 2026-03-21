# TaThip (ตาทิพย์) — AI Fortune Teller

@AGENTS.md

## Project Overview

AI-powered fortune telling chatbot combining Thai, Western, Vedic, Chinese astrology, numerology, tarot, and feng shui. Currently Phase 1 MVP: Thai astrology chatbot with birth chart calculation and RAG knowledge base.

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
| Astrology | Swiss Ephemeris (swisseph npm, native addon) |
| Language | TypeScript (strict) |
| Deployment | Vercel |

## Architecture

```
User → Chat UI (useChat) → /api/chat (streamText) → AI Gateway (Claude)
                                    ↓ tool calls
                          ┌─────────┴─────────┐
                          ▼                   ▼
                   Thai Birth Chart      RAG Knowledge
                   (Swiss Ephemeris)     (pgvector search)
```

- **Rules Engine:** Swiss Ephemeris with Lahiri ayanamsa for sidereal planetary calculations. Code in `lib/astrology/`.
- **RAG Knowledge Base:** Supabase pgvector with text-embedding-3-small. Authoritative Thai astrology texts chunked and embedded. Code in `lib/ai/rag.ts`.
- **AI Chat:** AI SDK v6 with tool calling. Model routes through AI Gateway as plain string `"anthropic/claude-sonnet-4.6"`. Code in `app/api/chat/route.ts`.

## Key Conventions

- **AI Gateway model strings:** Always use plain strings like `"anthropic/claude-sonnet-4.6"` — never wrap in provider functions
- **AI SDK v6:** Use `inputSchema` (not `parameters`), `convertToModelMessages()` (async), `toUIMessageStreamResponse()`, `stopWhen: stepCountIs(N)`
- **Next.js 16:** Uses `proxy.ts` (not `middleware.ts`). All request APIs are async (`await cookies()`, etc.)
- **Supabase SSR:** Browser client in `lib/supabase/client.ts`, server client in `lib/supabase/server.ts`
- **swisseph:** Native Node.js addon — must be in `serverExternalPackages` in next.config.ts
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
├── ai/                         # System prompt, tools, RAG
├── astrology/                  # Swiss Ephemeris wrapper, Thai chart calculator
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

- [x] Phase 1: MVP — Thai astrology chatbot (current)
- [ ] Phase 2: Multi-system expansion (Western, Vedic, Chinese, Tarot, Numerology)
- [ ] Phase 3: Monetization (credits, Stripe, SEO pages)
- [ ] Phase 4: Premium features (Feng Shui, LINE, Mobile)
