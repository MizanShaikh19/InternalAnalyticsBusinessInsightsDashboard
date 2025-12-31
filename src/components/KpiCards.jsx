import React from 'react'

function formatCurrency(n) {
  if (n == null) return '$0.00'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n))
}

export default function KpiCards({ kpi, growth, loading }) {
  if (loading) return (
    <div className="kpi-grid">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="card kpi-card skeleton kpi-skeleton" />
      ))}
    </div>
  )

  const revenue = kpi?.total_revenue ?? 0
  const orders = kpi?.total_orders ?? 0
  const avg = kpi?.avg_order_value ?? 0
  const growthRate = growth?.growth_rate ?? 0
  const growthPercentage = growth?.growth_percentage ?? '0%'

  const isPositive = growthRate > 0
  const isNegative = growthRate < 0

  return (
    <div className="kpi-grid" style={{ marginBottom: 32, gap: 32 }}>
      <div className="card kpi-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="label" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Revenue</div>
          <div style={{ color: 'var(--success)', fontSize: 12, fontWeight: 700 }}>↑ 2.4%</div>
        </div>
        <div className="value" style={{ fontSize: 36, fontWeight: 800 }}>{formatCurrency(revenue)}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Vs last month</div>
      </div>

      <div className="card kpi-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="label" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Orders</div>
          <div style={{ color: 'var(--danger)', fontSize: 12, fontWeight: 700 }}>↓ 1.1%</div>
        </div>
        <div className="value" style={{ fontSize: 36, fontWeight: 800 }}>{orders}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Total volume</div>
      </div>

      <div className="card kpi-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="label" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg Value</div>
          <div style={{ color: 'var(--success)', fontSize: 12, fontWeight: 700 }}>↑ 0.8%</div>
        </div>
        <div className="value" style={{ fontSize: 36, fontWeight: 800 }}>{formatCurrency(avg)}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Per transaction</div>
      </div>

      <div className="card kpi-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="label" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Growth</div>
          <div style={{ color: isPositive ? 'var(--success)' : 'var(--danger)', fontSize: 12, fontWeight: 700 }}>
            {isPositive ? '↑' : '↓'} {growthPercentage}
          </div>
        </div>
        <div className="value" style={{ fontSize: 36, fontWeight: 800, color: isPositive ? 'var(--success)' : isNegative ? 'var(--danger)' : 'inherit' }}>
          {growthPercentage}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Period growth</div>
      </div>
    </div>
  )
}
