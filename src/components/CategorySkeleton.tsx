import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { spacing } from '@/theme/spacing'
import { colors } from '@/theme/color'

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${spacing.spacing4};
`

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.spacing2};
`

const SkeletonImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${spacing.spacing3};
  background-color: ${colors.brand.kakaoYellow};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

const SkeletonText = styled.div`
  width: 56px;
  height: 12px;
  border-radius: ${spacing.spacing1};
  background-color: ${colors.brand.kakaoYellow};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

const CategorySkeleton = () => (
  <SkeletonGrid>
    {Array.from({ length: 5 }).map((_, index) => (
      <SkeletonCard key={index}>
        <SkeletonImage />
        <SkeletonText />
      </SkeletonCard>
    ))}
  </SkeletonGrid>
)

export default CategorySkeleton
