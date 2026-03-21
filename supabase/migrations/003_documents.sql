create extension if not exists vector with schema extensions;

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text not null,
  system text not null check (system in ('thai', 'western', 'vedic', 'chinese', 'numerology', 'tarot', 'fengshui', 'general')),
  language text default 'th',
  content text not null,
  chunk_index integer default 0,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz default now()
);

create index idx_documents_embedding on public.documents
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index idx_documents_system on public.documents(system);

create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5,
  filter_system text default null
)
returns table (
  id uuid,
  title text,
  content text,
  system text,
  source text,
  similarity float
)
language sql stable
as $$
  select
    d.id,
    d.title,
    d.content,
    d.system,
    d.source,
    1 - (d.embedding <=> query_embedding) as similarity
  from public.documents d
  where 1 - (d.embedding <=> query_embedding) > match_threshold
    and (filter_system is null or d.system = filter_system)
  order by d.embedding <=> query_embedding
  limit match_count;
$$;
