/**
 * storageService.js
 * 
 * This service handles all local data persistence using localStorage.
 * It replaces the Supabase backend with a deterministic local-first approach.
 */

const STORAGE_KEY = 'business_dashboard_records';

const INITIAL_CATEGORIES = ['Sales', 'Service', 'Product', 'Subscription', 'Consulting'];

/**
 * Initialize storage with seed data if empty
 */
export const initializeStorage = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    const seedData = generateSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    console.log('✅ Local storage initialized with seed data');
  }
};

/**
 * Generate ~100 realistic records for the last 90 days
 */
const generateSeedData = () => {
  const records = [];
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    INITIAL_CATEGORIES.forEach(category => {
      // 70% chance of a record
      if (Math.random() > 0.3) {
        records.push({
          id: crypto.randomUUID(),
          category,
          amount: parseFloat((Math.random() * 4000 + 100).toFixed(2)),
          record_date: dateStr,
          created_at: new Date().toISOString()
        });
      }
    });
  }

  // Add some high-value transactions
  const highValue = [
    { category: 'Sales', amount: 15000.00, offset: 2 },
    { category: 'Sales', amount: 12500.00, offset: 5 },
    { category: 'Consulting', amount: 8900.00, offset: 7 },
    { category: 'Product', amount: 6750.00, offset: 10 }
  ];

  highValue.forEach(item => {
    const date = new Date();
    date.setDate(today.getDate() - item.offset);
    records.push({
      id: crypto.randomUUID(),
      category: item.category,
      amount: item.amount,
      record_date: date.toISOString().split('T')[0],
      created_at: new Date().toISOString()
    });
  });

  return records;
};

/**
 * Get all records from localStorage
 */
export const getAllRecords = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Add a new record
 */
export const saveRecord = (record) => {
  const records = getAllRecords();
  const newRecord = {
    id: crypto.randomUUID(),
    ...record,
    created_at: new Date().toISOString()
  };
  records.push(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
};

/**
 * Filter and search records
 */
export const getFilteredData = (startDate, endDate, category = 'all') => {
  let records = getAllRecords();
  
  return records.filter(r => {
    const dateMatch = r.record_date >= startDate && r.record_date <= endDate;
    const categoryMatch = category === 'all' || r.category === category;
    return dateMatch && categoryMatch;
  });
};

/**
 * Calculate KPI metrics: Total Revenue, Total Orders, Average Order Value
 */
export const calculateKpis = (records) => {
  const totalRevenue = records.reduce((sum, r) => sum + r.amount, 0);
  const totalOrders = records.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue: parseFloat(avgOrderValue.toFixed(2))
  };
};

/**
 * Calculate Growth Rate (Current vs Previous Period)
 */
export const calculateGrowth = (currentKpis, previousKpis) => {
  const calc = (curr, prev) => {
    if (!prev || prev === 0) return curr > 0 ? 100 : 0;
    return ((curr - prev) / prev) * 100;
  };

  return {
    revenueGrowth: parseFloat(calc(currentKpis.totalRevenue, previousKpis.totalRevenue).toFixed(1)),
    orderGrowth: parseFloat(calc(currentKpis.totalOrders, previousKpis.totalOrders).toFixed(1)),
    aovGrowth: parseFloat(calc(currentKpis.avgOrderValue, previousKpis.avgOrderValue).toFixed(1))
  };
};

/**
 * Get Category Breakdown
 */
export const getCategoryBreakdown = (records) => {
  const breakdown = {};
  records.forEach(r => {
    if (!breakdown[r.category]) {
      breakdown[r.category] = { category: r.category, revenue: 0, count: 0 };
    }
    breakdown[r.category].revenue += r.amount;
    breakdown[r.category].count += 1;
  });
  
  return Object.values(breakdown).map(b => ({
    ...b,
    revenue: parseFloat(b.revenue.toFixed(2))
  })).sort((a, b) => b.revenue - a.revenue);
};

/**
 * Get Daily Trend
 */
export const getDailyTrend = (records) => {
  const trend = {};
  records.forEach(r => {
    if (!trend[r.record_date]) {
      trend[r.record_date] = { record_date: r.record_date, daily_revenue: 0, daily_orders: 0 };
    }
    trend[r.record_date].daily_revenue += r.amount;
    trend[r.record_date].daily_orders += 1;
  });

  return Object.values(trend).map(t => ({
    ...t,
    daily_revenue: parseFloat(t.daily_revenue.toFixed(2)),
    avg_order_value: parseFloat((t.daily_revenue / t.daily_orders).toFixed(2))
  })).sort((a, b) => a.record_date.localeCompare(b.record_date));
};
