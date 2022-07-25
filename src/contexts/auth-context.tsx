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
  state: IAuthState
  dispatch: React.Dispatch<IAction>
}

interface IAction {
  type: string
}

const initialState: IAuthState = {
  isLogged: false,
}

const defaultContext: IAuthContext = {
  state: initialState,
  dispatch: () => {},
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
        localStorage.removeItem('accessToken')
        return {
          ...prevState,
          isLogged: false,
        }
      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(setAuthState, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
