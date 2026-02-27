-- 1. Create bookings table (Safe to run multiple times)
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  trip_id uuid references public.trips(id) not null,
  status text default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Security (RLS)
alter table public.bookings enable row level security;

-- 3. Create/Update Policies (Drops existing ones first to avoid errors)
drop policy if exists "Users can view own bookings." on bookings;
create policy "Users can view own bookings." on bookings for select using ( auth.uid() = user_id );

drop policy if exists "Users can insert own bookings." on bookings;
create policy "Users can insert own bookings." on bookings for insert with check ( auth.uid() = user_id );

-- 4. Open up Trips to the Public (So everyone can search)
drop policy if exists "Users can view own trips." on trips;
drop policy if exists "Public can view trips" on trips;
create policy "Public can view trips" on trips for select using ( true );
