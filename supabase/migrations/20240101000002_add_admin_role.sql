-- Create admin role
create table public.admin_users (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.admin_users enable row level security;

-- Admin users security policies
create policy "Only super admins can manage admin users"
  on admin_users
  using (
    exists (
      select 1 from admin_users
      where admin_users.id = auth.uid()
      and admin_users.role = 'super_admin'
    )
  );

create policy "Admins can view admin users"
  on admin_users for select
  using (
    exists (
      select 1 from admin_users
      where admin_users.id = auth.uid()
    )
  );

-- Create function to check if user is admin
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from admin_users
    where admin_users.id = user_id
  );
end;
$$ language plpgsql security definer;

-- Create views for admin dashboard
create view admin_project_stats as
select
  date_trunc('month', created_at) as month,
  count(*) as total_projects,
  sum(case when status = 'completed' then 1 else 0 end) as completed_projects,
  count(distinct user_id) as unique_users
from (
  select created_at, status, user_id from token_sales
  union all
  select created_at, status, user_id from airdrops
) all_projects
group by date_trunc('month', created_at)
order by month desc;

create view admin_revenue_stats as
select
  date_trunc('month', created_at) as month,
  sum(amount_eth) as total_eth,
  count(*) as total_transactions
from payments
where status = 'completed'
group by date_trunc('month', created_at)
order by month desc;

-- Enable RLS on views
alter view admin_project_stats security invoker;
alter view admin_revenue_stats security invoker;

-- Create policies for views
create policy "Only admins can view stats"
  on admin_project_stats
  for select
  using (is_admin(auth.uid()));

create policy "Only admins can view revenue"
  on admin_revenue_stats
  for select
  using (is_admin(auth.uid()));