import './App.css'
import React from 'react'

// components
import Layout from './components/Layout'

// pages
import Pages from './pages'

function App() {
  return (
    <h1>
      <Layout>{<Pages />}</Layout>
    </h1>
  )
}

export default App
