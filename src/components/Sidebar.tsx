import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  PlusCircle,
  Store,
  Leaf,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const { user, signOut } = useAuth()

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Create Batch', icon: PlusCircle, path: '/create-batch' },
    { label: 'Marketplace', icon: Store, path: '/marketplace' },
    { label: 'Impact Tracker', icon: Leaf, path: '/impact' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-slate-900 text-slate-100 border-r border-slate-800 transition-all duration-300 ease-apple',
        collapsed ? 'w-[76px]' : 'w-[280px]',
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-400 flex items-center justify-center text-slate-950 font-black text-xl shrink-0 shadow-sm">
            A
          </div>
          {!collapsed && (
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              Agra{' '}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                AI
              </span>
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-white hover:bg-slate-800 w-8 h-8 rounded-lg"
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-subtle'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60',
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-850">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30 shrink-0">
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {user?.name || 'Agra Farmer'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 w-7 h-7"
              onClick={signOut}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
