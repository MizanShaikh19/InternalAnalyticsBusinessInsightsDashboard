import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useAuth } from '../auth/AuthProvider'
import useKpi from '../hooks/useKpi'
import KpiCards from '../components/KpiCards'
import useTrend from '../hooks/useTrend'
import TrendChart from '../components/TrendChart'
import { getCategoryList, getFilteredRecords, getCategoryBreakdownMetrics, createRecord } from '../services/analyticsService'
import TransactionTable from '../components/TransactionTable'
import ExportButton from '../components/ExportButton'
import CategoryBarChart from '../components/CategoryBarChart'
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
    <div className="app-container">
      <header className="app-header">
        <div className="logo-main" style={{ marginBottom: 0 }}>
          <span className="logo-icon" style={{ fontSize: 24 }}>📊</span>
          <span className="logo-text" style={{ fontSize: 20, fontWeight: 800 }}>Nexus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={() => setShowAddModal(true)} className="btn primary sm" style={{ borderRadius: 999 }}>+ New Record</button>
          <ExportButton data={records} filename={`records-${startDate}-to-${endDate}.csv`} />
          <div className="user-profile">
            <div className="avatar">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <span className="user-role">Admin Account</span>
            </div>
          </div>
          <button onClick={handleSignOut} className="btn primary sm" style={{ borderRadius: 999 }}>Logout</button>
        </div>
      </header>

      <main>
        <section className="card" style={{ padding: 24, marginBottom: 24 }}>
          <form onSubmit={handleApply} className="filters">
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end', width: '100%' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontWeight: 500, fontSize: 13 }}>
                Start Date
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontWeight: 500, fontSize: 13 }}>
                End Date
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input" />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontWeight: 500, fontSize: 13 }}>
                Category
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>

              <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => {
                    const d = new Date(); d.setDate(d.getDate() - 7);
                    setStartDate(isoDate(d)); setEndDate(isoDate(new Date()))
                  }}
                >
                  7D
                </button>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => {
                    const d = new Date(); d.setDate(d.getDate() - 30);
                    setStartDate(isoDate(d)); setEndDate(isoDate(new Date()))
                  }}
                >
                  30D
                </button>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => {
                    const d = new Date(); d.setMonth(d.getMonth() - 3);
                    setStartDate(isoDate(d)); setEndDate(isoDate(new Date()))
                  }}
                >
                  3M
                </button>
                <button type="submit" className="btn primary sm">Apply</button>
              </div>
            </div>
          </form>
        </section>

        <KpiCards kpi={kpi} growth={growth} loading={kpiLoading} />

        {kpiError && <div className="form-error" style={{ marginTop: 12 }}>Error loading KPIs: {kpiError.message}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="card-title">Revenue Trend</h3>
            {trendLoading ? <div className="skeleton" style={{ height: 300, width: '100%' }} /> : trendError ? <div style={{ color: 'var(--danger)' }}>Error: {trendError.message}</div> : <TrendChart data={trendData} />}
            <div style={{ marginTop: 24 }}>
              <h4 className="card-subtitle">30-Day Forecast</h4>
              {trendLoading ? <div className="skeleton" style={{ height: 150, width: '100%' }} /> : trendError ? <div style={{ color: 'var(--danger)' }}>Error: {trendError.message}</div> : <ForecastingWidget data={trendData} />}
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 className="card-title">Category Distribution</h3>
            {categoryLoading ? <div className="skeleton" style={{ height: 300, width: '100%' }} /> : <CategoryPieChart data={categoryData} />}
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

