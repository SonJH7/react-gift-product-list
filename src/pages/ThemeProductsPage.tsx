import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Layout from '@/Layout'
import { fetchThemeProducts, fetchThemes } from '@/api/themes'
import type { Product } from '@/type'
import ProductItem from '@/components/ProductItem'
import { spacing } from '@/theme/spacing'

const Grid = styled.div`
  padding: ${spacing.spacing4};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.spacing4};
`

export default function ThemeProductsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadThemeProducts(themeId: number) {
      const data = await fetchThemeProducts(themeId)
      setProducts(data.list)
    }

    async function handleFallback(originalId: number) {
      try {
        const themes = await fetchThemes()
        if (themes.length === 0) {
          throw new Error('No themes')
        }
        const fallbackId = themes[0].themeId
        await loadThemeProducts(fallbackId)
        if (fallbackId !== originalId) {
          navigate(`/theme/${fallbackId}`, { replace: true })
        }
      } catch {
        setError(true)
      }
    }
    async function load(targetId: number) {
      try {
        await loadThemeProducts(targetId)
      } catch {
        await handleFallback(targetId)
      } finally {
        setLoading(false)
      }
    }
    const themeId = Number(id)

    setLoading(true)
    setError(false)
    if (!id || Number.isNaN(themeId)) {
      load(0)
    } else {
      load(themeId)
    }
  }, [id, navigate])


  if (loading) {
    return (
      <Layout>
        <p>로딩 중...</p>
      </Layout>
    )
  }
  if (error) {
    return (
      <Layout>
        <p>상품을 불러오지 못했습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Grid>
        {products.map((prod) => (
          <ProductItem key={prod.id} product={prod} />
        ))}
      </Grid>
    </Layout>
  )
}