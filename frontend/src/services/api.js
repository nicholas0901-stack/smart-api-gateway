import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://smart-api-gateway-backend.onrender.com'

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('gateway_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('gateway_token')
      localStorage.removeItem('gateway_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api