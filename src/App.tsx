import './App.css'
import React from 'react'

// components
import Layout from './components/Layout'
import Modal from './components/Modals/Modal'

// pages
import Pages from './pages'

// contexts
import { useModalContext } from './contexts/modal-context'

function App() {
  const { config } = useModalContext()

  return (
    <>
      {config.isOpen && <Modal />}
      <Layout>{<Pages />}</Layout>
    </>
  )
}

export default App
