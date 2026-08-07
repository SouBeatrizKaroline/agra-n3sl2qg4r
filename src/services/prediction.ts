import pb from '@/lib/pocketbase/client'
import type { PredictionInput, PredictionResult } from '@/types/agra'

export const predictBatchRisk = async (input: PredictionInput): Promise<PredictionResult> => {
  return pb.send<PredictionResult>('/backend/v1/predict', {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })
}
