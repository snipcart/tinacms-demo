import React from 'react'

const SnipcartButton = ({product}) => {
  return (
    <button className="snipcart-add-item"
    data-item-id={product.fileName.split('/')[1]}
    data-item-price={product.frontmatter.price}
    data-item-description={product.frontmatter.excerpt}
    data-item-image={product.frontmatter.image}
    data-item-name={product.frontmatter.title}
    data-item-url={product.frontmatter.fileName}
    >
      Add to cart
    </button>
  )
}

export default SnipcartButton