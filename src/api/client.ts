export interface ApiResponse<T> {
  data: T
}

export async function fetchApi<T>(
  url: string,
  params?: Record<string, string>,
): Promise<T> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : ''
  const res = await fetch(`${url}${query}`)
  const json = await res.json()

  if (!res.ok || json.data === undefined) {
    throw new Error(`Invalid response from ${url}`)
  }

  return json.data as T
}