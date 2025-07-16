// src/components/RankingList.tsx

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import styled from '@emotion/styled'
import { spacing } from '@/theme/spacing'
import LoadMoreButton from './LoadMoreButton'
import RankingItem from './RankingItem'
import RankingSkeleton from './RankingSkeleton'
import { fetchProductRanking } from '@/api/product'
import type { Product } from '@/type'

//— RankingList 컴포넌트
const RankingList: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const gender = searchParams.get('gender') ?? 'all'
  const sort = searchParams.get('sort') ?? 'wanted'
  const targetMap: Record<string, string> = {
    all: 'ALL',
    female: 'FEMALE',
    male: 'MALE',
    teen: 'TEEN',
  }
  const rankMap: Record<string, string> = {
    wanted: 'MANY_WISH',
    sent: 'MANY_RECEIVE',
    wished: 'MANY_WISH_RECEIVE',
  }
  useEffect(() => {
    const targetType = targetMap[gender] ?? 'ALL'
    const rankType = rankMap[sort] ?? 'MANY_WISH'
    setLoading(true)
    setError(false)
    fetchProductRanking(targetType, rankType)
      .then(setProducts)
      .catch(() => {
        setError(true)
        setProducts([])
      })
      .finally(() => setLoading(false))
  }, [gender, sort])
  const visibleItems = expanded ? products : products.slice(0, 6)
  
    if (loading) {
    return (
      <Wrapper>
        <RankingSkeleton />
      </Wrapper>
    )
  }

  if (error || products.length === 0) {
    return <Wrapper>상품 목록이 없습니다.</Wrapper>

  }

  return (
    <Wrapper>
      <GridContainer>
        {visibleItems.map((prod, idx) => (
          <RankingItem key={prod.id} rank={idx + 1} product={prod} />
        ))}
      </GridContainer>
      {products.length > 6 && (
        <ButtonWrap>
          <LoadMoreButton onClick={() => setExpanded((p) => !p)}>
            {expanded ? '접기' : '더보기'}
          </LoadMoreButton>
        </ButtonWrap>
      )}
    </Wrapper>
  )
}

export default RankingList

//— styled components
const Wrapper = styled.div`
  padding: 0 ${spacing.spacing4};
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.spacing4};
`

const ButtonWrap = styled.div`
  margin-top: ${spacing.spacing4};
`
