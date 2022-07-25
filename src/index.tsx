import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { PriceConverterProvider } from './contexts/price-converter-context'
import { ModalProvider } from './contexts/modal-context'
import { AuthProvider } from './contexts/auth-context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PriceConverterProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </PriceConverterProvider>
    </AuthProvider>
  </React.StrictMode>
)
