import { useState } from 'react'
import { ISignUpModel } from '../../protocols/user/signup-protocol'
import { useFetch } from '../useFetch'

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async ({
    name,
    email,
    password,
    passwordConfirmation,
  }: ISignUpModel) => {
    setLoading(true)
    const { error, dataResponse } = await useFetch('/signup', 'POST', {
      name,
      email,
      password,
      passwordConfirmation,
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
    signup,
  }
}
