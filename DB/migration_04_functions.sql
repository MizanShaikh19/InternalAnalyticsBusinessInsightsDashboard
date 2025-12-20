-- ============================================================================
-- MIGRATION 04: HELPER FUNCTIONS (RECOMMENDED)
-- ============================================================================
-- File: 04_helper_functions.sql
-- Run this FOURTH in Supabase SQL Editor
-- These functions simplify frontend queries dramatically
-- ============================================================================

-- ============================================================================
-- FUNCTION 1: Get KPI Metrics
-- ============================================================================
-- Returns: total_revenue, total_orders, avg_order_value for a date range
-- Usage: SELECT * FROM get_kpi_metrics('2024-11-01', '2024-12-01', 'Sales');

CREATE OR REPLACE FUNCTION get_kpi_metrics(
  p_start_date DATE,
  p_end_date DATE,
  p_category TEXT DEFAULT 'all'
)
RETURNS TABLE (
  total_revenue DECIMAL,
  total_orders BIGINT,
  avg_order_value DECIMAL,
  period_start DATE,
  period_end DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(amount), 0) as total_revenue,
    COUNT(*) as total_orders,
    COALESCE(ROUND(AVG(amount), 2), 0) as avg_order_value,
    p_start_date as period_start,
    p_end_date as period_end
  FROM public.business_records
  WHERE 
    record_date BETWEEN p_start_date AND p_end_date
    AND (p_category = 'all' OR category = p_category);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================================
-- FUNCTION 2: Get Growth Rate
-- ============================================================================
-- Compares current period to previous period automatically
-- Usage: SELECT * FROM get_growth_rate('2024-11-01', '2024-12-01', 'all');

CREATE OR REPLACE FUNCTION get_growth_rate(
  p_start_date DATE,
  p_end_date DATE,
  p_category TEXT DEFAULT 'all'
)
RETURNS TABLE (
  current_revenue DECIMAL,
  previous_revenue DECIMAL,
  growth_rate DECIMAL,
  growth_percentage TEXT
) AS $$
DECLARE
  v_period_length INTEGER;
  v_previous_start DATE;
  v_previous_end DATE;
BEGIN
  -- Calculate period length
  v_period_length := p_end_date - p_start_date;
  
  -- Calculate previous period dates
  v_previous_start := p_start_date - v_period_length - 1;
  v_previous_end := p_start_date - 1;
  
  RETURN QUERY
  WITH current_period AS (
    SELECT COALESCE(SUM(amount), 0) as revenue
    FROM public.business_records
    WHERE 
      record_date BETWEEN p_start_date AND p_end_date
      AND (p_category = 'all' OR category = p_category)
  ),
  previous_period AS (
    SELECT COALESCE(SUM(amount), 0) as revenue
    FROM public.business_records
    WHERE 
      record_date BETWEEN v_previous_start AND v_previous_end
      AND (p_category = 'all' OR category = p_category)
  )
  SELECT 
    c.revenue as current_revenue,
    p.revenue as previous_revenue,
    CASE 
      WHEN p.revenue = 0 THEN 0
      ELSE ROUND(((c.revenue - p.revenue) / p.revenue * 100), 2)
    END as growth_rate,
    CASE 
      WHEN p.revenue = 0 THEN '0%'
      ELSE ROUND(((c.revenue - p.revenue) / p.revenue * 100), 2)::TEXT || '%'
    END as growth_percentage
  FROM current_period c, previous_period p;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================================
-- FUNCTION 3: Get Category Breakdown
-- ============================================================================
-- Returns revenue breakdown by category with percentages
-- Usage: SELECT * FROM get_category_breakdown('2024-11-01', '2024-12-01');

CREATE OR REPLACE FUNCTION get_category_breakdown(
  p_start_date DATE,
  p_end_date DATE
)
RETURNS TABLE (
  category TEXT,
  total_revenue DECIMAL,
  total_orders BIGINT,
  avg_order_value DECIMAL,
  percentage_of_total DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  WITH category_totals AS (
    SELECT 
      br.category,
      SUM(br.amount) as revenue,
      COUNT(*) as orders,
      ROUND(AVG(br.amount), 2) as avg_value
    FROM public.business_records br
    WHERE br.record_date BETWEEN p_start_date AND p_end_date
    GROUP BY br.category
  ),
  grand_total AS (
    SELECT SUM(amount) as total
    FROM public.business_records
    WHERE record_date BETWEEN p_start_date AND p_end_date
  )
  SELECT 
    ct.category,
    ct.revenue as total_revenue,
    ct.orders as total_orders,
    ct.avg_value as avg_order_value,
    CASE 
      WHEN gt.total = 0 THEN 0
      ELSE ROUND((ct.revenue / gt.total * 100), 2)
    END as percentage_of_total
  FROM category_totals ct, grand_total gt
  ORDER BY ct.revenue DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
-- Allow authenticated users to execute these functions

GRANT EXECUTE ON FUNCTION get_kpi_metrics(DATE, DATE, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_growth_rate(DATE, DATE, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_category_breakdown(DATE, DATE) TO authenticated;


-- ============================================================================
-- VERIFICATION: Test your functions
-- ============================================================================

-- Test KPI metrics function
-- SELECT * FROM get_kpi_metrics(
--   CURRENT_DATE - 30,
--   CURRENT_DATE,
--   'all'
-- );

-- Test growth rate function
-- SELECT * FROM get_growth_rate(
--   CURRENT_DATE - 30,
--   CURRENT_DATE,
--   'all'
-- );

-- Test category breakdown
-- SELECT * FROM get_category_breakdown(
--   CURRENT_DATE - 30,
--   CURRENT_DATE
-- );