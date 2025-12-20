import { supabase } from '../config/supabaseClient'

export async function getKpiMetrics(startDate, endDate, category = 'all') {
  const { data, error } = await supabase.rpc('get_kpi_metrics', {
    p_start_date: startDate,
    p_end_date: endDate,
    p_category: category
  })
  if (error) throw error
  return data?.[0] ?? null
}

export async function getGrowthRate(startDate, endDate, category = 'all') {
  const { data, error } = await supabase.rpc('get_growth_rate', {
    p_start_date: startDate,
    p_end_date: endDate,
    p_category: category
  })
  if (error) throw error
  return data?.[0] ?? null
}

export async function getCategoryList() {
  const { data, error } = await supabase
    .from('business_records')
    .select('category')
    .order('category')

  if (error) throw error
  // map distinct categories
  const cats = Array.from(new Set((data || []).map((r) => r.category))).filter(Boolean)
  return cats
}

export async function getDailyTrend(startDate, endDate) {
  // Uses the view daily_revenue_trend; filter by record_date
  const { data, error } = await supabase
    .from('daily_revenue_trend')
    .select('record_date,daily_revenue,daily_orders,avg_order_value')
    .gte('record_date', startDate)
    .lte('record_date', endDate)
    .order('record_date', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getFilteredRecords(startDate, endDate, category = 'all', page = 1, pageSize = 20, sortCol = 'record_date', sortAsc = false) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('business_records')
    .select('*', { count: 'exact' })
    .gte('record_date', startDate)
    .lte('record_date', endDate)

  if (category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error, count } = await query
    .order(sortCol, { ascending: sortAsc })
    .range(from, to)

  if (error) throw error
  return { data, count }
}

export async function getCategoryBreakdownMetrics(startDate, endDate) {
  const { data, error } = await supabase.rpc('get_category_breakdown', {
    p_start_date: startDate,
    p_end_date: endDate
  })
  if (error) throw error
  return data || []
}

export async function createRecord({ record_date, category, amount }) {
  const { data, error } = await supabase
    .from('business_records')
    .insert([{ record_date, category, amount }])
    .select()

  if (error) throw error
  return data?.[0] || null
}
