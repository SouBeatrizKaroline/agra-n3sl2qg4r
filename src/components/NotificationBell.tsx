import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getBatches, type BatchRecord } from '@/services/batches'

export function NotificationBell() {
  const [atRiskBatches, setAtRiskBatches] = useState<BatchRecord[]>([])

  useEffect(() => {
    getBatches()
      .then((batches) => {
        setAtRiskBatches(batches.filter((b) => b.status === 'at_risk' || b.risk_score >= 60))
      })
      .catch(() => {})
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600 hover:text-slate-900"
        >
          <Bell className="h-5 w-5" />
          {atRiskBatches.length > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {atRiskBatches.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b border-slate-100 bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">Live Risk Alerts</h4>
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
              {atRiskBatches.length} Urgent
            </span>
          </div>
        </div>
        <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
          {atRiskBatches.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No active high-risk alerts. All batches stable.
            </div>
          ) : (
            atRiskBatches.map((batch) => (
              <div key={batch.id} className="p-3 hover:bg-slate-50">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-slate-900">
                      {batch.produce_type} ({batch.quantity} {batch.unit})
                    </p>
                    <p className="text-slate-600 line-clamp-2">{batch.ai_explanation}</p>
                    <Link
                      to={`/batches/${batch.id}`}
                      className="mt-1.5 inline-flex items-center text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      View & Take Action <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
