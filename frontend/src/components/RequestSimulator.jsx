import { useState } from 'react'
import { Send } from 'lucide-react'
import api from '../services/api'

export default function RequestSimulator({ onRequestSent }) {
  const [method, setMethod] = useState('GET')
  const [path, setPath] = useState('/api/gateway/users')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const fire = async () => {
    setLoading(true)
    const start = Date.now()
    try {
      const res = await api({ method, url: path })
      setResult({
        status: res.status,
        latency: Date.now() - start,
        ok: true,
        data: res.data
      })
    } catch (err) {
      setResult({
        status: err.response?.status || 0,
        latency: Date.now() - start,
        ok: false,
        data: err.response?.data || { error: 'Request failed' }
      })
    }
    setLoading(false)
    if (onRequestSent) onRequestSent()
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="bg-gray-700 text-white text-xs rounded-md px-2 py-2 border border-gray-600"
        >
          {['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m}>{m}</option>)}
        </select>
        <input
          value={path}
          onChange={e => setPath(e.target.value)}
          className="flex-1 bg-gray-700 text-white text-xs rounded-md px-3 py-2 border border-gray-600 font-mono"
        />
        <button
          onClick={fire}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-md flex items-center gap-1 disabled:opacity-50"
        >
          <Send size={12} />
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      {result && (
        <div className={`mt-2 text-xs font-mono rounded-md px-3 py-2 ${result.ok ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
          {result.status} {result.ok ? 'OK' : 'ERROR'} — {result.latency}ms
        </div>
      )}
    </div>
  )
}