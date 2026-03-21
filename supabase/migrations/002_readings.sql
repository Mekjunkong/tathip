create table public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  session_id text not null,
  messages jsonb not null default '[]'::jsonb,
  systems_used text[] default '{}',
  birth_data jsonb,
  summary text,
  language text default 'th',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.readings enable row level security;

create policy "Users can view own readings"
  on public.readings for select using (auth.uid() = user_id);

create policy "Users can insert readings"
  on public.readings for insert with check (
    auth.uid() = user_id or user_id is null
  );

create policy "Users can update own readings"
  on public.readings for update using (auth.uid() = user_id);

create index idx_readings_user on public.readings(user_id);
create index idx_readings_session on public.readings(session_id);
