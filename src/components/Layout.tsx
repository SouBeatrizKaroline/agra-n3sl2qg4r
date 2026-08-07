import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { Header } from '@/components/Header'
import { useRealtime } from '@/hooks/use-realtime'
import { getBatches } from '@/services/batches'
import { useEffect } from 'react'
import type { BatchRecord } from '@/types/agra'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [batches, setBatches] = useState<BatchRecord[]>([])
  const location = useLocation()

  const loadData = async () => {
    try {
      const items = await getBatches()
      setBatches(items)
    } catch {
      /* intentionally ignored */
    }
  }

  useEffect(() => {
    loadData()
  }, [location.pathname])

  useRealtime('batches', () => {
    loadData()
  })

  const getPageTitle = (path: string) => {
    if (path.startsWith('/dashboard')) return 'Real-Time Decision Dashboard'
    if (path.startsWith('/create-batch')) return 'Predictive Batch Analysis'
    if (path.startsWith('/batches')) return 'Batch Intelligence Detail'
    if (path.startsWith('/marketplace')) return 'Marketplace & Buyer Matching'
    if (path.startsWith('/impact')) return 'Sustainability & Impact Tracker'
    if (path.startsWith('/settings')) return 'Account & Logistics Settings'
    return 'Agra Platform'
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'lg:pl-[76px]' : 'lg:pl-[280px]'
        }`}
      >
        <Header title={getPageTitle(location.pathname)} batches={batches} />

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 max-w-[1440px] w-full mx-auto animate-fade-in">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 py-4 px-4 lg:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Agra Logistics. <strong>Predict. Prevent. Profit.</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Contact Support</span>
          </div>
        </footer>

        <MobileBottomNav />
      </div>
    </div>
  )
}
