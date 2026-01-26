import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#00D2FF', '#58A6FF', '#3B82F6', '#60A5FA', '#93C5FD', '#10B981']

export default function CategoryPieChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No category data available
            </div>
        )
    }

    // Format data for Pie Chart
    const chartData = data.map(item => ({
        name: item.category,
        value: Number(item.total_revenue)
    }))

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

    return (
        <div style={{ width: '100%', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <PieChart width={400} height={300}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                        background: '#161B2E',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                    }}
                    itemStyle={{ color: '#F1F5F9' }}
                />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </div>
    )
}
