import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useLiveEvents } from './hooks/useLiveEvents'
import { useStats } from './hooks/useStats'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import EventLogPage from './pages/EventLogPage'
import AnalyticsPage from './pages/AnalyticsPage'
import AuthTokenPage from './pages/AuthTokenPage'
import SettingsPage from './pages/SettingsPage'

const titles = {
  '/': 'Dashboard',
  '/logs': 'Event log',
  '/analytics': 'Analytics',
  '/auth': 'Auth tokens',
  '/settings': 'Settings',
}

function ProtectedApp({ user, logout, token, decodeToken }) {
  const location = useLocation()
  const { events } = useLiveEvents()
  const { stats, topRoutes, refresh } = useStats()

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar user={user} onLogout={logout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-900">
          <span className="text-sm font-medium">{titles[location.pathname] || 'Dashboard'}</span>
          <span className="flex items-center gap-1.5 text-xs text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            SSE connected
          </span>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<DashboardPage stats={stats} topRoutes={topRoutes} events={events} onRequestSent={refresh} />} />
            <Route path="/logs" element={<EventLogPage />} />
            <Route path="/analytics" element={<AnalyticsPage stats={stats} topRoutes={topRoutes} />} />
            <Route path="/auth" element={<AuthTokenPage token={token} user={user} decodeToken={decodeToken} />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { token, user, login, logout, decodeToken, isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={login} />
        } />
        <Route path="/*" element={
          isAuthenticated
            ? <ProtectedApp user={user} logout={logout} token={token} decodeToken={decodeToken} />
            : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  )
}