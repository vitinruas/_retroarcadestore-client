import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from '../../../contexts/message-context'

// it's used when the user doesn't connect
const throwConnectionError = (messageDispatch: React.Dispatch<any>) => {
  messageDispatch({
    type: 'OPEN',
    component: 'APP',
    messageContent: {
      title: 'CONNECTION ERROR!',
      body: 'Check your connection and try again',
      type: 'ERROR',
      options: {
        appError: {
          reloadButton: true,
          showTryingReconnect: true,
        },
      },
    },
    style: 'msg-app-error',
  })
}

// it's used when the server is down
const throwServerError = (messageDispatch: React.Dispatch<any>) => {
  messageDispatch({
    type: 'OPEN',
    component: 'APP',
    messageContent: {
      title: 'Oops! something was wrong =(',
      body: 'A server error occurred while accessing this function, contact an administrator',
      type: 'ERROR',
      options: {
        appError: {
          returnButton: true,
        },
      },
    },
    style: 'msg-app-error',
  })
}

interface IUseSystemMessage {
  dispatchThrowConnectionError(): void
  dispatchServerError(): void
}

export const useSystemMessage = (): IUseSystemMessage => {
  const { messageDispatch } = useMessageContext()
  const navigate = useNavigate()
  // all dispatch
  const dispatchThrowConnectionError = () => {
    throwConnectionError(messageDispatch)
  }
  const dispatchServerError = () => {
    throwServerError(messageDispatch)
  }
  return { dispatchThrowConnectionError, dispatchServerError }
}
