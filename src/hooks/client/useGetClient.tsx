// hooks
import { useState } from 'react'
import { useFetch } from '../useFetch'

// api
import { api } from '../../helpers/url'
import { IClientEntitie } from '../../protocols/entities/account/client-entitie'
import { useLogout } from '../account/authentication/useLogout'

// interfaces
interface IUseGetClient {
  error: string | null
  loading: boolean
  client: IClientEntitie | null
  getClient: () => {}
}

export const useGetClient = (): IUseGetClient => {
  // states
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [client, setClient] = useState<IClientEntitie | null>(null)
  // hooks
  const { send } = useFetch()
  const { logout } = useLogout()

  const getClient = async () => {
    setLoading(true)
    const url = `${api.restAPI}/client`
    const accessToken: string | null = localStorage.getItem('accessToken')
    const { receivedError, receivedData, statusCode } = await send(
      url,
      'GET',
      null,
      accessToken
    )
    // check if in response there is access token
    if (receivedData && statusCode === 200) {
      setClient(receivedData)
    } else if (statusCode === 403) {
      logout(true)
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, client, getClient }
}
