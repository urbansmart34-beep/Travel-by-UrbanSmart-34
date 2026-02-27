import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase Client Init - URL:", supabaseUrl);
console.log("Supabase Client Init - Key Length:", supabaseKey ? supabaseKey.length : 0);

// Create a safe client that won't crash if config is missing
const createSafeClient = () => {
    if (supabaseUrl && supabaseKey && supabaseUrl !== "undefined") {
        try {
            return createClient(supabaseUrl, supabaseKey);
        } catch (e) {
            console.error("Failed to initialize Supabase client:", e);
        }
    }

    console.warn("Supabase credentials missing or invalid. Using mock client.");
    return {
        auth: {
            getSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: async () => ({ data: null, error: { message: "Backend not configured" } }),
            signUp: async () => ({ data: null, error: { message: "Backend not configured" } }),
            signOut: async () => ({ error: null }),
        },
        from: () => ({
            select: () => ({
                eq: () => ({
                    single: async () => ({ data: null, error: null }),
                    order: () => ({ data: [], error: null }),
                }),
                order: () => ({ data: [], error: null }),
            })
        })
    };
};

export const supabase = createSafeClient();
