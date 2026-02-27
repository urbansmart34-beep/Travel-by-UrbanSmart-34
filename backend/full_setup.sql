-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Drop existing tables to ensure a clean slate
drop table if exists public.bookings cascade;
drop table if exists public.messages cascade;
drop table if exists public.trips cascade;
drop table if exists public.profiles cascade;
drop type if exists public.trip_status cascade;

-- 3. PROFILES Table (Extends auth.users)
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
  on profiles for select using (true);
create policy "Users can insert their own profile."
  on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile."
  on profiles for update using (auth.uid() = id);

-- 4. TRIPS Table
create table public.trips (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id), -- Nullable for seeded trips
    origin text not null,
    destination text not null,
    date text not null, -- Stored as YYYY-MM-DD text for simplicity with frontend
    time text not null,
    price numeric not null,
    seats_available integer default 4,
    vehicle text,
    driver_name text,
    driver_rating numeric,
    status text default 'planned',
    title text,
    metadata jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRIPS Security Policies
alter table public.trips enable row level security;

create policy "Public View Trips" on trips for select using (true);
create policy "Drivers Manage Own" on trips for all using (auth.uid() = user_id);

-- 5. BOOKINGS Table
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  trip_id uuid references public.trips(id) not null,
  status text default 'confirmed',
  seats integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOOKINGS Security Policies
alter table public.bookings enable row level security;

create policy "Users View Own Bookings" on bookings for select using (auth.uid() = user_id);
create policy "Users Create Bookings" on bookings for insert with check (auth.uid() = user_id);

-- 6. MESSAGES Table (AI Chat History)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  role text not null, -- 'user' or 'assistant'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MESSAGES Security Policies
alter table public.messages enable row level security;

create policy "Users can view own messages." on messages for select using (auth.uid() = user_id);
create policy "Users can insert own messages." on messages for insert with check (auth.uid() = user_id);

-- 7. SEED DATA (Creates initial trips)
INSERT INTO public.trips (
    origin, destination, date, time, price, seats_available, vehicle, driver_name, driver_rating, title
) VALUES 
(
    'Johannesburg', 'Durban', '2026-02-15', '08:00', 450.00, 3, 'Toyota Fortuner', 'Thabo Mbeki', 4.9, 'Jozi to Durbs Weekend'
),
(
    'Cape Town', 'Stellenbosch', '2026-02-16', '09:30', 150.00, 2, 'VW Polo', 'Sarah Johnson', 4.8, 'Winelands Tour'
),
(
    'Pretoria', 'Polokwane', '2026-02-17', '07:00', 300.00, 4, 'Ford Ranger', 'Mike Smith', 4.7, 'Business Trip'
);
