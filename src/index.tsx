import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ModalProvider } from './contexts/modal-context'
import { AuthProvider } from './contexts/auth-context'
import { MessageProvider } from './contexts/message-context'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ModalProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </ModalProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
