import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Activity, BarChart3, ShieldCheck, Settings, LogOut, Route } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/logs', icon: Activity, label: 'Event log' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/auth', icon: ShieldCheck, label: 'Auth tokens' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col h-screen">
      <div className="px-4 py-4 border-b border-gray-800 flex items-center gap-2">
        <Route size={18} className="text-blue-400" />
        <span className="text-sm font-medium text-white">API Gateway</span>
      </div>

      <nav className="flex-1 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 border-t border-gray-800 text-gray-400 hover:text-red-400 transition-colors text-sm"
      >
        <div className="w-7 h-7 rounded-full bg-blue-600/30 flex items-center justify-center text-xs font-medium text-blue-400">
          {user?.userId?.slice(0, 2).toUpperCase() || '??'}
        </div>
        <span className="flex-1 text-left">{user?.userId || 'Unknown'}</span>
        <LogOut size={14} />
      </button>
    </div>
  )
}