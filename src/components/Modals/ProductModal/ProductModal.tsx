import React from 'react'

// styles
import './ProductModal.css'
import { AiFillDollarCircle } from 'react-icons/ai'
import { IoCloseCircleSharp } from 'react-icons/io5'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'

// contexts
import { useModalContext } from '../../../contexts/modal-context'

// hooks
import { useMoneyConverter } from '../../../hooks/system/conversors/useMoneyConverter'

// interfaces
interface IProps {
  product: IProductEntitie
}
import { IProductEntitie } from '../../../protocols/entities/product/product-entitie'
import products_list from '../../../mocks/products'

const ProductModal = ({ product }: IProps) => {
  // hooks
  const { convert } = useMoneyConverter()
  // dispatch modal
  const { modalDispatch } = useModalContext()

  // handle close modal
  const handleCloseProductModal = () => {
    modalDispatch({
      type: 'CLOSE',
      reactComponent: null
    })
  }

  // handle zoom image
  const handleZoomInImage = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.currentTarget.classList.remove('zoom-out-image')
    e.currentTarget.classList.add('zoom-in-image')
  }

  const handleZoomOutImage = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.currentTarget.classList.remove('zoom-in-image')
    e.currentTarget.classList.add('zoom-out-image')
  }
  return (
    <div className="product-modal">
      <button className="btn close-button" onClick={handleCloseProductModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      {/* product images */}
      <div className="images">
        {/* product main image */}
        <figure className="bannerImage">
          {product.bannerImage ? (
            <img
              src={`http://localhost:5000/uploads/product/${product.bannerImage}`}
              onMouseEnter={(e) => handleZoomInImage(e)}
              onMouseLeave={(e) => handleZoomOutImage(e)}
            />
          ) : (
            <div className="no-image"></div>
          )}
        </figure>
        {/* product preview images */}
        <div className="previewImages">
          {product.previewImages && product.previewImages.length > 0 ? (
            product.previewImages.map((image) => (
              <img src={`http://localhost:5000/uploads/product/${image}`} />
            ))
          ) : (
            <>
              <div className="no-image"></div>
              <div className="no-image"></div>
              <div className="no-image"></div>
            </>
          )}
        </div>
      </div>

      {/* product informations */}
      <div className="informations">
        {/* product name */}
        <h1 className="name">{product.name}</h1>
        {/* product category */}
        <span className="category">{product.category}</span>
        {/* product avaliation */}
        <div className="avaliation">
          <div className="stars"></div>
          {product.avaliations && product.avaliations.length ? (
            <span>
              {product.avaliations.length}avaliaram {product.name}
            </span>
          ) : (
            <span>Não há nenhuma avaliação, seja o(a) primeiro(a) :)</span>
          )}
        </div>
        {/* product description */}
        <span className="description">{product.description}</span>
        {/* container for price, discount, favorite and quantity */}
        <div className="container">
          {/* product price */}
          {product.discount ? (
            <div className="price-with-discount">
              <span className="price">{convert(product.price, 'R$')}</span>
              <span className="discount"></span>
            </div>
          ) : (
            <span className="price">{convert(product.price, 'R$')}</span>
          )}
          {/* product favorite */}
          <button className="favorite btn">
            <AiOutlineHeart className="icons" />
          </button>
        </div>
        {/* product quantity */}
        <div className="quantity">
          {product.category !== 'games' && (
            <>
              <IoIosArrowDropleftCircle className="icons" />
              <span>{product.quantity}</span>
              <IoIosArrowDroprightCircle className="icons" />
            </>
          )}
        </div>
        {/* product buttons */}
        <div className="buttons">
          {/* product cart */}
          <button className="cart btn btn-secondary">
            <FaShoppingCart className="icons" />
            <span>Cart</span>
          </button>
          {/* product buy */}
          <button className="buy btn btn-primary">
            <AiFillDollarCircle className="icons" />
            <span>Buy Now</span>
          </button>
        </div>
        {/* product id */}
        <span className="id">ID: {product.pid}</span>
      </div>
    </div>
  )
}

export default ProductModal
