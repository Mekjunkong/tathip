-- Add credits column to profiles and create credit transaction log.

alter table public.profiles
  add column if not exists credits integer default 0;

-- Credit transaction history for audit trail
create table public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount integer not null,  -- positive = add, negative = spend
  reason text not null,     -- 'purchase', 'reading', 'bonus', 'refund'
  stripe_session_id text,   -- null for non-purchase transactions
  balance_after integer not null,
  created_at timestamptz default now()
);

alter table public.credit_transactions enable row level security;

create policy "Users can view own transactions"
  on public.credit_transactions for select using (auth.uid() = user_id);

create policy "Service role can insert transactions"
  on public.credit_transactions for insert with check (true);

create index idx_credit_tx_user on public.credit_transactions(user_id);
create index idx_credit_tx_stripe on public.credit_transactions(stripe_session_id);

-- Function to spend a credit (atomic decrement)
create or replace function public.spend_credit(p_user_id uuid)
returns boolean as $$
declare
  v_credits integer;
begin
  -- Lock row and check balance
  select credits into v_credits
  from public.profiles
  where id = p_user_id
  for update;

  if v_credits is null or v_credits <= 0 then
    return false;
  end if;

  -- Decrement
  update public.profiles
  set credits = credits - 1,
      updated_at = now()
  where id = p_user_id;

  -- Log transaction
  insert into public.credit_transactions (user_id, amount, reason, balance_after)
  values (p_user_id, -1, 'reading', v_credits - 1);

  return true;
end;
$$ language plpgsql security definer;
