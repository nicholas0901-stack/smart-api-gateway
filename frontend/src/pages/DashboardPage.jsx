import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import MetricCard from '../components/MetricCard'
import LogTable from '../components/LogTable'
import RequestSimulator from '../components/RequestSimulator'

export default function DashboardPage({ stats, topRoutes, events, onRequestSent }) {
  const routeData = topRoutes.map(r => ({
    name: (r._id || '').replace('/api/gateway/', ''),
    hits: r.hits
  }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Total requests" value={stats.totalRequests || 0} sub="since startup" />
        <MetricCard label="Error rate" value={`${stats.errorRate || 0}%`} sub="4xx + 5xx" color="text-red-400" />
        <MetricCard label="Avg latency" value={`${Math.round(stats.avgLatency || 0)}ms`} sub="all requests" />
        <MetricCard label="Error count" value={stats.errorCount || 0} sub="total errors" color="text-amber-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-xs font-medium text-white mb-3">Top routes</h3>
          {routeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={routeData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} width={80} />
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="hits" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-xs text-gray-600 py-8 text-center">No data yet — fire some requests</p>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-xs font-medium text-white mb-3">Request simulator</h3>
          <RequestSimulator onRequestSent={onRequestSent} />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-xs font-medium text-white">Live event log</h3>
          <span className="text-xs text-gray-500">{events.length} events</span>
        </div>
        <LogTable events={events.slice(0, 20)} />
      </div>
    </div>
  )
}