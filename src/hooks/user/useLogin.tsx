import { useState } from 'react'
import { api } from '../../components/helpers/request'
import { IAuthenticationModel } from '../../protocols/user/authentication-protocol'
import { useFetch } from '../useFetch'

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (authenticationData: IAuthenticationModel | null) => {
    setLoading(true)
    const { receivedError, receivedData } = await useFetch(
      api.url + '/login',
      'POST',
      authenticationData
    )
    if (receivedData['accessToken']) {
      localStorage.setItem(
        'accessToken',
        JSON.stringify(receivedData['accessToken'])
      )
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, login }
}
