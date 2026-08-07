import pb from '@/lib/pocketbase/client'
import type { BatchRecord } from '@/types/agra'

export const getBatches = () =>
  pb.collection('batches').getFullList<BatchRecord>({
    sort: '-created',
  })

export const getBatch = (id: string) => pb.collection('batches').getOne<BatchRecord>(id)

export const createBatch = (data: Omit<BatchRecord, 'id' | 'created' | 'updated'>) =>
  pb.collection('batches').create<BatchRecord>(data)

export const updateBatch = (id: string, data: Partial<BatchRecord>) =>
  pb.collection('batches').update<BatchRecord>(id, data)

export const deleteBatch = (id: string) => pb.collection('batches').delete(id)
