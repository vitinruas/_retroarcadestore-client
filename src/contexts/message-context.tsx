import React, { createContext, useReducer, useContext } from 'react'
interface IState {
  component?: 'APP' | 'HOME' | 'ACCOUNT' | 'CART' | null
  messageContent?: {
    type?: 'SUCCESS' | 'ERROR' | 'INFO'
    title?: string
    body?: string | null
  } | null
  style?:
    | 'msg-client-success'
    | 'msg-admin-success'
    | 'msg-client-error'
    | 'msg-admin-error'
    | 'msg-client-info'
    | 'msg-admin-info'
    | 'msg-app-error'
    | 'msg-app-info'
    | null
  isOpen?: boolean
}

interface IMessageContext {
  state: IState
  dispatch: React.Dispatch<IAction>
}

interface IAction extends IState {
  type: 'OPEN' | 'CLOSE'
}

interface IProps {
  children: React.ReactElement
}

const initialState: IState = {
  component: null,
  messageContent: null,
  style: null,
}

const defaultContext: IMessageContext = {
  state: initialState,
  dispatch: () => {},
}

export const MessageContext = createContext<IMessageContext>(defaultContext)

export const MessageProvider = ({ children }: IProps) => {
  const setMessageState = (prevState: IState, action: IAction): IState => {
    switch (action.type) {
      case 'OPEN':
        return {
          isOpen: true,
          component: action.component,
          messageContent: action.messageContent,
          style: action.style,
        }
      case 'CLOSE':
        return {
          isOpen: false,
          component: null,
          messageContent: null,
          style: null,
        }

      default:
        return prevState
    }
  }
  const [state, dispatch] = useReducer(setMessageState, initialState)
  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = (): IMessageContext =>
  useContext(MessageContext)
