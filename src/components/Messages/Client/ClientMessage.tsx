import React from 'react'

// styles
import './ClientMessage.css'

// interfaces
interface IProps {
  message: string
  state: 'ERROR' | 'SUCCESS'
}

const ClientMessage = ({ message, state }: IProps) => {
  return (
    <div className="msg-client">
      <div className={state === 'SUCCESS' ? 'success' : 'error'}>{message}</div>
    </div>
  )
}

export default ClientMessage
