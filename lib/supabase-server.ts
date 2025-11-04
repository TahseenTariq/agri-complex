import { createServerSupabaseClient } from '@supabase/ssr'; // package name
import { cookies } from 'next/headers';

export function createServerClient() {
  return createServerSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // only on server
    cookieStore: cookies(), // integrates with Next cookies for sessions
  });
}