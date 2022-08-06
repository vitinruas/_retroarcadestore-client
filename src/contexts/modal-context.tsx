import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
} from 'react'

interface IModalState {
  isOpen?: boolean
  reactComponent: ReactElement | null
}

export interface IModalContext {
  modalState: IModalState
  modalDispatch: React.Dispatch<IAction>
}

interface IAction extends IModalState {
  type: 'OPEN' | 'CLOSE'
}

const initialModalState: IModalState = {
  isOpen: false,
  reactComponent: null,
}

const initialProvidedContext: IModalContext = {
  modalState: initialModalState,
  modalDispatch: () => {},
}

export const ModalContext = createContext<IModalContext>(initialProvidedContext)

interface IProps {
  children: ReactElement
}

export const ModalProvider = ({ children }: IProps) => {
  const setModalState = (prevState: IModalState, action: IAction) => {
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
  const [modalState, modalDispatch] = useReducer(
    setModalState,
    initialModalState
  )

  return (
    <ModalContext.Provider value={{ modalState, modalDispatch }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = (): IModalContext => useContext(ModalContext)
