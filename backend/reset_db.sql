-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create/Update Tables (Safe if they exist)
create table if not exists public.trips (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id), -- Nullable for seeded trips
    origin text not null,
    destination text not null,
    date date not null,
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

create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  trip_id uuid references public.trips(id) not null,
  status text default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Security Policies (RLS)
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

-- 4. SEED DATA (Only inserts if table is empty to avoid duplicates on re-run)
INSERT INTO public.trips (
    origin, destination, date, time, price, seats_available, vehicle, driver_name, driver_rating, title
)
SELECT 'Johannesburg', 'Durban', '2026-02-15', '08:00', 450.00, 3, 'Toyota Fortuner', 'Thabo Mbeki', 4.9, 'Jozi to Durbs Weekend'
WHERE NOT EXISTS (SELECT 1 FROM trips WHERE origin = 'Johannesburg' AND destination = 'Durban');

INSERT INTO public.trips (
    origin, destination, date, time, price, seats_available, vehicle, driver_name, driver_rating, title
)
SELECT 'Cape Town', 'Stellenbosch', '2026-02-16', '09:30', 150.00, 2, 'VW Polo', 'Sarah Johnson', 4.8, 'Winelands Tour'
WHERE NOT EXISTS (SELECT 1 FROM trips WHERE origin = 'Cape Town');

INSERT INTO public.trips (
    origin, destination, date, time, price, seats_available, vehicle, driver_name, driver_rating, title
)
SELECT 'Pretoria', 'Polokwane', '2026-02-17', '07:00', 300.00, 4, 'Ford Ranger', 'Mike Smith', 4.7, 'Business Trip'
WHERE NOT EXISTS (SELECT 1 FROM trips WHERE origin = 'Pretoria');
