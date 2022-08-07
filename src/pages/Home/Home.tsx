import React from 'react'
import { Route } from 'react-router-dom'
import ProductModal from '../../components/Modals/ProductModal/ProductModal'
import Product from '../../components/ProductCard/ProductCard'
import SearchInput from '../../components/SearchInput/SearchInput'
import { useModalContext } from '../../contexts/modal-context'
import products_list from '../../mocks/products'
import { IProduct } from '../../protocols/entities/product/product-entitie'

// styles
import './Home.css'

type IProps = {}

const Home = (props: IProps) => {
  const products = products_list

  const { modalDispatch } = useModalContext()
  const handleOpenProductModal = (product: IProduct) => {
    return modalDispatch({
      type: 'OPEN',
      reactComponent: <ProductModal product={product} />,
    })
  }

  return (
    <section className="home">
      <section className="ad"></section>
      <SearchInput />
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
            <span>Não há nenhum Produto!</span>
          )}
        </section>
      </section>
    </section>
  )
}

export default Home
