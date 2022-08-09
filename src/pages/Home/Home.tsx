import React, { useEffect } from 'react'

// styles
import './Home.css'

// contexts
import { useModalContext } from '../../contexts/modal-context'

// pages
import ProductModal from '../../components/Modals/ProductModal/ProductModal'
import Product from '../../components/ProductCard/ProductCard'
import SearchInput from '../../components/SearchInput/SearchInput'

// mocks
import products_list from '../../mocks/products'

// interfaces
interface IProps {}
import { IProductEntitie } from '../../protocols/entities/product/product-entitie'
import { useGetProducts } from '../../hooks/product/useGetProducts'

const Home = (props: IProps) => {
  // states
  const { products, getProducts } = useGetProducts()

  // contexts
  const { modalDispatch } = useModalContext()

  useEffect(() => {
    getProducts()
  }, [])

  console.log(products)

  const handleOpenProductModal = (product: IProductEntitie) => {
    return modalDispatch({
      type: 'OPEN',
      reactComponent: <ProductModal product={product} />
    })
  }

  return (
    <section className="home">
      {/* announcements */}
      <section className="ad"></section>
      {/* search */}
      <SearchInput />
      <section className="products">
        {/* filters */}
        <section className="filter">
          <h3>Filter</h3>
        </section>
        {/* list */}
        <section className="list">
          {products && products.length > 0 ? (
            products.map(
              (product) =>
                product.isEnabled && (
                  <div
                    key={product.pid}
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
