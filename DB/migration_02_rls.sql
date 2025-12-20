-- ============================================================================
-- MIGRATION 02: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- File: 02_enable_rls.sql
-- Run this SECOND in Supabase SQL Editor
-- ============================================================================

-- Enable Row Level Security on business_records table
ALTER TABLE public.business_records ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to SELECT (read) all records
CREATE POLICY "Allow authenticated users to read business records"
  ON public.business_records
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to INSERT records
CREATE POLICY "Allow authenticated users to insert business records"
  ON public.business_records
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to UPDATE records
CREATE POLICY "Allow authenticated users to update business records"
  ON public.business_records
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to DELETE records
CREATE POLICY "Allow authenticated users to delete business records"
  ON public.business_records
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- Verification: Check if RLS is enabled
-- ============================================================================
-- SELECT tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE tablename = 'business_records';
-- Should show rowsecurity = true