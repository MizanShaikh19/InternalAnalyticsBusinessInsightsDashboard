import React from 'react'

function formatCurrency(n) {
  if (n == null) return '$0.00'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n))
}

const KpiCard = ({ label, value, growth, prefix = '', suffix = '' }) => {
  const isPositive = growth > 0;
  const isNegative = growth < 0;

  return (
    <div className="card kpi-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="label" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
        {growth !== undefined && (
          <div style={{
            color: isPositive ? 'var(--success)' : isNegative ? 'var(--danger)' : 'var(--text-muted)',
            fontSize: 12,
            fontWeight: 800,
            background: isPositive ? 'rgba(56, 161, 105, 0.1)' : isNegative ? 'rgba(229, 62, 62, 0.1)' : 'var(--bg-deep)',
            padding: '4px 12px',
            borderRadius: 99
          }}>
            {isPositive ? '↑' : isNegative ? '↓' : ''} {Math.abs(growth)}%
          </div>
        )}
      </div>
      <div className="value" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', textShadow: '0 0 20px var(--primary-glow)' }}>
        {prefix}{value}{suffix}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}>Previous period comparison</div>
    </div>
  );
};

export default function KpiCards({ kpi, growth, loading }) {
  if (loading) return (
    <div className="kpi-grid" style={{ marginBottom: 32, gap: 24 }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="card kpi-card skeleton" style={{ height: 140 }} />
      ))}
    </div>
  )

  return (
    <div className="kpi-grid" style={{ marginBottom: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
      <KpiCard
        label="Total Revenue"
        value={formatCurrency(kpi?.totalRevenue)}
        growth={growth?.revenueGrowth}
      />
      <KpiCard
        label="Orders Volume"
        value={kpi?.totalOrders || 0}
        growth={growth?.orderGrowth}
      />
      <KpiCard
        label="Avg Order Value"
        value={formatCurrency(kpi?.avgOrderValue)}
        growth={growth?.aovGrowth}
      />
    </div>
  )
}
