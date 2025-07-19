import type { Product } from '../type'
import { fetchApi } from './client'

export async function fetchProductRanking(
  targetType: string = 'ALL',
  rankType: string = 'MANY_WISH',
): Promise<Product[]> {
  const data = await fetchApi<Product[]>('/api/products/ranking', {
    targetType,
    rankType,
  })

  if (!Array.isArray(data)) {
    throw new Error('Invalid response from /api/products/ranking')
  }
  return data
}