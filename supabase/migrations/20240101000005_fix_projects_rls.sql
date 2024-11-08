-- Drop existing RLS policies
drop policy if exists "Users can view their own projects" on projects;
drop policy if exists "Users can create their own projects" on projects;
drop policy if exists "Users can update their own projects" on projects;
drop policy if exists "Users can delete their own projects" on projects;

-- Disable RLS temporarily
alter table if exists public.projects disable row level security;

-- Re-enable RLS
alter table if exists public.projects enable row level security;

-- Recreate policies with proper checks
create policy "Users can view their own projects"
  on projects for select
  using (
    auth.uid() = user_id or 
    auth.uid() in (select id from admin_users)
  );

create policy "Users can create their own projects"
  on projects for insert
  with check (
    auth.uid() = user_id
  );

create policy "Users can update their own projects"
  on projects for update
  using (
    auth.uid() = user_id
  );

create policy "Users can delete their own projects"
  on projects for delete
  using (
    auth.uid() = user_id
  );

-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all privileges on table projects to authenticated;
grant usage, select on all sequences in schema public to authenticated;