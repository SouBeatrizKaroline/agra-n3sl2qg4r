import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Package, AlertTriangle, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/RiskBadge'
import { AiInsightCard } from '@/components/AiInsightCard'
import { getBatches, updateBatch } from '@/services/batches'
import { getActions, updateAction } from '@/services/actions'
import { useRealtime } from '@/hooks/use-realtime'
import type { BatchRecord, ActionRecord, ActionType } from '@/types/agra'
import { toast } from 'sonner'

export default function Dashboard() {
  const [batches, setBatches] = useState<BatchRecord[]>([])
  const [actions, setActions] = useState<ActionRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const loadData = async () => {
    try {
      const [bList, aList] = await Promise.all([getBatches(), getActions()])
      setBatches(bList)
      setActions(aList)
    } catch {
      /* intentionally ignored */
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('batches', () => loadData())
  useRealtime('actions', () => loadData())

  const handleAction = async (batchId: string, actionType: ActionType) => {
    try {
      const targetBatch = batches.find((b) => b.id === batchId)
      if (!targetBatch) return

      const newStatus =
        actionType === 'sell_now' ? 'sold' : actionType === 'redirect' ? 'redirected' : 'discounted'
      await updateBatch(batchId, { status: newStatus })

      const actionItem = actions.find((a) => a.batch === batchId)
      if (actionItem) {
        await updateAction(actionItem.id, { status: 'taken' })
      }

      toast.success(`Action Executed: Batch marked as ${newStatus}! Revenue protected.`)
      loadData()
    } catch (err) {
      toast.error('Failed to execute action.')
    }
  }

  const atRiskCount = batches.filter((b) => b.risk_score >= 50 || b.status === 'at_risk').length
  const activeCount = batches.filter((b) => b.status === 'active' || b.status === 'at_risk').length
  const actionsTakenCount = batches.filter((b) =>
    ['sold', 'redirected', 'discounted'].includes(b.status),
  ).length

  const filteredBatches = batches.filter((b) => {
    if (filter === 'high') return b.risk_score >= 70
    if (filter === 'medium') return b.risk_score >= 35 && b.risk_score < 70
    if (filter === 'low') return b.risk_score < 35
    return true
  })

  const topAtRiskBatch = batches.find(
    (b) => b.risk_score >= 70 && ['active', 'at_risk'].includes(b.status),
  )

  return (
    <div className="space-y-6">
      {/* Top Welcome Stat Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Live Logistics Decision Center
          </h2>
          <p className="text-xs text-slate-500">
            Real-time risk scoring & predictive intervention across supply nodes.
          </p>
        </div>
        <Link to="/create-batch">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-subtle">
            <Plus className="w-4 h-4" />
            Analyze New Batch
          </Button>
        </Link>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Batches
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {activeCount}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              At-Risk Batches
            </span>
            <div className="text-2xl font-black text-rose-600">{atRiskCount}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Predicted Savings
            </span>
            <div className="text-2xl font-black text-emerald-600">$18,450</div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Actions Taken
            </span>
            <div className="text-2xl font-black text-sky-600">{actionsTakenCount}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Featured Urgent AI Recommendation */}
      {topAtRiskBatch && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Urgent AI Intervention Required
          </span>
          <AiInsightCard
            prediction={{
              risk_score: topAtRiskBatch.risk_score,
              demand_score: topAtRiskBatch.demand_score,
              time_before_loss_days: topAtRiskBatch.time_before_loss_days,
              ai_explanation: topAtRiskBatch.ai_explanation,
              recommended_action: 'redirect',
              rationale: `Redirect ${topAtRiskBatch.produce_type} (${topAtRiskBatch.quantity} ${topAtRiskBatch.unit}) in ${topAtRiskBatch.location} to nearby distributor now.`,
            }}
            onExecuteAction={(act) => handleAction(topAtRiskBatch.id, act)}
          />
        </div>
      )}

      {/* Main Inventory Table with Filter Chips */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Live Batch Inventory
          </h3>
          <div className="flex items-center gap-1.5">
            {(['all', 'high', 'medium', 'low'] as const).map((chip) => (
              <button
                key={chip}
                onClick={() => setFilter(chip)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                  filter === chip
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {chip} Risk
              </button>
            ))}
          </div>
        </div>

        {filteredBatches.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Package className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No produce batches found.
            </p>
            <Link to="/create-batch">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Create First Batch
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-2.5 px-3">Produce</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Risk Meter</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBatches.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-850/50 transition-colors"
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {b.produce_type}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {b.quantity} {b.unit}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{b.location}</td>
                    <td className="py-3 px-3">
                      <RiskBadge score={b.risk_score} />
                    </td>
                    <td className="py-3 px-3 capitalize font-bold text-slate-700 dark:text-slate-300">
                      {b.status.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link to={`/batches/${b.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-emerald-600 hover:text-emerald-700 h-7 text-xs font-semibold gap-1"
                        >
                          Details
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
