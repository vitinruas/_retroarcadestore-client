import React from 'react'
// hooks
import { useAuthContext } from '../../../contexts/auth-context'
import { useModalContext } from '../../../contexts/modal-context'

// components
import LoginModal from '../../../components/Modals/Account/Authentication/LoginModal/LoginModal'

export const useLogout = () => {
  // contexts
  const { authState, authDispatch } = useAuthContext()
  const { modalDispatch } = useModalContext()

  const logout = async (openModal?: boolean) => {
    localStorage.removeItem('accessToken')
    // change global state to unauthenticated only when is logged
    if (authState.isLogged) {
      authDispatch({
        type: 'LOGOUT',
      })
      if (openModal) {
        modalDispatch({
          type: 'OPEN',
          reactComponent: <LoginModal />,
        })
      }
    }
  }
  return { logout }
}
