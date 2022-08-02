// hooks
import { useState } from 'react'
import { useFetch } from '../../useFetch'
import { useAuthContext } from '../../../contexts/auth-context'
// api
import { api } from '../../../helpers/url'
// interfaces
import { IAuthenticationModel } from '../../../protocols/usecase/authentication-protocol'

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { authState, authDispatch } = useAuthContext()

  const login = async (authenticationData: IAuthenticationModel | null) => {
    setLoading(true)
    const url = `${api.restAPI}/login`
    const { receivedError, receivedData } = await useFetch(
      url,
      'POST',
      authenticationData
    )
    // check if in response there is access token
    if (receivedData && receivedData['accessToken']) {
      localStorage.setItem(
        'accessToken',
        JSON.stringify(receivedData['accessToken'])
      )
      // if don't logged, send signal to change global state
      if (!authState.isLogged) {
        authDispatch({
          type: 'AUTHENTICATE',
        })
      }
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, login }
}
