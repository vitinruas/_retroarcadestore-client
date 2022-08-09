// hooks
import { useAuthContext } from '../../../contexts/auth-context'

export const useLogout = () => {
  // contexts
  const { authState, authDispatch } = useAuthContext()

  const logout = async () => {
    localStorage.removeItem('accessToken')
    // change global state to unauthenticated only when is logged
    if (authState.isLogged) {
      authDispatch({
        type: 'LOGOUT',
      })
    }
  }
  return { logout }
}
