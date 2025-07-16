import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'
import type { Product } from '@/type'

interface ProductItemProps {
  product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/order/${product.id}`, { state: { product } })
  }

  return (
    <Card onClick={handleClick}>
      <Image src={product.imageURL} alt={product.name} />
      <Brand>{product.brandInfo.name}</Brand>
      <Title>{product.name}</Title>
      <Price>
        {product.price.sellingPrice.toLocaleString()} <span>원</span>
      </Price>
    </Card>
  )
}

const Card = styled.div`
  background: ${colors.background.default};
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`

const Brand = styled.p`
  margin: ${spacing.spacing2} 0 ${spacing.spacing1};
  line-height: ${typography.label2Regular.lineHeight};
  color: ${colors.text.sub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Title = styled.h6`
  margin: 0;
  font-size: ${typography.subtitle2Bold.fontSize};
  font-weight: ${typography.subtitle2Bold.fontWeight};
  line-height: ${typography.subtitle2Bold.lineHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Price = styled.p`
  margin: ${spacing.spacing1} 0 ${spacing.spacing3};
  font-size: ${typography.body1Bold.fontSize};
  font-weight: ${typography.body1Bold.fontWeight};
  line-height: ${typography.body1Bold.lineHeight};
  color: ${colors.text.default};
`
