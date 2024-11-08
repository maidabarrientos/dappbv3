-- Drop existing policies if they exist
drop policy if exists "Users can view their own projects" on projects;
drop policy if exists "Users can create their own projects" on projects;
drop policy if exists "Users can update their own projects" on projects;
drop policy if exists "Users can delete their own projects" on projects;

-- Create projects table if not exists
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  type text not null check (type in ('token', 'token_sale', 'airdrop', 'exchange')),
  config jsonb not null default '{}'::jsonb,
  network text,
  contract_address text,
  explorer_url text,
  transaction_hash text,
  status text not null default 'draft' check (status in ('draft', 'deployed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS if not already enabled
alter table if exists public.projects enable row level security;

-- Recreate security policies
create policy "Users can view their own projects"
  on projects for select
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on projects for delete
  using (auth.uid() = user_id);

-- Create or replace function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists set_updated_at on projects;
create trigger set_updated_at
  before update on projects
  for each row
  execute function handle_updated_at();