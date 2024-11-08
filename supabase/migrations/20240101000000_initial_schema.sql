-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles security policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Token Sales
create table public.token_sales (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  symbol text not null,
  total_supply numeric not null,
  decimals integer not null default 18,
  network text not null,
  token_address text,
  sale_address text,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  soft_cap numeric,
  hard_cap numeric,
  min_contribution numeric,
  max_contribution numeric,
  price numeric not null,
  status text default 'draft' check (status in ('draft', 'active', 'paused', 'completed', 'cancelled'))
);

-- Token Sale Whitelist
create table public.token_sale_whitelist (
  id uuid default uuid_generate_v4() primary key,
  token_sale_id uuid references token_sales on delete cascade not null,
  address text not null,
  max_allocation numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(token_sale_id, address)
);

-- Token Sale Vesting Schedules
create table public.vesting_schedules (
  id uuid default uuid_generate_v4() primary key,
  token_sale_id uuid references token_sales on delete cascade not null,
  cliff_duration integer not null, -- in days
  vesting_duration integer not null, -- in days
  percentage numeric not null check (percentage > 0 and percentage <= 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Airdrops
create table public.airdrops (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  token_address text not null,
  network text not null,
  type text not null check (type in ('standard', 'merkle', 'scheduled')),
  status text default 'draft' check (status in ('draft', 'active', 'completed', 'cancelled')),
  merkle_root text,
  start_time timestamp with time zone,
  end_time timestamp with time zone
);

-- Airdrop Recipients
create table public.airdrop_recipients (
  id uuid default uuid_generate_v4() primary key,
  airdrop_id uuid references airdrops on delete cascade not null,
  address text not null,
  amount numeric not null,
  claimed boolean default false,
  claimed_at timestamp with time zone,
  merkle_proof jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(airdrop_id, address)
);

-- Enable RLS for all tables
alter table public.token_sales enable row level security;
alter table public.token_sale_whitelist enable row level security;
alter table public.vesting_schedules enable row level security;
alter table public.airdrops enable row level security;
alter table public.airdrop_recipients enable row level security;

-- Token Sales security policies
create policy "Users can view their own token sales"
  on token_sales for select
  using ( auth.uid() = user_id );

create policy "Users can create their own token sales"
  on token_sales for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own token sales"
  on token_sales for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own token sales"
  on token_sales for delete
  using ( auth.uid() = user_id );

-- Token Sale Whitelist security policies
create policy "Users can view whitelist for their token sales"
  on token_sale_whitelist for select
  using ( exists (
    select 1 from token_sales
    where token_sales.id = token_sale_whitelist.token_sale_id
    and token_sales.user_id = auth.uid()
  ) );

create policy "Users can manage whitelist for their token sales"
  on token_sale_whitelist for all
  using ( exists (
    select 1 from token_sales
    where token_sales.id = token_sale_whitelist.token_sale_id
    and token_sales.user_id = auth.uid()
  ) );

-- Vesting Schedules security policies
create policy "Users can view vesting schedules for their token sales"
  on vesting_schedules for select
  using ( exists (
    select 1 from token_sales
    where token_sales.id = vesting_schedules.token_sale_id
    and token_sales.user_id = auth.uid()
  ) );

create policy "Users can manage vesting schedules for their token sales"
  on vesting_schedules for all
  using ( exists (
    select 1 from token_sales
    where token_sales.id = vesting_schedules.token_sale_id
    and token_sales.user_id = auth.uid()
  ) );

-- Airdrops security policies
create policy "Users can view their own airdrops"
  on airdrops for select
  using ( auth.uid() = user_id );

create policy "Users can create their own airdrops"
  on airdrops for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own airdrops"
  on airdrops for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own airdrops"
  on airdrops for delete
  using ( auth.uid() = user_id );

-- Airdrop Recipients security policies
create policy "Users can view recipients for their airdrops"
  on airdrop_recipients for select
  using ( exists (
    select 1 from airdrops
    where airdrops.id = airdrop_recipients.airdrop_id
    and airdrops.user_id = auth.uid()
  ) );

create policy "Users can manage recipients for their airdrops"
  on airdrop_recipients for all
  using ( exists (
    select 1 from airdrops
    where airdrops.id = airdrop_recipients.airdrop_id
    and airdrops.user_id = auth.uid()
  ) );

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();