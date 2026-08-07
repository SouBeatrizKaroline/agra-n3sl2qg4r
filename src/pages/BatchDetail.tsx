import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Store, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/RiskBadge'
import { getBatch, updateBatch } from '@/services/batches'
import { getActionsForBatch, updateAction } from '@/services/actions'
import { getBuyers } from '@/services/buyers'
import type { BatchRecord, ActionRecord, BuyerRecord, ActionType } from '@/types/agra'
import { toast } from 'sonner'

export default function BatchDetail() {
  const { id } = useParams<{ id: string }>()
  const [batch, setBatch] = useState<BatchRecord | null>(null)
  const [actions, setActions] = useState<ActionRecord[]>([])
  const [buyers, setBuyers] = useState<BuyerRecord[]>([])
  const [loading, setLoading] = useState(true)

  const loadBatchData = async () => {
    if (!id) return
    try {
      const [b, aList, buyerList] = await Promise.all([
        getBatch(id),
        getActionsForBatch(id),
        getBuyers(),
      ])
      setBatch(b)
      setActions(aList)
      setBuyers(buyerList)
    } catch (_) {
      toast.error('Failed to load batch detail.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBatchData()
  }, [id])

  const handleExecute = async (actionType: ActionType) => {
    if (!batch) return
    try {
      const newStatus =
        actionType === 'sell_now' ? 'sold' : actionType === 'redirect' ? 'redirected' : 'discounted'
      await updateBatch(batch.id, { status: newStatus })

      if (actions.length > 0) {
        await updateAction(actions[0].id, { status: 'taken', type: actionType })
      }

      toast.success(`Action Executed: Batch status updated to ${newStatus}!`)
      loadBatchData()
    } catch (err) {
      toast.error('Failed to update batch.')
    }
  }

  if (loading || !batch) {
    return (
      <div className="py-12 text-center text-xs text-slate-500">Loading batch intelligence...</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/dashboard">
        <Button variant="ghost" size="sm" className="gap-1 text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Outcome Banner */}
      {['sold', 'redirected', 'discounted'].includes(batch.status) && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs font-medium">
            <strong className="font-bold">Intervention Successful!</strong> Batch marked as{' '}
            <span className="capitalize font-bold">{batch.status}</span>. Spoilage risk mitigated
            and revenue protected.
          </div>
        </div>
      )}

      {/* Main Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {batch.produce_type}
            </h2>
            <RiskBadge score={batch.risk_score} />
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {batch.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Harvest:{' '}
              {new Date(batch.harvest_date).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-emerald-600">
            {batch.quantity} {batch.unit}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Volume
          </span>
        </div>
      </div>

      {/* AI Intelligence Card */}
      <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Spoilage & Demand Rationale
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          "{batch.ai_explanation}"
        </p>

        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
            onClick={() => handleExecute('redirect')}
          >
            Redirect Inventory
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-slate-700 text-slate-200 hover:bg-slate-800"
            onClick={() => handleExecute('sell_now')}
          >
            Sell Now
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-slate-700 text-slate-200 hover:bg-slate-800"
            onClick={() => handleExecute('discount')}
          >
            Apply Discount
          </Button>
        </div>
      </div>

      {/* Buyer Matching List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Store className="w-4 h-4 text-emerald-600" /> Matched Marketplace Buyers Nearby
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyers.slice(0, 4).map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {b.name}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {b.distance_miles} miles away
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {b.location} • {b.company_type}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">"{b.preference}"</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs font-semibold"
                onClick={() => handleExecute('redirect')}
              >
                Redirect to Buyer
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
