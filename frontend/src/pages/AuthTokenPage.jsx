import { useState } from 'react'
import { Copy, Code } from 'lucide-react'

export default function AuthTokenPage({ token, user, decodeToken }) {
  const [showDecode, setShowDecode] = useState(false)
  const decoded = decodeToken?.()

  const handleCopy = () => {
    if (token) navigator.clipboard?.writeText(token)
  }

  return (
    <div className="max-w-lg space-y-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <h3 className="text-xs font-medium text-white mb-3">Current token</h3>
        <p className="text-xs text-gray-400 mb-2">
          Signed in as <span className="text-white font-medium">{user?.userId || 'unknown'}</span>
          <span className="text-gray-600"> • role: {user?.role || 'unknown'}</span>
        </p>
        <div className="bg-gray-800 rounded-md p-3 text-xs font-mono text-gray-300 break-all leading-relaxed max-h-28 overflow-auto">
          {token || 'No token'}
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={handleCopy} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 border border-gray-700 rounded px-2 py-1">
            <Copy size={11} /> Copy token
          </button>
          <button onClick={() => setShowDecode(!showDecode)} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 border border-gray-700 rounded px-2 py-1">
            <Code size={11} /> {showDecode ? 'Hide' : 'Decode'}
          </button>
        </div>

        {showDecode && decoded && (
          <div className="mt-3 space-y-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Header</div>
              <pre className="bg-gray-800 rounded-md p-2 text-xs font-mono text-gray-300 overflow-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Payload</div>
              <pre className="bg-gray-800 rounded-md p-2 text-xs font-mono text-gray-300 overflow-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}