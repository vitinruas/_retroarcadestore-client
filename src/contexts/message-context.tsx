import React, { createContext, useReducer, useContext } from 'react'

interface IMessageState {
  component: 'APP' | 'HOME' | 'ACCOUNT' | 'CART' | null
  messageContent: {
    type: 'SUCCESS' | 'ERROR' | 'INFO' | null
    title: string | null
    body: string | null
    options: {
      appError: {
        showTryingReconnect: boolean
        reloadButton: boolean
        returnButton: boolean
      }
    } | null
  } | null
  style:
    | 'msg-client-success'
    | 'msg-admin-success'
    | 'msg-client-error'
    | 'msg-admin-error'
    | 'msg-client-info'
    | 'msg-admin-info'
    | 'msg-app-error'
    | 'msg-app-info'
    | null
}

interface IProvidedMessageState extends IMessageState {
  isOpen: boolean
}

export interface IMessageContext {
  messageState: IProvidedMessageState
  messageDispatch: React.Dispatch<IAction>
}

interface IProps {
  children: React.ReactElement
}

interface IAction extends IMessageState {
  type: 'OPEN' | 'CLOSE'
}

const initialMessageState: IProvidedMessageState = {
  isOpen: false,
  component: null,
  messageContent: {
    body: null,
    title: null,
    options: {
      appError: {
        reloadButton: false,
        showTryingReconnect: false,
        returnButton: false,
      },
    },
    type: null,
  },
  style: null,
}

const initialProvidedContext: IMessageContext = {
  messageState: initialMessageState,
  messageDispatch: () => {},
}

export const MessageContext = createContext<IMessageContext>(
  initialProvidedContext
)

export const MessageProvider = ({ children }: IProps) => {
  const setMessageState = (
    prevState: IProvidedMessageState,
    action: IAction
  ): IProvidedMessageState => {
    switch (action.type) {
      case 'OPEN':
        return {
          ...prevState,
          isOpen: true,
          ...action,
        }
      case 'CLOSE':
        return {
          ...prevState,
          ...initialMessageState,
        }

      default:
        return prevState
    }
  }
  const [messageState, messageDispatch] = useReducer(
    setMessageState,
    initialMessageState
  )
  return (
    <MessageContext.Provider value={{ messageState, messageDispatch }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = (): IMessageContext =>
  useContext(MessageContext)
