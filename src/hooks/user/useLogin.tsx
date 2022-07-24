import { useState } from 'react'
import { IAuthenticationModel } from '../../protocols/user/authentication-protocol'
import { useFetch } from '../useFetch'

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const authenticate = async ({ email, password }: IAuthenticationModel) => {
    setLoading(true)
    const { error, dataResponse } = await useFetch('/login', 'POST', {
      email,
      password,
    })

    if (!error) {
      localStorage.setItem(
        'accessToken',
        JSON.stringify(dataResponse['accessToken'])
      )
    }
    setError(error)
    setLoading(false)
  }

  return {
    loading,
    error,
    authenticate,
  }
}
