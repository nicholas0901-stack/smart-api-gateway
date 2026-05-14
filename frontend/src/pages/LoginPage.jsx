import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Route, Key, Copy, ArrowRight } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState('admin-01')
  const [role, setRole] = useState('admin')
  const [expiry, setExpiry] = useState('3600')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!userId.trim()) { setError('User ID is required'); return }
    setError(null)
    setLoading(true)
    try {
      const newToken = await onLogin(userId, role, expiry)
      setToken(newToken)
    } catch (err) {
      setError('Failed to generate token')
    }
    setLoading(false)
  }

  const handleCopy = () => {
    if (token) navigator.clipboard?.writeText(token)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-[380px] bg-gray-900 border border-gray-800 rounded-xl p-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Route size={22} className="text-blue-400" />
          <span className="text-lg font-medium text-white">API Gateway</span>
        </div>
        <p className="text-center text-sm text-gray-400 mb-6">Sign in to access the gateway dashboard</p>

        {error && (
          <div className="bg-red-900/30 text-red-400 text-xs rounded-md px-3 py-2 mb-4">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1 font-medium">User ID</label>
          <input
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="e.g. user-042"
            className="w-full bg-gray-800 text-white text-sm rounded-md px-3 py-2 border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full bg-gray-800 text-white text-sm rounded-md px-3 py-2 border border-gray-700"
          >
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1 font-medium">Token expiry</label>
          <select
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            className="w-full bg-gray-800 text-white text-sm rounded-md px-3 py-2 border border-gray-700"
          >
            <option value="3600">1 hour</option>
            <option value="86400">24 hours</option>
            <option value="604800">7 days</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Key size={14} />
          {loading ? 'Generating...' : 'Generate token & sign in'}
        </button>

        {token && (
          <div className="mt-4 bg-gray-800 rounded-md p-3">
            <div className="text-xs text-gray-500 mb-1">Your JWT token</div>
            <div className="text-xs font-mono text-gray-300 break-all leading-relaxed max-h-20 overflow-auto">{token}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={handleCopy} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 border border-gray-700 rounded px-2 py-1">
                <Copy size={11} /> Copy
              </button>
              <button onClick={() => navigate('/')} className="text-xs bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-1 flex items-center gap-1">
                <ArrowRight size={11} /> Enter dashboard
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-600 mt-5 leading-relaxed">
          This generates a JWT via POST /api/auth/token<br />
          No password needed — this is a portfolio demo
        </p>
      </div>
    </div>
  )
}