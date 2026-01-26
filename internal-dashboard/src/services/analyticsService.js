import * as storage from './storageService';

export async function getKpiMetrics(startDate, endDate, category = 'all') {
  const records = storage.getFilteredData(startDate, endDate, category);
  return storage.calculateKpis(records);
}

export async function getGrowthRate(startDate, endDate, category = 'all') {
  // Current Period
  const currentRecords = storage.getFilteredData(startDate, endDate, category);
  const currentKpis = storage.calculateKpis(currentRecords);

  // Previous Period (Calculate based on date range duration)
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - diffDays);
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);

  const prevRecords = storage.getFilteredData(
    prevStart.toISOString().split('T')[0],
    prevEnd.toISOString().split('T')[0],
    category
  );
  const prevKpis = storage.calculateKpis(prevRecords);

  return storage.calculateGrowth(currentKpis, prevKpis);
}

export async function getCategoryList() {
  const records = storage.getAllRecords();
  const cats = Array.from(new Set(records.map(r => r.category))).filter(Boolean);
  return cats.sort();
}

export async function getDailyTrend(startDate, endDate) {
  const records = storage.getFilteredData(startDate, endDate, 'all');
  return storage.getDailyTrend(records);
}

export async function getFilteredRecords(startDate, endDate, category = 'all', page = 1, pageSize = 20, sortCol = 'record_date', sortAsc = false) {
  let records = storage.getFilteredData(startDate, endDate, category);

  // Sorting
  records.sort((a, b) => {
    let valA = a[sortCol];
    let valB = b[sortCol];
    if (typeof valA === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  // Pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedData = records.slice(from, to);

  return {
    data: paginatedData,
    count: records.length
  };
}

export async function getCategoryBreakdownMetrics(startDate, endDate) {
  const records = storage.getFilteredData(startDate, endDate, 'all');
  return storage.getCategoryBreakdown(records);
}

export async function createRecord({ record_date, category, amount }) {
  return storage.saveRecord({ record_date, category, amount: parseFloat(amount) });
}
