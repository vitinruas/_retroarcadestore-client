// hooks
import { useState } from 'react'
import { useFetch } from '../useFetch'

// api
import { api } from '../../helpers/url'
import { IProductEntitie } from '../../protocols/entities/product/product-entitie'

// interfaces
interface IUseGetProducts {
  error: string | null
  loading: boolean
  products: IProductEntitie[] | null
  getProducts: () => {}
}

export const useGetProducts = (): IUseGetProducts => {
  // states
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<IProductEntitie[] | null>(null)

  // hooks
  const { send } = useFetch()

  const getProducts = async () => {
    setLoading(true)
    const url = `${api.restAPI}/products`
    const { receivedError, receivedData } = await send(url, 'GET')
    if (receivedData) {
      setProducts(receivedData.products)
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, products, getProducts }
}
