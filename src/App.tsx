import React, { useEffect, useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
// styles
import './App.css'

// components
import Layout from './components/Layout'
import Modal from './components/Modals/Modal'

// pages
import Pages from './pages'

// contexts
import { useModalContext } from './contexts/modal-context'
import { useAuthContext } from './contexts/auth-context'
import { useMessageContext } from './contexts/message-context'
import Error500 from './pages/Errors/500/Error500'
import { useSystemMessage } from './hooks/system/messages/useSystemMessage'

function App() {
  const navigate = useNavigate()
  // states
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

  // hooks
  const { modalState } = useModalContext()
  const { authDispatch } = useAuthContext()
  const { messageState, messageDispatch } = useMessageContext()
  const { dispatchThrowConnectionError } = useSystemMessage()

  // check every 3 seconds if user connection is up
  useEffect(() => {
    let isDownServer = false
    setInterval(() => {
      // if the connection is recovered, redirect the user to the same page that error occured
      if (!navigator.onLine) {
        dispatchThrowConnectionError()
        isDownServer = true
      } else if (navigator.onLine && isDownServer) {
        isDownServer = false
        messageDispatch({
          type: 'CLOSE',
          component: null,
          messageContent: null,
          style: null,
        })
        return navigate('./')
      }
    }, 3000)
  }, [])

  // always that reloaded, an action will be dispatched for authentication
  useEffect(() => {
    authDispatch({
      type: 'AUTHENTICATE',
    })
    setIsAuthenticating(false)
  }, [])
  if (isAuthenticating) {
    return <span className="msg-loading">Loading...</span>
  }

  // if there are no connection or the server is down,
  // will be show this message to the client
  if (messageState.isOpen && messageState.component === 'APP') {
    return (
      <Error500
        messageContent={{
          title: messageState.messageContent!.title,
          body: messageState.messageContent!.body,
          showTryingReconnect:
            messageState.messageContent!.options!.appError.showTryingReconnect,
        }}
        returnButton={
          messageState.messageContent!.options!.appError.returnButton
        }
        reloadButton={
          messageState.messageContent!.options!.appError.reloadButton
        }
        style={messageState!.style}
      />
    )
  }

  return (
    <>
      {/* modal setup */}
      {modalState.isOpen && <Modal />}
      {/* layout */}
      <Layout>{<Pages />}</Layout>
    </>
  )
}

export default App
