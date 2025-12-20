// ============================================================================
// SUPABASE CLIENT CONFIGURATION
// ============================================================================
// File: src/config/supabaseClient.js
// This file initializes and exports the Supabase client
// ============================================================================

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Support either VITE_SUPABASE_ANON_KEY (recommended) or the older VITE_SUPABASE_KEY
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure you have created a .env file with:');
  console.error('VITE_SUPABASE_URL=your_supabase_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_anon_key OR VITE_SUPABASE_KEY=your_anon_key');
  throw new Error('Missing Supabase environment variables');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Export for debugging (remove in production)
console.log('✅ Supabase client initialized');
console.log('📍 URL:', supabaseUrl);