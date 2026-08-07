import { Bell, AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { BatchRecord } from '@/types/agra'

interface NotificationsDropdownProps {
  batches: BatchRecord[]
}

export function NotificationsDropdown({ batches }: NotificationsDropdownProps) {
  const atRiskBatches = batches.filter((b) => b.risk_score >= 50 || b.status === 'at_risk')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-300">
          <Bell className="w-5 h-5" />
          {atRiskBatches.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2">
        <div className="flex items-center justify-between px-2 py-1.5 border-b mb-1">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Risk Alerts</span>
          <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-semibold">
            {atRiskBatches.length} Urgent
          </span>
        </div>
        {atRiskBatches.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-500">No active risk alerts</div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-1">
            {atRiskBatches.slice(0, 5).map((b) => (
              <DropdownMenuItem key={b.id} asChild className="cursor-pointer p-2 rounded-lg">
                <Link to={`/batches/${b.id}`} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs space-y-0.5">
                    <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                      <span>{b.produce_type}</span>
                      <span className="text-rose-600 font-bold">{b.risk_score}% Risk</span>
                    </div>
                    <p className="text-slate-500 line-clamp-1">
                      {b.location} • Loss in {b.time_before_loss_days} days
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
