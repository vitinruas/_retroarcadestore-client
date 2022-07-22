import React from 'react'
import { IProduct } from '../../../protocols/product-entitie'

// styles
import './ProductModal.css'
import { AiFillDollarCircle } from 'react-icons/ai'
import { IoCloseCircleSharp } from 'react-icons/io5'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'

// contexts
import { usePriceConverterContext } from '../../../contexts/price-converter-context'
import { useModalContext } from '../../../contexts/modal-context'

interface IProps {
  product: IProduct
}

const ProductModal = ({ product }: IProps) => {
  const { dispatch } = useModalContext()
  const handleCloseProductModal = () => {
    dispatch({
      type: 'CLOSE',
      reactComponent: null,
    })
  }
  const { convert } = usePriceConverterContext()
  return (
    <div className="product-modal">
      <button className="btn close" onClick={handleCloseProductModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      {/* images */}
      <div className="images">
        {/* main image */}
        <figure className="mainImage">
          {product.mainImage ? (
            <img src={product.mainImage} />
          ) : (
            <div className="no-image"></div>
          )}
        </figure>
        {/* preview images */}
        <div className="previewImages">
          <div className="no-image"></div>
          <div className="no-image"></div>
          <div className="no-image"></div>
        </div>
      </div>

      {/* informations */}
      <div className="informations">
        {/* name */}
        <h1 className="name">{product.name}</h1>
        {/* category */}
        <span className="category">Categoria: {product.category}</span>
        {/* avaliation */}
        <div className="avaliation">
          <div className="stars"></div>
          <span>
            {product.avaliations.length} pessoas avaliaram {product.name}
          </span>
        </div>
        {/* description */}
        <span className="description">{product.description}</span>
        {/* container for price, discount, favorite and quantity */}
        <div className="container">
          {/* price */}
          {product.discount ? (
            <div className="price-with-discount">
              <span className="price">{convert(product.price, 'R$')}</span>
              <span className="discount"></span>
            </div>
          ) : (
            <span className="price">{convert(product.price, 'R$')}</span>
          )}
          {/* favorite */}
          <button className="favorite btn">
            <AiOutlineHeart className="icons" />
          </button>
        </div>
        {/* quantity */}
        <div className="quantity">
          {product.category !== 'games' && (
            <>
              <IoIosArrowDropleftCircle className="icons" />
              <span>{product.quantity}</span>
              <IoIosArrowDroprightCircle className="icons" />
            </>
          )}
        </div>
        {/* buttons */}
        <div className="buttons">
          <button className="cart btn btn-secondary">
            <FaShoppingCart className="icons" />
            <span>Carrinho</span>
          </button>
          <button className="buy btn btn-primary">
            <AiFillDollarCircle className="icons" />
            <span>Comprar</span>
          </button>
        </div>
        <span className="id">ID: {product.id}</span>
      </div>
    </div>
  )
}

export default ProductModal
