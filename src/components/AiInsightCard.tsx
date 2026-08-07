import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RiskMeter } from '@/components/RiskMeter'
import { RiskBadge } from '@/components/RiskBadge'
import type { PredictionResult, ActionType } from '@/types/agra'

interface AiInsightCardProps {
  prediction: PredictionResult
  onExecuteAction?: (action: ActionType) => void
  isExecuting?: boolean
}

export function AiInsightCard({ prediction, onExecuteAction, isExecuting }: AiInsightCardProps) {
  const actionLabels: Record<ActionType, string> = {
    sell_now: 'Sell Now',
    redirect: 'Redirect Inventory',
    discount: 'Apply Fast Discount',
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50/80 via-white to-sky-50/50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 rounded-xl p-5 shadow-elevation relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            AI Waste Prevention Insight
          </span>
        </div>
        <RiskBadge score={prediction.risk_score} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-5">
        <div className="flex justify-center sm:justify-start">
          <RiskMeter score={prediction.risk_score} size={100} strokeWidth={8} />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div>
              Loss Window:{' '}
              <strong className="text-rose-600 font-bold">
                {prediction.time_before_loss_days} Days
              </strong>
            </div>
            <div>
              Demand Index:{' '}
              <strong className="text-emerald-700 font-bold">{prediction.demand_score}%</strong>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            "{prediction.ai_explanation}"
          </p>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-100 dark:border-slate-800 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Recommended Action:
          </span>{' '}
          {prediction.rationale}
        </div>
        {onExecuteAction && (
          <Button
            size="sm"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-subtle shrink-0 gap-1.5"
            onClick={() => onExecuteAction(prediction.recommended_action)}
            disabled={isExecuting}
          >
            <ShieldCheck className="w-4 h-4" />
            {actionLabels[prediction.recommended_action]}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
