import { useState } from 'react'
import { makeRequest } from '../../components/helpers/request'
import { ISignUpModel } from '../../protocols/user/signup-protocol'

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const signUp = async (signupData: ISignUpModel | null) => {
    setLoading(true)
    const request: RequestInit = makeRequest('POST', signupData)
    try {
      const response = await fetch('http://localhost:5000/api/signup', request)
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

  return { error, loading, signUp }
}
