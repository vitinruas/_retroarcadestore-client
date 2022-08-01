import { api } from '../../components/helpers/request'
import { useState } from 'react'
import { ISignUpModel } from '../../protocols/user/signup-protocol'
import { useFetch } from '../useFetch'

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const signUp = async (signUpData: ISignUpModel | null) => {
    setLoading(true)
    const { receivedError, receivedData } = await useFetch(
      api.url + '/signup',
      'POST',
      signUpData
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
  return { error, loading, signUp }
}
