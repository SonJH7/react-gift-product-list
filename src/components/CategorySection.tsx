import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'
import { fetchThemes } from '@/api/themes'
import type { Theme } from '@/api/themes'

const Section = styled.section`
  margin-top: ${spacing.spacing6};
`

const Title = styled.h3`
  font-size: ${typography.title2Bold.fontSize};
  font-weight: ${typography.title2Bold.fontWeight};
  line-height: ${typography.title2Bold.lineHeight};
  margin-bottom: ${spacing.spacing4};
  color: ${colors.text.default};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${spacing.spacing4};
`
export default function CategorySection() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchThemes()
      .then((data) => {
        setThemes(data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Section>
        <Title>선물 테마</Title>
        <p>로딩중...</p>
      </Section>
    )
  }

  if (error || themes.length === 0) {
    return null
  }
  return (
    <Section>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map(({ themeId, name, image }) => (
          <CategoryCard key={themeId} name={name} image={image} />
        ))}
      </Grid>
    </Section>
  )
}
