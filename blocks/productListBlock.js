import ProductList from "../components/productList"
import { BlocksControls } from "react-tinacms-inline"

const ProductListBlock = (props) => {
  return (
    <BlocksControls index={props.index} focusRing={{ offset: 0 }} insetControls>
      <ProductList products={props.data.products} />
    </BlocksControls>
  )
}

const createProductBlock = (products) => {
  return {
    Component: ProductListBlock,
    template: {
      label: 'Product list',
      defaultItem: {
        products: products || []
      }
    }
  }
}
export default createProductBlock