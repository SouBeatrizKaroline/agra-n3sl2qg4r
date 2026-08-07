export type ProduceType =
  | 'Lettuce'
  | 'Tomato'
  | 'Spinach'
  | 'Broccoli'
  | 'Strawberries'
  | 'Apples'
  | 'Potatoes'
  | 'Onions'
  | 'Carrots'
  | 'Peppers'
  | 'Other'

export type BatchStatus = 'active' | 'at_risk' | 'sold' | 'redirected' | 'discounted' | 'resolved'
export type ActionType = 'sell_now' | 'redirect' | 'discount'
export type ActionStatus = 'suggested' | 'taken' | 'dismissed'

export interface BatchRecord {
  id: string
  owner: string
  produce_type: string
  quantity: number
  unit: string
  harvest_date: string
  location: string
  status: BatchStatus
  risk_score: number
  demand_score: number
  time_before_loss_days: number
  ai_explanation: string
  created: string
  updated: string
}

export interface ActionRecord {
  id: string
  batch: string
  owner: string
  type: ActionType
  status: ActionStatus
  rationale: string
  created: string
  updated: string
  expand?: {
    batch?: BatchRecord
  }
}

export interface BuyerRecord {
  id: string
  name: string
  company_type: 'distributor' | 'retailer' | 'wholesaler' | 'grocery'
  location: string
  distance_miles: number
  preferred_produce: string
  preference: string
  created: string
  updated: string
}

export interface PredictionInput {
  produce_type: string
  quantity: number
  unit: string
  harvest_date: string
  location: string
}

export interface PredictionResult {
  risk_score: number
  demand_score: number
  time_before_loss_days: number
  ai_explanation: string
  recommended_action: ActionType
  rationale: string
}
