import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { spacing } from '@/theme/spacing'
import { colors } from '@/theme/color'

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.spacing4};
`

const Card = styled.div``

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.gray[200]};
  border-radius: ${spacing.spacing2};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

const Text = styled.div`
  margin-top: ${spacing.spacing2};
  height: 14px;
  background-color: ${colors.gray[200]};
  border-radius: ${spacing.spacing1};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

export default function RankingSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={idx}>
          <Image />
          <Text />
        </Card>
      ))}
    </Grid>
  )
}