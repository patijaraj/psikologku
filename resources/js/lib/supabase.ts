import { createClient } from '@supabase/supabase-js';

// Narik variabel dari file .env Laravel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Waduh! Kunci atau URL Supabase belum di-set di file .env lo, cuy.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);