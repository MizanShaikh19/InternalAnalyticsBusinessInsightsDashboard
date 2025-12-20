-- ============================================================================
-- MIGRATION 05: CREATE VIEWS (OPTIONAL)
-- ============================================================================
-- File: 05_create_views.sql
-- Run this FIFTH in Supabase SQL Editor (OPTIONAL)
-- These views make common queries even simpler
-- ============================================================================

-- ============================================================================
-- VIEW 1: Recent 30 Days Summary
-- ============================================================================
-- Quick access to last 30 days data by category

CREATE OR REPLACE VIEW recent_30_days_summary AS
SELECT 
  category,
  SUM(amount) as total_revenue,
  COUNT(*) as total_orders,
  ROUND(AVG(amount), 2) as avg_order_value,
  MIN(record_date) as first_date,
  MAX(record_date) as last_date
FROM public.business_records
WHERE record_date >= CURRENT_DATE - 30
GROUP BY category
ORDER BY total_revenue DESC;


-- ============================================================================
-- VIEW 2: Daily Revenue Trend
-- ============================================================================
-- Shows daily aggregates for the last 90 days

CREATE OR REPLACE VIEW daily_revenue_trend AS
SELECT 
  record_date,
  SUM(amount) as daily_revenue,
  COUNT(*) as daily_orders,
  ROUND(AVG(amount), 2) as avg_order_value
FROM public.business_records
WHERE record_date >= CURRENT_DATE - 90
GROUP BY record_date
ORDER BY record_date DESC;


-- ============================================================================
-- VIEW 3: Current Month by Category
-- ============================================================================
-- Shows current month performance breakdown

CREATE OR REPLACE VIEW current_month_by_category AS
SELECT 
  category,
  SUM(amount) as total_revenue,
  COUNT(*) as total_orders,
  ROUND(AVG(amount), 2) as avg_order_value
FROM public.business_records
WHERE 
  EXTRACT(YEAR FROM record_date) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND EXTRACT(MONTH FROM record_date) = EXTRACT(MONTH FROM CURRENT_DATE)
GROUP BY category
ORDER BY total_revenue DESC;


-- ============================================================================
-- GRANT PERMISSIONS ON VIEWS
-- ============================================================================

GRANT SELECT ON recent_30_days_summary TO authenticated;
GRANT SELECT ON daily_revenue_trend TO authenticated;
GRANT SELECT ON current_month_by_category TO authenticated;


-- ============================================================================
-- VERIFICATION: Query your views
-- ============================================================================

-- Test recent 30 days view
-- SELECT * FROM recent_30_days_summary;

-- Test daily trend view (limit to 10 rows)
-- SELECT * FROM daily_revenue_trend LIMIT 10;

-- Test current month view
-- SELECT * FROM current_month_by_category;