// hooks
import { useState } from 'react'
import { useFetch } from '../../useFetch'
import { useAuthContext } from '../../../contexts/auth-context'
import { useModalContext } from '../../../contexts/modal-context'
// api

import { api } from '../../../helpers/url'

// interfaces
import { IAuthenticationModel } from '../../../protocols/usecase/account/authentication/authentication-protocol'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  // states
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { authState, authDispatch } = useAuthContext()

  // contexts
  const { modalDispatch } = useModalContext()

  // hooks
  const { send } = useFetch()

  const login = async (authenticationData: IAuthenticationModel | null) => {
    setLoading(true)
    const url = `${api.restAPI}/login`
    const { receivedError, receivedData, statusCode } = await send(
      url,
      'POST',
      authenticationData
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
      }
    } else {
      setError(receivedError)
    }
    setLoading(false)
  }
  return { error, loading, login }
}
