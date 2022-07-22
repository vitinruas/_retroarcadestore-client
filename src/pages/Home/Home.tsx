import React from 'react'
import ProductModal from '../../components/Modals/ProductModal/ProductModal'
import Product from '../../components/Product/Product'
import Search from '../../components/Search/Search'
import { useModalContext } from '../../contexts/modal-context'
import products_list from '../../mocks/products'
import { IProduct } from '../../protocols/product-entitie'

// styles
import './Home.css'

type IProps = {}

const Home = (props: IProps) => {
  const products = products_list
  const { dispatch } = useModalContext()
  const handleOpenProductModal = (product: IProduct) => {
    return dispatch({
      type: 'OPEN',
      reactComponent: <ProductModal product={product} />,
    })
  }
  return (
    <section className="home">
      <Search />
      <section className="products">
        <section className="filter">
          <h3>FILTRO</h3>
        </section>
        <section className="list">
          {products && products.length > 0 ? (
            products.map(
              (product) =>
                product.isEnabled && (
                  <div onClick={() => handleOpenProductModal(product)}>
                    <Product key={product.id} product={product} />
                  </div>
                )
            )
          ) : (
            <div>Não há nenhum Produto!</div>
          )}
        </section>
      </section>
    </section>
  )
}

export default Home
