import { useState, useCallback } from 'react'
import api from '../services/api'

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('gateway_token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('gateway_user') || 'null'))

  const login = useCallback(async (userId, role, expiry) => {
    const res = await api.post('/api/auth/token', { userId, role })
    const newToken = res.data.token
    const userData = { userId, role, expiresIn: res.data.expiresIn }

    localStorage.setItem('gateway_token', newToken)
    localStorage.setItem('gateway_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)

    return newToken
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('gateway_token')
    localStorage.removeItem('gateway_user')
    setToken(null)
    setUser(null)
  }, [])

  const decodeToken = useCallback(() => {
    if (!token) return null
    try {
      const parts = token.split('.')
      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      return { header, payload }
    } catch {
      return null
    }
  }, [token])

  return { token, user, login, logout, decodeToken, isAuthenticated: !!token }
}