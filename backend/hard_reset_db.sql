-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. RESET TABLES (Drop old versions to fix "column does not exist" errors)
drop table if exists public.bookings;
drop table if exists public.trips;

-- 3. Create Tables
create table public.trips (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id), -- Nullable for seeded trips
    origin text not null,
    destination text not null,
    date release_date not null default CURRENT_DATE, -- Using text or date? Let's use text for simplicity/prototype if date causes issues, but standard is date.
    -- Wait, user script failed on 'origin', so let's stick to standard text for simplicity unless 'date' type is needed for queries.
    -- In the previous script I used 'date date'. Let's stick to that but ensure we cast strings in INSERT.
    -- actually, let's use text for date/time to matches the frontend simple filters for now, or ensure 'date' type.
    -- React usually sends 'YYYY-MM-DD' strings. Postgres 'date' handles that fine.
    
    -- Re-defining columns strictly:
    time text not null,
    price numeric not null,
    seats_available integer default 4,
    vehicle text,
    driver_name text,
    driver_rating numeric,
    status text default 'planned',
    title text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Fix 'date' column type to be text for maximum flexibility with various frontend formats,
-- OR keep as date if we want strictness.
-- Let's use 'text' for date to avoid "invalid input syntax for type date" if frontend sends something weird.
-- We can alter it later.
ALTER TABLE public.trips DROP COLUMN IF EXISTS date;
ALTER TABLE public.trips ADD COLUMN date text;


create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  trip_id uuid references public.trips(id) not null,
  status text default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Security Policies (RLS)
alter table public.trips enable row level security;
alter table public.bookings enable row level security;

-- TRIPS Policies
drop policy if exists "Public View Trips" on trips;
create policy "Public View Trips" on trips for select using (true);

drop policy if exists "Drivers Manage Own" on trips;
create policy "Drivers Manage Own" on trips for all using (auth.uid() = user_id);

-- BOOKINGS Policies
drop policy if exists "Users View Own Bookings" on bookings;
create policy "Users View Own Bookings" on bookings for select using (auth.uid() = user_id);

drop policy if exists "Users Create Bookings" on bookings;
create policy "Users Create Bookings" on bookings for insert with check (auth.uid() = user_id);

-- 5. SEED DATA
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
