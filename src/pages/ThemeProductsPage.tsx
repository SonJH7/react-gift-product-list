import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Layout from '@/Layout'
import { fetchThemeProducts } from '@/api/themes'
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
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    const themeId = Number(id)
    if (Number.isNaN(themeId)) {
      setError(true)
      return
    }
    setLoading(true)
    setError(false)
    fetchThemeProducts(themeId)
      .then((data) => setProducts(data.list))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

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