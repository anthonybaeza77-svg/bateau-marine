import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Forfait {
  id: string;
  name: string;
  brand: string | null;
  description: string;
  items: string[];
  price_label: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
