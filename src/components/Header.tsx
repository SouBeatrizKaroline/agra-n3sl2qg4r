import { Sparkles, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotificationsDropdown } from '@/components/NotificationsDropdown'
import type { BatchRecord } from '@/types/agra'

interface HeaderProps {
  title: string
  batches?: BatchRecord[]
  onOpenMobileMenu?: () => void
}

export function Header({ title, batches = [], onOpenMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-600"
          onClick={onOpenMobileMenu}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Active Engine</span>
        </div>

        <NotificationsDropdown batches={batches} />
      </div>
    </header>
  )
}
