import react, { useMemo } from 'react'
import SnipcartButton from './snipcartButton'
import Link from 'next/link'

const ProductCard = ({ product }) => {
  const imgSrc = useMemo(() => {
    if (product.frontmatter.image != null) {
      return product.frontmatter.image
    }
    return `/images/comming_soon.jpeg`
  }, [product.frontmatter.image])
  return (
    <div className="card card--product">
      <div className="card__header">
        <img src={imgSrc} />
      </div>
      <div className="card__body">
        <Link href={product.fileName}><h2>{product.frontmatter.title}</h2></Link>
        <span>{product.frontmatter.price}$</span>
        <p>{product.frontmatter.excerpt}</p>
      </div>
      <div className="card__footer">
        <SnipcartButton product={product} />
      </div>
    </div>
  )
}

export default ProductCard