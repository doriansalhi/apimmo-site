import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Le site fonctionne même sans Supabase configuré (fallback data.js).
export const supabaseReady = Boolean(url && key);

export const supabase = supabaseReady ? createClient(url, key) : null;
