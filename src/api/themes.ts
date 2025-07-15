export interface Theme {
  themeId: number
  name: string
  image: string
}

export async function fetchThemes(): Promise<Theme[]> {
  const res = await fetch('/api/themes')
  const json = await res.json()

  if (!res.ok || !Array.isArray(json.data)) {
    throw new Error('Invalid response from /api/themes')
  }

  return json.data
}