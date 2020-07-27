import React from 'react'
import ProductCard from './productCard'

const ProductList = ({products}) => {
  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard product={p} />
      ))}
    </div>
  )
}

export default ProductList