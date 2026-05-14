import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import api from '../services/api'
import LogTable from '../components/LogTable'

export default function EventLogPage() {
  const [logs, setLogs] = useState([])
  const [pathFilter, setPathFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const params = { size: 50 }
      if (pathFilter) params.path = pathFilter
      const res = await api.get('/api/logs', { params })
      setLogs(res.data.content || [])
    } catch (err) {
      console.error('Failed to fetch logs:', err)
    }
    setLoading(false)
  }

  useEffect(() => { fetchLogs() }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input
          value={pathFilter}
          onChange={e => setPathFilter(e.target.value)}
          placeholder="Filter by path..."
          className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 border border-gray-700 w-60 font-mono"
        />
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-2 rounded-md flex items-center gap-1"
        >
          <Filter size={12} />
          {loading ? 'Loading...' : 'Filter'}
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg">
        <LogTable events={logs} showService />
      </div>
    </div>
  )
}