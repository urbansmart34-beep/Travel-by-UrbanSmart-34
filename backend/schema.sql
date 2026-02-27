-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- TRIPS
create table public.trips (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  status text default 'planned', -- planned, booked, completed, cancelled
  start_date date,
  end_date date,
  destination text,
  metadata jsonb, -- Stores flight/hotel details
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for trips
alter table public.trips enable row level security;

create policy "Users can view own trips."
  on trips for select
  using ( auth.uid() = user_id );

create policy "Users can insert own trips."
  on trips for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own trips."
  on trips for update
  using ( auth.uid() = user_id );

-- MESSAGES (AI Chat History)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  role text not null, -- 'user' or 'assistant'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for messages
alter table public.messages enable row level security;

create policy "Users can view own messages."
  on messages for select
  using ( auth.uid() = user_id );

create policy "Users can insert own messages."
  on messages for insert
  with check ( auth.uid() = user_id );
