// hooks
import { useState } from 'react'
import { useFetch } from '../../useFetch'
import { useAuthContext } from '../../../contexts/auth-context'
// api
import { api } from '../../../helpers/url'
// interfaces
import { ISignUpModel } from '../../../protocols/usecase/account/authentication/signup-protocol'

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { send } = useFetch()
  const { authState, authDispatch } = useAuthContext()

  const signUp = async (signUpData: ISignUpModel | null) => {
    setLoading(true)
    const url = `${api.restAPI}/signup`

    const { receivedError, receivedData, statusCode } = await send(
      url,
      'POST',
      signUpData
    )
    // check if in response there is access token
    if (receivedData && receivedData['accessToken']) {
      localStorage.setItem('accessToken', receivedData['accessToken'])
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
