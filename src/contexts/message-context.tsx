import React, { createContext, useReducer, Dispatch, useContext } from 'react'

type ComponentType = 'HOME' | 'ACCOUNT' | 'CART' | null
type MessageBodyType = string | null
type MessageType = 'SUCCESS' | 'ERROR' | 'INFO' | null
type StyleClassType =
  | 'msg-client-success'
  | 'msg-admin-success'
  | 'msg-client-error'
  | 'msg-admin-error'
  | 'msg-client-info'
  | 'msg-admin-info'
  | null

interface IState {
  component: ComponentType
  messageBody: MessageBodyType
  messageType: MessageType
  styleClass: StyleClassType
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
  messageBody: null,
  messageType: null,
  styleClass: null,
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
          messageBody: action.messageBody,
          messageType: action.messageType,
          styleClass: action.styleClass,
        }
      case 'CLOSE':
        return {
          isOpen: false,
          component: null,
          messageBody: null,
          messageType: null,
          styleClass: null,
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
