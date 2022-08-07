import React, { useState } from 'react'
import { cart_list as products } from '../../../mocks/cart'

// hooks
import { useModalContext } from '../../../contexts/modal-context'
import { useMoneyConverter } from '../../../hooks/system/conversors/useMoneyConverter'

// styles
import './CartModal.css'
import { IoCloseCircleSharp } from 'react-icons/io5'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import { TbDiscount } from 'react-icons/tb'

// interfaces
interface IProps {}

const CartModal = (props: IProps) => {
  // context
  const { modalDispatch } = useModalContext()

  // get total quantity prices
  const getTotalQuantityPrice = (quantity: number, price: number): number =>
    price * quantity

  // get total cart product prices
  const getTotalCartPrice = (): number =>
    products.reduce((prevPrice: number, currentProduct) => {
      return prevPrice + currentProduct.price
    }, 0)

  // handle close modal
  const handleCloseSignUpModal = () =>
    modalDispatch({
      type: 'CLOSE',
      reactComponent: null,
    })

  const { convert } = useMoneyConverter()
  return (
    <section className="cart-modal">
      <button className="btn close-button" onClick={handleCloseSignUpModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      {/* cart */}
      <div className="cart">
        {/* cart title */}
        <h1 className="title">
          <>
            <span className="left-arrow-effect">{'>'}</span> My Cart{' '}
            <span className="right-arrow-effect">{'<'}</span>
          </>
        </h1>
        {/* cart table */}
        <table>
          <thead>
            <tr>
              <th className="big" colSpan={2}>
                Product:
              </th>
              <th className="small">Quantity:</th>
              <th className="small">Price:</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length ? (
              products.map((product) => (
                <tr>
                  <td className="image">
                    <figure>
                      <img src={product.image} alt="" />
                    </figure>
                  </td>
                  <td className="name">
                    <h2>{product.name}</h2>
                  </td>
                  <td className="quantity">
                    <MdOutlineKeyboardArrowLeft className="icons" />
                    <span>{product.quantity}</span>
                    <MdOutlineKeyboardArrowRight className="icons" />
                  </td>
                  <td className="price">
                    <span>
                      {convert(
                        getTotalQuantityPrice(product.quantity, product.price),
                        'R$'
                      )}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <span>You don't have any product in your cart</span>
            )}
          </tbody>
        </table>
      </div>
      {/* cart options */}
      <div className="options">
        <h2 className="totalPrice">
          Total {convert(getTotalCartPrice(), 'R$')}
        </h2>
        {/* options promo code */}
        <form>
          <label>
            <span>Promo code:</span>
            <TbDiscount className="icons" />
            <input
              type="text"
              placeholder="enter here your promo code"
              autoFocus
            />
          </label>
        </form>
        {/* options buttons */}
        <div className="buttons">
          <button className="btn btn-secondary">Verify Promo Code</button>
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </section>
  )
}

export default CartModal
