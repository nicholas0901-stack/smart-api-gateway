import { useEffect, useState, useCallback } from 'react'
import api from '../services/api'

export function useStats(intervalMs = 5000) {
  const [stats, setStats] = useState({ totalRequests: 0, avgLatency: 0, errorCount: 0, errorRate: 0 })
  const [topRoutes, setTopRoutes] = useState([])

  const refresh = useCallback(async () => {
    try {
      const [statsRes, routesRes] = await Promise.all([
        api.get('/api/stats'),
        api.get('/api/stats/routes')
      ])
      setStats(statsRes.data)
      setTopRoutes(routesRes.data)
    } catch (err) {
      console.error('Stats fetch error:', err)
    }
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, intervalMs)
    return () => clearInterval(id)
  }, [refresh, intervalMs])

  return { stats, topRoutes, refresh }
}