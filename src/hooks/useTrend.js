import { useEffect, useState } from 'react'
import { getDailyTrend } from '../services/analyticsService'

export default function useTrend(startDate, endDate) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const d = await getDailyTrend(startDate, endDate)
        if (!mounted) return
        setData(d)
      } catch (err) {
        if (!mounted) return
        setError(err)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    })()

    return () => { mounted = false }
  }, [startDate, endDate])

  return { data, loading, error }
}
