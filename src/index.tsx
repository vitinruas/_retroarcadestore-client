import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ModalProvider } from './contexts/modal-context'
import { AuthProvider } from './contexts/auth-context'
import { MessageProvider } from './contexts/message-context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
)
