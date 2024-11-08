-- Create admin role and table
create table public.admin_users (
  id uuid primary key,
  email text unique not null,
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

-- Insert default admin
insert into public.admin_users (id, email, role)
values (
  uuid_generate_v4(),
  'maidabarrientos@gmail.com',
  'super_admin'
)
on conflict (email) do nothing;