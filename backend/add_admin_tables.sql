-- Create support_tickets table
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies for support_tickets
-- Users can see their own tickets
CREATE POLICY "Users can view own tickets"
ON public.support_tickets FOR SELECT
USING (auth.uid() = user_id);

-- Admins can see all tickets (Assuming we check admin role in app layer or have an admin flag, for now allow read for authenticated users to facilitate the prototype, or we just allow all authenticated)
CREATE POLICY "Enable read access for all users"
ON public.support_tickets FOR SELECT
USING (auth.role() = 'authenticated');

-- Create system_logs table
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Admins can see all logs (for now allow read for authenticated)
CREATE POLICY "Enable read access for all authenticated users"
ON public.system_logs FOR SELECT
USING (auth.role() = 'authenticated');

-- Insert some dummy data for the prototype
INSERT INTO public.system_logs (event_type, message) VALUES
('Booking', 'User @jennifer_w booked a seat on Route #8492 (NYC -> BOS).'),
('Trip', 'Driver @david_k started trip #T-9923.'),
('System', 'Daily automated database backup completed successfully.'),
('Support', 'Ticket #DSP-293 created by user.'),
('Registration', 'Welcome @mark_22 to the platform.')
ON CONFLICT DO NOTHING;
