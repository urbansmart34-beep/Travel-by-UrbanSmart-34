-- Insert Test Trips
-- Note: We use auth.uid() to assign the trip to the CURRENTLY logged in user (you).
-- If you run this in the SQL Editor, auth.uid() might be null if you haven't selected a user role.
-- Ideally, create a user in the 'Authentication' tab first, then grab their UUID.
-- However, for testing, we can just insert without a specific user_id if the table allows it, 
-- OR use a placeholder if you don't care about RLS for these specific rows (we made public viewable).

-- IMPORTANT: You might need to replace 'your-user-uuid-here' with an actual UID from your Authentication > Users list 
-- if the constraint is strict. But since we are running this in SQL Editor, let's try to be generic.

INSERT INTO public.trips (
    user_id, 
    origin, 
    destination, 
    date, 
    time, 
    price, 
    seats_available, 
    vehicle, 
    driver_name, 
    driver_rating, 
    status,
    title
) VALUES 
(
    (SELECT id FROM auth.users LIMIT 1), -- Picks the first user found (hope you have one!)
    'Johannesburg', 
    'Durban', 
    '2026-02-15', 
    '08:00', 
    450.00, 
    3, 
    'Toyota Fortuner', 
    'Thabo Mbeki', 
    4.9, 
    'planned',
    'Jozi to Durbs Weekend'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Cape Town', 
    'Stellenbosch', 
    '2026-02-16', 
    '09:30', 
    150.00, 
    2, 
    'VW Polo', 
    'Sarah Johnson', 
    4.8, 
    'planned',
    'Winelands Tour'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Pretoria', 
    'Polokwane', 
    '2026-02-17', 
    '07:00', 
    300.00, 
    4, 
    'Ford Ranger', 
    'Mike Smith', 
    4.7, 
    'planned',
    'Business Trip'
);
