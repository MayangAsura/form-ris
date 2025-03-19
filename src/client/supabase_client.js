import { createClient } from '@supabase/supabase-js';

const client = await createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_KEY);

const supabase = () => client;

export default supabase;
