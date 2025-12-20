-- ============================================================================
-- MIGRATION 03: SEED SAMPLE DATA
-- ============================================================================
-- File: 03_seed_data.sql
-- Run this THIRD in Supabase SQL Editor
-- This generates ~150 realistic records across 90 days
-- ============================================================================

-- Clear existing data (optional - comment out if you want to keep data)
-- TRUNCATE public.business_records;

-- Generate sample data for the last 90 days
-- 5 categories, 70% chance of record per day per category
INSERT INTO public.business_records (category, amount, record_date)
SELECT 
  category,
  ROUND((RANDOM() * 4000 + 100)::numeric, 2) as amount,
  (CURRENT_DATE - (interval '1 day' * day_offset))::date as record_date
FROM (
  SELECT 
    unnest(ARRAY['Sales', 'Service', 'Product', 'Subscription', 'Consulting']) as category,
    generate_series(0, 89) as day_offset
) as data_generator
WHERE RANDOM() > 0.3  -- 70% chance of record per day
ORDER BY record_date DESC;

-- Add some high-value transactions for variety
INSERT INTO public.business_records (category, amount, record_date)
VALUES
  ('Sales', 15000.00, CURRENT_DATE - 2),
  ('Sales', 12500.00, CURRENT_DATE - 5),
  ('Consulting', 8900.00, CURRENT_DATE - 7),
  ('Product', 6750.00, CURRENT_DATE - 10),
  ('Service', 5400.00, CURRENT_DATE - 15),
  ('Sales', 9800.00, CURRENT_DATE - 20),
  ('Consulting', 7500.00, CURRENT_DATE - 25),
  ('Product', 4300.00, CURRENT_DATE - 30);

-- Add consistent weekly subscription revenue
INSERT INTO public.business_records (category, amount, record_date)
SELECT 
  'Subscription' as category,
  299.00 as amount,
  (CURRENT_DATE - (interval '1 day' * day_offset))::date as record_date
FROM generate_series(0, 89, 7) as day_offset;  -- Every 7 days

-- ============================================================================
-- Verification: Check your data
-- ============================================================================
-- SELECT 
--   COUNT(*) as total_records,
--   MIN(record_date) as earliest_date,
--   MAX(record_date) as latest_date,
--   COUNT(DISTINCT category) as num_categories,
--   ROUND(SUM(amount)::numeric, 2) as total_revenue
-- FROM public.business_records;

-- Check category distribution
-- SELECT 
--   category,
--   COUNT(*) as record_count,
--   ROUND(SUM(amount)::numeric, 2) as category_revenue
-- FROM public.business_records
-- GROUP BY category
-- ORDER BY category_revenue DESC;