import React from 'react'

// styles
import './Error500.css'

// interfaces
interface IProps {
  messageContent: {
    title: string | null
    body: string | null
    showTryingReconnect?: boolean | null
  }
  returnButton?: boolean | null
  reloadButton?: boolean | null
  style: string | null
}

const Error500 = ({
  messageContent,
  returnButton,
  reloadButton,
  style,
}: IProps) => {
  return (
    <div className={`${style}`}>
      <h1 className="title">{messageContent.title}</h1>
      <span className="msg">{messageContent.body}</span>
      {messageContent.showTryingReconnect && (
        <span className="trying-reconnect">Trying to reconnect</span>
      )}
      {reloadButton && (
        <a href="./" className="btn">
          Reload page
        </a>
      )}
      {returnButton && (
        <a href="/" className="btn">
          Come back to home
        </a>
      )}
    </div>
  )
}

export default Error500
