-- Allow public read access to trips (so users can search for rides)
DROP POLICY IF EXISTS "Public can view trips" ON public.trips;
DROP POLICY IF EXISTS "Users can view own trips" ON public.trips;

CREATE POLICY "Public can view trips"
ON public.trips FOR SELECT
USING (true);

-- Ensure users can still insert their own trips (if they are drivers)
DROP POLICY IF EXISTS "Users can insert own trips" ON public.trips;
CREATE POLICY "Users can insert own trips"
ON public.trips FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- While we are at it, allow public to insert bookings? No, bookings should be auth-only.
-- But trips need to be public.
