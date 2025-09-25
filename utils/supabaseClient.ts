// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Basic client (no Auth storage yet — email-only flow ke liye enough)
export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: false,      // we aren't using login yet
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
