-- Pricing Plans
create table public.pricing_plans (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price_eth numeric not null,
  features jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Payments
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  amount_eth numeric not null,
  tx_hash text not null,
  status text not null check (status in ('pending', 'completed', 'failed')),
  service_type text not null check (service_type in ('token_sale', 'airdrop', 'exchange', 'auth')),
  service_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.pricing_plans enable row level security;
alter table public.payments enable row level security;

-- Pricing Plans security policies
create policy "Anyone can view pricing plans"
  on pricing_plans for select
  using ( true );

-- Payments security policies
create policy "Users can view their own payments"
  on payments for select
  using ( auth.uid() = user_id );

create policy "Users can create their own payments"
  on payments for insert
  with check ( auth.uid() = user_id );

-- Insert default pricing plans
insert into public.pricing_plans (name, price_eth, features) values
  ('Token Sale', 0.02, '{"deployment": true, "customization": true, "analytics": true}'::jsonb),
  ('Airdrop', 0.02, '{"merkle_tree": true, "bulk_distribution": true}'::jsonb),
  ('Exchange', 0.02, '{"liquidity_pools": true, "trading": true}'::jsonb),
  ('Authentication', 0.02, '{"web3_auth": true, "wallet_connect": true}'::jsonb);