import StatusBadge from './StatusBadge'

function statusColor(code) {
  if (code >= 500) return 'text-red-400 font-medium'
  if (code >= 400) return 'text-amber-400 font-medium'
  return 'text-green-400 font-medium'
}

function formatTime(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString()
}

export default function LogTable({ events, showService = false }) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="px-3 py-2 w-16">Method</th>
            <th className="px-3 py-2">Path</th>
            <th className="px-3 py-2 w-14">Status</th>
            <th className="px-3 py-2 w-16">Latency</th>
            <th className="px-3 py-2 w-20">User</th>
            {showService && <th className="px-3 py-2 w-24">Service</th>}
            <th className="px-3 py-2 w-20">Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={e.id || i} className={`border-t border-gray-800 ${i === 0 ? 'animate-pulse' : ''}`}>
              <td className="px-3 py-2"><StatusBadge method={e.method} /></td>
              <td className="px-3 py-2 font-mono text-gray-300 truncate max-w-[200px]">{e.path}</td>
              <td className={`px-3 py-2 ${statusColor(e.statusCode)}`}>{e.statusCode}</td>
              <td className="px-3 py-2 text-gray-400">{e.latencyMs}ms</td>
              <td className="px-3 py-2 font-mono text-gray-400">{e.userId || '-'}</td>
              {showService && <td className="px-3 py-2 text-gray-500">{e.routedTo}</td>}
              <td className="px-3 py-2 text-gray-500">{formatTime(e.timestamp)}</td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr><td colSpan={showService ? 7 : 6} className="px-3 py-8 text-center text-gray-600">No events yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}