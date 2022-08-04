import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

// components
import Layout from './components/Layout'
import Modal from './components/Modals/Modal'

// pages
import Pages from './pages'

// contexts
import { useModalContext } from './contexts/modal-context'
import { useAuthContext } from './contexts/auth-context'
import { useMessageContext } from './contexts/message-context'

function App() {
  const { config } = useModalContext()
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
  const { authDispatch } = useAuthContext()
  const { state: messageState, dispatch: messageDispatch } = useMessageContext()

  // always reload will be dispatched to authenticate
  useEffect(() => {
    authDispatch({
      type: 'AUTHENTICATE',
    })
    setIsAuthenticating(false)
  }, [])
  if (isAuthenticating) {
    return <span className="msg-loading">Loading...</span>
  }
  if (messageState.isOpen && messageState.component === 'APP') {
    return (
      <div className={'' + messageState.styleClass}>
        <h1>{messageState.messageBody}</h1>
        <a href="./" className="btn">
          Try Again
        </a>
      </div>
    )
  }
  return (
    <>
      {config.isOpen && <Modal />}
      <BrowserRouter>
        <Layout>{<Pages />}</Layout>
      </BrowserRouter>
    </>
  )
}

export default App
