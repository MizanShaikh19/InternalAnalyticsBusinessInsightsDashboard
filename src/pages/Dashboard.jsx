import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useAuth } from '../auth/AuthProvider'
import useKpi from '../hooks/useKpi'
import KpiCards from '../components/KpiCards'
import useTrend from '../hooks/useTrend'
import TrendChart from '../components/TrendChart'
import { getCategoryList, getFilteredRecords, getCategoryBreakdownMetrics, createRecord } from '../services/analyticsService'
import TransactionTable from '../components/TransactionTable'
import ExportButton from '../components/ExportButton'
import CategoryPieChart from '../components/CategoryPieChart'
import ForecastingWidget from '../components/ForecastingWidget'
import TransactionModal from '../components/TransactionModal'
import AddRecordModal from '../components/AddRecordModal'

function isoDate(d) {
  return d.toISOString().slice(0, 10)
}

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const today = useMemo(() => new Date(), [])
  const defaultStart = useMemo(() => new Date(today.getFullYear(), today.getMonth(), 1), [today])

  // Filter states
  const [startDate, setStartDate] = useState(isoDate(defaultStart))
  const [endDate, setEndDate] = useState(isoDate(today))
  const [category, setCategory] = useState('all')
  const [categories, setCategories] = useState([])

  // Pagination & Sorting states
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [sortCol, setSortCol] = useState('record_date')
  const [sortAsc, setSortAsc] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Data states
  const [records, setRecords] = useState([])
  const [recordsCount, setRecordsCount] = useState(0)
  const [recordsLoading, setRecordsLoading] = useState(false)

  const { kpi, growth, loading: kpiLoading, error: kpiError } = useKpi(startDate, endDate, category)
  const { data: trendData, loading: trendLoading, error: trendError } = useTrend(startDate, endDate)

  const [categoryData, setCategoryData] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setCategoryLoading(true)
      try {
        const res = await getCategoryBreakdownMetrics(startDate, endDate)
        setCategoryData(res)
      } catch (err) {
        console.error(err)
      } finally {
        setCategoryLoading(false)
      }
    })()
  }, [startDate, endDate])

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const cats = await getCategoryList()
          if (!mounted) return
          setCategories(['all', ...cats])
        } catch (err) {
          // ignore
        }
      })()
    return () => { mounted = false }
  }, [])

  const fetchRecords = useCallback(async () => {
    setRecordsLoading(true)
    try {
      const { data, count } = await getFilteredRecords(startDate, endDate, category, page, pageSize, sortCol, sortAsc)
      setRecords(data)
      setRecordsCount(count)
    } catch (err) {
      console.error('Error fetching records:', err)
    } finally {
      setRecordsLoading(false)
    }
  }, [startDate, endDate, category, page, pageSize, sortCol, sortAsc])

  const handleSaveRecord = async (recordData) => {
    try {
      await createRecord(recordData)
      await fetchRecords()
    } catch (err) {
      alert('Failed to save record: ' + err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleApply = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new filters
    fetchRecords()
  }

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc)
    } else {
      setSortCol(col)
      setSortAsc(false)
    }
    setPage(1)
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="nav-item active">🏠</div>
        <div className="nav-item">📊</div>
        <div className="nav-item">👤</div>
        <div className="nav-item">⚙️</div>
        <button onClick={handleSignOut} className="nav-item" style={{ marginTop: 'auto', border: 'none', background: 'transparent' }}>🚪</button>
      </aside>

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Welcome back, {user?.email?.split('@')[0]}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setShowAddModal(true)} className="btn primary sm" style={{ borderRadius: 999, padding: '12px 24px' }}>+ New Record</button>
            <div className="user-profile" style={{ background: 'transparent', padding: 0 }}>
              <div className="avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        <div className="tab-nav">
          <div className="tab-item active">📈 Monitoring</div>
          <div className="tab-item">📦 Inventory</div>
          <div className="tab-item">💬 Support</div>
          <div className="tab-item">🔍 Search</div>
        </div>

        <section className="card" style={{ padding: 24, marginBottom: 32, background: 'rgba(255,255,255,0.02)' }}>
          <form onSubmit={handleApply} className="filters">
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end', width: '100%' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>
                START DATE
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" style={{ background: '#1A1A1A', border: 'none', width: 160 }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>
                END DATE
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input" style={{ background: '#1A1A1A', border: 'none', width: 160 }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 600, fontSize: 13, color: 'var(--text-muted)' }}>
                CATEGORY
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="input" style={{ background: '#1A1A1A', border: 'none', width: 160 }}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>

              <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                <button type="button" className="btn sm" onClick={() => { const d = new Date(); d.setDate(d.getDate() - 7); setStartDate(isoDate(d)); setEndDate(isoDate(new Date())) }}>7D</button>
                <button type="button" className="btn sm" onClick={() => { const d = new Date(); d.setDate(d.getDate() - 30); setStartDate(isoDate(d)); setEndDate(isoDate(new Date())) }}>30D</button>
                <button type="submit" className="btn primary sm" style={{ padding: '8px 24px' }}>Apply</button>
              </div>
            </div>
          </form>
        </section>

        <KpiCards kpi={kpi} growth={growth} loading={kpiLoading} />

        {kpiError && <div className="form-error" style={{ marginTop: 12 }}>Error loading KPIs: {kpiError.message}</div>}

        <div className="chart-grid">
          <div className="card" style={{ padding: 32, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 className="card-title" style={{ margin: 0 }}>Revenue Trend</h3>
              <ExportButton data={records} filename={`records-${startDate}-to-${endDate}.csv`} />
            </div>
            <div style={{ flex: 1, minHeight: 300 }}>
              {trendLoading ? <div className="skeleton" style={{ height: 300, width: '100%' }} /> : trendError ? <div style={{ color: 'var(--danger)' }}>Error: {trendError.message}</div> : <TrendChart data={trendData} />}
            </div>
          </div>

          <div className="card" style={{ padding: 32, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h3 className="card-title" style={{ marginBottom: 24 }}>Category Distribution</h3>
            <div style={{ flex: 1, minHeight: 300 }}>
              {categoryLoading ? <div className="skeleton" style={{ height: 300, width: '100%' }} /> : <CategoryPieChart data={categoryData} />}
            </div>
          </div>
        </div>

        <TransactionTable
          records={records}
          count={recordsCount}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          sortCol={sortCol}
          sortAsc={sortAsc}
          onSort={handleSort}
          onSelect={setSelectedTransaction}
          loading={recordsLoading}
        />

        {selectedTransaction && (
          <TransactionModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}

        {showAddModal && (
          <AddRecordModal
            categories={categories}
            onSave={handleSaveRecord}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </main>
    </div>
  )
}

