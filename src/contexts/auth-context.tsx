import React, {
  ReactElement,
  createContext,
  useState,
  useContext,
  useReducer,
} from 'react'

interface IAuthState {
  isLogged: boolean
}

interface IAuthContext {
  authState: IAuthState
  authDispatch: React.Dispatch<IAction>
}

interface IAction {
  type: 'AUTHENTICATE' | 'LOGOUT'
}

const initialState: IAuthState = {
  isLogged: false,
}

const defaultContext: IAuthContext = {
  authState: initialState,
  authDispatch: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultContext)

interface IProps {
  children: ReactElement
}

export const AuthProvider = ({ children }: IProps) => {
  const [isLogged, setIsLogged] = useState(false)
  // set auth state
  const setAuthState = (prevState: IAuthState, action: IAction): IAuthState => {
    switch (action.type) {
      case 'AUTHENTICATE':
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          return {
            ...prevState,
            isLogged: false,
          }
        }
        return {
          ...prevState,
          isLogged: true,
        }

      case 'LOGOUT':
        return {
          ...prevState,
          isLogged: false,
        }
      default:
        return prevState
    }
  }

  const [authState, authDispatch] = useReducer(setAuthState, initialState)

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
