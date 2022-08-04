import React from 'react'
import { IProduct } from '../../protocols/entities/product/product-entitie'

// styles
import './Product.css'

// hooks
import { usePriceConverter } from '../../hooks/system/conversors/usePriceConverter'

interface IProps {
  product: IProduct
}

const Product = ({ product }: IProps) => {
  const { convert } = usePriceConverter()
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
