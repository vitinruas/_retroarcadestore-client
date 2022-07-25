import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import Layout from './components/Layout'
import Modal from './components/Modals/Modal'

// pages
import Pages from './pages'

// contexts
import { useModalContext } from './contexts/modal-context'
import { useAuthContext } from './contexts/auth-context'

function App() {
  const { config } = useModalContext()
  const { state, dispatch } = useAuthContext()
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

  // always reload will be dispatched to authenticate
  useEffect(() => {
    dispatch({
      type: 'AUTHENTICATE',
    })
    setIsAuthenticating(false)
  }, [])

  return isAuthenticating ? (
    <span>Loading...</span>
  ) : (
    <>
      {config.isOpen && <Modal />}
      <BrowserRouter>
        <Layout>{<Pages />}</Layout>
      </BrowserRouter>
    </>
  )
}

export default App
