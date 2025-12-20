import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

function formatDateLabel(d) {
  // d expected as 'YYYY-MM-DD'
  const dt = new Date(d)
  return `${dt.getMonth() + 1}/${dt.getDate()}`
}

export default function TrendChart({ data }) {
  if (!data || !data.length) return <div style={{ marginTop: 16 }}>No trend data for selected range.</div>

  // Map data to ensure numeric values
  const chartData = data.map((row) => ({
    date: row.record_date,
    revenue: Number(row.daily_revenue || 0),
    orders: Number(row.daily_orders || 0)
  }))

  return (
    <div className="chart-card" style={{ position: 'relative', height: 260, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-lg)',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
            formatter={(value) => [`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}`, 'Revenue']}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4, stroke: '#1e293b' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}