-- ============================================================================
-- MIGRATION 01: CREATE BUSINESS RECORDS TABLE
-- ============================================================================
-- File: 01_create_tables.sql
-- Run this FIRST in Supabase SQL Editor
-- ============================================================================

-- Create business_records table
CREATE TABLE IF NOT EXISTS public.business_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  record_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_business_records_date 
  ON public.business_records(record_date DESC);

CREATE INDEX IF NOT EXISTS idx_business_records_category 
  ON public.business_records(category);

CREATE INDEX IF NOT EXISTS idx_business_records_date_category 
  ON public.business_records(record_date DESC, category);

-- Auto-update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_business_records_updated_at
  BEFORE UPDATE ON public.business_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Verification: Run this to check if table was created
-- ============================================================================
-- SELECT COUNT(*) FROM public.business_records;
-- Should return 0 (empty table)