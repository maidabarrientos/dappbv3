-- Create projects table if not exists
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  type text not null check (type in ('token_sale', 'airdrop', 'exchange', 'token')),
  network text not null,
  status text not null check (status in ('draft', 'active', 'completed', 'cancelled')),
  config jsonb not null default '{}'::jsonb,
  contract_address text,
  deployment_tx text,
  explorer_links jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create deployments table if not exists
create table if not exists public.deployments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  network text not null,
  tx_hash text not null,
  contract_address text,
  status text not null check (status in ('pending', 'success', 'failed')),
  explorer_links jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Drop existing policies if they exist
drop policy if exists "Users can view their own projects" on projects;
drop policy if exists "Users can create their own projects" on projects;
drop policy if exists "Users can update their own projects" on projects;
drop policy if exists "Users can delete their own projects" on projects;

drop policy if exists "Users can view their own deployments" on deployments;
drop policy if exists "Users can create their own deployments" on deployments;
drop policy if exists "Users can update their own deployments" on deployments;

-- Enable RLS
alter table public.projects enable row level security;
alter table public.deployments enable row level security;

-- Projects security policies
create policy "Users can view their own projects"
  on projects for select
  using ( auth.uid() = user_id );

create policy "Users can create their own projects"
  on projects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own projects"
  on projects for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own projects"
  on projects for delete
  using ( auth.uid() = user_id );

-- Deployments security policies
create policy "Users can view their own deployments"
  on deployments for select
  using ( auth.uid() = user_id );

create policy "Users can create their own deployments"
  on deployments for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own deployments"
  on deployments for update
  using ( auth.uid() = user_id );