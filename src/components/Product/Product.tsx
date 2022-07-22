import React from 'react'
import { usePriceConverterContext } from '../../contexts/price-converter-context'
import { IProduct } from '../../protocols/product-entitie'

// styles
import './Product.css'

interface IProps {
  product: IProduct
}

const Product = ({ product }: IProps) => {
  const { convert } = usePriceConverterContext()
  return (
    <div className="product">
      {/* main image */}
      <figure className="mainImage">
        <img src={product.mainImage} />
      </figure>
      {/* name */}
      <div className="name">
        <h2>{product.name}</h2>
      </div>
      {/* price */}
      <div className="price">
        <strong>{convert(product.price, 'R$')}</strong>
      </div>
    </div>
  )
}

export default Product
