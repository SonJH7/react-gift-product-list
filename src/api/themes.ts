export interface Theme {
  themeId: number
  name: string
  image: string
}

export interface ThemeProductsResponse {
  list: import('../type').Product[]
  cursor: number
  hasMoreList: boolean
}
import { fetchApi } from './client'

export async function fetchThemes(): Promise<Theme[]> {
  const data = await fetchApi<Theme[]>('/api/themes')

  if (!Array.isArray(data)) {
    throw new Error('Invalid response from /api/themes')
  }
  return data
}

export async function fetchThemeProducts(
  themeId: number,
  cursor = 0,
  limit = 10,
): Promise<ThemeProductsResponse> {
  const data = await fetchApi<ThemeProductsResponse>(
    `/api/themes/${themeId}/products`,
    { cursor: String(cursor), limit: String(limit) },
  )
  if (typeof data !== 'object' || !Array.isArray(data.list)) {
    throw new Error('Invalid response from /api/themes/:themeId/products')
  }

  return data
}