import React, {
  ReactElement,
  createContext,
  useContext,
  useReducer,
} from 'react'

interface IAuthState {
  isLogged: boolean
}

export interface IAuthContext {
  authState: IAuthState
  authDispatch: React.Dispatch<IAction>
}

interface IProps {
  children: ReactElement
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

export const AuthProvider = ({ children }: IProps) => {
  const setAuthState = (prevState: IAuthState, action: IAction): IAuthState => {
    switch (action.type) {
      case 'AUTHENTICATE':
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
          return {
            ...prevState,
            isLogged: true,
          }
        }
        return {
          ...prevState,
          isLogged: false,
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
