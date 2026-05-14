import { useEffect, useState } from 'react'
import api from '../services/api'
import MetricCard from '../components/MetricCard'

export default function AnalyticsPage({ stats, topRoutes }) {
  const totalReq = stats.totalRequests || 0
  const errCount = stats.errorCount || 0
  const uptime = totalReq > 0 ? Math.round((1 - errCount / totalReq) * 1000) / 10 : 100

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Total requests" value={totalReq} />
        <MetricCard label="Avg latency" value={`${Math.round(stats.avgLatency || 0)}ms`} />
        <MetricCard label="Error count" value={errCount} color="text-red-400" />
        <MetricCard label="Uptime" value={`${uptime}%`} color="text-green-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-xs font-medium text-white mb-3">Top routes by hits</h3>
          {topRoutes.length > 0 ? topRoutes.map((r, i) => {
            const max = topRoutes[0]?.hits || 1
            const name = (r._id || '').replace('/api/gateway/', '') || r._id
            return (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400 w-24 truncate">{name}</span>
                <div className="flex-1 bg-gray-800 rounded h-2 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded" style={{ width: `${(r.hits / max) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{r.hits}</span>
              </div>
            )
          }) : <p className="text-xs text-gray-600 py-4 text-center">No data yet</p>}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-xs font-medium text-white mb-3">Error rate</h3>
          <div className="flex items-end gap-1 h-24">
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-green-500/30 rounded-t" style={{ height: `${totalReq > 0 ? ((totalReq - errCount) / totalReq) * 100 : 100}%` }} />
              <span className="text-xs text-gray-500">2xx</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-red-500/30 rounded-t" style={{ height: `${totalReq > 0 ? (errCount / totalReq) * 100 : 0}%` }} />
              <span className="text-xs text-gray-500">4xx/5xx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}