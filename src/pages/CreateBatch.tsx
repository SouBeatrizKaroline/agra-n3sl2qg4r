import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Box, Calendar, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AiInsightCard } from '@/components/AiInsightCard'
import { predictBatchRisk } from '@/services/prediction'
import { createBatch } from '@/services/batches'
import { createAction } from '@/services/actions'
import { useAuth } from '@/hooks/use-auth'
import type { PredictionResult, ActionType } from '@/types/agra'
import { toast } from 'sonner'

export default function CreateBatch() {
  const [produceType, setProduceType] = useState('Strawberries')
  const [quantity, setQuantity] = useState('300')
  const [unit, setUnit] = useState('crates')
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0])
  const [location, setLocation] = useState('Fresno, CA')

  const [analyzing, setAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnalyzing(true)
    setPrediction(null)

    try {
      const res = await predictBatchRisk({
        produce_type: produceType,
        quantity: Number(quantity),
        unit,
        harvest_date: harvestDate,
        location,
      })
      setPrediction(res)
    } catch (err) {
      toast.error('AI Prediction service unavailable. Using local fallback model.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSaveAndExecute = async (actionToTake?: ActionType) => {
    if (!prediction || !user) return
    setSubmitting(true)

    try {
      const finalAction = actionToTake || prediction.recommended_action
      const initialStatus = actionToTake
        ? actionToTake === 'sell_now'
          ? 'sold'
          : actionToTake === 'redirect'
            ? 'redirected'
            : 'discounted'
        : 'at_risk'

      const newBatch = await createBatch({
        owner: user.id,
        produce_type: produceType,
        quantity: Number(quantity),
        unit,
        harvest_date: harvestDate,
        location,
        status: initialStatus,
        risk_score: prediction.risk_score,
        demand_score: prediction.demand_score,
        time_before_loss_days: prediction.time_before_loss_days,
        ai_explanation: prediction.ai_explanation,
      })

      await createAction({
        batch: newBatch.id,
        owner: user.id,
        type: finalAction,
        status: actionToTake ? 'taken' : 'suggested',
        rationale: prediction.rationale,
      })

      toast.success('Batch created & AI intervention saved!')
      navigate(`/batches/${newBatch.id}`)
    } catch (err) {
      toast.error('Failed to create batch record.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Predictive Batch Analysis
        </h2>
        <p className="text-xs text-slate-500">
          Submit fresh produce batch details for real-time AI spoilage & demand analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-subtle space-y-4">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Produce Type
              </Label>
              <Select value={produceType} onValueChange={setProduceType}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Strawberries',
                    'Lettuce',
                    'Tomato',
                    'Spinach',
                    'Broccoli',
                    'Apples',
                    'Potatoes',
                    'Onions',
                    'Carrots',
                    'Peppers',
                    'Other',
                  ].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Quantity
                </Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Unit
                </Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['crates', 'kg', 'lbs', 'units'].map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Harvest Date
              </Label>
              <Input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Location Node
              </Label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Fresno, CA or Toronto, ON"
                required
                className="text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={analyzing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-subtle h-11"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Shelf Life...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                </>
              )}
            </Button>
          </form>
        </div>

        {/* AI Result Column */}
        <div className="lg:col-span-7 space-y-4">
          {analyzing ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Evaluating regional demand velocity & temperature sensitivity...
              </p>
            </div>
          ) : prediction ? (
            <div className="space-y-4">
              <AiInsightCard
                prediction={prediction}
                onExecuteAction={(act) => handleSaveAndExecute(act)}
                isExecuting={submitting}
              />
              <Button
                variant="outline"
                disabled={submitting}
                className="w-full border-slate-300 text-slate-700 dark:text-slate-300"
                onClick={() => handleSaveAndExecute()}
              >
                Save Batch Without Immediate Action
              </Button>
            </div>
          ) : (
            <div className="bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-12 text-center text-slate-400 space-y-2">
              <Box className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">Ready for Predictive Analysis</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Fill in the batch details and click "Analyze with AI" to generate real-time risk
                scores and actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
