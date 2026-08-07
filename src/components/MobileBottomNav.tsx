import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, Store, Leaf, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileBottomNav() {
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Create', icon: PlusCircle, path: '/create-batch' },
    { label: 'Marketplace', icon: Store, path: '/marketplace' },
    { label: 'Impact', icon: Leaf, path: '/impact' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium transition-colors',
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200',
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
