import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flrsuvqmyrpmmbqsxnqu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscnN1dnFteXJwbW1icXN4bnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTc2NDMsImV4cCI6MjA5Mjg3MzY0M30.D0_nYfbkcUM4pVdf4AcWdov8l01V2JK3kQrwsRkOt2k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
