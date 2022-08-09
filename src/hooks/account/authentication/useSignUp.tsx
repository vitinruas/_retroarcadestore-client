// hooks
import { useState } from 'react'
import { useFetch } from '../../useFetch'
import { useAuthContext } from '../../../contexts/auth-context'
import { useModalContext } from '../../../contexts/modal-context'
import { useNavigate } from 'react-router-dom'

// api
import { api } from '../../../helpers/url'

// interfaces
import { ISignUpModel } from '../../../protocols/usecase/account/authentication/signup-protocol'

export const useSignUp = () => {
  // states
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { authState, authDispatch } = useAuthContext()

  // contexts
  const { modalDispatch } = useModalContext()

  // hooks
  const { send } = useFetch()
  const navigate = useNavigate()

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
        modalDispatch({
          type: 'CLOSE',
          reactComponent: null,
        })
        navigate('/')
      }
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, signUp }
}
