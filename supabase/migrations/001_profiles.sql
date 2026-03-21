create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  birth_date date,
  birth_time time,
  birth_place text,
  birth_lat decimal,
  birth_lng decimal,
  gender text check (gender in ('male', 'female', 'other')),
  preferred_language text default 'th' check (preferred_language in ('th', 'en')),
  free_readings_today integer default 0,
  last_reading_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
