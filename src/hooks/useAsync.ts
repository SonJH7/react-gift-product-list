import { useEffect, useState } from 'react'

export default function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = [],
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let canceled = false
    setLoading(true)
    setError(false)

    asyncFn()
      .then((result) => {
        if (!canceled) {
          setData(result)
        }
      })
      .catch(() => {
        if (!canceled) {
          setError(true)
        }
      })
      .finally(() => {
        if (!canceled) {
          setLoading(false)
        }
      })

    return () => {
      canceled = true
    }
  }, deps)

  return { data, loading, error }
}