import { useState, useEffect } from 'react'
import { Store, MapPin, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/RiskBadge'
import { getBatches, updateBatch } from '@/services/batches'
import { getBuyers } from '@/services/buyers'
import type { BatchRecord, BuyerRecord } from '@/types/agra'
import { toast } from 'sonner'

export default function Marketplace() {
  const [batches, setBatches] = useState<BatchRecord[]>([])
  const [buyers, setBuyers] = useState<BuyerRecord[]>([])
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null)

  const loadData = async () => {
    try {
      const [bList, buyerList] = await Promise.all([getBatches(), getBuyers()])
      setBatches(bList)
      setBuyers(buyerList)
      if (bList.length > 0) setSelectedBatch(bList[0])
    } catch {
      /* intentionally ignored */
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleRedirect = async (batchId: string, buyerName: string) => {
    try {
      await updateBatch(batchId, { status: 'redirected' })
      toast.success(`Redirected batch to ${buyerName}! Transaction initialized.`)
      loadData()
    } catch (err) {
      toast.error('Failed to complete redirect.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Marketplace Simulation Layer
        </h2>
        <p className="text-xs text-slate-500">
          Real-time buyer matching to redistribute at-risk inventory within hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Supply Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b pb-2">
            Active Supply Batches
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {batches.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBatch(b)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  selectedBatch?.id === b.id
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {b.produce_type}
                  </span>
                  <RiskBadge score={b.risk_score} />
                </div>
                <div className="text-xs text-slate-500 flex items-center justify-between">
                  <span>
                    {b.quantity} {b.unit}
                  </span>
                  <span>{b.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buyers Column */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-subtle space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Matched Regional Buyers for {selectedBatch?.produce_type || 'Selected Batch'}
            </h3>
            <p className="text-xs text-slate-500">
              AI-ranked buyers by proximity, capacity, and demand likelihood.
            </p>
          </div>

          <div className="space-y-3">
            {buyers.map((buyer) => (
              <div
                key={buyer.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {buyer.name}
                    </h4>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {buyer.location} ({buyer.distance_miles} miles
                      away)
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    94% Match Fit
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg">
                  "{buyer.preference}"
                </p>

                <Button
                  size="sm"
                  disabled={
                    !selectedBatch ||
                    ['sold', 'redirected', 'discounted'].includes(selectedBatch.status)
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5"
                  onClick={() => selectedBatch && handleRedirect(selectedBatch.id, buyer.name)}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Redirect {selectedBatch?.produce_type} to {buyer.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
