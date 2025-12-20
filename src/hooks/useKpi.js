import { useEffect, useState } from 'react'
import { getKpiMetrics, getGrowthRate } from '../services/analyticsService'

export default function useKpi(startDate, endDate, category = 'all') {
  const [kpi, setKpi] = useState(null)
  const [growth, setGrowth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const [k, g] = await Promise.all([
          getKpiMetrics(startDate, endDate, category),
          getGrowthRate(startDate, endDate, category)
        ])
        if (!mounted) return
        setKpi(k)
        setGrowth(g)
      } catch (err) {
        if (!mounted) return
        setError(err)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [startDate, endDate, category])

  return { kpi, growth, loading, error }
}
