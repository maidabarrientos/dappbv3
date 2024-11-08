-- Create default admin user
insert into auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) values (
  uuid_generate_v4(),
  'admin',
  crypt('vschool30', gen_salt('bf')),
  now(),
  '{"full_name": "Admin User"}'::jsonb
)
on conflict (email) do nothing;

-- Add admin role to the user
insert into public.admin_users (
  id,
  role
)
select 
  id,
  'super_admin'
from auth.users
where email = 'admin'
on conflict (id) do nothing;