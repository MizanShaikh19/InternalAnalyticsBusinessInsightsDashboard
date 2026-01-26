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

  // Navigation state
  const [activeTab, setActiveTab] = useState('Monitoring')

  // Advanced Insights Logic
  const healthScore = useMemo(() => {
    if (!growth) return 75;
    const score = 75 + (growth.revenueGrowth * 0.1) + (growth.orderGrowth * 0.1);
    return Math.min(Math.max(Math.round(score), 0), 100);
  }, [growth]);

  const aiInsight = useMemo(() => {
    if (!growth) return "Analyzing your business data...";
    if (growth.revenueGrowth > 10) return "Revenue is up sharply! Consider scaling your top-performing categories.";
    if (growth.revenueGrowth < -10) return "Revenue dip detected. Check for seasonal trends or inventory gaps.";
    return "Stable performance. Focus on increasing your Average Order Value (AOV) for better margins.";
  }, [growth]);

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
    setPage(1)
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

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className={`dashboard-layout ${mounted ? 'is-mounted' : ''}`}>
      <aside className="sidebar">
        <div className="nav-item active">🏠</div>
        <div className="nav-item">📊</div>
        <div className="nav-item">💎</div>
        <div className="nav-item">⚙️</div>
        <button onClick={handleSignOut} className="nav-item" style={{ marginTop: 'auto', border: 'none', background: 'transparent' }}>🚪</button>
      </aside>

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, padding: '0 10px' }}>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: '-1px', color: 'var(--primary)' }}>PureFlow</h1>
            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: 14, fontWeight: 600 }}>Welcome back, <span style={{ color: '#fff' }}>{user?.email?.split('@')[0]}</span></p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setShowAddModal(true)} className="btn-primary">+ New Record</button>
            <div className="avatar" style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-card)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, boxShadow: 'var(--glow-shadow)' }}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        <div className="tab-nav">
          <div className={`tab-item ${activeTab === 'Monitoring' ? 'active' : ''}`} onClick={() => setActiveTab('Monitoring')}>📈 Monitoring</div>
          <div className={`tab-item ${activeTab === 'Growth' ? 'active' : ''}`} onClick={() => setActiveTab('Growth')}>🚀 Growth</div>
          <div className={`tab-item ${activeTab === 'Portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('Portfolio')}>💼 Portfolio</div>
          <div className={`tab-item ${activeTab === 'Intelligence' ? 'active' : ''}`} onClick={() => setActiveTab('Intelligence')}>🔍 Intelligence</div>
        </div>

        {activeTab === 'Monitoring' ? (
          <>
            {/* Global Insight Section */}
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, marginBottom: 40, '--d': '0.1s' }}>
              <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>System Health</span>
                <div className="health-circle">
                  <div style={{ fontSize: 40, fontWeight: 900, color: '#fff' }}>{healthScore}%</div>
                </div>
                <div style={{ width: '80%', height: 6, background: '#000', borderRadius: 99, overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
                  <div style={{ width: `${healthScore}%`, height: '100%', background: 'var(--primary)', borderRadius: 99, boxShadow: '0 0 15px var(--primary)' }} />
                </div>
              </div>
              <div className="card" style={{ padding: 32, display: 'flex', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, background: 'var(--bg-surface)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, boxShadow: 'var(--clay-shadow-inner)' }}>🤖</div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: 20, fontWeight: 900, color: 'var(--primary)' }}>AI Analyst</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6, fontWeight: 500 }}>{aiInsight}</p>
                </div>
              </div>
            </div>

            <section className="card reveal" style={{ padding: 24, marginBottom: 40, '--d': '0.2s' }}>
              <form onSubmit={handleApply} className="filters">
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end', width: '100%' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 800, fontSize: 11, color: 'var(--primary)', letterSpacing: '1px' }}>
                    DATE START
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" style={{ width: 180 }} />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 800, fontSize: 11, color: 'var(--primary)', letterSpacing: '1px' }}>
                    DATE END
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input" style={{ width: 180 }} />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 800, fontSize: 11, color: 'var(--primary)', letterSpacing: '1px' }}>
                    CATEGORY
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="input" style={{ width: 180 }}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>

                  <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
                    <button type="submit" className="btn-primary">Apply Filters</button>
                  </div>
                </div>
              </form>
            </section>

            <div className="reveal" style={{ '--d': '0.3s' }}>
              <KpiCards kpi={kpi} growth={growth} loading={kpiLoading} />
            </div>

            {kpiError && <div className="form-error" style={{ marginTop: 12, color: 'var(--primary)', fontWeight: 700 }}>Sync Error: {kpiError.message}</div>}

            <div className="chart-grid">
              <div className="card reveal" style={{ padding: 32, minWidth: 0, minHeight: 450, '--d': '0.4s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <h3 style={{ margin: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Revenue Dynamics</h3>
                  <ExportButton data={records} filename={`report-${startDate}.csv`} />
                </div>
                <div style={{ height: 320 }}>
                  {trendLoading ? <div style={{ height: 300, background: 'var(--bg-surface)', borderRadius: 20 }} className="skeleton" /> : <TrendChart data={trendData} />}
                </div>
              </div>

              <div className="card reveal" style={{ padding: 32, minWidth: 0, minHeight: 450, '--d': '0.5s' }}>
                <h3 style={{ marginBottom: 32, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Category Breakdown</h3>
                <div style={{ height: 320 }}>
                  {categoryLoading ? <div style={{ height: 300, background: 'var(--bg-surface)', borderRadius: 20 }} className="skeleton" /> : <CategoryBarChart data={categoryData} />}
                </div>
              </div>
            </div>

            <div className="reveal" style={{ '--d': '0.6s' }}>
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
            </div>
          </>
        ) : (
          <div className="card reveal" style={{ padding: 80, textAlign: 'center', '--d': '0.1s' }}>
            <div style={{ fontSize: 80, marginBottom: 24, filter: 'drop-shadow(0 0 20px var(--primary-glow))' }}>🛡️</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase' }}>{activeTab} Module</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 500, margin: '0 auto 40px' }}>This high-octane analytics module is currently being calibrated for maximum business impact.</p>
            <button className="btn-primary" onClick={() => setActiveTab('Monitoring')}>Return to Control Center</button>
          </div>
        )}

        {selectedTransaction && <TransactionModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
        {showAddModal && <AddRecordModal categories={categories} onSave={handleSaveRecord} onClose={() => setShowAddModal(false)} />}
      </main>
    </div>

  )
}

