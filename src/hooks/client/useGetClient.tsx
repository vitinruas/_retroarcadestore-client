// hooks
import { useState } from 'react'
import { useFetch } from '../useFetch'
// api
import { api } from '../../helpers/url'
import { IClientEntitie } from '../../protocols/entities/account/client-entitie'
// interfaces
interface IUseGetClient {
  error: string | null
  loading: boolean
  client: IClientEntitie | null
  getClient: () => {}
}

export const useGetClient = (): IUseGetClient => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [client, setClient] = useState<IClientEntitie | null>(null)

  const getClient = async () => {
    setLoading(true)
    const url = `${api.restAPI}/client`
    const accessToken: string | null = localStorage.getItem('accessToken')
    const { receivedError, receivedData, statusCode } = await useFetch(
      url,
      'GET',
      null,
      accessToken
    )
    // check if in response there is access token
    if (receivedData && statusCode === 200) {
      setClient(receivedData)
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, client, getClient }
}
