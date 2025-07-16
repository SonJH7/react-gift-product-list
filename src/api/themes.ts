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

export async function fetchThemes(): Promise<Theme[]> {
  const res = await fetch('/api/themes')
  const json = await res.json()

  if (!res.ok || !Array.isArray(json.data)) {
    throw new Error('Invalid response from /api/themes')
  }
    return json.data
}

export async function fetchThemeProducts(themeId: number, cursor = 0, limit = 10): Promise<ThemeProductsResponse> {
  const params = new URLSearchParams({ cursor: String(cursor), limit: String(limit) })
  const res = await fetch(`/api/themes/${themeId}/products?${params.toString()}`)
  const json = await res.json()

  if (
    !res.ok ||
    typeof json.data !== 'object' ||
    !Array.isArray(json.data.list)
  ) {
    throw new Error('Invalid response from /api/themes/:themeId/products')
  }

  return json.data
}