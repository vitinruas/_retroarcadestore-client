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
  const { authDispatch } = useAuthContext()
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

  // always reload will be dispatched to authenticate
  useEffect(() => {
    authDispatch({
      type: 'AUTHENTICATE',
    })
    setIsAuthenticating(false)
  }, [])
  const [serverIsDown, setServerIsDown] = useState<boolean>(false)
  setInterval(async () => {
    try {
      // await fetch('http://localhost:5000/api', {
      //   method: 'HEAD',
      // })
      setServerIsDown(false)
    } catch (error) {
      setServerIsDown(true)
    }
  }, 8000)
  if (serverIsDown) {
    return <>You do not connected to internet</>
  }
  return isAuthenticating ? (
    <span className="msg-loading">Loading...</span>
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
