import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

// components
import Layout from './components/Layout'
import Modal from './components/Modals/Modal'

// pages
import Pages from './pages'

// contexts
import { IModalContext, useModalContext } from './contexts/modal-context'
import { useAuthContext } from './contexts/auth-context'
import { useMessageContext } from './contexts/message-context'

function App() {
  const { modalState } = useModalContext()
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
  const { authDispatch } = useAuthContext()
  const { messageState } = useMessageContext()

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
      <div className={`${messageState.style}`}>
        <h1 className="title">{messageState.messageContent!.title}</h1>
        <span className="msg">{messageState.messageContent!.body}</span>
        <span className="trying-reconnect">Trying to reconnect</span>
        <a href="./" className="btn">
          Reload page
        </a>
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        {/* modal setup */}
        {modalState.isOpen && <Modal />}
        {/* layout */}
        <Layout>{<Pages />}</Layout>
      </BrowserRouter>
    </>
  )
}

export default App
