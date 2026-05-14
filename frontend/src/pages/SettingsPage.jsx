export default function SettingsPage() {
  const settings = [
    { label: 'MongoDB URI', value: 'mongodb://mongodb:27017/gateway_db' },
    { label: 'TTL expiry', value: '7 days' },
    { label: 'SSE heartbeat', value: '30 seconds' },
    { label: 'CORS origins', value: 'http://localhost:3000, http://localhost:5173' },
    { label: 'JWT algorithm', value: 'HS256 (HMAC-SHA256)' },
    { label: 'Token expiry', value: '1 hour (3600s)' },
  ]

  return (
    <div className="max-w-lg">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <h3 className="text-xs font-medium text-white mb-4">Gateway configuration</h3>
        {settings.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
            <span className="text-xs text-gray-400">{s.label}</span>
            <span className="text-xs font-mono text-gray-300">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}