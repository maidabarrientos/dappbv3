-- Create views for admin dashboard
create or replace view admin_project_stats as
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

create or replace view admin_revenue_stats as
select
  date_trunc('month', created_at) as month,
  sum(amount_eth) as total_eth,
  count(*) as total_transactions
from payments
where status = 'completed'
group by date_trunc('month', created_at)
order by month desc;

-- Create RLS policies for the underlying tables
create policy "Only admins can view token sales"
  on token_sales for select
  using (is_admin(auth.uid()));

create policy "Only admins can view airdrops"
  on airdrops for select
  using (is_admin(auth.uid()));

create policy "Only admins can view payments"
  on payments for select
  using (is_admin(auth.uid()));