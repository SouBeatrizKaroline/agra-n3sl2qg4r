import pb from '@/lib/pocketbase/client'

export interface PredictInput {
  produceType: string
  quantity: number
  unit: string
  harvestDate: string
  location: string
}

export interface PredictResult {
  riskScore: number
  timeBeforeLossDays: number
  demandScore: number
  explanation: string
  recommendedAction: 'sell_now' | 'redirect' | 'discount'
  actionRationale: string
}

export const predictBatchRisk = async (input: PredictInput): Promise<PredictResult> => {
  return pb.send<PredictResult>('/backend/v1/predict', {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })
}
