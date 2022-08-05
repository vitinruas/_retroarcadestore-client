import React from 'react'
import ProductModal from '../../components/Modals/ProductModal/ProductModal'
import Product from '../../components/Product/Product'
import Search from '../../components/Search/Search'
import { useModalContext } from '../../contexts/modal-context'
import products_list from '../../mocks/products'
import { IProduct } from '../../protocols/entities/product/product-entitie'

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
      <section className="ad"></section>
      <Search />
      <section className="products">
        <section className="filter">
          <h3>Filter</h3>
        </section>
        <section className="list">
          {products && products.length > 0 ? (
            products.map(
              (product) =>
                product.isEnabled && (
                  <div
                    key={product.id}
                    onClick={() => handleOpenProductModal(product)}
                  >
                    <Product product={product} />
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
