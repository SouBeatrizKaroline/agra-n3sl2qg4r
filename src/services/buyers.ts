import pb from '@/lib/pocketbase/client'
import type { BuyerRecord } from '@/types/agra'

export const getBuyers = () =>
  pb.collection('buyers').getFullList<BuyerRecord>({
    sort: 'distance_miles',
  })
