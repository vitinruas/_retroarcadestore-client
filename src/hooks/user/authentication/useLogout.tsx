// hooks
import { useAuthContext } from '../../../contexts/auth-context'

export const useLogout = () => {
  const { authState, authDispatch } = useAuthContext()
  localStorage.removeItem('accessToken')
  // change global state to unauthenticated only when is logged
  if (authState.isLogged) {
    authDispatch({
      type: 'LOGOUT',
    })
  }
}
