import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import Layout from './components/Layout'
import Modal from './components/Modals/Modal'

// pages
import Pages from './pages'

// contexts
import { useModalContext } from './contexts/modal-context'

function App() {
  const { config } = useModalContext()
  console.log(localStorage.getItem('accessToken'))
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
