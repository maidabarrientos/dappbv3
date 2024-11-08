-- Update admin_users table to include email
alter table public.admin_users 
add column email text unique;

-- Update the default admin
update public.admin_users
set email = 'maidabarrientos@gmail.com'
where role = 'super_admin';

-- Add policy for email-based access
create policy "Allow access by email"
  on admin_users
  using (email = auth.email());

-- Grant super admin role to the email
insert into public.admin_users (email, role)
values ('maidabarrientos@gmail.com', 'super_admin')
on conflict (email) do nothing;