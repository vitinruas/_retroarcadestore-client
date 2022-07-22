import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
} from 'react'

interface IConfig {
  isOpen?: boolean
  reactComponent: ReactElement | null
}

// it will be returned to components
interface IModalContext {
  config: IConfig
  dispatch: React.Dispatch<IAction>
}

interface IAction extends IConfig {
  type: 'OPEN' | 'CLOSE'
}

const initialConfig: IConfig = {
  isOpen: false,
  reactComponent: null,
}

const defaultContext: IModalContext = {
  config: initialConfig,
  dispatch: () => {},
}

export const ModalContext = createContext<IModalContext>(defaultContext)

interface IProps {
  children: ReactElement
}

export const ModalProvider = ({ children }: IProps) => {
  const setModalState = (prevState: IConfig, action: IAction) => {
    switch (action.type) {
      case 'OPEN':
        return {
          ...prevState,
          isOpen: true,
          reactComponent: action.reactComponent,
        }
      case 'CLOSE':
        return { ...prevState, isOpen: false, reactComponent: null }
      default:
        return { ...prevState }
    }
  }
  const [config, dispatch] = useReducer(setModalState, initialConfig)

  return (
    <ModalContext.Provider value={{ config, dispatch }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = (): IModalContext => useContext(ModalContext)
