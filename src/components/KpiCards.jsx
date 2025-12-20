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
    <div className="kpi-grid">
      <div className="card kpi-card">
        <div className="label">Total Revenue</div>
        <div className="value">{formatCurrency(revenue)}</div>
      </div>

      <div className="card kpi-card">
        <div className="label">Total Orders</div>
        <div className="value">{orders}</div>
      </div>

      <div className="card kpi-card">
        <div className="label">Avg Order Value</div>
        <div className="value">{formatCurrency(avg)}</div>
      </div>

      <div className="card kpi-card">
        <div className="label">Growth</div>
        <div className="value" style={{
          color: isPositive ? 'var(--success)' : isNegative ? 'var(--danger)' : 'var(--text-main)'
        }}>
          {isPositive && '↑ '}{isNegative && '↓ '}{growthPercentage}
        </div>
      </div>
    </div>
  )
}
