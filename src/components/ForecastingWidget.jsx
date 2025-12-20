import React, { useMemo } from 'react'

export default function ForecastingWidget({ data }) {
    const forecast = useMemo(() => {
        if (!data || data.length < 2) return null

        // Simple Linear Regression: y = mx + b
        // x = index, y = daily_revenue
        const n = data.length
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0

        data.forEach((d, i) => {
            const y = Number(d.daily_revenue || 0)
            sumX += i
            sumY += y
            sumXY += i * y
            sumX2 += i * i
        })

        const denominator = (n * sumX2 - sumX * sumX)
        if (denominator === 0) return null

        const slope = (n * sumXY - sumX * sumY) / denominator
        const intercept = (sumY - slope * sumX) / n

        // Forecast for next 30 days
        let forecastTotal = 0
        for (let i = n; i < n + 30; i++) {
            forecastTotal += Math.max(0, slope * i + intercept)
        }

        return {
            total: forecastTotal,
            slope: slope,
            confidence: n > 14 ? 'High' : 'Medium'
        }
    }, [data])

    if (!forecast) return null

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

    return (
        <div style={{ padding: '16px', background: 'var(--primary-light, #eff6ff)', borderRadius: '12px', marginTop: '16px', border: '1px solid #dbeafe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#1e40af' }}>30-Day Revenue Forecast</h4>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e3a8a', marginBottom: 4 }}>
                {formatCurrency(forecast.total)}
            </div>
            <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 500 }}>
                Based on current {forecast.slope > 0 ? 'upward' : 'downward'} trend • {forecast.confidence} Confidence
            </div>
        </div>
    )
}
