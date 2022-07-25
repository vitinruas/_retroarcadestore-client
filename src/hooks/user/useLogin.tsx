import { useState } from 'react'
import { makeRequest } from '../../components/helpers/request'
import { IAuthenticationModel } from '../../protocols/user/authentication-protocol'

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (authenticationData: IAuthenticationModel | null) => {
    setLoading(true)
    const request: RequestInit = makeRequest('POST', authenticationData)
    try {
      const response = await fetch('http://localhost:5000/api/login', request)
      const data = await response.json()
      if (response.status >= 400) {
        setError(data)
      }

      localStorage.setItem('accessToken', JSON.stringify(data['accessToken']))
    } catch (error) {
      setError('Error! Try again later')
    }
    setLoading(false)
  }

  return { error, loading, login }
}
