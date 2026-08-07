import pb from '@/lib/pocketbase/client'
import type { ActionRecord } from '@/types/agra'

export const getActions = () =>
  pb.collection('actions').getFullList<ActionRecord>({
    sort: '-created',
    expand: 'batch',
  })

export const getActionsForBatch = (batchId: string) =>
  pb.collection('actions').getFullList<ActionRecord>({
    filter: `batch = "${batchId}"`,
    sort: '-created',
  })

export const createAction = (data: Omit<ActionRecord, 'id' | 'created' | 'updated'>) =>
  pb.collection('actions').create<ActionRecord>(data)

export const updateAction = (id: string, data: Partial<ActionRecord>) =>
  pb.collection('actions').update<ActionRecord>(id, data)
