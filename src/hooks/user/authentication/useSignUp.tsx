// hooks
import { useState } from 'react'
import { useFetch } from '../../useFetch'
import { useAuthContext } from '../../../contexts/auth-context'
// api
import { api } from '../../../components/helpers/request'
// interfaces
import { ISignUpModel } from '../../../protocols/user/signup-protocol'

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { authState, authDispatch } = useAuthContext()

  const signUp = async (signUpData: ISignUpModel | null) => {
    setLoading(true)
    const { receivedError, receivedData } = await useFetch(
      api.url + '/signup',
      'POST',
      signUpData
    )
    // check if in response there is access token
    if (receivedData['accessToken']) {
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
  return { error, loading, signUp }
}
